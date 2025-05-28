import { type NextRequest, NextResponse } from "next/server"

// Mock location data - in production, you'd use a real geocoding API
const mockLocations = [
  { city: "New York", stateCode: "NY", zipCode: "10001" },
  { city: "Los Angeles", stateCode: "CA", zipCode: "90210" },
  { city: "Chicago", stateCode: "IL", zipCode: "60601" },
  { city: "Houston", stateCode: "TX", zipCode: "77001" },
  { city: "Phoenix", stateCode: "AZ", zipCode: "85001" },
  { city: "Philadelphia", stateCode: "PA", zipCode: "19101" },
  { city: "San Antonio", stateCode: "TX", zipCode: "78201" },
  { city: "San Diego", stateCode: "CA", zipCode: "92101" },
  { city: "Dallas", stateCode: "TX", zipCode: "75201" },
  { city: "San Jose", stateCode: "CA", zipCode: "95101" },
  { city: "Austin", stateCode: "TX", zipCode: "73301" },
  { city: "Jacksonville", stateCode: "FL", zipCode: "32099" },
  { city: "Fort Worth", stateCode: "TX", zipCode: "76101" },
  { city: "Columbus", stateCode: "OH", zipCode: "43085" },
  { city: "Charlotte", stateCode: "NC", zipCode: "28201" },
  { city: "San Francisco", stateCode: "CA", zipCode: "94102" },
  { city: "Indianapolis", stateCode: "IN", zipCode: "46201" },
  { city: "Seattle", stateCode: "WA", zipCode: "98101" },
  { city: "Denver", stateCode: "CO", zipCode: "80201" },
  { city: "Boston", stateCode: "MA", zipCode: "02101" },
  { city: "El Paso", stateCode: "TX", zipCode: "79901" },
  { city: "Detroit", stateCode: "MI", zipCode: "48201" },
  { city: "Nashville", stateCode: "TN", zipCode: "37201" },
  { city: "Portland", stateCode: "OR", zipCode: "97201" },
  { city: "Memphis", stateCode: "TN", zipCode: "38101" },
  { city: "Oklahoma City", stateCode: "OK", zipCode: "73101" },
  { city: "Las Vegas", stateCode: "NV", zipCode: "89101" },
  { city: "Louisville", stateCode: "KY", zipCode: "40201" },
  { city: "Baltimore", stateCode: "MD", zipCode: "21201" },
  { city: "Milwaukee", stateCode: "WI", zipCode: "53201" },
  { city: "Albuquerque", stateCode: "NM", zipCode: "87101" },
  { city: "Tucson", stateCode: "AZ", zipCode: "85701" },
  { city: "Fresno", stateCode: "CA", zipCode: "93650" },
  { city: "Mesa", stateCode: "AZ", zipCode: "85201" },
  { city: "Sacramento", stateCode: "CA", zipCode: "94203" },
  { city: "Atlanta", stateCode: "GA", zipCode: "30301" },
  { city: "Kansas City", stateCode: "MO", zipCode: "64101" },
  { city: "Colorado Springs", stateCode: "CO", zipCode: "80901" },
  { city: "Miami", stateCode: "FL", zipCode: "33101" },
  { city: "Raleigh", stateCode: "NC", zipCode: "27601" },
  { city: "Omaha", stateCode: "NE", zipCode: "68101" },
  { city: "Long Beach", stateCode: "CA", zipCode: "90801" },
  { city: "Virginia Beach", stateCode: "VA", zipCode: "23450" },
  { city: "Oakland", stateCode: "CA", zipCode: "94601" },
  { city: "Minneapolis", stateCode: "MN", zipCode: "55401" },
  { city: "Tulsa", stateCode: "OK", zipCode: "74101" },
  { city: "Arlington", stateCode: "TX", zipCode: "76010" },
  { city: "Tampa", stateCode: "FL", zipCode: "33601" },
  { city: "New Orleans", stateCode: "LA", zipCode: "70112" },
  { city: "Wichita", stateCode: "KS", zipCode: "67201" },
  { city: "Cleveland", stateCode: "OH", zipCode: "44101" },
  { city: "Bakersfield", stateCode: "CA", zipCode: "93301" },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")?.toLowerCase() || ""

  if (!query) {
    return NextResponse.json([])
  }

  // Check if it's a zip code
  const isZipCode = /^\d{1,5}$/.test(query)

  let suggestions = []

  if (isZipCode) {
    // Search by zip code
    suggestions = mockLocations
      .filter((location) => location.zipCode.startsWith(query))
      .map((location) => ({
        displayName: `${location.zipCode} - ${location.city}, ${location.stateCode}`,
        city: location.city,
        stateCode: location.stateCode,
        zipCode: location.zipCode,
        isZipCode: true,
      }))
  } else {
    // Search by city name
    suggestions = mockLocations
      .filter((location) => location.city.toLowerCase().includes(query))
      .map((location) => ({
        displayName: `${location.city}, ${location.stateCode}`,
        city: location.city,
        stateCode: location.stateCode,
        zipCode: location.zipCode,
        isZipCode: false,
      }))
  }

  // Limit to 10 suggestions
  return NextResponse.json(suggestions.slice(0, 10))
}
