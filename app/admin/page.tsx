"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, Camera, MapPin, Calendar, AlertTriangle, CheckCircle } from "lucide-react"

interface Provider {
  id: string
  name: string
  service: string
  mainStyle: string
  additionalStyle1: string
  additionalStyle2: string
  location: string
  dob: string
  portfolioFiles: string[]
  registrationDate: string
  status: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Simple admin password (in real app, this would be much more secure!)
  const ADMIN_PASSWORD = "admin123"

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError("")
      fetchProviders()
    } else {
      setError("Incorrect password. Try: admin123")
    }
  }

  const fetchProviders = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/providers")
      const data = await response.json()
      setProviders(data.providers || [])
    } catch (err) {
      setError("Failed to load provider data")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Admin Access</CardTitle>
            <p className="text-gray-600">Enter password to view applications</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
              <p className="text-xs text-gray-500 mt-1">Hint: admin123</p>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handleLogin} className="w-full bg-blue-600 hover:bg-blue-700">
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Fotorra Admin</h1>
                <p className="text-sm text-gray-600">Provider Applications Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={fetchProviders} variant="outline" size="sm" disabled={loading}>
                {loading ? "Refreshing..." : "Refresh"}
              </Button>
              <Button onClick={() => setIsAuthenticated(false)} variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold">{providers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Photographers</p>
                  <p className="text-2xl font-bold">{providers.filter((p) => p.service === "photographer").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Videographers</p>
                  <p className="text-2xl font-bold">{providers.filter((p) => p.service === "videographer").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Provider Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            {providers.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600">Provider applications will appear here when people sign up.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Main Style</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Portfolio</TableHead>
                      <TableHead>Registered</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {providers.map((provider) => (
                      <TableRow key={provider.id}>
                        <TableCell className="font-medium">
                          <div>
                            <p className="font-semibold">{provider.name}</p>
                            <p className="text-sm text-gray-500">ID: {provider.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{provider.service}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant="default" className="text-xs">
                              {provider.mainStyle}
                            </Badge>
                            {provider.additionalStyle1 && provider.additionalStyle1 !== "none" && (
                              <Badge variant="secondary" className="text-xs block w-fit">
                                {provider.additionalStyle1}
                              </Badge>
                            )}
                            {provider.additionalStyle2 && provider.additionalStyle2 !== "none" && (
                              <Badge variant="secondary" className="text-xs block w-fit">
                                {provider.additionalStyle2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            {provider.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {provider.portfolioFiles.length > 0 ? (
                              <span className="text-green-600 font-medium">{provider.portfolioFiles.length} files</span>
                            ) : (
                              <span className="text-gray-400">No files</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-3 h-3" />
                            {formatDate(provider.registrationDate)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(provider.status)}>{provider.status}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Alert className="mt-6 border-blue-200 bg-blue-50">
          <CheckCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>How to use this page:</strong>
            <ul className="mt-2 space-y-1 text-sm">
              <li>• This page shows everyone who signed up as a photographer or videographer</li>
              <li>• You can see their name, what service they offer, and when they registered</li>
              <li>• Click "Refresh" to see new applications</li>
              <li>• All data is temporary and will be lost when the server restarts</li>
            </ul>
          </AlertDescription>
        </Alert>
      </main>
    </div>
  )
}
