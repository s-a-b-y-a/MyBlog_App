// components/Navbar.js
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./theme-btn";
import LoadingBar from "react-top-loading-bar";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [progress, setprogress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    setprogress(30);

    setTimeout(() => {
      setprogress(70);
    }, 100);

    setTimeout(() => {
      setprogress(100);
    }, 800);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => {
      setprogress(0);
    }, 900);
  }, []);

  return (
    <nav className="p-4 bg-background/50 sticky top-0 backdrop-blur border-b z-10">
      <LoadingBar
        color="#a855f7"
        progress={progress}
        onLoaderFinished={() => setprogress(0)}
      />
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:font-normal transition duration-300"
        >
          MyBlog
        </Link>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/" className="hover:font-bold transition duration-300">
            Home
          </Link>
          <Link
            href="/about"
            className="hover:font-bold transition duration-300"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:font-bold transition duration-300"
          >
            Blogs
          </Link>
          <Link
            href="/contact"
            className="hover:font-bold transition duration-300"
          >
            Contact
          </Link>
          <ModeToggle />
          <div className="mx-2 gap-2 flex items-center">
            <Link href="/login" passHref>
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button variant="outline">Signup</Button>
            </Link>
          </div>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger>
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </SheetTrigger>
            <SheetContent>
              <span className="mx-2">
                <ModeToggle />
              </span>
              <SheetHeader>
                <SheetTitle className="font-bold mx-auto text-2xl my-4">
                  Blog
                </SheetTitle>
              </SheetHeader>
              <Link href="/" className="block hover:text-gray-400">
                Home
              </Link>
              <Link href="/about" className="block hover:text-gray-400">
                About
              </Link>
              <Link href="/blog" className="block hover:text-gray-400">
                Blog
              </Link>
              <Link href="/contact" className="block hover:text-gray-400">
                Contact
              </Link>
              <div className="mt-4 flex gap-2">
                <Link href="/login" passHref>
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="outline">Signup</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
