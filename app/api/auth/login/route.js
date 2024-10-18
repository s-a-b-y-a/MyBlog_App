import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

// Named export for POST request
export async function POST(req, res) {
  const { email, password } = await req.json();

  try {
    // Connect to the database
    const { db } = await connectToDatabase();

    // Search for the user by email
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
    }

    // Return the user if found and password is valid
    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), { status: 500 });
  }
}
