"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Header() {
  const path = usePathname()

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div
        className="backdrop-blur-md bg-white/10 border border-white/20 
        rounded-full px-8 py-3 flex items-center justify-between gap-8"
      >
        <Link href="/" className="mr-10 md:mr-20">
          <Image
            src="/logo-text.png"
            alt="Pixxel Logo"
            className="min-w-24 object-cover"
            width={96}
            height={24}
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
        <div className="flex items-center gap-3 ml-10 md:ml-20">Auth</div>
      </div>
    </header>
  )
}
