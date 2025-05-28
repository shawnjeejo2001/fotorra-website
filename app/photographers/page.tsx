"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera, MapPin, Star } from "lucide-react"
import { useRouter } from "next/navigation"

const photographers = [
  {
    id: 1,
    name: "John Smith",
    location: "New York, NY",
    mainStyle: "Wedding",
    additionalStyles: ["Portrait", "Event"],
    rating: 4.8,
    reviews: 120,
    price: "$500",
    portfolioImage: "/examples/wedding-1.jpg",
    portfolioAlt: "Wedding photography",
  },
  {
    id: 2,
    name: "Emily Johnson",
    location: "Los Angeles, CA",
    mainStyle: "Portrait",
    additionalStyles: ["Fashion", "Lifestyle"],
    rating: 4.9,
    reviews: 150,
    price: "$600",
    portfolioImage: "/examples/portrait-1.jpg",
    portfolioAlt: "Portrait photography",
  },
  {
    id: 3,
    name: "David Lee",
    location: "Chicago, IL",
    mainStyle: "Event",
    additionalStyles: ["Corporate", "Concert"],
    rating: 4.7,
    reviews: 100,
    price: "$450",
    portfolioImage: "/examples/event-1.jpg",
    portfolioAlt: "Event photography",
  },
  {
    id: 4,
    name: "Sarah Brown",
    location: "Houston, TX",
    mainStyle: "Fashion",
    additionalStyles: ["Editorial", "Commercial"],
    rating: 4.6,
    reviews: 90,
    price: "$550",
    portfolioImage: "/examples/fashion-1.jpg",
    portfolioAlt: "Fashion photography",
  },
  {
    id: 5,
    name: "Michael Davis",
    location: "Miami, FL",
    mainStyle: "Lifestyle",
    additionalStyles: ["Travel", "Adventure"],
    rating: 4.5,
    reviews: 80,
    price: "$520",
    portfolioImage: "/examples/lifestyle-1.jpg",
    portfolioAlt: "Lifestyle photography",
  },
  {
    id: 6,
    name: "Linda Wilson",
    location: "Seattle, WA",
    mainStyle: "Commercial",
    additionalStyles: ["Product", "Advertising"],
    rating: 4.9,
    reviews: 130,
    price: "$620",
    portfolioImage: "/examples/commercial-1.jpg",
    portfolioAlt: "Commercial photography",
  },
]

const styleLabels = {
  Wedding: "Wedding",
  Portrait: "Portrait",
  Event: "Event",
  Fashion: "Fashion",
  Lifestyle: "Lifestyle",
  Corporate: "Corporate",
  Concert: "Concert",
  Editorial: "Editorial",
  Commercial: "Commercial",
  Product: "Product",
  Advertising: "Advertising",
  Travel: "Travel",
  Adventure: "Adventure",
}

export default function PhotographersPage() {
  const [hoveredPhotographer, setHoveredPhotographer] = useState(null)
  const router = useRouter()

  return (
    <main className="px-4 md:px-5">
      <header className="py-4 md:py-5">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Find Your Perfect Photographer</h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">Browse top photographers and book your session today.</p>
        <div className="mt-6 flex items-center space-x-4">
          <div className="w-full md:w-1/2">
            <Label htmlFor="search">Search</Label>
            <Input type="text" id="search" placeholder="Search by location or style..." />
          </div>
          <Button>Search</Button>
        </div>
      </header>
      <div className="text-center mb-6">
        <Button onClick={() => router.push("/")} variant="outline" className="bg-white hover:bg-gray-50">
          ← Back to Home
        </Button>
      </div>
      <section className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {photographers.map((photographer) => (
            <Card
              key={photographer.id}
              className="hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden group h-80 md:h-96"
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
                  <div className="w-24 md:w-32 h-24 md:h-32 mx-auto mb-4 relative overflow-hidden rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="w-8 md:w-12 h-8 md:h-12 text-gray-400" />
                  </div>
                  <CardTitle className="text-lg md:text-xl">{photographer.name}</CardTitle>
                  <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {photographer.location}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 md:space-y-4">
                  <div>
                    <Badge variant="default" className="mb-2 text-xs">
                      {styleLabels[photographer.mainStyle]}
                    </Badge>
                    <div className="flex flex-wrap gap-1">
                      {photographer.additionalStyles.map((style, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {styleLabels[style]}
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
                    <span className="font-bold text-base md:text-lg">{photographer.price}</span>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors text-sm md:text-base">
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
                <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-between p-4 md:p-6 text-white">
                  <div className="text-center">
                    <h3 className="text-lg md:text-xl font-bold mb-2">{photographer.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {photographer.location}
                    </div>
                    <Badge variant="secondary" className="bg-white text-black text-xs">
                      {styleLabels[photographer.mainStyle]}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{photographer.rating}</span>
                      <span className="text-sm opacity-80">({photographer.reviews} reviews)</span>
                    </div>
                    <div className="text-xl md:text-2xl font-bold mb-3">{photographer.price}</div>
                    <Button className="bg-white text-black hover:bg-gray-100 transition-colors text-sm md:text-base">
                      View Portfolio & Book
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
