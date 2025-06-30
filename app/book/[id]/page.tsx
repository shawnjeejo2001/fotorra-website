"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Star, CheckCircle, ArrowLeft } from "lucide-react"

// Mock photographer data (in real app, fetch from database)
const photographer = {
  id: 1,
  name: "John Smith",
  location: "New York, NY",
  mainStyle: "Wedding",
  additionalStyles: ["Portrait", "Event"],
  rating: 4.8,
  reviews: 120,
  price: "$500",
  acceptanceRate: 95,
  cancellationRate: 2,
  responseTime: "Usually responds within 2 hours",
  portfolioImage: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&crop=faces",
}

export default function BookingPage() {
  const router = useRouter()
  const params = useParams()
  const [step, setStep] = useState(1)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  // Form data
  const [eventType, setEventType] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [duration, setDuration] = useState("")
  const [location, setLocation] = useState("")
  const [guestCount, setGuestCount] = useState("")
  const [budget, setBudget] = useState("")
  const [description, setDescription] = useState("")

  // Client info
  const [clientName, setClientName] = useState("")
  const [clientEmail, setClientEmail] = useState("")
  const [clientPhone, setClientPhone] = useState("")
  const [additionalRequests, setAdditionalRequests] = useState("")

  const handleSubmitBooking = async () => {
    // In real app, send to backend
    const bookingData = {
      photographerId: params.id,
      eventType,
      eventDate,
      eventTime,
      duration,
      location,
      guestCount,
      budget,
      description,
      clientName,
      clientEmail,
      clientPhone,
      additionalRequests,
      timestamp: new Date().toISOString(),
    }

    console.log("Booking request submitted:", bookingData)

    // Simulate API call
    setTimeout(() => {
      setBookingSubmitted(true)
    }, 1000)
  }

  if (bookingSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Booking Request Sent!</h2>
            <p className="text-gray-600 mb-4">
              Your booking request has been sent to {photographer.name}. They typically respond within 2 hours.
            </p>
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <button
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              fotochi
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Photographer Info */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={photographer.portfolioImage || "/placeholder.svg"}
                    alt={photographer.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h2 className="text-xl font-bold">{photographer.name}</h2>
                  <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    {photographer.location}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{photographer.rating}</span>
                    <span className="text-gray-600">({photographer.reviews} reviews)</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">{photographer.mainStyle}</Badge>
                      {photographer.additionalStyles.map((style, index) => (
                        <Badge key={index} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Statistics</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Acceptance Rate:</span>
                        <span className="font-semibold text-green-600">{photographer.acceptanceRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cancellation Rate:</span>
                        <span className="font-semibold text-blue-600">{photographer.cancellationRate}%</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{photographer.responseTime}</div>
                    </div>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <div className="text-2xl font-bold text-blue-600">{photographer.price}</div>
                    <div className="text-sm text-gray-600">Starting price</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Event Details</CardTitle>
                  <p className="text-gray-600">Tell us about your event</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select onValueChange={setEventType} value={eventType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                          <SelectItem value="portrait">Portrait Session</SelectItem>
                          <SelectItem value="family">Family Photos</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="birthday">Birthday Party</SelectItem>
                          <SelectItem value="graduation">Graduation</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="eventTime">Event Time *</Label>
                      <Input
                        id="eventTime"
                        type="time"
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="duration">Duration *</Label>
                      <Select onValueChange={setDuration} value={duration}>
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

                    <div>
                      <Label htmlFor="location">Event Location *</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter event location"
                      />
                    </div>

                    <div>
                      <Label htmlFor="guestCount">Number of Guests</Label>
                      <Select onValueChange={setGuestCount} value={guestCount}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guest count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 people</SelectItem>
                          <SelectItem value="11-25">11-25 people</SelectItem>
                          <SelectItem value="26-50">26-50 people</SelectItem>
                          <SelectItem value="51-100">51-100 people</SelectItem>
                          <SelectItem value="101-200">101-200 people</SelectItem>
                          <SelectItem value="200+">200+ people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select onValueChange={setBudget} value={budget}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-500">Under $500</SelectItem>
                        <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                        <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                        <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                        <SelectItem value="5000+">$5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your event, any special moments you want captured, style preferences, etc."
                      rows={4}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!eventType || !eventDate || !eventTime || !duration || !location || !description}
                    >
                      Continue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                  <p className="text-gray-600">How can the photographer reach you?</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Full Name *</Label>
                      <Input
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="clientEmail">Email Address *</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="clientPhone">Phone Number *</Label>
                      <Input
                        id="clientPhone"
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalRequests">Additional Requests</Label>
                    <Textarea
                      id="additionalRequests"
                      value={additionalRequests}
                      onChange={(e) => setAdditionalRequests(e.target.value)}
                      placeholder="Any special requests, specific shots you want, equipment needs, etc."
                      rows={3}
                    />
                  </div>

                  <Alert>
                    <AlertDescription>
                      The photographer will review your request and respond within their typical response time. You'll
                      receive updates via email and can track the status of your booking.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button onClick={handleSubmitBooking} disabled={!clientName || !clientEmail || !clientPhone}>
                      Request Booking
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
