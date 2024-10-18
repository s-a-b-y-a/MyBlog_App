import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Ensure you set this in your environment variables
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to prevent multiple connections
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db();
  console.log("database connected successfully")
  return { client, db };
}
