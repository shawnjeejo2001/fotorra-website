"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, X, AlertTriangle, Crop, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import LocationInput from "@/components/location-input"
import Cropper from "react-easy-crop"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const photographyStyles = [
  { value: "wedding", label: "Wedding", emoji: "💒" },
  { value: "portrait", label: "Portrait", emoji: "👤" },
  { value: "event", label: "Event", emoji: "🎉" },
  { value: "real-estate", label: "Real Estate", emoji: "🏠" },
  { value: "food", label: "Food", emoji: "🍽️" },
  { value: "product", label: "Product", emoji: "📦" },
  { value: "sports", label: "Sports", emoji: "⚽" },
  { value: "street", label: "Street", emoji: "🏙️" },
  { value: "nature", label: "Nature", emoji: "🌿" },
  { value: "pet", label: "Pet", emoji: "🐕" },
]

const videographyStyles = [
  { value: "wedding", label: "Wedding", emoji: "💒" },
  { value: "event", label: "Event", emoji: "🎉" },
  { value: "corporate", label: "Corporate", emoji: "💼" },
  { value: "music", label: "Music Video", emoji: "🎵" },
  { value: "real-estate", label: "Real Estate", emoji: "🏠" },
  { value: "documentary", label: "Documentary", emoji: "📹" },
  { value: "sports", label: "Sports", emoji: "⚽" },
  { value: "social", label: "Social Media", emoji: "📱" },
]

interface CropArea {
  x: number
  y: number
  width: number
  height: number
}

interface PortfolioImage {
  id: string
  file: File
  preview: string
  croppedImage?: string
}

export default function JoinProviderPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Form data
  const [userType, setUserType] = useState("client")
  const [service, setService] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("") // Added email field
  const [dob, setDob] = useState("")
  const [mainStyle, setMainStyle] = useState("")
  const [additionalStyle1, setAdditionalStyle1] = useState("")
  const [additionalStyle2, setAdditionalStyle2] = useState("")
  const [location, setLocation] = useState("")
  const [aboutText, setAboutText] = useState("")
  const [portfolioImages, setPortfolioImages] = useState<PortfolioImage[]>([])

  // Cropping state
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  const [currentImageForCrop, setCurrentImageForCrop] = useState<PortfolioImage | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CropArea | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: CropArea) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image()
      image.addEventListener("load", () => resolve(image))
      image.addEventListener("error", (error) => reject(error))
      image.setAttribute("crossOrigin", "anonymous")
      image.src = url
    })

  const getCroppedImg = async (imageSrc: string, pixelCrop: CropArea): Promise<string> => {
    const image = await createImage(imageSrc)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("No 2d context")
    }

    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    )

    return new Promise((resolve) => {
      canvas.toBlob((file) => {
        if (file) {
          resolve(URL.createObjectURL(file))
        }
      }, "image/jpeg")
    })
  }

  const handleCropSave = async () => {
    if (currentImageForCrop && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(currentImageForCrop.preview, croppedAreaPixels)

        setPortfolioImages((prev) =>
          prev.map((img) => (img.id === currentImageForCrop.id ? { ...img, croppedImage } : img)),
        )

        setCropDialogOpen(false)
        setCurrentImageForCrop(null)
        setCrop({ x: 0, y: 0 })
        setZoom(1)
      } catch (error) {
        console.error("Error cropping image:", error)
      }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (portfolioImages.length < 6) {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9)
        const preview = URL.createObjectURL(file)

        const newImage: PortfolioImage = {
          id,
          file,
          preview,
        }

        setPortfolioImages((prev) => [...prev, newImage])
        setCurrentImageForCrop(newImage)
        setCropDialogOpen(true)
      }
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeImage = (id: string) => {
    setPortfolioImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()

      // Add text fields
      formData.append("userType", "provider") // Force provider type
      formData.append("service", service)
      formData.append("name", name)
      formData.append("email", email) // Add email
      formData.append("dob", dob)
      formData.append("mainStyle", mainStyle)
      formData.append("additionalStyle1", additionalStyle1 === "none" ? "" : additionalStyle1 || "")
      formData.append("additionalStyle2", additionalStyle2 === "none" ? "" : additionalStyle2 || "")
      formData.append("location", location)
      formData.append("aboutText", aboutText)

      // Add portfolio images
      portfolioImages.forEach((img, index) => {
        formData.append(`portfolio_${index}`, img.file)
      })

      const response = await fetch("/api/providers", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setSubmitSuccess(true)
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } else {
        throw new Error(result.message || "Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
      alert("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAvailableStyles = () => {
    const styles = service === "photographer" ? photographyStyles : videographyStyles
    return styles.filter(
      (style) =>
        style.value !== mainStyle &&
        style.value !== additionalStyle1 &&
        style.value !== additionalStyle2 &&
        additionalStyle1 !== "none" &&
        additionalStyle2 !== "none",
    )
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="text-center p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for joining Fotorra! We'll review your application and get back to you soon.
            </p>
            <p className="text-sm text-gray-500">Redirecting to home page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push("/")}
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              Fotorra
            </button>
            <div className="text-sm text-gray-600">Step {step} of 4</div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Step 1: User Type & Service */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Join as a Provider</CardTitle>
              <p className="text-gray-600">Tell us about yourself and what service you provide</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>I am a:</Label>
                <Select onValueChange={setUserType} value={userType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client looking for services</SelectItem>
                    <SelectItem value="provider">Service provider (Photographer/Videographer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {userType === "provider" && (
                <div>
                  <Label>Service Type</Label>
                  <Select onValueChange={setService} value={service}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="photographer">Photographer</SelectItem>
                      <SelectItem value="videographer">Videographer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={userType !== "provider" || !service}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Personal Information */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <p className="text-gray-600">Help us get to know you better</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              </div>

              <div>
                <Label>Location *</Label>
                <LocationInput value={location} onChange={setLocation} />
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!name || !email || !dob || !location}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Specialties */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Specialties</CardTitle>
              <p className="text-gray-600">Choose your main style and up to 2 additional styles</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Main Specialty * (Choose one)</Label>
                <Select onValueChange={setMainStyle} value={mainStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your main specialty" />
                  </SelectTrigger>
                  <SelectContent className="max-h-80 overflow-y-auto">
                    {(service === "photographer" ? photographyStyles : videographyStyles).map((style) => (
                      <SelectItem key={style.value} value={style.value}>
                        <div className="flex items-center gap-2">
                          <span>{style.emoji}</span>
                          <span>{style.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {mainStyle && (
                <div>
                  <Label>Additional Style 1 (Optional)</Label>
                  <Select onValueChange={setAdditionalStyle1} value={additionalStyle1}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select additional style" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 overflow-y-auto">
                      <SelectItem value="none">None</SelectItem>
                      {getAvailableStyles().map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div className="flex items-center gap-2">
                            <span>{style.emoji}</span>
                            <span>{style.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {mainStyle && additionalStyle1 && (
                <div>
                  <Label>Additional Style 2 (Optional)</Label>
                  <Select onValueChange={setAdditionalStyle2} value={additionalStyle2}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select additional style" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80 overflow-y-auto">
                      <SelectItem value="none">None</SelectItem>
                      {getAvailableStyles().map((style) => (
                        <SelectItem key={style.value} value={style.value}>
                          <div className="flex items-center gap-2">
                            <span>{style.emoji}</span>
                            <span>{style.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button onClick={() => setStep(4)} disabled={!mainStyle}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Portfolio & About */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Portfolio & About You</CardTitle>
              <p className="text-gray-600">Upload your best work and tell us about yourself</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo Upload Warning */}
              <Alert className="border-orange-200 bg-orange-50">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-orange-800">
                  <strong>Important:</strong> Only upload original photos taken by you. Using someone else's work will
                  result in account termination.
                </AlertDescription>
              </Alert>

              {/* Portfolio Upload */}
              <div>
                <Label>Portfolio Images (Up to 6 images) *</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload your best work to showcase your skills</p>
                  <Button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={portfolioImages.length >= 6}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {portfolioImages.length === 0 ? "Upload Images" : `Add More (${portfolioImages.length}/6)`}
                  </Button>
                </div>

                {/* Image Previews */}
                {portfolioImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {portfolioImages.map((img) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.croppedImage || img.preview}
                          alt="Portfolio"
                          className="w-full h-32 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="bg-white"
                              onClick={() => {
                                setCurrentImageForCrop(img)
                                setCropDialogOpen(true)
                              }}
                            >
                              <Crop className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => removeImage(img.id)}>
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        {!img.croppedImage && (
                          <Badge className="absolute top-2 left-2 bg-orange-500">Needs Cropping</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* About Text */}
              <div>
                <Label htmlFor="about">About You *</Label>
                <Textarea
                  id="about"
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  placeholder="Tell us about yourself and what brings you to Fotorra..."
                  rows={4}
                />
                <p className="text-sm text-gray-500 mt-1">{aboutText.length}/500 characters</p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={
                    portfolioImages.length === 0 ||
                    !aboutText ||
                    portfolioImages.some((img) => !img.croppedImage) ||
                    isSubmitting
                  }
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Crop Dialog */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crop Your Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentImageForCrop && (
              <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
                <Cropper
                  image={currentImageForCrop.preview}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
            )}
            <div className="flex gap-2">
              <Label className="text-sm">Zoom:</Label>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="flex-1"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setCropDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCropSave}>Save Crop</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
