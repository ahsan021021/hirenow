// Mock user data
export const getCurrentUser = () => {
  return {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    role: "employee",
    profileCompleted: true,
    onboardingCompleted: true,
    phone: "+92 300 1234567",
    location: "Karachi, Pakistan",
    bio: "Experienced software developer with a passion for creating user-friendly applications.",
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "UI/UX Design"],
    education: [
      {
        school: "University of Karachi",
        degree: "Bachelor of Science",
        fieldOfStudy: "Computer Science",
        from: "2016-09-01",
        to: "2020-06-30",
        current: false,
        description: "Graduated with honors. Focused on software engineering and web development.",
      },
    ],
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Solutions",
        location: "Karachi, Pakistan",
        from: "2020-08-01",
        to: "2022-12-31",
        current: false,
        description: "Developed and maintained web applications using React and TypeScript.",
      },
      {
        title: "Senior Developer",
        company: "Digital Innovations",
        location: "Lahore, Pakistan",
        from: "2023-01-01",
        to: "",
        current: true,
        description: "Leading frontend development team and implementing best practices.",
      },
    ],
  }
}

// Mock jobs data
export const getJobs = () => {
  return [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Solutions",
      companyId: "1",
      location: "Karachi, Pakistan",
      type: "Full-time",
      salary: "PKR 80,000 - 120,000",
      description: "We are looking for a skilled Frontend Developer to join our team...",
      requirements: [
        "3+ years of experience with React",
        "Strong knowledge of JavaScript and TypeScript",
        "Experience with responsive design",
        "Bachelor's degree in Computer Science or related field",
      ],
      postedDate: "2023-04-15",
      deadline: "2023-05-15",
      status: "active",
    },
    {
      id: "2",
      title: "Backend Engineer",
      company: "Digital Innovations",
      companyId: "2",
      location: "Lahore, Pakistan",
      type: "Full-time",
      salary: "PKR 100,000 - 150,000",
      description: "Join our backend team to build scalable and efficient APIs...",
      requirements: [
        "4+ years of experience with Node.js",
        "Experience with MongoDB and SQL databases",
        "Knowledge of microservices architecture",
        "Strong problem-solving skills",
      ],
      postedDate: "2023-04-10",
      deadline: "2023-05-10",
      status: "active",
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "Creative Solutions",
      companyId: "3",
      location: "Islamabad, Pakistan",
      type: "Full-time",
      salary: "PKR 70,000 - 100,000",
      description: "Design beautiful and intuitive user interfaces for our products...",
      requirements: [
        "Portfolio demonstrating UI/UX skills",
        "Experience with Figma and Adobe Creative Suite",
        "Understanding of user-centered design principles",
        "Ability to work closely with developers",
      ],
      postedDate: "2023-04-05",
      deadline: "2023-05-05",
      status: "active",
    },
    {
      id: "4",
      title: "DevOps Engineer",
      company: "Cloud Systems",
      companyId: "4",
      location: "Remote",
      type: "Full-time",
      salary: "PKR 120,000 - 180,000",
      description: "Manage our cloud infrastructure and CI/CD pipelines...",
      requirements: [
        "Experience with AWS or Azure",
        "Knowledge of Docker and Kubernetes",
        "Familiarity with CI/CD tools",
        "Linux administration skills",
      ],
      postedDate: "2023-04-01",
      deadline: "2023-05-01",
      status: "active",
    },
    {
      id: "5",
      title: "Mobile App Developer",
      company: "App Innovators",
      companyId: "5",
      location: "Karachi, Pakistan",
      type: "Full-time",
      salary: "PKR 90,000 - 130,000",
      description: "Develop cross-platform mobile applications using React Native...",
      requirements: [
        "Experience with React Native",
        "Knowledge of iOS and Android platforms",
        "Understanding of mobile UI/UX principles",
        "Experience with state management libraries",
      ],
      postedDate: "2023-03-25",
      deadline: "2023-04-25",
      status: "active",
    },
  ]
}

// Get job by ID
export const getJobById = (id: string) => {
  const jobs = getJobs()
  return jobs.find((job) => job.id === id) || null
}

// Get jobs by company ID
export const getJobsByCompanyId = (companyId: string) => {
  const jobs = getJobs()
  return jobs.filter((job) => job.companyId === companyId)
}

// Get featured jobs
export const getFeaturedJobs = () => {
  const jobs = getJobs()
  return jobs.slice(0, 3)
}

// Mock companies data
export const getCompanies = () => {
  return [
    {
      id: "1",
      name: "Tech Solutions",
      industry: "Information Technology",
      size: "51-200",
      founded: "2010",
      website: "https://techsolutions.example.com",
      location: "Karachi, Pakistan",
      description: "A leading technology company specializing in web and mobile application development.",
      logo: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Digital Innovations",
      industry: "Software Development",
      size: "201-500",
      founded: "2008",
      website: "https://digitalinnovations.example.com",
      location: "Lahore, Pakistan",
      description: "Providing innovative software solutions to businesses across Pakistan and beyond.",
      logo: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Creative Solutions",
      industry: "Design",
      size: "11-50",
      founded: "2015",
      website: "https://creativesolutions.example.com",
      location: "Islamabad, Pakistan",
      description: "A creative agency focused on UI/UX design and branding.",
      logo: "/placeholder.svg",
    },
  ]
}

// Get company by ID
export const getCompanyById = (id: string) => {
  const companies = getCompanies()
  return companies.find((company) => company.id === id) || null
}

// Get featured companies
export const getFeaturedCompanies = () => {
  const companies = getCompanies()
  return companies.slice(0, 3)
}

// Mock users data
export const getUsers = () => {
  return [
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed.khan@example.com",
      role: "employee",
      status: "active",
      joinedDate: "May 12, 2023",
      lastActive: "Today",
      avatar: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Sara Rizvi",
      email: "sara.rizvi@example.com",
      role: "employer",
      status: "active",
      joinedDate: "June 3, 2023",
      lastActive: "Yesterday",
      avatar: "/placeholder.svg",
    },
    {
      id: 3,
      name: "Muhammad Ali",
      email: "muhammad.ali@example.com",
      role: "employee",
      status: "pending",
      joinedDate: "July 15, 2023",
      lastActive: "3 days ago",
      avatar: "/placeholder.svg",
    },
    {
      id: 4,
      name: "Fatima Ahmed",
      email: "fatima.ahmed@example.com",
      role: "employer",
      status: "suspended",
      joinedDate: "April 20, 2023",
      lastActive: "1 month ago",
      avatar: "/placeholder.svg",
    },
    {
      id: 5,
      name: "Zain Malik",
      email: "zain.malik@example.com",
      role: "admin",
      status: "active",
      joinedDate: "January 5, 2023",
      lastActive: "Today",
      avatar: "/placeholder.svg",
    },
    {
      id: 6,
      name: "Ayesha Khan",
      email: "ayesha.khan@example.com",
      role: "employee",
      status: "inactive",
      joinedDate: "August 10, 2023",
      lastActive: "2 months ago",
      avatar: "/placeholder.svg",
    },
  ]
}

// Get user by ID
export const getUserById = (id: string) => {
  const users = getUsers()
  return users.find((user) => user.id.toString() === id) || null
}

// Mock applications data
export const getApplications = () => {
  return [
    {
      id: "1",
      jobId: "1",
      userId: "1",
      status: "pending",
      appliedDate: "2023-04-20",
      coverLetter: "I am excited to apply for this position...",
      resume: "/placeholder.svg",
    },
    {
      id: "2",
      jobId: "2",
      userId: "1",
      status: "reviewed",
      appliedDate: "2023-04-18",
      coverLetter: "With my experience in backend development...",
      resume: "/placeholder.svg",
    },
    {
      id: "3",
      jobId: "3",
      userId: "1",
      status: "interviewed",
      appliedDate: "2023-04-15",
      coverLetter: "I believe my design skills would be a great fit...",
      resume: "/placeholder.svg",
    },
    {
      id: "4",
      jobId: "4",
      userId: "1",
      status: "rejected",
      appliedDate: "2023-04-10",
      coverLetter: "I am interested in this DevOps position...",
      resume: "/placeholder.svg",
    },
    {
      id: "5",
      jobId: "5",
      userId: "1",
      status: "offered",
      appliedDate: "2023-04-05",
      coverLetter: "I have extensive experience in mobile app development...",
      resume: "/placeholder.svg",
    },
  ]
}

// Get applications by user ID
export const getApplicationsByUserId = (userId: string) => {
  const applications = getApplications()
  return applications.filter((application) => application.userId === userId)
}

// Get applications by job ID
export const getApplicationsByJobId = (jobId: string) => {
  const applications = getApplications()
  return applications.filter((application) => application.jobId === jobId)
}

// Mock messages data
export const getMessages = () => {
  return [
    {
      id: "1",
      senderId: "2",
      receiverId: "1",
      content: "Hello, we've reviewed your application and would like to schedule an interview.",
      timestamp: "2023-04-22T10:30:00",
      read: true,
    },
    {
      id: "2",
      senderId: "1",
      receiverId: "2",
      content: "That sounds great! I'm available next week on Tuesday or Wednesday.",
      timestamp: "2023-04-22T11:15:00",
      read: true,
    },
    {
      id: "3",
      senderId: "2",
      receiverId: "1",
      content: "Perfect, let's schedule for Tuesday at 2 PM. I'll send you a calendar invite.",
      timestamp: "2023-04-22T14:00:00",
      read: true,
    },
    {
      id: "4",
      senderId: "3",
      receiverId: "1",
      content: "Hi, we're interested in your profile for a UI/UX position. Would you be available for a chat?",
      timestamp: "2023-04-23T09:00:00",
      read: false,
    },
    {
      id: "5",
      senderId: "4",
      receiverId: "1",
      content: "Thank you for your application. We'll be in touch soon.",
      timestamp: "2023-04-24T16:30:00",
      read: false,
    },
  ]
}

// Get messages by user ID
export const getMessagesByUserId = (userId: string) => {
  const messages = getMessages()
  return messages.filter((message) => message.senderId === userId || message.receiverId === userId)
}

// Mock notifications data
export const getNotifications = () => {
  return [
    {
      id: "1",
      userId: "1",
      type: "application_status",
      content: "Your application for Frontend Developer has been reviewed.",
      timestamp: "2023-04-22T10:00:00",
      read: false,
    },
    {
      id: "2",
      userId: "1",
      type: "message",
      content: "You have a new message from Tech Solutions.",
      timestamp: "2023-04-22T10:30:00",
      read: true,
    },
    {
      id: "3",
      userId: "1",
      type: "job_recommendation",
      content: "New job matching your profile: Mobile App Developer at App Innovators.",
      timestamp: "2023-04-23T08:00:00",
      read: false,
    },
    {
      id: "4",
      userId: "1",
      type: "application_status",
      content: "You've been invited to an interview for UI/UX Designer position.",
      timestamp: "2023-04-23T09:00:00",
      read: false,
    },
    {
      id: "5",
      userId: "1",
      type: "profile_view",
      content: "Your profile was viewed by 3 employers this week.",
      timestamp: "2023-04-24T12:00:00",
      read: false,
    },
  ]
}

// Get notifications by user ID
export const getNotificationsByUserId = (userId: string) => {
  const notifications = getNotifications()
  return notifications.filter((notification) => notification.userId === userId)
}

// Mock analytics data
export const getEmployerAnalytics = () => {
  return {
    jobViews: {
      total: 1250,
      change: 15, // percentage change from previous period
      data: [150, 220, 180, 250, 300, 150],
    },
    applications: {
      total: 85,
      change: 10,
      data: [10, 15, 12, 18, 20, 10],
    },
    profileViews: {
      total: 320,
      change: 5,
      data: [40, 50, 45, 60, 75, 50],
    },
    hiringRate: {
      total: 8,
      change: -2,
      data: [1, 2, 1, 1, 2, 1],
    },
  }
}

export const getEmployeeAnalytics = () => {
  return {
    jobsApplied: {
      total: 24,
      change: 20,
      data: [3, 5, 4, 6, 4, 2],
    },
    profileViews: {
      total: 45,
      change: 15,
      data: [5, 8, 7, 10, 12, 3],
    },
    interviews: {
      total: 5,
      change: 25,
      data: [0, 1, 1, 2, 1, 0],
    },
    savedJobs: {
      total: 18,
      change: 10,
      data: [2, 3, 4, 3, 5, 1],
    },
  }
}

// Mock subscription plans
export const getSubscriptionPlans = () => {
  return [
    {
      id: "1",
      name: "Basic",
      price: 0,
      features: ["Post up to 3 jobs", "Basic candidate search", "Standard job listing", "Email support"],
      popular: false,
    },
    {
      id: "2",
      name: "Standard",
      price: 5000,
      features: [
        "Post up to 10 jobs",
        "Advanced candidate search",
        "Featured job listings",
        "Priority email support",
        "Basic analytics",
      ],
      popular: true,
    },
    {
      id: "3",
      name: "Premium",
      price: 15000,
      features: [
        "Unlimited job postings",
        "Advanced candidate search with filters",
        "Featured and highlighted job listings",
        "Priority phone and email support",
        "Comprehensive analytics",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ]
}

// Search jobs
export const searchJobs = (query = "", filters = {}) => {
  let filteredJobs = getJobs()

  if (query) {
    const lowerQuery = query.toLowerCase()
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(lowerQuery) ||
        job.company.toLowerCase().includes(lowerQuery) ||
        job.description.toLowerCase().includes(lowerQuery),
    )
  }

  // Apply additional filters if needed
  if (filters) {
    // Example: filter by location
    if (filters.location) {
      filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    // Example: filter by job type
    if (filters.type) {
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type)
    }
  }

  return filteredJobs
}

// Get saved jobs by user ID
export const getSavedJobsByUserId = (userId: string) => {
  // For demo purposes, return a subset of jobs as "saved"
  const jobs = getJobs()
  return jobs.slice(0, 2) // Return first 2 jobs as saved
}

// Get recommended jobs for user
export const getRecommendedJobs = (userId: string) => {
  // For demo purposes, return a subset of jobs as "recommended"
  const jobs = getJobs()
  return jobs.slice(2, 5) // Return jobs 3-5 as recommended
}
