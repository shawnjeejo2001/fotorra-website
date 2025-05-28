"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useState } from "react"
import { Camera, MapPin, Star, Calendar, Users, Award, RotateCcw, Mail } from "lucide-react"
import LocationInput from "@/components/location-input"
import { useRouter } from "next/navigation"

const photographyStyles = [
  { value: "wedding", label: "Wedding", description: "Weddings, ceremonies, receptions", emoji: "💒" },
  { value: "portrait", label: "Portrait", description: "Individual and family portraits", emoji: "👤" },
  { value: "event", label: "Event", description: "Parties, celebrations, gatherings", emoji: "🎉" },
  { value: "real-estate", label: "Real Estate", description: "Property photography", emoji: "🏠" },
  { value: "food", label: "Food", description: "Restaurant and culinary photography", emoji: "🍽️" },
  { value: "product", label: "Product", description: "Commercial product photography", emoji: "📦" },
  { value: "sports", label: "Sports", description: "Athletic events and action shots", emoji: "⚽" },
  { value: "street", label: "Street", description: "Urban and lifestyle photography", emoji: "🏙️" },
  { value: "nature", label: "Nature", description: "Outdoor and wildlife photography", emoji: "🌿" },
  { value: "pet", label: "Pet", description: "Animal and pet photography", emoji: "🐕" },
]

const videographyStyles = [
  { value: "wedding", label: "Wedding", description: "Wedding ceremonies and receptions", emoji: "💒" },
  { value: "event", label: "Event", description: "Parties and celebrations", emoji: "🎉" },
  { value: "corporate", label: "Corporate", description: "Business and promotional videos", emoji: "💼" },
  { value: "music", label: "Music Video", description: "Music videos and performances", emoji: "🎵" },
  { value: "real-estate", label: "Real Estate", description: "Property tour videos", emoji: "🏠" },
  { value: "documentary", label: "Documentary", description: "Storytelling and interviews", emoji: "📹" },
  { value: "sports", label: "Sports", description: "Athletic events and highlights", emoji: "⚽" },
  { value: "social", label: "Social Media", description: "Content for social platforms", emoji: "📱" },
]

const photographers = [
  {
    id: 1,
    name: "John Smith",
    location: "New York, NY",
    coordinates: { lat: 40.7128, lng: -74.006 },
    mainStyle: "Wedding",
    additionalStyles: ["Portrait", "Event"],
    rating: 4.8,
    reviews: 120,
    price: "$500",
    portfolioImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&crop=faces",
    portfolioAlt: "Wedding photography",
  },
  {
    id: 2,
    name: "Emily Johnson",
    location: "Los Angeles, CA",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    mainStyle: "Portrait",
    additionalStyles: ["Street", "Event"],
    rating: 4.9,
    reviews: 150,
    price: "$600",
    portfolioImage: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&h=400&fit=crop&crop=faces",
    portfolioAlt: "Portrait photography",
  },
  {
    id: 3,
    name: "David Lee",
    location: "Chicago, IL",
    coordinates: { lat: 41.8781, lng: -87.6298 },
    mainStyle: "Event",
    additionalStyles: ["Corporate", "Sports"],
    rating: 4.7,
    reviews: 100,
    price: "$450",
    portfolioImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    portfolioAlt: "Event photography",
  },
  {
    id: 4,
    name: "Sarah Brown",
    location: "Houston, TX",
    coordinates: { lat: 29.7604, lng: -95.3698 },
    mainStyle: "Real Estate",
    additionalStyles: ["Product", "Food"],
    rating: 4.6,
    reviews: 90,
    price: "$550",
    portfolioImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
    portfolioAlt: "Real estate photography",
  },
  {
    id: 5,
    name: "Michael Davis",
    location: "Miami, FL",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    mainStyle: "Street",
    additionalStyles: ["Nature", "Pet"],
    rating: 4.5,
    reviews: 80,
    price: "$520",
    portfolioImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    portfolioAlt: "Street photography",
  },
  {
    id: 6,
    name: "Linda Wilson",
    location: "Seattle, WA",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    mainStyle: "Product",
    additionalStyles: ["Food", "Real Estate"],
    rating: 4.9,
    reviews: 130,
    price: "$620",
    portfolioImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    portfolioAlt: "Product photography",
  },
]

// Mock coordinates for major cities (in real app, you'd use geocoding API)
const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  "New York, NY": { lat: 40.7128, lng: -74.006 },
  "Los Angeles, CA": { lat: 34.0522, lng: -118.2437 },
  "Chicago, IL": { lat: 41.8781, lng: -87.6298 },
  "Houston, TX": { lat: 29.7604, lng: -95.3698 },
  "Phoenix, AZ": { lat: 33.4484, lng: -112.074 },
  "Philadelphia, PA": { lat: 39.9526, lng: -75.1652 },
  "San Antonio, TX": { lat: 29.4241, lng: -98.4936 },
  "San Diego, CA": { lat: 32.7157, lng: -117.1611 },
  "Dallas, TX": { lat: 32.7767, lng: -96.797 },
  "San Jose, CA": { lat: 37.3382, lng: -121.8863 },
  "Miami, FL": { lat: 25.7617, lng: -80.1918 },
  "Seattle, WA": { lat: 47.6062, lng: -122.3321 },
  "Boston, MA": { lat: 42.3601, lng: -71.0589 },
  "Denver, CO": { lat: 39.7392, lng: -104.9903 },
  "Atlanta, GA": { lat: 33.749, lng: -84.388 },
}

// Function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLng = (lng2 - lng1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function Home() {
  const router = useRouter()
  const [service, setService] = useState("photographer")
  const [style, setStyle] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")
  const [duration, setDuration] = useState("")
  const [hoveredPhotographer, setHoveredPhotographer] = useState<number | null>(null)
  const [searchResults, setSearchResults] = useState(photographers)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState("")
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const handleSearch = () => {
    let filtered = photographers

    // Filter by style
    if (style) {
      filtered = filtered.filter(
        (photographer) =>
          photographer.mainStyle.toLowerCase() === style.toLowerCase() ||
          photographer.additionalStyles.some((s) => s.toLowerCase() === style.toLowerCase()),
      )
    }

    // Filter by location (50-mile radius)
    if (location) {
      // Extract city from location string (handle both "City, State" and "ZIP - City, State" formats)
      let searchCity = location
      if (location.includes(" - ")) {
        searchCity = location.split(" - ")[1] // Get "City, State" part from "ZIP - City, State"
      }

      const searchCoords = cityCoordinates[searchCity]
      if (searchCoords) {
        filtered = filtered.filter((photographer) => {
          const distance = calculateDistance(
            searchCoords.lat,
            searchCoords.lng,
            photographer.coordinates.lat,
            photographer.coordinates.lng,
          )
          return distance <= 50 // Within 50 miles
        })
      }
    }

    setSearchResults(filtered)
    setShowResults(true)

    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById("search-results")
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  const handleReset = () => {
    setService("photographer")
    setStyle("")
    setLocation("")
    setDate("")
    setDuration("")
    setSearchResults(photographers)
    setShowResults(false)
    setEmail("")
    setEmailSubmitted(false)

    // Scroll back to top
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleEmailSubmit = () => {
    if (email) {
      setEmailSubmitted(true)
      // In real app, you'd send this to your backend
      console.log("Email submitted:", email)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <button
                onClick={() => router.push("/")}
                className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Fotorra
              </button>
              <p className="text-sm sm:text-base text-gray-600">
                Find the perfect photographer or videographer for your needs
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button onClick={() => router.push("/sign-in")} variant="outline" className="text-sm">
                Sign In
              </Button>
              <Button onClick={() => router.push("/join-provider")} className="text-sm">
                Join Fotorra
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Capture Your Perfect Moment
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with professional photographers and videographers in your area. From weddings to corporate events,
              find the perfect match for your vision.
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-6xl mx-auto">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="service" className="text-sm font-medium">
                    Service Type
                  </Label>
                  <Select onValueChange={(value) => setService(value)} value={service}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photographer">Photographer</SelectItem>
                      <SelectItem value="videographer">Videographer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style" className="text-sm font-medium">
                    {service === "photographer" ? "Photography Style" : "Videography Style"}
                  </Label>
                  <Select onValueChange={(value) => setStyle(value)} value={style}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select style" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 overflow-y-auto">
                      {(service === "photographer" ? photographyStyles : videographyStyles).map((styleOption) => (
                        <SelectItem key={styleOption.value} value={styleOption.value}>
                          <div className="flex items-center gap-2 py-1 max-w-[250px]">
                            <span className="text-base flex-shrink-0">{styleOption.emoji}</span>
                            <div className="min-w-0 flex-1">
                              <div className="font-medium text-sm truncate">{styleOption.label}</div>
                              <div className="text-xs text-gray-500 truncate">{styleOption.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location
                  </Label>
                  <LocationInput value={location} onChange={setLocation} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="text-sm font-medium">
                    Event Date
                  </Label>
                  <Input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-sm font-medium">
                    Duration
                  </Label>
                  <Select onValueChange={(value) => setDuration(value)} value={duration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-hour">1 Hour</SelectItem>
                      <SelectItem value="2-hours">2 Hours</SelectItem>
                      <SelectItem value="3-hours">3 Hours</SelectItem>
                      <SelectItem value="4-hours">4 Hours</SelectItem>
                      <SelectItem value="6-hours">6 Hours</SelectItem>
                      <SelectItem value="8-hours">8 Hours</SelectItem>
                      <SelectItem value="full-day">Full Day</SelectItem>
                      <SelectItem value="multi-day">Multi-Day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium opacity-0">Search</Label>
                  <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Camera className="w-4 h-4 mr-2" />
                    Find Providers
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reset Button */}
      {showResults && (
        <section className="py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Button onClick={handleReset} variant="outline" className="bg-white">
              <RotateCcw className="w-4 h-4 mr-2" />
              Search Again
            </Button>
          </div>
        </section>
      )}

      {/* Search Results */}
      {showResults && (
        <section id="search-results" className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Search Results ({searchResults.length} found)
              </h3>
              {location && (
                <p className="text-base sm:text-lg text-gray-600 mb-4">
                  Showing providers within 50 miles of {location}
                </p>
              )}
            </div>

            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {searchResults.map((photographer) => (
                  <Card
                    key={photographer.id}
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group h-80 sm:h-96"
                    onMouseEnter={() => setHoveredPhotographer(photographer.id)}
                    onMouseLeave={() => setHoveredPhotographer(null)}
                  >
                    {/* Default Card Content */}
                    <div
                      className={`absolute inset-0 bg-white transition-opacity duration-300 ${
                        hoveredPhotographer === photographer.id ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      <CardHeader className="text-center relative">
                        <div className="w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 mx-auto mb-4 relative overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                          <Camera className="w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 text-gray-400" />
                        </div>
                        <CardTitle className="text-lg sm:text-xl">{photographer.name}</CardTitle>
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {photographer.location}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4">
                        <div>
                          <Badge variant="default" className="mb-2 text-xs">
                            {photographer.mainStyle}
                          </Badge>
                          <div className="flex flex-wrap gap-1">
                            {photographer.additionalStyles.map((style, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {style}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm">{photographer.rating}</span>
                            <span className="text-xs text-gray-600">({photographer.reviews})</span>
                          </div>
                          <span className="font-bold text-base sm:text-lg">{photographer.price}</span>
                        </div>
                        <Button
                          onClick={() => router.push(`/book/${photographer.id}`)}
                          className="w-full bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                        >
                          View Profile & Book
                        </Button>
                      </CardContent>
                    </div>

                    {/* Portfolio Preview Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        hoveredPhotographer === photographer.id ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img
                        src={photographer.portfolioImage || "/placeholder.svg"}
                        alt={photographer.portfolioAlt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 delay-1000 flex flex-col justify-between p-4 sm:p-6 text-white">
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000">
                          <h3 className="text-lg sm:text-xl font-bold mb-2">{photographer.name}</h3>
                          <div className="flex items-center justify-center gap-1 text-sm mb-3">
                            <MapPin className="w-4 h-4" />
                            {photographer.location}
                          </div>
                          <Badge variant="secondary" className="bg-white text-black text-xs">
                            {photographer.mainStyle}
                          </Badge>
                        </div>
                        <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000">
                          <div className="flex items-center justify-center gap-2 mb-3">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold">{photographer.rating}</span>
                            <span className="text-sm opacity-80">({photographer.reviews} reviews)</span>
                          </div>
                          <div className="text-xl sm:text-2xl font-bold mb-3">{photographer.price}</div>
                          <Button
                            onClick={() => router.push(`/book/${photographer.id}`)}
                            className="bg-white text-black hover:bg-gray-100 transition-colors text-sm"
                          >
                            View Portfolio & Book
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Camera className="w-16 h-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  No {service === "photographer" ? "photographers" : "videographers"} found in your area
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Sorry for the inconvenience. We are actively working on finding{" "}
                  {service === "photographer" ? "photographers" : "videographers"} in your area.
                </p>

                {!emailSubmitted ? (
                  <Card className="max-w-md mx-auto">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold">Get notified when we find someone</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Leave your email and we'll notify you as soon as we have someone available in your area.
                      </p>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={handleEmailSubmit} disabled={!email}>
                          Notify Me
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Alert className="max-w-md mx-auto border-green-200 bg-green-50">
                    <Mail className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      <strong>Thank you!</strong> We'll notify you at {email} as soon as we find{" "}
                      {service === "photographer" ? "photographers" : "videographers"} in your area.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Photographers */}
      {!showResults && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Featured Photographers</h3>
              <p className="text-base sm:text-lg text-gray-600">Discover top-rated professionals in your area</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {photographers.map((photographer) => (
                <Card
                  key={photographer.id}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group h-80 sm:h-96"
                  onMouseEnter={() => setHoveredPhotographer(photographer.id)}
                  onMouseLeave={() => setHoveredPhotographer(null)}
                >
                  {/* Default Card Content */}
                  <div
                    className={`absolute inset-0 bg-white transition-opacity duration-300 ${
                      hoveredPhotographer === photographer.id ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <CardHeader className="text-center relative">
                      <div className="w-20 sm:w-24 md:w-32 h-20 sm:h-24 md:h-32 mx-auto mb-4 relative overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                        <Camera className="w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 text-gray-400" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{photographer.name}</CardTitle>
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {photographer.location}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 sm:space-y-4">
                      <div>
                        <Badge variant="default" className="mb-2 text-xs">
                          {photographer.mainStyle}
                        </Badge>
                        <div className="flex flex-wrap gap-1">
                          {photographer.additionalStyles.map((style, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {style}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-sm">{photographer.rating}</span>
                          <span className="text-xs text-gray-600">({photographer.reviews})</span>
                        </div>
                        <span className="font-bold text-base sm:text-lg">{photographer.price}</span>
                      </div>
                      <Button
                        onClick={() => router.push(`/book/${photographer.id}`)}
                        className="w-full bg-black text-white hover:bg-gray-800 transition-colors text-sm"
                      >
                        View Profile & Book
                      </Button>
                    </CardContent>
                  </div>

                  {/* Portfolio Preview Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      hoveredPhotographer === photographer.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={photographer.portfolioImage || "/placeholder.svg"}
                      alt={photographer.portfolioAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-500 delay-1000 flex flex-col justify-between p-4 sm:p-6 text-white">
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000">
                        <h3 className="text-lg sm:text-xl font-bold mb-2">{photographer.name}</h3>
                        <div className="flex items-center justify-center gap-1 text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          {photographer.location}
                        </div>
                        <Badge variant="secondary" className="bg-white text-black text-xs">
                          {photographer.mainStyle}
                        </Badge>
                      </div>
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-1000">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{photographer.rating}</span>
                          <span className="text-sm opacity-80">({photographer.reviews} reviews)</span>
                        </div>
                        <div className="text-xl sm:text-2xl font-bold mb-3">{photographer.price}</div>
                        <Button
                          onClick={() => router.push(`/book/${photographer.id}`)}
                          className="bg-white text-black hover:bg-gray-100 transition-colors text-sm"
                        >
                          View Portfolio & Book
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Button
                onClick={() => router.push("/photographers")}
                variant="outline"
                size="lg"
                className="text-sm sm:text-base"
              >
                View All Photographers
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Why Choose Fotorra?</h3>
            <p className="text-base sm:text-lg text-gray-600">
              Everything you need to find and book the perfect photographer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Verified Professionals</h4>
              <p className="text-sm sm:text-base text-gray-600">
                All photographers are verified and reviewed by our community
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Easy Booking</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Book and manage your sessions with our simple booking system
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold mb-2">Quality Guarantee</h4>
              <p className="text-sm sm:text-base text-gray-600">
                Satisfaction guaranteed or your money back*
                <br />
                <span className="text-xs text-gray-500">*Terms and conditions apply</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h5 className="text-lg font-semibold mb-4">Fotorra</h5>
              <p className="text-sm text-gray-400">
                Connecting you with the best photographers and videographers in your area.
              </p>
            </div>
            <div>
              <h6 className="font-semibold mb-4">For Clients</h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => router.push("/")} className="text-gray-400 hover:text-white transition-colors">
                    Find Photographers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/how-it-works")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/pricing")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/reviews")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">For Providers</h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => router.push("/join-provider")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Join Fotorra
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/provider-resources")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Provider Resources
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/success-stories")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Success Stories
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/support")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => router.push("/about")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/contact")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/privacy")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => router.push("/terms")}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Fotorra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
