"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="flex items-center justify-between w-full">
      <Link href="/" className="flex items-center space-x-2">
        <motion.span
          className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          HireNow.pk
        </motion.span>
      </Link>

      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:flex items-center space-x-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Link href="/features" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Features
        </Link>
        <Link href="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Pricing
        </Link>
        <Link href="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
          Contact
        </Link>
      </motion.nav>

      {/* Desktop Auth Buttons */}
      <motion.div
        className="hidden md:flex items-center space-x-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {user ? (
          <Link href={user?.role === "employee" ? "/employee/dashboard" : "/employer/dashboard"}>
            <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-800">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                Register
              </Button>
            </Link>
          </>
        )}
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="absolute top-16 left-0 right-0 bg-slate-950 border-b border-slate-800 p-4 md:hidden z-50"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col space-y-4">
              <Link
                href="/features"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <div className="pt-2 border-t border-slate-800 flex flex-col space-y-2">
                {user ? (
                  <Link
                    href={user?.role === "employee" ? "/employee/dashboard" : "/employer/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
