"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicyPage() {
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

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Privacy Policy</h1>
            <div className="prose prose-invert max-w-none">
              <p className="text-slate-300">
                At HireNow.pk, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our website or use our services. Please read
                this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not
                access the site.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">1. Collection of Your Information</h2>
              <p className="text-slate-300">
                We may collect information about you in a variety of ways. The information we may collect via the
                Service includes:
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Personal Data</h3>
              <p className="text-slate-300">
                Personally identifiable information, such as your name, email address, telephone number, and demographic
                information that you voluntarily give to us when you register with the Service or when you choose to
                participate in various activities related to the Service. You are under no obligation to provide us with
                personal information of any kind, however your refusal to do so may prevent you from using certain
                features of the Service.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Derivative Data</h3>
              <p className="text-slate-300">
                Information our servers automatically collect when you access the Service, such as your IP address, your
                browser type, your operating system, your access times, and the pages you have viewed directly before
                and after accessing the Service.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Financial Data</h3>
              <p className="text-slate-300">
                Financial information, such as data related to your payment method (e.g., valid credit card number, card
                brand, expiration date) that we may collect when you purchase, order, return, exchange, or request
                information about our services. We store only very limited, if any, financial information that we
                collect. Otherwise, all financial information is stored by our payment processor and you are encouraged
                to review their privacy policy and contact them directly for responses to your questions.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">2. Use of Your Information</h2>
              <p className="text-slate-300">
                Having accurate information about you permits us to provide you with a smooth, efficient, and customized
                experience. Specifically, we may use information collected about you via the Service to:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2 mt-4">
                <li>Create and manage your account.</li>
                <li>Process your transactions.</li>
                <li>Send you email newsletters, if you have opted in to receive them.</li>
                <li>Fulfill and manage job applications and job postings.</li>
                <li>Request feedback and contact you about your use of the Service.</li>
                <li>Resolve disputes and troubleshoot problems.</li>
                <li>Respond to product and customer service requests.</li>
                <li>Deliver targeted advertising, newsletters, and other information regarding promotions.</li>
                <li>Administer contests, promotions, surveys, or other site features.</li>
                <li>Compile anonymous statistical data for our own use or for a third party's use.</li>
                <li>Assist law enforcement as required by applicable law.</li>
              </ul>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">3. Disclosure of Your Information</h2>
              <p className="text-slate-300">
                We may share information we have collected about you in certain situations. Your information may be
                disclosed as follows:
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">By Law or to Protect Rights</h3>
              <p className="text-slate-300">
                If we believe the release of information about you is necessary to respond to legal process, to
                investigate or remedy potential violations of our policies, or to protect the rights, property, and
                safety of others, we may share your information as permitted or required by any applicable law, rule, or
                regulation.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Third-Party Service Providers</h3>
              <p className="text-slate-300">
                We may share your information with third parties that perform services for us or on our behalf,
                including payment processing, data analysis, email delivery, hosting services, customer service, and
                marketing assistance.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Marketing Communications</h3>
              <p className="text-slate-300">
                With your consent, or with an opportunity for you to withdraw consent, we may share your information
                with third parties for marketing purposes, as permitted by law.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Interactions with Other Users</h3>
              <p className="text-slate-300">
                If you interact with other users of the Service, those users may see your name, profile photo, and
                descriptions of your activity.
              </p>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Online Postings</h3>
              <p className="text-slate-300">
                When you post comments, contributions or other content to the Service, your posts may be viewed by all
                users and may be publicly distributed outside the Service in perpetuity.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">4. Security of Your Information</h2>
              <p className="text-slate-300">
                We use administrative, technical, and physical security measures to help protect your personal
                information. While we have taken reasonable steps to secure the personal information you provide to us,
                please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">5. Policy for Children</h2>
              <p className="text-slate-300">
                We do not knowingly solicit information from or market to children under the age of 13. If you become
                aware of any data we have collected from children under age 13, please contact us using the contact
                information provided below.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">6. Controls for Do-Not-Track Features</h2>
              <p className="text-slate-300">
                Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting
                you can activate to signal your privacy preference not to have data about your online browsing
                activities monitored and collected. No uniform technology standard for recognizing and implementing DNT
                signals has been finalized. As such, we do not currently respond to DNT browser signals or any other
                mechanism that automatically communicates your choice not to be tracked online.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">7. Options Regarding Your Information</h2>
              <h3 className="text-xl font-bold text-white mt-6 mb-3">Account Information</h3>
              <p className="text-slate-300">
                You may at any time review or change the information in your account or terminate your account by:
              </p>
              <ul className="list-disc pl-6 text-slate-300 space-y-2 mt-4">
                <li>Logging into your account settings and updating your account</li>
                <li>Contacting us using the contact information provided below</li>
              </ul>
              <p className="text-slate-300 mt-4">
                Upon your request to terminate your account, we will deactivate or delete your account and information
                from our active databases. However, some information may be retained in our files to prevent fraud,
                troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal
                requirements.
              </p>

              <h2 className="text-2xl font-bold text-white mt-8 mb-4">8. Contact Us</h2>
              <p className="text-slate-300">
                If you have questions or comments about this Privacy Policy, please contact us at:
              </p>
              <p className="text-slate-300 mt-2">
                HireNow.pk
                <br />
                Email: privacy@hirenow.pk
                <br />
                Phone: +92 42 35880001
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
