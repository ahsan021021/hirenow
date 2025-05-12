"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowLeft, Mail, Phone, MapPin, Send, Loader2, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, this would call an API to send the message
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitted(true)
      toast({
        title: "Message sent",
        description: "Thank you for your message. We'll get back to you soon.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Contact Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1 space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Get in Touch</h2>
                  <p className="text-slate-300 mb-6">
                    Have questions or feedback? We'd love to hear from you. Fill out the form or reach out to us
                    directly using the contact information below.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Email</h3>
                        <p className="text-slate-400">
                          <a href="mailto:info@hirenow.pk" className="hover:text-cyan-500">
                            info@hirenow.pk
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Phone</h3>
                        <p className="text-slate-400">
                          <a href="tel:+924235880001" className="hover:text-cyan-500">
                            +92 42 35880001
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-4">
                        <MapPin className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">Address</h3>
                        <p className="text-slate-400">
                          123 Tech Street, Gulberg III
                          <br />
                          Lahore, Pakistan
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">Office Hours</h2>
                  <div className="space-y-2 text-slate-300">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                {!isSubmitted ? (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Send Us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-white">
                            Your Name <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`bg-slate-800 border-slate-700 text-white ${errors.name ? "border-red-500" : ""}`}
                          />
                          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email Address <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`bg-slate-800 border-slate-700 text-white ${errors.email ? "border-red-500" : ""}`}
                          />
                          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-white">
                          Subject <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`bg-slate-800 border-slate-700 text-white ${errors.subject ? "border-red-500" : ""}`}
                        />
                        {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-white">
                          Message <span className="text-red-500">*</span>
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={6}
                          value={formData.message}
                          onChange={handleChange}
                          className={`bg-slate-800 border-slate-700 text-white resize-none ${errors.message ? "border-red-500" : ""}`}
                        />
                        {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                      </div>

                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                ) : (
                  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="h-8 w-8 text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Message Sent Successfully!</h2>
                    <p className="text-slate-300 mb-6">
                      Thank you for reaching out to us. We've received your message and will get back to you as soon as
                      possible.
                    </p>
                    <Button
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Find Us</h2>
              <div className="h-96 w-full bg-slate-800 rounded-lg flex items-center justify-center">
                <p className="text-slate-400">Map would be embedded here</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
