import { connectMongo, isMongoConfigured } from '@/lib/db/connect'
import {
  fileCreateProduct,
  fileDeleteProduct,
  fileFindProductById,
  fileFindProductByProductName,
  fileListProducts,
  fileUpdateProduct,
} from '@/lib/db/fileStore'
import { ProductModel } from '@/lib/db/models/Product'
import type { AdminProduct, CreateProductInput, UpdateProductInput } from '@/types/admin-product'

const mapMongoProduct = (doc: {
  _id: { toString(): string }
  productName?: string
  productId?: string
  price: number
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}): AdminProduct => ({
  id: doc._id.toString(),
  productName: doc.productName ?? doc.productId ?? '',
  price: doc.price,
  imageUrl: doc.imageUrl,
  createdAt: doc.createdAt.toISOString(),
  updatedAt: doc.updatedAt.toISOString(),
})

export async function listProducts(): Promise<AdminProduct[]> {
  if (isMongoConfigured()) {
    await connectMongo()
    const docs = await ProductModel.find().sort({ createdAt: -1 }).lean()
    return docs.map(mapMongoProduct)
  }
  return fileListProducts()
}

export async function getProductById(id: string): Promise<AdminProduct | null> {
  if (isMongoConfigured()) {
    await connectMongo()
    const doc = await ProductModel.findById(id).lean()
    return doc ? mapMongoProduct(doc) : null
  }
  return fileFindProductById(id)
}

export async function getProductByProductName(productName: string): Promise<AdminProduct | null> {
  if (isMongoConfigured()) {
    await connectMongo()
    const trimmed = productName.trim()
    const doc = await ProductModel.findOne({
      $or: [{ productName: trimmed }, { productId: trimmed }],
    }).lean()
    return doc ? mapMongoProduct(doc) : null
  }
  return fileFindProductByProductName(productName)
}

export async function createProduct(input: CreateProductInput): Promise<AdminProduct> {
  const productName = input.productName.trim()
  const existing = await getProductByProductName(productName)
  if (existing) {
    throw new Error('A product with this name already exists.')
  }

  if (isMongoConfigured()) {
    await connectMongo()
    const doc = await ProductModel.create({
      productName,
      price: input.price,
      imageUrl: input.imageUrl,
    })
    return mapMongoProduct(doc)
  }

  return fileCreateProduct({ ...input, productName })
}

export async function updateProduct(id: string, input: UpdateProductInput): Promise<AdminProduct | null> {
  if (input.productName) {
    const duplicate = await getProductByProductName(input.productName)
    if (duplicate && duplicate.id !== id) {
      throw new Error('A product with this name already exists.')
    }
  }

  if (isMongoConfigured()) {
    await connectMongo()
    const doc = await ProductModel.findByIdAndUpdate(
      id,
      {
        ...(input.productName ? { productName: input.productName.trim() } : {}),
        ...(input.price !== undefined ? { price: input.price } : {}),
        ...(input.imageUrl ? { imageUrl: input.imageUrl } : {}),
      },
      { new: true },
    ).lean()
    return doc ? mapMongoProduct(doc) : null
  }

  return fileUpdateProduct(id, input)
}

export async function deleteProduct(id: string): Promise<boolean> {
  if (isMongoConfigured()) {
    await connectMongo()
    const result = await ProductModel.findByIdAndDelete(id)
    return Boolean(result)
  }
  return fileDeleteProduct(id)
}
