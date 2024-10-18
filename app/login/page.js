"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  // Handle credentials-based login
  const handleCredentialsLogin = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data?.user) {
        router.push(`/my-blogs/${data.user._id}`);
      } else {
        setError("User does not exist or invalid credentials");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("An error occurred during login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Login to MyBlog</h1>

      {/* Email and Password Inputs */}
      <input
        type="email"
        placeholder="Email"
        className="mb-4 px-4 py-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 px-4 py-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Display Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Button for Credentials Login */}
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded-md"
        onClick={handleCredentialsLogin}
      >
        Proceed
      </button>
    </div>
  );
}
