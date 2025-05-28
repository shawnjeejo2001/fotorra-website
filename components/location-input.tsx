"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { useDebounce } from "use-debounce"

interface LocationSuggestion {
  displayName: string
  city: string
  stateCode: string
  zipCode: string
  isZipCode: boolean
}

interface LocationInputProps {
  onChange: (value: string) => void
  value: string
}

const LocationInput: React.FC<LocationInputProps> = ({ onChange, value }) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [zipCodeError, setZipCodeError] = useState("")
  const [debouncedValue] = useDebounce(value, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [recentlySelected, setRecentlySelected] = useState(false)

  const isPartialZipCode = (str: string) => /^\d{1,5}$/.test(str)

  const formatZipCode = (str: string) => {
    const cleaned = str.replace(/\D/g, "")
    return cleaned.length > 5 ? cleaned.substring(0, 5) : cleaned
  }

  const isValidZipCode = (str: string) => /^\d{5}$/.test(str)

  const fetchSuggestions = useCallback(async (query: string) => {
    if (!query) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    setZipCodeError("")

    try {
      const response = await fetch(`/api/location-suggestions?query=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setSuggestions(data)
    } catch (error: any) {
      console.error("Could not fetch locations:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (recentlySelected) return // Don't fetch if user just selected something

    if (isPartialZipCode(debouncedValue.replace(/\D/g, ""))) {
      if (debouncedValue.length === 5 && !isValidZipCode(debouncedValue.replace(/\D/g, ""))) {
        setZipCodeError("Invalid zip code")
        setSuggestions([])
        return
      }
      fetchSuggestions(debouncedValue)
    } else if (debouncedValue.length >= 2) {
      fetchSuggestions(debouncedValue)
    } else {
      setSuggestions([])
    }
  }, [debouncedValue, fetchSuggestions, recentlySelected])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value

    // Auto-format zip codes as user types
    if (isPartialZipCode(inputValue.replace(/\D/g, ""))) {
      inputValue = formatZipCode(inputValue)
    }

    onChange(inputValue)
    setRecentlySelected(false) // Reset when user starts typing again
    setShowSuggestions(true)
  }

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    // Set the full display name in the input
    const displayValue = suggestion.displayName
    onChange(displayValue)
    setShowSuggestions(false)
    setSelectedIndex(-1)
    setZipCodeError("")
    setRecentlySelected(true)

    // Clear the recently selected flag after a short delay
    setTimeout(() => setRecentlySelected(false), 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, suggestions.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex !== -1 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex])
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleFocus = () => {
    if (suggestions.length > 0 && !recentlySelected) {
      setShowSuggestions(true)
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Use a timeout to avoid hiding the suggestions before a click can register
    setTimeout(() => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(document.activeElement)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }, 150)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative">
      <input
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        placeholder="Enter city, state, or zip code"
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        ref={inputRef}
      />
      {zipCodeError && <p className="mt-1 text-sm text-red-500">{zipCodeError}</p>}

      {showSuggestions && (suggestions.length > 0 || isLoading) && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {isLoading && <div className="px-4 py-3 text-sm text-gray-500">Loading...</div>}
          {!isLoading &&
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                  index === selectedIndex ? "bg-blue-100" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                {suggestion.displayName}
              </div>
            ))}
          {!isLoading && suggestions.length === 0 && value.length >= 2 && !zipCodeError && !recentlySelected && (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No locations found for "{value}"
              {isPartialZipCode(value.replace(/\D/g, "")) && (
                <div className="text-xs mt-1">Continue typing your zip code...</div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default LocationInput
