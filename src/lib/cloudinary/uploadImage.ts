import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

const isCloudinaryConfigured = (): boolean =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
      process.env.CLOUDINARY_API_KEY?.trim() &&
      process.env.CLOUDINARY_API_SECRET?.trim(),
  )

const configureCloudinary = (): void => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  })
}

async function uploadToLocal(file: Buffer, filename: string): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'products')
  await mkdir(uploadsDir, { recursive: true })
  const safeName = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`
  await writeFile(path.join(uploadsDir, safeName), file)
  return `/uploads/products/${safeName}`
}

async function uploadToCloudinary(file: Buffer): Promise<string> {
  configureCloudinary()

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: process.env.CLOUDINARY_FOLDER?.trim() || 'satechitech/products',
        resource_type: 'image',
      },
      (error, result) => {
        if (error || !result?.secure_url) {
          reject(error ?? new Error('Cloudinary upload failed'))
          return
        }
        resolve(result.secure_url)
      },
    )
    stream.end(file)
  })
}

export async function uploadProductImage(file: Buffer, filename: string): Promise<string> {
  if (isCloudinaryConfigured()) {
    return uploadToCloudinary(file)
  }
  return uploadToLocal(file, filename)
}

export const imageStorageMode = (): 'cloudinary' | 'local' =>
  isCloudinaryConfigured() ? 'cloudinary' : 'local'
