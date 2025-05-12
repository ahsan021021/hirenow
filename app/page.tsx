"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Search, MapPin, Briefcase, Building, ChevronRight, Star, Users, Award, Shield } from "lucide-react"
import { getFeatured } from "./services/jobService"
import { getFeaturedCompanies } from "./services/companyService"

export default function HomePage() {
  const [featuredJobs, setFeaturedJobs] = useState([])
  const [featuredCompanies, setFeaturedCompanies] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get featured jobs
        const jobsResponse = await getFeatured(6)
        if (jobsResponse.success) {
          setFeaturedJobs(jobsResponse.data || [])
        }

        // Get featured companies
        const companiesResponse = await getFeaturedCompanies()
        if (companiesResponse && companiesResponse.success) {
          setFeaturedCompanies(companiesResponse.data || [])
        } else {
          // Fallback to empty array if the service isn't implemented yet
          setFeaturedCompanies([])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        // Initialize with empty arrays in case of error
        setFeaturedJobs([])
        setFeaturedCompanies([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()

    // Animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    window.location.href = `/jobs?q=${encodeURIComponent(searchQuery)}`
  }

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
          <div className="container">
            <div className="flex flex-col items-center text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                Connecting Top Talent with Top Companies in Pakistan
              </motion.h1>

              <motion.p
                className="mt-6 text-xl text-slate-400 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Find your dream job or the perfect candidate with Pakistan's premier talent matching platform
              </motion.p>

              <motion.div
                className="mt-10 w-full max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <form onSubmit={handleSearch} className="flex w-full">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="Search jobs, skills, or companies"
                      className="pl-10 py-6 bg-slate-800 border-slate-700 text-white rounded-r-none"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="rounded-l-none bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6"
                  >
                    Search
                  </Button>
                </form>

                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <span className="text-slate-400">Popular:</span>
                  <Link href="/jobs?q=react" className="text-cyan-500 hover:text-cyan-400">
                    React
                  </Link>
                  <Link href="/jobs?q=full+stack" className="text-cyan-500 hover:text-cyan-400">
                    Full Stack
                  </Link>
                  <Link href="/jobs?q=python" className="text-cyan-500 hover:text-cyan-400">
                    Python
                  </Link>
                  <Link href="/jobs?q=data+science" className="text-cyan-500 hover:text-cyan-400">
                    Data Science
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="py-16 bg-slate-900/50">
          <div className="container">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Featured Jobs</h2>
              <Link href="/jobs" className="text-cyan-500 hover:text-cyan-400 flex items-center">
                View all jobs <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-slate-800/50 rounded-lg p-6 h-64 animate-pulse"></div>
                ))}
              </div>
            ) : featuredJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredJobs.map((job) => (
                  <Link href={`/jobs/${job.id}`} key={job.id}>
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-800 transition-colors h-full">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="h-12 w-12 rounded bg-slate-700 flex items-center justify-center text-white font-bold">
                            {job.company?.charAt(0) || "C"}
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{job.title}</h3>
                            <p className="text-sm text-slate-400">{job.company}</p>

                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                              <div className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                <span>{job.location || "Remote"}</span>
                              </div>
                              <div className="flex items-center">
                                <Briefcase className="mr-1 h-3 w-3" />
                                <span>{job.type}</span>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {job.skills &&
                                job.skills.slice(0, 3).map((skill, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-slate-700 text-slate-300 border-slate-600"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                              <div className="text-sm font-medium text-white">
                                {job.salary || "Salary not disclosed"}
                              </div>
                              <Badge className="bg-cyan-500/20 text-cyan-400">
                                {job.applications || 0} {job.applications === 1 ? "applicant" : "applicants"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400">No featured jobs available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Featured Companies Section */}
        <section className="py-16">
          <div className="container">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-white">Featured Companies</h2>
              <Link href="/companies" className="text-cyan-500 hover:text-cyan-400 flex items-center">
                View all companies <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="bg-slate-800/50 rounded-lg p-6 h-40 animate-pulse"></div>
                ))}
              </div>
            ) : featuredCompanies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {featuredCompanies.map((company) => (
                  <Link href={`/companies/${company.id}`} key={company.id}>
                    <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-800 transition-colors h-full">
                      <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                        <div className="h-16 w-16 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                          {company.logo ? (
                            <img
                              src={company.logo || "/placeholder.svg?height=80&width=80"}
                              alt={company.name}
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            <Building className="h-8 w-8 text-slate-400" />
                          )}
                        </div>
                        <h3 className="font-medium text-white">{company.name}</h3>
                        <p className="text-xs text-slate-400 mt-1">{company.industry}</p>
                        <Badge className="mt-3 bg-slate-700 text-slate-300 border-slate-600">
                          {company.jobs || 0} open jobs
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-400">No featured companies available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-slate-900/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">How It Works</h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                HireNow.pk makes it easy to find your dream job or the perfect candidate
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Create Your Profile</h3>
                  <p className="text-slate-400">
                    Sign up and create your professional profile or company page to get started
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Find Opportunities</h3>
                  <p className="text-slate-400">Browse jobs or candidates that match your skills and requirements</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-cyan-500/20 flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-cyan-500" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">Connect & Succeed</h3>
                  <p className="text-slate-400">
                    Apply for jobs or contact candidates and start your journey to success
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Why Choose HireNow.pk</h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                Pakistan's premier platform for connecting talent with opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Local Talent Focus</h3>
                <p className="text-slate-400">
                  Specialized in connecting Pakistani talent with local and international opportunities
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Quality Matches</h3>
                <p className="text-slate-400">
                  Advanced matching algorithm to connect the right talent with the right opportunities
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Verified Companies</h3>
                <p className="text-slate-400">
                  All companies are verified to ensure a safe and trustworthy job search experience
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6">
                <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-cyan-500" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Industry Connections</h3>
                <p className="text-slate-400">Partnerships with top companies and organizations across Pakistan</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6">Ready to Take the Next Step in Your Career?</h2>
              <p className="text-xl text-slate-400 mb-8">
                Join thousands of professionals and companies on HireNow.pk today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg"
                >
                  <Link href="/register?type=employee">Find a Job</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-cyan-700 text-white hover:bg-slate-800 px-8 py-6 text-lg"
                >
                  <Link href="/register?type=employer">Hire Talent</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
