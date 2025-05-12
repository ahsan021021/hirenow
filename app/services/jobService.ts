import {
  getJobs,
  getJobById,
  getFeaturedJobs,
  getJobsByCompanyId,
  searchJobs,
  getSavedJobsByUserId,
  getRecommendedJobs,
} from "@/lib/mock-data"

// Simulate API delay
const simulateDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all jobs
export const getAllJobs = async () => {
  try {
    await simulateDelay()
    return { success: true, data: getJobs() }
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return { success: false, error: "Failed to fetch jobs" }
  }
}

// Get job by ID
export const getJob = async (id: string) => {
  try {
    await simulateDelay()
    const job = getJobById(id)

    if (!job) {
      return { success: false, error: "Job not found" }
    }

    return { success: true, data: job }
  } catch (error) {
    console.error(`Error fetching job ${id}:`, error)
    return { success: false, error: "Failed to fetch job details" }
  }
}

// Get featured jobs
export const getFeatured = async (limit = 6) => {
  try {
    await simulateDelay()
    return { success: true, data: getFeaturedJobs().slice(0, limit) }
  } catch (error) {
    console.error("Error fetching featured jobs:", error)
    return { success: false, error: "Failed to fetch featured jobs" }
  }
}

// Get jobs by company ID
export const getJobsByCompany = async (companyId: string) => {
  try {
    await simulateDelay()
    return { success: true, data: getJobsByCompanyId(companyId) }
  } catch (error) {
    console.error(`Error fetching jobs for company ${companyId}:`, error)
    return { success: false, error: "Failed to fetch company jobs" }
  }
}

// Search jobs
export const searchJobsService = async (query: string, filters = {}) => {
  try {
    await simulateDelay()
    return { success: true, data: searchJobs(query, filters) }
  } catch (error) {
    console.error("Error searching jobs:", error)
    return { success: false, error: "Failed to search jobs" }
  }
}

// Create job
export const createJob = async (jobData: any) => {
  try {
    await simulateDelay(1000)
    // In a real app, this would add the job to the database
    // For mock purposes, we just return success
    return {
      success: true,
      data: {
        id: `new-job-${Date.now()}`,
        ...jobData,
        createdAt: new Date().toISOString(),
        status: "active",
      },
    }
  } catch (error) {
    console.error("Error creating job:", error)
    return { success: false, error: "Failed to create job" }
  }
}

// Update job
export const updateJob = async (id: string, jobData: any) => {
  try {
    await simulateDelay(1000)
    const job = getJobById(id)

    if (!job) {
      return { success: false, error: "Job not found" }
    }

    // In a real app, this would update the job in the database
    // For mock purposes, we just return success
    return {
      success: true,
      data: {
        ...job,
        ...jobData,
        updatedAt: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error(`Error updating job ${id}:`, error)
    return { success: false, error: "Failed to update job" }
  }
}

// Delete job
export const deleteJob = async (id: string) => {
  try {
    await simulateDelay(1000)
    const job = getJobById(id)

    if (!job) {
      return { success: false, error: "Job not found" }
    }

    // In a real app, this would delete the job from the database
    // For mock purposes, we just return success
    return { success: true }
  } catch (error) {
    console.error(`Error deleting job ${id}:`, error)
    return { success: false, error: "Failed to delete job" }
  }
}

// Get saved jobs for user
export const getSavedJobs = async (userId: string) => {
  try {
    await simulateDelay()
    return { success: true, data: getSavedJobsByUserId(userId) }
  } catch (error) {
    console.error(`Error fetching saved jobs for user ${userId}:`, error)
    return { success: false, error: "Failed to fetch saved jobs" }
  }
}

// Save job for user
export const saveJob = async (userId: string, jobId: string) => {
  try {
    await simulateDelay()
    // In a real app, this would save the job to the user's saved jobs
    // For mock purposes, we just return success
    return { success: true }
  } catch (error) {
    console.error(`Error saving job ${jobId} for user ${userId}:`, error)
    return { success: false, error: "Failed to save job" }
  }
}

// Unsave job for user
export const unsaveJob = async (userId: string, jobId: string) => {
  try {
    await simulateDelay()
    // In a real app, this would remove the job from the user's saved jobs
    // For mock purposes, we just return success
    return { success: true }
  } catch (error) {
    console.error(`Error unsaving job ${jobId} for user ${userId}:`, error)
    return { success: false, error: "Failed to unsave job" }
  }
}

// Get recommended jobs for user
export const getRecommended = async (userId: string) => {
  try {
    await simulateDelay()
    return { success: true, data: getRecommendedJobs(userId) }
  } catch (error) {
    console.error(`Error fetching recommended jobs for user ${userId}:`, error)
    return { success: false, error: "Failed to fetch recommended jobs" }
  }
}
