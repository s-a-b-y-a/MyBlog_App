"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { userId } = await response.json();
        router.push(`/my-blogs/${userId}`);
      } else {
        console.error("Signup failed");
        setError("Signup failed");
      }
    } catch (error) {
      console.error("An error occurred during signup", error);
      setError("An error occurred during signup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Signup for MyBlog</h1>
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
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={handleSignup}
      >
        Sign Up
      </button>
    </div>
  );
}
