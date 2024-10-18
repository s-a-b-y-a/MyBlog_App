import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    // Validate that userId is present
    if (!userId) {
      return new Response(JSON.stringify({ message: 'User ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { db } = await connectToDatabase();
    
    // Fetch blogs that belong to this user
    const blogs = await db.collection('blogs').find({ userId }).toArray();

    // Check if blogs are found
    if (blogs.length === 0) {
      return new Response(JSON.stringify({ message: 'No blogs found for this user', blogs: [] }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ blogs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response(JSON.stringify({ message: 'Failed to fetch blogs', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle the POST request
export async function POST(req) {
  try {
    const { content, userId } = await req.json(); 

    if (!content || !userId) {
      return new Response(JSON.stringify({ message: 'Content and User ID are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { db } = await connectToDatabase();
    
    // Insert new blog into the database
    const result = await db.collection('blogs').insertOne({
      content,
      userId,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ message: 'Blog created', blogId: result.insertedId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new Response(JSON.stringify({ message: 'Failed to create blog', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
