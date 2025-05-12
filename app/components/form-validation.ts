import * as z from "zod"

// User registration schema
export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  role: z.enum(["employee", "employer"]),
})

// Login schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

// Employee profile schema
export const employeeProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  title: z.string().min(2, "Job title is required"),
  bio: z.string().max(500, "Bio must be less than 500 characters"),
  location: z.string().min(2, "Location is required"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  experience: z
    .array(
      z.object({
        title: z.string().min(2, "Job title is required"),
        company: z.string().min(2, "Company name is required"),
        location: z.string().optional(),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  education: z
    .array(
      z.object({
        school: z.string().min(2, "School name is required"),
        degree: z.string().min(2, "Degree is required"),
        fieldOfStudy: z.string().optional(),
        startDate: z.string().min(1, "Start date is required"),
        endDate: z.string().optional(),
        current: z.boolean().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
})

// Company profile schema
export const companyProfileSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry is required"),
  location: z.string().min(2, "Location is required"),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  size: z.string().min(1, "Company size is required"),
  founded: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

// Job posting schema
export const jobPostingSchema = z.object({
  title: z.string().min(2, "Job title must be at least 2 characters"),
  location: z.string().min(2, "Location is required"),
  type: z.enum(["full-time", "part-time", "contract", "internship", "remote"]),
  category: z.string().min(2, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(10, "Requirements must be at least 10 characters"),
  salary: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().optional(),
      isNegotiable: z.boolean().optional(),
    })
    .optional(),
  applicationDeadline: z.string().optional(),
  experienceLevel: z.enum(["entry", "mid", "senior", "executive"]).optional(),
})

// Application schema
export const applicationSchema = z.object({
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters"),
})

// Message schema
export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
})

// Password reset schema
export const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// Search schema
export const searchSchema = z.object({
  query: z.string().min(1, "Search query is required"),
  location: z.string().optional(),
  category: z.string().optional(),
  type: z.array(z.string()).optional(),
  experienceLevel: z.array(z.string()).optional(),
  salary: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
    })
    .optional(),
})
