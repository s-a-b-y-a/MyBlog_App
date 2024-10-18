"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function MyBlogs({ params }) {
  const { userId } = params;
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [newBlog, setNewBlog] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/blogs`, {
          params: { userId }
        });
        const data = response.data;

        // Check if data is valid
        if (data && data.blogs) {
          setBlogs(data.blogs);
        } else {
          setBlogs([]); // Handle empty blogs data
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
        setError('Failed to load blogs');
      }
    };
    fetchBlogs();
  }, [userId]);

  const handleCreateBlog = async () => {
    try {
      const response = await axios.post('/api/blogs', { content: newBlog, userId });

      // Create a new blog object to update local state
      const newBlogData = {
        _id: response.data.blogId, // Use the inserted ID from the response
        content: newBlog,
        userId,
        createdAt: new Date() // Assuming you want to keep track of the creation date
      };

      // Update the blogs state to include the newly created blog
      setBlogs((prevBlogs) => [...prevBlogs, newBlogData]);

      setNewBlog(""); // Clear the input after posting
    } catch (error) {
      console.error('Failed to create blog', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">My Blogs</h1>
      <div className="mb-4">
        <textarea
          value={newBlog}
          onChange={(e) => setNewBlog(e.target.value)}
          placeholder="Write a new blog"
          className="px-4 py-2 border"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
          onClick={handleCreateBlog}
        >
          Post Blog
        </button>
      </div>
      {blogs.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog._id}>{blog.content}</li>
          ))}
        </ul>
      ) : (
        <p>No blogs yet. Start writing!</p>
      )}
    </div>
  );
}
