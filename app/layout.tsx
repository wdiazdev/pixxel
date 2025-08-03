import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import { FloatingShapes } from "@/components/FloatingShapes"
import Navbar from "@/components/Navbar"
import { ConvexClientProvider } from "@/app/ConvexClientProvider"
import { ClerkProvider } from "@clerk/nextjs"
import { shadesOfPurple } from "@clerk/themes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pixxel",
  description: "Generated AI images with Pixxel",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <main className="bg-slate-900 min-h-screen overflow-x-hidden text-white">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider
              appearance={{
                baseTheme: shadesOfPurple,
              }}
            >
              <ConvexClientProvider>
                <FloatingShapes />
                <Navbar />
                <Toaster richColors />
                {children}
              </ConvexClientProvider>
            </ClerkProvider>
          </ThemeProvider>
        </main>
      </body>
    </html>
  )
}
