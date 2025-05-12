import { getCompanies, getFeaturedCompanies as getMockFeaturedCompanies } from "@/lib/mock-data"

// Simulate API delay
const simulateDelay = (ms = 800) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all companies
export const getAllCompanies = async () => {
  try {
    await simulateDelay()
    return { success: true, data: getCompanies() }
  } catch (error) {
    console.error("Error fetching companies:", error)
    return { success: false, error: "Failed to fetch companies" }
  }
}

// Get featured companies
export const getFeaturedCompanies = async () => {
  try {
    await simulateDelay()
    return { success: true, data: getMockFeaturedCompanies() }
  } catch (error) {
    console.error("Error fetching featured companies:", error)
    return { success: false, error: "Failed to fetch featured companies" }
  }
}

// Get company by ID
export const getCompanyById = async (id) => {
  try {
    await simulateDelay()
    const companies = getCompanies()
    const company = companies.find((c) => c.id === id)

    if (!company) {
      return { success: false, error: "Company not found" }
    }

    return { success: true, data: company }
  } catch (error) {
    console.error(`Error fetching company ${id}:`, error)
    return { success: false, error: "Failed to fetch company details" }
  }
}

// Create company profile
export const createCompany = async (companyData) => {
  try {
    await simulateDelay(1000)
    // In a real app, this would add the company to the database
    // For mock purposes, we just return success
    return {
      success: true,
      data: {
        id: `new-company-${Date.now()}`,
        ...companyData,
        createdAt: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error("Error creating company:", error)
    return { success: false, error: "Failed to create company profile" }
  }
}

// Update company profile
export const updateCompany = async (id, companyData) => {
  try {
    await simulateDelay(1000)
    const companies = getCompanies()
    const company = companies.find((c) => c.id === id)

    if (!company) {
      return { success: false, error: "Company not found" }
    }

    // In a real app, this would update the company in the database
    // For mock purposes, we just return success
    return {
      success: true,
      data: {
        ...company,
        ...companyData,
        updatedAt: new Date().toISOString(),
      },
    }
  } catch (error) {
    console.error(`Error updating company ${id}:`, error)
    return { success: false, error: "Failed to update company profile" }
  }
}
