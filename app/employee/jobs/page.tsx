"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building,
  Filter,
  X,
  ChevronDown,
  BookmarkPlus,
} from "lucide-react"

export default function JobSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [salaryRange, setSalaryRange] = useState([50, 200])
  const [jobTypes, setJobTypes] = useState<string[]>([])
  const [experienceLevels, setExperienceLevels] = useState<string[]>([])

  const handleJobTypeChange = (type: string) => {
    if (jobTypes.includes(type)) {
      setJobTypes(jobTypes.filter((t) => t !== type))
    } else {
      setJobTypes([...jobTypes, type])
    }
  }

  const handleExperienceLevelChange = (level: string) => {
    if (experienceLevels.includes(level)) {
      setExperienceLevels(experienceLevels.filter((l) => l !== level))
    } else {
      setExperienceLevels([...experienceLevels, level])
    }
  }

  const clearFilters = () => {
    setSalaryRange([50, 200])
    setJobTypes([])
    setExperienceLevels([])
  }

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Find Jobs</h2>
            <p className="text-slate-400">Discover opportunities that match your skills and preferences</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search job titles, skills, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white w-full md:w-60"
            />
          </div>
          <Button
            variant="outline"
            className="border-slate-700 text-white hover:bg-slate-800 md:w-auto"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
            <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {showFilters && (
          <Card className="dashboard-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-white">Advanced Filters</CardTitle>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Salary Range (PKR in thousands)</h3>
                  <div className="space-y-2">
                    <Slider
                      value={salaryRange}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={setSalaryRange}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>PKR {salaryRange[0]}K</span>
                      <span>PKR {salaryRange[1]}K</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Job Type</h3>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`job-type-${type}`}
                          checked={jobTypes.includes(type)}
                          onCheckedChange={() => handleJobTypeChange(type)}
                        />
                        <Label htmlFor={`job-type-${type}`} className="text-slate-400 cursor-pointer">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Experience Level</h3>
                  <div className="space-y-2">
                    {["Entry Level", "Mid Level", "Senior Level", "Manager", "Executive"].map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`exp-level-${level}`}
                          checked={experienceLevels.includes(level)}
                          onCheckedChange={() => handleExperienceLevelChange(level)}
                        />
                        <Label htmlFor={`exp-level-${level}`} className="text-slate-400 cursor-pointer">
                          {level}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((job) => (
            <Card key={job} className="dashboard-card hover:border-slate-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                      {job % 3 === 0 ? "TC" : job % 3 === 1 ? "AI" : "SL"}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {job % 3 === 0
                          ? "Senior React Developer"
                          : job % 3 === 1
                            ? "Frontend Engineer"
                            : "Full Stack Developer"}
                      </h3>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <div className="flex items-center">
                          <Building className="mr-1 h-3 w-3" />
                          <span>
                            {job % 3 === 0 ? "TechCorp Pakistan" : job % 3 === 1 ? "Acme Inc" : "Systems Ltd"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>
                            {job % 3 === 0 ? "Lahore" : job % 3 === 1 ? "Karachi" : "Islamabad"}
                            {job % 2 === 0 ? "" : " (Remote)"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="mr-1 h-3 w-3" />
                          <span>
                            PKR {job % 3 === 0 ? "150K - 250K" : job % 3 === 1 ? "100K - 180K" : "180K - 300K"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="mr-1 h-3 w-3" />
                          <span>{job % 2 === 0 ? "Full-time" : "Contract"}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>
                            Posted {job} day{job !== 1 ? "s" : ""} ago
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {job % 3 === 0 ? (
                          <>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              React
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              TypeScript
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Next.js
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Redux
                            </Badge>
                          </>
                        ) : job % 3 === 1 ? (
                          <>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              JavaScript
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Vue.js
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              CSS
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Responsive Design
                            </Badge>
                          </>
                        ) : (
                          <>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Node.js
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              React
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              MongoDB
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              AWS
                            </Badge>
                          </>
                        )}
                      </div>
                      <p className="mt-4 text-slate-400 line-clamp-2">
                        {job % 3 === 0
                          ? "We are looking for a Senior React Developer to join our team and help build innovative web applications. The ideal candidate should have strong experience with React, TypeScript, and modern frontend development practices."
                          : job % 3 === 1
                            ? "Join our team as a Frontend Engineer to create responsive and user-friendly interfaces. You'll work closely with designers and backend developers to implement new features and improve existing ones."
                            : "We're seeking a Full Stack Developer proficient in both frontend and backend technologies. You'll be responsible for developing and maintaining web applications from database to user interface."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      <BookmarkPlus className="h-5 w-5" />
                    </Button>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700">
              1
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              2
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              3
            </Button>
            <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
              Next
            </Button>
          </div>
        </div>
      </div>
    </EmployeeDashboardLayout>
  )
}
