import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/employee/dashboard/", "/employer/dashboard/"],
    },
    sitemap: "https://hirenow.pk/sitemap.xml",
  }
}
