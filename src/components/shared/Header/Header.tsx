"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { MessageSquare, Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { UserProfile } from "@/components/shared/UserProfile/UserProfile"
import { cn } from "@/lib/utils"

function Header() {
  const { isAuthenticated } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300",
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-2" : "bg-background/50 backdrop-blur-sm py-3",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 transition-all duration-200 hover:opacity-80">
              <div className="bg-gradient-to-br from-primary/80 to-primary p-2 rounded-lg shadow-sm">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                COPD Sense
              </span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              <div className="flex items-center space-x-1 mr-6">
                <NavLink href="#">Features</NavLink>
                <NavLink href="#">Solutions</NavLink>
                <NavLink href="#pricing">Pricing</NavLink>
                <NavLink href="#">Resources</NavLink>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                {isAuthenticated ? (
                  <UserProfile />
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link to="/sign-in">
                      <button className="inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full text-sm h-10 px-5 font-medium">
                        Sign In
                      </button>
                    </Link>
                    <Link to="/sign-up">
                      <button className="inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 rounded-full text-sm h-10 px-5 font-medium relative overflow-hidden group">
                        <span className="relative z-10">Sign Up Free</span>
                        <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3 md:hidden">
              <ThemeToggle />
              <MobileMenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            </div>
          </nav>
        </div>
        <MobileMenu isOpen={isMobileMenuOpen} />
      </header>
      <div className="h-10 md:h-14" aria-hidden="true"></div>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      to={href}
      className="relative px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
    >
      {children}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-primary/80 to-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
    </Link>
  )
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // Check localStorage first
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme") as "light" | "dark"
    }

    // Then check system preference
    if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark"
    }

    // Default to light
    return "light"
  })

  // Update the document whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement

    if (theme === "dark") {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [theme])

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = () => {
      if (!localStorage.getItem("theme")) {
        setTheme(mediaQuery.matches ? "dark" : "light")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground w-10 h-10 relative"
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-[18px] w-[18px] transition-all ${theme === "dark" ? "scale-0 opacity-0" : "scale-100 opacity-100"} absolute`}
      />
      <Moon
        className={`h-[18px] w-[18px] transition-all ${theme === "dark" ? "scale-100 opacity-100" : "scale-0 opacity-0"} absolute`}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

function MobileMenuButton({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
      aria-label="Toggle menu"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  )
}

function MobileMenu({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={cn(
        "fixed inset-x-0 top-[57px] bg-background/95 backdrop-blur-md border-b md:hidden transition-all duration-300 ease-in-out overflow-hidden",
        isOpen ? "max-h-[500px] opacity-100 shadow-md" : "max-h-0 opacity-0",
      )}
    >
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <Link
            to="#"
            className="px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            Features
          </Link>
          <Link
            to="#"
            className="px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            Solutions
          </Link>
          <Link
            to="#pricing"
            className="px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            Pricing
          </Link>
          <Link
            to="#"
            className="px-4 py-3 text-base font-medium text-foreground/70 hover:text-foreground hover:bg-muted rounded-lg transition-colors"
          >
            Resources
          </Link>
        </div>
        <div className="pt-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/sign-in">
              <button className="inline-flex items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-11 px-4 py-2 w-full justify-center">
                Sign In
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="inline-flex items-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-11 px-4 py-2 w-full justify-center">
                Sign Up Free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header