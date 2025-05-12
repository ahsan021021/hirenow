"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { EmployeeDashboardLayout } from "@/components/layouts/employee-dashboard-layout"
import { useAuth } from "@/hooks/use-auth"
import { Eye, EyeOff, Save, Bell, Lock, User, Shield } from "lucide-react"

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
    messages: true,
    applications: true,
    jobMatches: true,
    profileViews: false,
    marketingEmails: false,
  })

  const [pushNotifications, setPushNotifications] = useState({
    messages: true,
    applications: true,
    jobMatches: true,
    profileViews: true,
    marketingEmails: false,
  })

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showContactInfo: true,
    showSalaryExpectations: false,
    allowEmployersToContact: true,
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

  const handleSavePrivacy = () => {
    toast({
      title: "Privacy settings saved",
      description: "Your privacy settings have been updated",
    })
  }

  return (
    <EmployeeDashboardLayout>
      <div className="flex-1 space-y-6 p-6 md:p-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
          <p className="text-slate-400">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-6">
          <TabsList className="bg-slate-800 border border-slate-700">
            <TabsTrigger value="account" className="data-[state=active]:bg-slate-700">
              <User className="mr-2 h-4 w-4" />
              Account
            </TabsTrigger>
            <TabsTrigger value="password" className="data-[state=active]:bg-slate-700">
              <Lock className="mr-2 h-4 w-4" />
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-slate-700">
              <Shield className="mr-2 h-4 w-4" />
              Privacy
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Account Information</CardTitle>
                <CardDescription className="text-slate-400">Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input id="name" defaultValue={user?.name} className="bg-slate-800 border-slate-700 text-white" />
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
                      defaultValue="+92 300 1234567"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language" className="text-white">
                      Language
                    </Label>
                    <select
                      id="language"
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                      defaultValue="en"
                    >
                      <option value="en">English</option>
                      <option value="ur">Urdu</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone" className="text-white">
                    Timezone
                  </Label>
                  <select
                    id="timezone"
                    className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                    defaultValue="Asia/Karachi"
                  >
                    <option value="Asia/Karachi">Pakistan Standard Time (UTC+05:00)</option>
                    <option value="UTC">Coordinated Universal Time (UTC)</option>
                    <option value="America/New_York">Eastern Time (UTC-05:00)</option>
                  </select>
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
                      <h3 className="text-lg font-medium text-white">Delete Account</h3>
                      <p className="text-sm text-slate-400">
                        Permanently delete your account and all of your data. This action cannot be undone.
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
                      <Label className="text-white">Messages</Label>
                      <p className="text-xs text-slate-500">Receive emails when someone sends you a message</p>
                    </div>
                    <Switch
                      checked={emailNotifications.messages}
                      onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, messages: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Job Applications</Label>
                      <p className="text-xs text-slate-500">Receive emails about your job applications</p>
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
                      <Label className="text-white">Job Matches</Label>
                      <p className="text-xs text-slate-500">Receive emails about new jobs that match your profile</p>
                    </div>
                    <Switch
                      checked={emailNotifications.jobMatches}
                      onCheckedChange={(checked) =>
                        setEmailNotifications({ ...emailNotifications, jobMatches: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Profile Views</Label>
                      <p className="text-xs text-slate-500">Receive emails when employers view your profile</p>
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
              </CardContent>
            </Card>

            <Card className="dashboard-card mt-6">
              <CardHeader>
                <CardTitle className="text-white">Push Notifications</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage browser and mobile push notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Messages</Label>
                      <p className="text-xs text-slate-500">Receive push notifications for new messages</p>
                    </div>
                    <Switch
                      checked={pushNotifications.messages}
                      onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, messages: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Job Applications</Label>
                      <p className="text-xs text-slate-500">Receive push notifications about your job applications</p>
                    </div>
                    <Switch
                      checked={pushNotifications.applications}
                      onCheckedChange={(checked) =>
                        setPushNotifications({ ...pushNotifications, applications: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Job Matches</Label>
                      <p className="text-xs text-slate-500">Receive push notifications about new job matches</p>
                    </div>
                    <Switch
                      checked={pushNotifications.jobMatches}
                      onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, jobMatches: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Profile Views</Label>
                      <p className="text-xs text-slate-500">
                        Receive push notifications when employers view your profile
                      </p>
                    </div>
                    <Switch
                      checked={pushNotifications.profileViews}
                      onCheckedChange={(checked) =>
                        setPushNotifications({ ...pushNotifications, profileViews: checked })
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

          <TabsContent value="privacy">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="text-white">Privacy Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Control who can see your profile and information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility" className="text-white">
                      Profile Visibility
                    </Label>
                    <select
                      id="profileVisibility"
                      className="w-full rounded-md border border-slate-700 bg-slate-800 p-2 text-white"
                      value={privacySettings.profileVisibility}
                      onChange={(e) =>
                        setPrivacySettings({
                          ...privacySettings,
                          profileVisibility: e.target.value,
                        })
                      }
                    >
                      <option value="public">Public - Visible to everyone</option>
                      <option value="registered">Registered Users - Only visible to registered users</option>
                      <option value="employers">Employers Only - Only visible to employers</option>
                      <option value="private">Private - Only visible to employers you apply to</option>
                    </select>
                    <p className="text-xs text-slate-500">
                      This controls who can find and view your profile on HireNow.pk
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Show Contact Information</Label>
                      <p className="text-xs text-slate-500">Allow employers to see your contact details</p>
                    </div>
                    <Switch
                      checked={privacySettings.showContactInfo}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, showContactInfo: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Show Salary Expectations</Label>
                      <p className="text-xs text-slate-500">Display your salary expectations on your profile</p>
                    </div>
                    <Switch
                      checked={privacySettings.showSalaryExpectations}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, showSalaryExpectations: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-white">Allow Employers to Contact You</Label>
                      <p className="text-xs text-slate-500">Let employers reach out to you about opportunities</p>
                    </div>
                    <Switch
                      checked={privacySettings.allowEmployersToContact}
                      onCheckedChange={(checked) =>
                        setPrivacySettings({ ...privacySettings, allowEmployersToContact: checked })
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
                    onClick={handleSavePrivacy}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </EmployeeDashboardLayout>
  )
}
