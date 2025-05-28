"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { Camera, Calendar, Clock, MapPin, MessageCircle, Settings, Bell, Star, Search } from "lucide-react"

// Mock data
const clientData = {
  name: "Sarah Johnson",
  email: "client@test.com",
  profileImage: "https://images.unsplash.com/photo-1494790108755-2616c9c0e8e5?w=400&h=400&fit=crop&crop=faces",
  totalBookings: 8,
  activeRequests: 2,
  completedEvents: 6,
}

const sentRequests = [
  {
    id: 1,
    photographerName: "John Smith",
    photographerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    eventType: "Wedding",
    date: "2024-02-15",
    time: "14:00",
    location: "Central Park, NY",
    status: "pending",
    rating: 4.8,
    lastMessage: "Thank you for your interest! I'd love to discuss...",
    messageTime: "2 hours ago",
  },
  {
    id: 2,
    photographerName: "Emily Davis",
    photographerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
    eventType: "Portrait Session",
    date: "2024-02-20",
    time: "10:00",
    location: "Brooklyn Studio",
    status: "accepted",
    rating: 4.9,
    lastMessage: "Looking forward to our session!",
    messageTime: "1 day ago",
  },
  {
    id: 3,
    photographerName: "Mike Chen",
    photographerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    eventType: "Corporate Event",
    date: "2024-01-25",
    time: "18:00",
    location: "Manhattan Conference Center",
    status: "completed",
    rating: 4.7,
    lastMessage: "Photos have been uploaded to your gallery!",
    messageTime: "3 days ago",
  },
]

export default function ClientDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleMessagePhotographer = (photographerId: number) => {
    router.push(`/messages/${photographerId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <AvatarImage src={clientData.profileImage || "/placeholder.svg"} alt={clientData.name} />
              <AvatarFallback>
                <Camera className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{clientData.name}</h1>
              <p className="text-gray-600 mb-2">{clientData.email}</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{clientData.totalBookings} total bookings</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gray-400" />
                  <span>{clientData.completedEvents} completed events</span>
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
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Requests</p>
                  <p className="text-2xl font-bold">{clientData.activeRequests}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completed Events</p>
                  <p className="text-2xl font-bold">{clientData.completedEvents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{clientData.totalBookings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">My Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {sentRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="border-b last:border-b-0 pb-4 last:pb-0 mb-4 last:mb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage
                            src={request.photographerImage || "/placeholder.svg"}
                            alt={request.photographerName}
                          />
                          <AvatarFallback>
                            <Camera className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm">{request.eventType}</h4>
                          <p className="text-xs text-gray-600">with {request.photographerName}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{request.messageTime}</p>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("requests")}>
                    View All Requests
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" onClick={() => router.push("/")}>
                    <Search className="w-4 h-4 mr-2" />
                    Find New Photographers
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("requests")}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View Messages
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Photographer Requests</CardTitle>
                <p className="text-gray-600">View and manage your booking requests</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sentRequests.map((request) => (
                    <div key={request.id} className="border rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage
                            src={request.photographerImage || "/placeholder.svg"}
                            alt={request.photographerName}
                          />
                          <AvatarFallback>
                            <Camera className="w-6 h-6" />
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-semibold">{request.photographerName}</h3>
                              <div className="flex items-center gap-1 mb-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{request.rating}</span>
                              </div>
                            </div>
                            <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                          </div>

                          <div className="mb-3">
                            <h4 className="font-medium mb-1">{request.eventType}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {request.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {request.time}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {request.location}
                              </div>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-sm text-gray-700 mb-1">
                              <strong>Last message:</strong> {request.lastMessage}
                            </p>
                            <p className="text-xs text-gray-500">{request.messageTime}</p>
                          </div>

                          <Button onClick={() => handleMessagePhotographer(request.id)} className="w-full">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message {request.photographerName}
                          </Button>
                        </div>
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
