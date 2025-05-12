import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function JobDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="h-10 w-32 bg-slate-800 rounded-md mb-4 animate-pulse"></div>
        <div className="h-12 w-3/4 bg-slate-800 rounded-md mb-2 animate-pulse"></div>
        <div className="h-6 w-1/2 bg-slate-800 rounded-md mb-8 animate-pulse"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="h-96 bg-slate-800 rounded-lg animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-slate-800 rounded-lg animate-pulse"></div>
            <div className="h-64 bg-slate-800 rounded-lg animate-pulse"></div>
            <div className="h-32 bg-slate-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
