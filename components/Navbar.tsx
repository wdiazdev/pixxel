"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { useStoreUser } from "@/hook/useStoreUser"
import { BarLoader } from "react-spinners"
import { Authenticated, Unauthenticated } from "convex/react"
import { cn } from "@/lib/utils"

export default function Header() {
  const path = usePathname()
  const { isLoading, isAuthenticated } = useStoreUser()

  if (path.includes("/editor")) {
    return null
  }

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div
        className="h-18 backdrop-blur-md bg-white/10 border border-white/20 
        rounded-full px-8 py-3 flex items-center justify-between gap-8"
      >
        <Link href="/" className="mr-10 md:mr-20">
          <Image
            src="/logo-text.png"
            alt="Pixxel Logo"
            className="min-w-24 object-cover"
            width={96}
            height={24}
            priority
          />
        </Link>

        {path === "/" && (
          <div className="hidden md:flex space-x-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white font-medium transition-all duration-300 hover:text-cyan-400 cursor-pointer"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
        <div className="flex items-center justify-center gap-3 ml-10 md:ml-20 w-[200px]">
          {isLoading ? (
            <div className="w-full">
              <BarLoader width="100%" color="#06b6d4" />
            </div>
          ) : (
            <>
              <Unauthenticated>
                <SignInButton>
                  <Button variant="glass" className="hidden sm:flex">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button variant="primary">Get Started</Button>
                </SignUpButton>
              </Unauthenticated>
              <Authenticated>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-20 h-20",
                    },
                  }}
                />
              </Authenticated>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
