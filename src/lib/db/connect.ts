import mongoose from 'mongoose'

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

const cache: MongooseCache = global.mongooseCache ?? { conn: null, promise: null }
global.mongooseCache = cache

export const isMongoConfigured = (): boolean => Boolean(process.env.MONGODB_URI?.trim())

export async function connectMongo(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) return null

  if (cache.conn) return cache.conn

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB_NAME?.trim() || undefined,
    })
  }

  cache.conn = await cache.promise
  return cache.conn
}
