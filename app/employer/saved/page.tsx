"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import {
  Search,
  MapPin,
  Filter,
  ChevronDown,
  Trash2,
  MessageSquare,
  Download,
  Briefcase,
  GraduationCap,
  Star,
  StarOff,
  Clock,
} from "lucide-react"

export default function SavedProfilesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [savedProfiles, setSavedProfiles] = useState([
    {
      id: 1,
      name: "Muhammad Khan",
      title: "Senior Frontend Developer",
      avatar: "/placeholder.svg",
      location: "Lahore",
      remote: false,
      experience: "5 years",
      education: "BS Computer Science",
      skills: ["React", "TypeScript", "Next.js", "Redux"],
      bio: "Experienced Frontend Developer with a passion for creating responsive and user-friendly web applications. Proficient in React, TypeScript, and modern frontend development practices.",
      savedDate: "2 days ago",
      favorite: true,
      matchScore: 92,
    },
    {
      id: 2,
      name: "Sara Rizvi",
      title: "UI/UX Designer",
      avatar: "/placeholder.svg",
      location: "Karachi",
      remote: true,
      experience: "3 years",
      education: "BFA Design",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
      bio: "Creative UI/UX Designer with a strong portfolio of digital products. Skilled in user research, wireframing, and creating intuitive user experiences across web and mobile platforms.",
      savedDate: "1 week ago",
      favorite: false,
      matchScore: 88,
    },
    {
      id: 3,
      name: "Ahmed Khan",
      title: "Full Stack Developer",
      avatar: "/placeholder.svg",
      location: "Islamabad",
      remote: true,
      experience: "4 years",
      education: "MS Computer Science",
      skills: ["Node.js", "React", "MongoDB", "Express"],
      bio: "Full Stack Developer with expertise in both frontend and backend technologies. Experienced in building scalable web applications using the MERN stack.",
      savedDate: "2 weeks ago",
      favorite: true,
      matchScore: 95,
    },
    {
      id: 4,
      name: "Fatima Ali",
      title: "Product Manager",
      avatar: "/placeholder.svg",
      location: "Lahore",
      remote: false,
      experience: "6 years",
      education: "MBA",
      skills: ["Product Management", "Agile", "Scrum", "User Research"],
      bio: "Experienced Product Manager with a track record of launching successful digital products. Skilled in agile methodologies, user research, and cross-functional team leadership.",
      savedDate: "3 weeks ago",
      favorite: false,
      matchScore: 85,
    },
  ])

  const filteredProfiles = savedProfiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const toggleFavorite = (id: number) => {
    setSavedProfiles(
      savedProfiles.map((profile) => (profile.id === id ? { ...profile, favorite: !profile.favorite } : profile)),
    )
  }

  const removeProfile = (id: number) => {
    setSavedProfiles(savedProfiles.filter((profile) => profile.id !== id))
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white">Saved Profiles</h2>
            <p className="text-slate-400">Manage your saved candidate profiles</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              placeholder="Search by name, title, or skills"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white"
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
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-white">Location</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">All Locations</option>
                    <option value="lahore">Lahore</option>
                    <option value="karachi">Karachi</option>
                    <option value="islamabad">Islamabad</option>
                    <option value="remote">Remote Only</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Experience</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-white">Saved Date</h3>
                  <select className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white">
                    <option value="">Any Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="3months">Last 3 Months</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-6">
          {filteredProfiles.length > 0 ? (
            filteredProfiles.map((profile) => (
              <Card key={profile.id} className="dashboard-card hover:border-slate-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                        <AvatarFallback className="bg-slate-800 text-white">{profile.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-medium text-white">{profile.name}</h3>
                          <button
                            className="text-yellow-500 hover:text-yellow-400"
                            onClick={() => toggleFavorite(profile.id)}
                          >
                            {profile.favorite ? (
                              <Star className="h-5 w-5 fill-yellow-500" />
                            ) : (
                              <Star className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                        <p className="text-cyan-500">{profile.title}</p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-400">
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            <span>
                              {profile.location}
                              {profile.remote ? " (Remote)" : ""}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="mr-1 h-3 w-3" />
                            <span>{profile.experience} experience</span>
                          </div>
                          <div className="flex items-center">
                            <GraduationCap className="mr-1 h-3 w-3" />
                            <span>{profile.education}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Saved {profile.savedDate}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {profile.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="outline"
                              className="bg-slate-800 text-slate-300 border-slate-700"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="mt-4 text-slate-400 line-clamp-2">{profile.bio}</p>
                      </div>
                    </div>
                    <div className="flex flex-row md:flex-col gap-2 mt-4 md:mt-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-100 text-cyan-700 font-bold">
                        {profile.matchScore}%
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800"
                          onClick={() => toggleFavorite(profile.id)}
                        >
                          {profile.favorite ? <StarOff className="h-5 w-5" /> : <Star className="h-5 w-5" />}
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
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-9 w-9 border-slate-700 text-red-400 hover:text-red-300 hover:bg-slate-800"
                          onClick={() => removeProfile(profile.id)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white">No saved profiles found</h3>
              <p className="mt-1 text-sm text-slate-400">
                {searchTerm
                  ? "No profiles match your search criteria. Try adjusting your filters."
                  : "You haven't saved any candidate profiles yet."}
              </p>
              {!searchTerm && (
                <Button className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                  Search Candidates
                </Button>
              )}
            </div>
          )}
        </div>

        {filteredProfiles.length > 0 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                2
              </Button>
              <Button variant="outline" size="sm" className="border-slate-700 text-white hover:bg-slate-800">
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </EmployerDashboardLayout>
  )
}
