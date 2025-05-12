"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Twitter, Mail, Users, Building, Zap, Globe } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Muhammad Raza",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      bio: "With over 15 years of experience in the tech industry, Muhammad founded HireNow.pk to revolutionize the hiring process in Pakistan.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "muhammad@hirenow.pk",
      },
    },
    {
      name: "Sarah Ahmed",
      role: "CTO",
      image: "/placeholder.svg",
      bio: "Sarah leads our technology team, bringing 10+ years of experience in building scalable platforms and AI-powered solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@hirenow.pk",
      },
    },
    {
      name: "Ali Khan",
      role: "Head of HR",
      image: "/placeholder.svg",
      bio: "Ali has spent his career helping companies build great teams and cultures, with expertise in talent acquisition and development.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "ali@hirenow.pk",
      },
    },
    {
      name: "Fatima Malik",
      role: "Head of Marketing",
      image: "/placeholder.svg",
      bio: "Fatima brings creative marketing strategies to help both job seekers and employers connect on our platform.",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "fatima@hirenow.pk",
      },
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                About{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  HireNow.pk
                </span>
              </h1>
              <p className="mt-6 text-lg text-slate-300 md:text-xl">
                Connecting top talent with top companies in Pakistan. Our mission is to revolutionize the hiring process
                and create opportunities for everyone.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-slate-900">
          <div className="container px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl mb-8">Our Story</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg">
                  HireNow.pk was founded in 2020 with a simple mission: to transform how hiring works in Pakistan. We
                  recognized that the traditional hiring process was inefficient, time-consuming, and often failed to
                  connect the right talent with the right opportunities.
                </p>
                <p className="text-slate-300 text-lg mt-4">
                  Our founder, Muhammad Raza, experienced these challenges firsthand both as a job seeker and later as
                  an employer. He envisioned a platform that would leverage technology to make hiring more efficient,
                  transparent, and effective for everyone involved.
                </p>
                <p className="text-slate-300 text-lg mt-4">
                  Starting with a small team of passionate professionals, HireNow.pk has grown to become one of
                  Pakistan's leading job platforms, connecting thousands of candidates with hundreds of employers across
                  the country.
                </p>
                <p className="text-slate-300 text-lg mt-4">
                  Today, we continue to innovate and improve our platform, incorporating AI-powered matching, advanced
                  analytics, and a user-friendly interface to create the best possible experience for both job seekers
                  and employers.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-slate-950">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Our Mission</h2>
                <p className="mt-4 text-lg text-slate-300">
                  We're on a mission to transform the hiring landscape in Pakistan
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="relative rounded-xl border border-slate-800 bg-slate-900/50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white">
                    1
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">Empower Job Seekers</h3>
                  <p className="mt-2 text-slate-300">
                    We provide job seekers with the tools, resources, and opportunities they need to advance their
                    careers and find meaningful employment.
                  </p>
                </motion.div>

                <motion.div
                  className="relative rounded-xl border border-slate-800 bg-slate-900/50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white">
                    2
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">Support Employers</h3>
                  <p className="mt-2 text-slate-300">
                    We help companies find the right talent efficiently, reducing time-to-hire and improving the quality
                    of their recruitment process.
                  </p>
                </motion.div>

                <motion.div
                  className="relative rounded-xl border border-slate-800 bg-slate-900/50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white">
                    3
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">Bridge the Gap</h3>
                  <p className="mt-2 text-slate-300">
                    We connect talent with opportunity through innovative technology, creating a more efficient and
                    transparent job market.
                  </p>
                </motion.div>

                <motion.div
                  className="relative rounded-xl border border-slate-800 bg-slate-900/50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="absolute -top-4 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-white">
                    4
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-white">Drive Economic Growth</h3>
                  <p className="mt-2 text-slate-300">
                    By facilitating better job matches, we contribute to increased productivity, reduced unemployment,
                    and economic development in Pakistan.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="py-20 bg-slate-900">
          <div className="container px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Our Values</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                The principles that guide everything we do
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <motion.div variants={item} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Users className="feature-icon" />
                </div>
                <h3 className="feature-title">Inclusivity</h3>
                <p className="feature-description">
                  We believe in creating equal opportunities for everyone, regardless of background or circumstances.
                </p>
              </motion.div>

              <motion.div variants={item} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Building className="feature-icon" />
                </div>
                <h3 className="feature-title">Integrity</h3>
                <p className="feature-description">
                  We operate with honesty, transparency, and ethical standards in all our interactions.
                </p>
              </motion.div>

              <motion.div variants={item} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Zap className="feature-icon" />
                </div>
                <h3 className="feature-title">Innovation</h3>
                <p className="feature-description">
                  We continuously seek new ways to improve our platform and the hiring experience.
                </p>
              </motion.div>

              <motion.div variants={item} className="feature-card">
                <div className="feature-icon-wrapper">
                  <Globe className="feature-icon" />
                </div>
                <h3 className="feature-title">Impact</h3>
                <p className="feature-description">
                  We measure our success by the positive difference we make in people's lives and careers.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-slate-950">
          <div className="container px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">Our Team</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
                Meet the passionate people behind HireNow.pk
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                    <AvatarFallback className="bg-slate-700 text-white text-xl">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold text-white">{member.name}</h3>
                  <p className="text-cyan-500 mb-2">{member.role}</p>
                  <p className="text-sm text-slate-400 mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-slate-900">
          <div className="container px-4">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl text-center mb-16">
                Our Impact
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-white">5,000+</div>
                  <p className="mt-2 text-slate-400">Jobs Posted</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-white">10,000+</div>
                  <p className="mt-2 text-slate-400">Registered Candidates</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-white">500+</div>
                  <p className="mt-2 text-slate-400">Companies</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-white">98%</div>
                  <p className="mt-2 text-slate-400">Match Rate</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-900 to-blue-900">
          <div className="container px-4">
            <motion.div
              className="mx-auto max-w-3xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                Join the HireNow.pk Community
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Whether you're looking for your next career opportunity or searching for top talent, we're here to help.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register?type=employee">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90">
                    Find a Job
                  </Button>
                </Link>
                <Link href="/register?type=employer">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}
