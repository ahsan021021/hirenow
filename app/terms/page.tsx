"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container py-4">
          <MainNav />
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center text-cyan-500 hover:text-cyan-400 mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Terms of Service</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300">
                Welcome to HireNow.pk. These Terms of Service ("Terms") govern your use of our website, services, and
                applications (collectively, the "Service"). By accessing or using the Service, you agree to be bound by
                these Terms. If you disagree with any part of the Terms, you may not access the Service.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Accounts</h2>
              <p className="text-slate-300">
                When you create an account with us, you must provide accurate, complete, and current information at all
                times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
                your account on our Service.
              </p>
              <p className="text-slate-300">
                You are responsible for safeguarding the password that you use to access the Service and for any
                activities or actions under your password. You agree not to disclose your password to any third party.
                You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your
                account.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Content</h2>
              <p className="text-slate-300">
                Our Service allows you to post, link, store, share and otherwise make available certain information,
                text, graphics, videos, or other material ("Content"). You are responsible for the Content that you post
                on or through the Service, including its legality, reliability, and appropriateness.
              </p>
              <p className="text-slate-300">
                By posting Content on or through the Service, you represent and warrant that: (i) the Content is yours
                (you own it) or you have the right to use it and grant us the rights and license as provided in these
                Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy
                rights, publicity rights, copyrights, contract rights or any other rights of any person.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Job Listings and Applications</h2>
              <p className="text-slate-300">
                Employers are responsible for the content of their job listings and for ensuring that they comply with
                all applicable laws and regulations. HireNow.pk does not guarantee the accuracy or completeness of any
                job listing or the availability of any job.
              </p>
              <p className="text-slate-300">
                Job seekers are responsible for the content of their applications and for ensuring that they comply with
                all applicable laws and regulations. HireNow.pk does not guarantee the accuracy or completeness of any
                application or the availability of any job seeker.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Subscriptions</h2>
              <p className="text-slate-300">
                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a
                recurring and periodic basis, depending on the type of subscription plan you select. At the end of each
                period, your subscription will automatically renew under the same conditions unless you cancel it or
                HireNow.pk cancels it.
              </p>
              <p className="text-slate-300">
                You may cancel your subscription renewal either through your online account management page or by
                contacting our customer support team. A valid payment method is required to process the payment for your
                subscription. You shall provide HireNow.pk with accurate and complete billing information that may
                include but is not limited to full name, address, state, postal or zip code, and valid payment method
                information.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Intellectual Property</h2>
              <p className="text-slate-300">
                The Service and its original content (excluding Content provided by users), features, and functionality
                are and will remain the exclusive property of HireNow.pk and its licensors. The Service is protected by
                copyright, trademark, and other laws of both Pakistan and foreign countries. Our trademarks and trade
                dress may not be used in connection with any product or service without the prior written consent of
                HireNow.pk.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Termination</h2>
              <p className="text-slate-300">
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use
                the Service will immediately cease. If you wish to terminate your account, you may simply discontinue
                using the Service or contact us to request account deletion.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Limitation of Liability</h2>
              <p className="text-slate-300">
                In no event shall HireNow.pk, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
                access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
                party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or
                alteration of your transmissions or content, whether based on warranty, contract, tort (including
                negligence) or any other legal theory, whether or not we have been informed of the possibility of such
                damage.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Changes</h2>
              <p className="text-slate-300">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material we will try to provide at least 30 days' notice prior to any new terms taking
                effect. What constitutes a material change will be determined at our sole discretion.
              </p>
              <p className="text-slate-300">
                By continuing to access or use our Service after those revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">9. Contact Us</h2>
              <p className="text-slate-300">
                If you have any questions about these Terms, please contact us at support@hirenow.pk.
              </p>

              <div className="mt-12 text-slate-400 text-sm">
                <p>Last updated: May 1, 2024</p>
              </div>
            </div>

            <div className="mt-12">
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                asChild
              >
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
