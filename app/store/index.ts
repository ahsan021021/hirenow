import { create } from "zustand"
import { persist } from "zustand/middleware"

interface JobFilters {
  query: string
  location: string
  category: string
  types: string[]
  experienceLevels: string[]
  salary: {
    min: number | null
    max: number | null
  }
}

interface AppState {
  // Theme
  theme: "light" | "dark" | "system"
  setTheme: (theme: "light" | "dark" | "system") => void

  // Job search filters
  jobFilters: JobFilters
  setJobFilters: (filters: Partial<JobFilters>) => void
  resetJobFilters: () => void

  // Notifications
  unreadNotifications: number
  setUnreadNotifications: (count: number) => void
  incrementUnreadNotifications: () => void
  resetUnreadNotifications: () => void

  // Messages
  unreadMessages: number
  setUnreadMessages: (count: number) => void
  incrementUnreadMessages: () => void
  resetUnreadMessages: () => void
}

const defaultJobFilters: JobFilters = {
  query: "",
  location: "",
  category: "",
  types: [],
  experienceLevels: [],
  salary: {
    min: null,
    max: null,
  },
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Theme
      theme: "system",
      setTheme: (theme) => set({ theme }),

      // Job search filters
      jobFilters: defaultJobFilters,
      setJobFilters: (filters) =>
        set((state) => ({
          jobFilters: { ...state.jobFilters, ...filters },
        })),
      resetJobFilters: () => set({ jobFilters: defaultJobFilters }),

      // Notifications
      unreadNotifications: 0,
      setUnreadNotifications: (count) => set({ unreadNotifications: count }),
      incrementUnreadNotifications: () =>
        set((state) => ({
          unreadNotifications: state.unreadNotifications + 1,
        })),
      resetUnreadNotifications: () => set({ unreadNotifications: 0 }),

      // Messages
      unreadMessages: 0,
      setUnreadMessages: (count) => set({ unreadMessages: count }),
      incrementUnreadMessages: () =>
        set((state) => ({
          unreadMessages: state.unreadMessages + 1,
        })),
      resetUnreadMessages: () => set({ unreadMessages: 0 }),
    }),
    {
      name: "hirenow-storage",
      partialize: (state) => ({
        theme: state.theme,
        jobFilters: state.jobFilters,
      }),
    },
  ),
)
