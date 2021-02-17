import { MongoClient } from 'mongodb'

// type Variables = { MONGODB_URI: string; MONGODB_DB: string }

// const { MONGODB_URI, MONGODB_DB }: Variables = process.env

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!process.env.MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const globalAny: any = global
let cached = globalAny.mongo

if (!cached) {
  cached = globalAny.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(
      process.env.MONGODB_URI as string,
      opts
    ).then((client) => {
      return {
        client,
        db: client.db(process.env.MONGODB_DB),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}
