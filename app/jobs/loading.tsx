import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function JobsLoading() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="h-10 w-48 bg-slate-800 rounded-md mb-4 animate-pulse"></div>
        <div className="h-6 w-96 bg-slate-800 rounded-md mb-8 animate-pulse"></div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 h-10 bg-slate-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-full md:w-60 bg-slate-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-32 bg-slate-800 rounded-md animate-pulse"></div>
          <div className="h-10 w-32 bg-slate-800 rounded-md animate-pulse"></div>
        </div>

        <div className="space-y-6">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-40 bg-slate-800 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
