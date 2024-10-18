import { hash } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Connect to the database
    const { db } = await connectToDatabase();

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 409 }); // 409 Conflict
    }

    // Hash the password
    const hashedPassword = await hash(password, 12);

    // Insert new user
    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword,
    });

    return new Response(JSON.stringify({ userId: result.insertedId }), {
      status: 201,
    });
  } catch (error) {
    console.error("Signup error:", error); // Log the error message
    return new Response("Signup failed", { status: 500 });
  }
}
