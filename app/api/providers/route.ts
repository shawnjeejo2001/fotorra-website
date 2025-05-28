import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"

// In-memory storage for demo purposes
// In production, you'd use a database like PostgreSQL, MongoDB, etc.
const providers: any[] = []

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const providerData = {
      id: Date.now().toString(), // Simple ID generation
      userType: formData.get("userType") as string,
      service: formData.get("service") as string,
      name: formData.get("name") as string,
      dob: formData.get("dob") as string,
      mainStyle: formData.get("mainStyle") as string,
      additionalStyle1: formData.get("additionalStyle1") as string,
      additionalStyle2: formData.get("additionalStyle2") as string,
      location: formData.get("location") as string,
      portfolioFiles: [] as string[],
      profileImage: "", // Will store the main profile/portfolio image
      registrationDate: new Date().toISOString(),
      status: "pending", // pending, approved, rejected
    }

    // Handle file uploads
    const uploadDir = join(process.cwd(), "public", "uploads", providerData.id)

    // Create upload directory if it doesn't exist
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Process uploaded files
    const portfolioFiles: string[] = []
    let profileImagePath = ""

    for (const [key, value] of formData.entries()) {
      if (key.startsWith("portfolio_") && value instanceof File) {
        const file = value as File
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Generate unique filename
        const filename = `${Date.now()}_${file.name}`
        const filepath = join(uploadDir, filename)

        // Save file
        await writeFile(filepath, buffer)

        // Store relative path for database
        const relativePath = `/uploads/${providerData.id}/${filename}`
        portfolioFiles.push(relativePath)

        // Use the first uploaded image as the profile image for hover preview
        if (!profileImagePath) {
          profileImagePath = relativePath
        }
      }
    }

    providerData.portfolioFiles = portfolioFiles
    providerData.profileImage = profileImagePath

    // Save to in-memory storage (replace with database in production)
    providers.push(providerData)

    console.log("New provider registered:", {
      id: providerData.id,
      name: providerData.name,
      service: providerData.service,
      mainStyle: providerData.mainStyle,
      location: providerData.location,
      filesUploaded: portfolioFiles.length,
      profileImage: profileImagePath,
    })

    return NextResponse.json({
      success: true,
      message: "Provider registered successfully",
      providerId: providerData.id,
      profileImage: profileImagePath,
    })
  } catch (error) {
    console.error("Error processing provider registration:", error)
    return NextResponse.json({ success: false, message: "Failed to register provider" }, { status: 500 })
  }
}

export async function GET() {
  // Return all providers (for admin purposes)
  return NextResponse.json({ providers })
}
