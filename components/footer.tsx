import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                HireNow.pk
              </span>
            </Link>
            <p className="mt-4 text-slate-400">
              Pakistan's premier talent matching platform connecting skilled professionals with top employers.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register?type=employee" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Create Profile
                </Link>
              </li>
              <li>
                <Link href="/search-jobs" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/employee/boost" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Boost Profile
                </Link>
              </li>
              <li>
                <Link href="/career-resources" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Career Resources
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/register?type=employer" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Register Company
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/search-candidates" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Search Candidates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link href="/employer-resources" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Hiring Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-slate-400 hover:text-cyan-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} HireNow.pk. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/privacy-policy" className="text-sm text-slate-500 hover:text-cyan-500 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-slate-500 hover:text-cyan-500 transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-sm text-slate-500 hover:text-cyan-500 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
