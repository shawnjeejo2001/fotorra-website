"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import {
  Camera,
  Calendar,
  Clock,
  MapPin,
  Upload,
  MessageCircle,
  CheckCircle,
  XCircle,
  Settings,
  Bell,
  Star,
  Users,
} from "lucide-react"

// Mock data
const photographerData = {
  name: "John Smith",
  email: "photographer@test.com",
  profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
  rating: 4.8,
  totalBookings: 45,
  activeEvents: 3,
  pendingRequests: 2,
}

const pendingRequests = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    eventType: "Wedding",
    date: "2024-02-15",
    time: "14:00",
    location: "Central Park, NY",
    budget: "$1,500",
    description: "Looking for a wedding photographer for our outdoor ceremony...",
    requestDate: "2024-01-20",
  },
  {
    id: 2,
    clientName: "Mike Chen",
    eventType: "Corporate Event",
    date: "2024-02-20",
    time: "18:00",
    location: "Manhattan Conference Center",
    budget: "$800",
    description: "Need photos for our company annual dinner...",
    requestDate: "2024-01-22",
  },
]

const activeEvents = [
  {
    id: 1,
    clientName: "Emily Davis",
    eventType: "Portrait Session",
    date: "2024-02-10",
    time: "10:00",
    location: "Brooklyn Studio",
    status: "upcoming",
    daysUntil: 5,
    photosUploaded: 0,
    totalPhotos: 0,
  },
  {
    id: 2,
    clientName: "Robert Wilson",
    eventType: "Birthday Party",
    date: "2024-01-25",
    time: "15:00",
    location: "Private Residence",
    status: "completed",
    daysUntil: 0,
    photosUploaded: 45,
    totalPhotos: 45,
  },
  {
    id: 3,
    clientName: "Lisa Brown",
    eventType: "Engagement",
    date: "2024-02-08",
    time: "16:00",
    location: "Times Square",
    status: "in-progress",
    daysUntil: 3,
    photosUploaded: 12,
    totalPhotos: 30,
  },
]

export default function PhotographerDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleAcceptRequest = (requestId: number) => {
    console.log("Accepting request:", requestId)
    // In real app, make API call to accept request
  }

  const handleRejectRequest = (requestId: number) => {
    console.log("Rejecting request:", requestId)
    // In real app, make API call to reject request
  }

  const handleUploadPhotos = (eventId: number) => {
    console.log("Upload photos for event:", eventId)
    // In real app, open photo upload modal
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Fotorra
            </button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={photographerData.profileImage || "/placeholder.svg"} alt={photographerData.name} />
              <AvatarFallback>
                <Camera className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{photographerData.name}</h1>
              <p className="text-gray-600 mb-2">{photographerData.email}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{photographerData.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span>{photographerData.totalBookings} bookings</span>
                </div>
              </div>
            </div>
            <Button>
              <Camera className="w-4 h-4 mr-2" />
              Change Photo
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Events</p>
                  <p className="text-2xl font-bold">{photographerData.activeEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending Requests</p>
                  <p className="text-2xl font-bold">{photographerData.pendingRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rating</p>
                  <p className="text-2xl font-bold">{photographerData.rating}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">Event Requests</TabsTrigger>
            <TabsTrigger value="active">Active Events</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Requests */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  {pendingRequests.slice(0, 2).map((request) => (
                    <div key={request.id} className="border-b last:border-b-0 pb-4 last:pb-0 mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{request.eventType}</h4>
                        <Badge variant="outline">{request.budget}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">by {request.clientName}</p>
                      <p className="text-sm text-gray-500">
                        {request.date} at {request.time}
                      </p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("requests")}>
                    View All Requests
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {activeEvents
                    .filter((event) => event.status === "upcoming")
                    .slice(0, 2)
                    .map((event) => (
                      <div key={event.id} className="border-b last:border-b-0 pb-4 last:pb-0 mb-4 last:mb-0">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{event.eventType}</h4>
                          <Badge>{event.daysUntil} days</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">with {event.clientName}</p>
                        <p className="text-sm text-gray-500">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    ))}
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("active")}>
                    View All Events
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Requests</CardTitle>
                <p className="text-gray-600">Review and respond to booking requests</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{request.eventType}</h3>
                          <p className="text-gray-600">Requested by {request.clientName}</p>
                        </div>
                        <Badge variant="outline" className="text-lg px-3 py-1">
                          {request.budget}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{request.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{request.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{request.location}</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{request.description}</p>

                      <div className="flex gap-3">
                        <Button onClick={() => handleAcceptRequest(request.id)} className="flex-1">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Accept
                        </Button>
                        <Button variant="outline" onClick={() => handleRejectRequest(request.id)} className="flex-1">
                          <XCircle className="w-4 h-4 mr-2" />
                          Decline
                        </Button>
                        <Button variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Events</CardTitle>
                <p className="text-gray-600">Manage your confirmed bookings and upload photos</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activeEvents.map((event) => (
                    <div key={event.id} className="border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">{event.eventType}</h3>
                          <p className="text-gray-600">with {event.clientName}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              event.status === "completed"
                                ? "default"
                                : event.status === "upcoming"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {event.status === "upcoming" && `${event.daysUntil} days until event`}
                            {event.status === "completed" && "Completed"}
                            {event.status === "in-progress" && `${event.daysUntil} days until event`}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>

                      {event.status !== "upcoming" && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Photos Uploaded</span>
                            <span className="text-sm text-gray-600">
                              {event.photosUploaded}/{event.totalPhotos || "TBD"}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: event.totalPhotos
                                  ? `${(event.photosUploaded / event.totalPhotos) * 100}%`
                                  : "0%",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        {event.status !== "upcoming" && (
                          <Button onClick={() => handleUploadPhotos(event.id)}>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Photos
                          </Button>
                        )}
                        <Button variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message Client
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
