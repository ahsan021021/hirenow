"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { EmployerDashboardLayout } from "@/components/layouts/employer-dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff, Save, Bell, Lock, Building, Users, CreditCard } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [emailNotifications, setEmailNotifications] = useState({
    applications: true,
    messages: true,
    profileViews: true,
    subscriptionReminders: true,
    marketingEmails: false,
  })

  const [jobSettings, setJobSettings] = useState({
    autoRenewJobs: true,
    showSalaryRange: true,
    allowRemoteApplications: true,
    notifyNewCandidates: true,
    autoArchiveOldJobs: false,
  })

  const handleSavePassword = () => {
    // Validate passwords
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive",
      })
      return
    }

    if (!newPassword) {
      toast({
        title: "Error",
        description: "Please enter a new password",
        variant: "destructive",
      })
      return
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would call an API to update the password
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully",
    })

    // Reset form
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated",
    })
  }

  const handleSaveJobSettings = () => {
    toast({
      title: "Job settings saved",
      description: "Your job posting settings have been updated",
    })
  }

  return (
    <EmployerDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
          <p className="text-slate-400">Manage your company settings and preferences</p>
        </div>

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="company" className="data-[state=active]:bg-slate-700">
              <Building className="mr-2 h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-slate-700">
              <Lock className="mr-2 h-4 w-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-slate-700">
              <Users className="mr-2 h-4 w-4" />
              Job Settings
            </TabsTrigger>
            <TabsTrigger value="billing" className="data-[state=active]:bg-slate-700">
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Company Information</CardTitle>
                <CardDescription className="text-slate-400">Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-white">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      defaultValue={user?.name}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={user?.email}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+92 42 35880001"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-white">
                      Website
                    </Label>
                    <Input
                      id="website"
                      type="url"
                      defaultValue="https://www.techcorp.pk"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-white">
                      Industry
                    </Label>
                    <select
                      id="industry"
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                      defaultValue="software"
                    >
                      <option value="software">Software Development</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="ecommerce">E-commerce</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize" className="text-white">
                      Company Size
                    </Label>
                    <select
                      id="companySize"
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                      defaultValue="51-200"
                    >
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501-1000">501-1000 employees</option>
                      <option value="1001+">1001+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-white">
                    Address
                  </Label>
                  <Input
                    id="address"
                    defaultValue="123 Tech Street, Gulberg III"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-white">
                      City
                    </Label>
                    <Input id="city" defaultValue="Lahore" className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-white">
                      State/Province
                    </Label>
                    <Input id="state" defaultValue="Punjab" className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-white">
                      Country
                    </Label>
                    <Input id="country" defaultValue="Pakistan" className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="dashboard-card mt-6">
              <CardHeader>
                <CardTitle className="text-white">Danger Zone</CardTitle>
                <CardDescription className="text-slate-400">Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-red-900/50 p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-medium text-white">Delete Company Account</h3>
                      <p className="text-sm text-slate-400">
                        Permanently delete your company account and all of your data. This action cannot be undone.
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Change Password</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-white">
                      Current Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-white">
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <p className="text-xs text-slate-500">
                      Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-slate-800 border-slate-700 text-white pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    onClick={handleSavePassword}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Email Notifications</CardTitle>
                <CardDescription className="text-slate-400">Manage which emails you receive from us</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Job Applications</Label>
                      <p className="text-xs text-slate-500">Receive emails when candidates apply to your jobs</p>
                    </div>
                    <Switch
                      checked={emailNotifications.applications}
                      onCheckedChange={(checked) =>
                        setEmailNotifications({ ...emailNotifications, applications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Messages</Label>
                      <p className="text-xs text-slate-500">Receive emails when candidates send you messages</p>
                    </div>
                    <Switch
                      checked={emailNotifications.messages}
                      onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, messages: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Profile Views</Label>
                      <p className="text-xs text-slate-500">Receive emails when candidates view your company profile</p>
                    </div>
                    <Switch
                      checked={emailNotifications.profileViews}
                      onCheckedChange={(checked) =>
                        setEmailNotifications({ ...emailNotifications, profileViews: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Subscription Reminders</Label>
                      <p className="text-xs text-slate-500">
                        Receive emails about your subscription status and renewals
                      </p>
                    </div>
                    <Switch
                      checked={emailNotifications.subscriptionReminders}
                      onCheckedChange={(checked) =>
                        setEmailNotifications({ ...emailNotifications, subscriptionReminders: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Marketing Emails</Label>
                      <p className="text-xs text-slate-500">Receive promotional emails and newsletters</p>
                    </div>
                    <Switch
                      checked={emailNotifications.marketingEmails}
                      onCheckedChange={(checked) =>
                        setEmailNotifications({ ...emailNotifications, marketingEmails: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    onClick={handleSaveNotifications}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Job Posting Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Configure default settings for your job postings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Auto-Renew Jobs</Label>
                      <p className="text-xs text-slate-500">
                        Automatically renew job postings when they're about to expire
                      </p>
                    </div>
                    <Switch
                      checked={jobSettings.autoRenewJobs}
                      onCheckedChange={(checked) => setJobSettings({ ...jobSettings, autoRenewJobs: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Show Salary Range</Label>
                      <p className="text-xs text-slate-500">Display salary range on job postings by default</p>
                    </div>
                    <Switch
                      checked={jobSettings.showSalaryRange}
                      onCheckedChange={(checked) => setJobSettings({ ...jobSettings, showSalaryRange: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Allow Remote Applications</Label>
                      <p className="text-xs text-slate-500">Allow candidates to apply from any location by default</p>
                    </div>
                    <Switch
                      checked={jobSettings.allowRemoteApplications}
                      onCheckedChange={(checked) =>
                        setJobSettings({ ...jobSettings, allowRemoteApplications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Notify New Candidates</Label>
                      <p className="text-xs text-slate-500">
                        Receive notifications when new candidates match your job requirements
                      </p>
                    </div>
                    <Switch
                      checked={jobSettings.notifyNewCandidates}
                      onCheckedChange={(checked) => setJobSettings({ ...jobSettings, notifyNewCandidates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Auto-Archive Old Jobs</Label>
                      <p className="text-xs text-slate-500">
                        Automatically archive jobs that have been closed for more than 30 days
                      </p>
                    </div>
                    <Switch
                      checked={jobSettings.autoArchiveOldJobs}
                      onCheckedChange={(checked) => setJobSettings({ ...jobSettings, autoArchiveOldJobs: checked })}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    onClick={handleSaveJobSettings}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Subscription Plan</CardTitle>
                <CardDescription className="text-slate-400">Manage your subscription and billing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg border border-slate-800 p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Premium Plan</h3>
                      <p className="text-slate-400">Your subscription renews on June 15, 2025</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className="bg-cyan-500 text-white">Unlimited Job Postings</Badge>
                        <Badge className="bg-cyan-500 text-white">Advanced Candidate Search</Badge>
                        <Badge className="bg-cyan-500 text-white">Priority Support</Badge>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                      Manage Subscription
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Payment Method</h3>
                  <div className="rounded-lg border border-slate-800 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 rounded bg-slate-800 flex items-center justify-center text-white font-bold">
                          VISA
                        </div>
                        <div>
                          <p className="text-white">•••• •••• •••• 4242</p>
                          <p className="text-sm text-slate-400">Expires 12/2025</p>
                        </div>
                      </div>
                      <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800">
                        Update
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Billing History</h3>
                  <div className="rounded-lg border border-slate-800 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-slate-800">
                          <th className="px-4 py-3 text-left font-medium text-white">Date</th>
                          <th className="px-4 py-3 text-left font-medium text-white">Description</th>
                          <th className="px-4 py-3 text-left font-medium text-white">Amount</th>
                          <th className="px-4 py-3 text-left font-medium text-white">Status</th>
                          <th className="px-4 py-3 text-left font-medium text-white">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        <tr className="hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-slate-300">May 15, 2024</td>
                          <td className="px-4 py-3 text-slate-300">Premium Plan - Annual</td>
                          <td className="px-4 py-3 text-slate-300">PKR 120,000</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-green-500/20 text-green-500">Paid</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400 p-0">
                              Download
                            </Button>
                          </td>
                        </tr>
                        <tr className="hover:bg-slate-800/50">
                          <td className="px-4 py-3 text-slate-300">May 15, 2023</td>
                          <td className="px-4 py-3 text-slate-300">Premium Plan - Annual</td>
                          <td className="px-4 py-3 text-slate-300">PKR 100,000</td>
                          <td className="px-4 py-3">
                            <Badge className="bg-green-500/20 text-green-500">Paid</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm" className="text-cyan-500 hover:text-cyan-400 p-0">
                              Download
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployerDashboardLayout>
  )
}
