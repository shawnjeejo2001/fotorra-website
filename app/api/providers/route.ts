import { type NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { existsSync } from "fs"
import { query } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    // Extract form fields
    const userData = {
      email: (formData.get("email") as string) || `temp_${Date.now()}@example.com`, // You'll need to add email field to form
      name: formData.get("name") as string,
      userType: formData.get("userType") as string,
    }

    const providerData = {
      service: formData.get("service") as string,
      mainStyle: formData.get("mainStyle") as string,
      additionalStyles: {
        style1: formData.get("additionalStyle1") as string,
        style2: formData.get("additionalStyle2") as string,
      },
      location: formData.get("location") as string,
      aboutText: formData.get("aboutText") as string,
    }

    // Start a transaction
    await query("BEGIN")

    try {
      // 1. Insert user first
      const userResult = await query(
        `INSERT INTO users (email, name, user_type) 
         VALUES ($1, $2, $3) 
         RETURNING id`,
        [userData.email, userData.name, userData.userType],
      )

      const userId = userResult.rows[0].id

      // 2. Insert provider
      const providerResult = await query(
        `INSERT INTO providers (user_id, service, main_style, additional_styles, location, about_text, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING id`,
        [
          userId,
          providerData.service,
          providerData.mainStyle,
          JSON.stringify(providerData.additionalStyles),
          providerData.location,
          providerData.aboutText,
          "pending",
        ],
      )

      const providerId = providerResult.rows[0].id

      // 3. Handle file uploads
      const uploadDir = join(process.cwd(), "public", "uploads", providerId)

      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      // Process uploaded files
      const portfolioFiles: string[] = []

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

          // Store relative path
          const relativePath = `/uploads/${providerId}/${filename}`
          portfolioFiles.push(relativePath)

          // 4. Insert portfolio image record
          await query(
            `INSERT INTO portfolio_images (provider_id, image_url, original_filename) 
             VALUES ($1, $2, $3)`,
            [providerId, relativePath, file.name],
          )
        }
      }

      // Commit transaction
      await query("COMMIT")

      console.log("New provider registered:", {
        userId,
        providerId,
        name: userData.name,
        service: providerData.service,
        filesUploaded: portfolioFiles.length,
      })

      return NextResponse.json({
        success: true,
        message: "Provider registered successfully",
        providerId: providerId,
        userId: userId,
      })
    } catch (error) {
      // Rollback transaction on error
      await query("ROLLBACK")
      throw error
    }
  } catch (error) {
    console.error("Error processing provider registration:", error)
    return NextResponse.json({ success: false, message: "Failed to register provider" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Get all providers with user info
    const result = await query(`
      SELECT 
        p.*,
        u.name,
        u.email,
        u.profile_image_url,
        COALESCE(
          json_agg(
            json_build_object(
              'id', pi.id,
              'image_url', pi.image_url,
              'original_filename', pi.original_filename
            )
          ) FILTER (WHERE pi.id IS NOT NULL), 
          '[]'
        ) as portfolio_images
      FROM providers p
      JOIN users u ON p.user_id = u.id
      LEFT JOIN portfolio_images pi ON p.id = pi.provider_id
      GROUP BY p.id, u.id
      ORDER BY p.created_at DESC
    `)

    return NextResponse.json({ providers: result.rows })
  } catch (error) {
    console.error("Error fetching providers:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch providers" }, { status: 500 })
  }
}

