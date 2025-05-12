"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import {
  Search,
  MapPin,
  Filter,
  ChevronDown,
  BookmarkPlus,
  MessageSquare,
  Download,
  Briefcase,
  GraduationCap,
} from "lucide-react"

export default function CandidateSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [location, setLocation] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [experienceRange, setExperienceRange] = useState([0, 10])
  const [skills, setSkills] = useState<string[]>([])
  const [jobTypes, setJobTypes] = useState<string[]>([])

  const handleSkillChange = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter((s) => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }

  const handleJobTypeChange = (type: string) => {
    if (jobTypes.includes(type)) {
      setJobTypes(jobTypes.filter((t) => t !== type))
    } else {
      setJobTypes([...jobTypes, type])
    }
  }

  const clearFilters = () => {
    setExperienceRange([0, 10])
    setSkills([])
    setJobTypes([])
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Find Candidates</h2>
            <p className="text-slate-400">Search for qualified candidates that match your requirements</p>
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
                  Clear Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-white">Experience (Years)</h3>
                  <div className="space-y-2">
                    <Slider
                      value={experienceRange}
                      min={0}
                      max={15}
                      step={1}
                      onValueChange={setExperienceRange}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>{experienceRange[0]} years</span>
                      <span>{experienceRange[1]} years</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Skills</h3>
                  <div className="space-y-2">
                    {["React", "JavaScript", "TypeScript", "Node.js", "UI/UX Design"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={skills.includes(skill)}
                          onCheckedChange={() => handleSkillChange(skill)}
                        />
                        <Label htmlFor={`skill-${skill}`} className="text-slate-400 cursor-pointer">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-white">Job Type</h3>
                  <div className="space-y-2">
                    {["Full-time", "Part-time", "Contract", "Remote", "Internship"].map((type) => (
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
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {[1, 2, 3, 4, 5, 6].map((candidate) => (
            <Card key={candidate} className="dashboard-card hover:border-slate-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/placeholder.svg" alt="Candidate" />
                      <AvatarFallback className="bg-slate-800 text-white">
                        {candidate % 3 === 0 ? "MK" : candidate % 3 === 1 ? "SR" : "AK"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium text-white">
                        {candidate % 3 === 0 ? "Muhammad Khan" : candidate % 3 === 1 ? "Sara Rizvi" : "Ahmed Khan"}
                      </h3>
                      <p className="text-cyan-500">
                        {candidate % 3 === 0
                          ? "Senior Frontend Developer"
                          : candidate % 3 === 1
                            ? "UI/UX Designer"
                            : "Full Stack Developer"}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>
                            {candidate % 3 === 0 ? "Lahore" : candidate % 3 === 1 ? "Karachi" : "Islamabad"}
                            {candidate % 2 === 0 ? "" : " (Remote)"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="mr-1 h-3 w-3" />
                          <span>
                            {candidate % 3 === 0
                              ? "5 years experience"
                              : candidate % 3 === 1
                                ? "3 years experience"
                                : "4 years experience"}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <GraduationCap className="mr-1 h-3 w-3" />
                          <span>
                            {candidate % 3 === 0
                              ? "BS Computer Science"
                              : candidate % 3 === 1
                                ? "BFA Design"
                                : "MS Computer Science"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {candidate % 3 === 0 ? (
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
                        ) : candidate % 3 === 1 ? (
                          <>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Figma
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              UI Design
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              UX Research
                            </Badge>
                            <Badge variant="outline" className="bg-slate-800 text-slate-300 border-slate-700">
                              Prototyping
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
                              Express
                            </Badge>
                          </>
                        )}
                      </div>
                      <p className="mt-4 text-slate-400 line-clamp-2">
                        {candidate % 3 === 0
                          ? "Experienced Frontend Developer with a passion for creating responsive and user-friendly web applications. Proficient in React, TypeScript, and modern frontend development practices."
                          : candidate % 3 === 1
                            ? "Creative UI/UX Designer with a strong portfolio of digital products. Skilled in user research, wireframing, and creating intuitive user experiences across web and mobile platforms."
                            : "Full Stack Developer with expertise in both frontend and backend technologies. Experienced in building scalable web applications using the MERN stack."}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                      {candidate % 2 === 0 ? "92%" : "88%"}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <BookmarkPlus className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                      >
                        <Download className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                      View Profile
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
    </EmployerDashboardLayout>
  )
}
