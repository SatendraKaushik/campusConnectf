"use client"

import type React from "react"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Bell, Camera, Check, Lock, Save, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "sonner"
import Axios from "@/utils/Axios"

interface UserSettings {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    bio: string;
    location: string;
    phone: string;
    website: string;
    avatar?: string;
    socialLinks: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  account: {
    language: string;
    timezone: string;
    twoFactorEnabled: boolean;
  };
  notifications: {
    email: {
      newMessages: boolean;
      connectionRequests: boolean;
      mentorSessions: boolean;
      collegeAnnouncements: boolean;
    };
    push: {
      enabled: boolean;
      newMessages: boolean;
      connectionRequests: boolean;
    };
    emailDigestFrequency: string;
  };
}

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Define default settings
  const defaultSettings: UserSettings = {
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      location: '',
      phone: '',
      website: '',
      avatar: '',
      socialLinks: {
        github: '',
        linkedin: '',
        twitter: ''
      }
    },
    account: {
      language: 'en',
      timezone: 'ist',
      twoFactorEnabled: false
    },
    notifications: {
      email: {
        newMessages: true,
        connectionRequests: true,
        mentorSessions: true,
        collegeAnnouncements: true
      },
      push: {
        enabled: true,
        newMessages: true,
        connectionRequests: true
      },
      emailDigestFrequency: 'daily'
    }
  }

  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      if (typeof window === 'undefined') return defaultSettings
      
      const savedSettings = localStorage.getItem('userSettings')
      if (!savedSettings) return defaultSettings

      const parsedSettings = JSON.parse(savedSettings)
      return parsedSettings || defaultSettings
    } catch (error) {
      console.error('Error loading settings:', error)
      return defaultSettings
    }
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = userData?._id
      
      if (!userId) {
        toast.error('User information not found')
        return
      }
  
      const response = await Axios.get('/student-data', {
        params: { userId }
      })
  
      if (response.data.success) {
        setSettings(response.data.data)
        localStorage.setItem('userSettings', JSON.stringify(response.data.data))
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
      toast.error('Failed to load settings')
    }
  }
  
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
  
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      const userId = userData?._id;
      
      if (!userId) {
        toast.error('User information not found');
        setIsLoading(false);
        return;
      }
      
      // Map the settings to match the Student model structure
      const updateData = {
        userId,
        profile: {
          firstName: settings.profile.firstName,
          lastName: settings.profile.lastName,
          email: settings.profile.email,
          bio: settings.profile.bio,
          location: settings.profile.location,
          phone: settings.profile.phone,
          website: settings.profile.website,
          avatar: settings.profile.avatar,
          socialLinks: {
            github: settings.profile.socialLinks.github,
            linkedin: settings.profile.socialLinks.linkedin,
            twitter: settings.profile.socialLinks.twitter
          }
        },
        account: {
          language: settings.account.language,
          timezone: settings.account.timezone,
          twoFactorEnabled: settings.account.twoFactorEnabled
        },
        notifications: {
          email: {
            newMessages: settings.notifications.email.newMessages,
            connectionRequests: settings.notifications.email.connectionRequests,
            mentorSessions: settings.notifications.email.mentorSessions,
            collegeAnnouncements: settings.notifications.email.collegeAnnouncements
          },
          push: {
            enabled: settings.notifications.push.enabled,
            newMessages: settings.notifications.push.newMessages,
            connectionRequests: settings.notifications.push.connectionRequests
          },
          emailDigestFrequency: settings.notifications.emailDigestFrequency
        }
      
      };
      
      const response = await Axios.put('/profile', updateData);
      
      if (response.data.success) {
        setSaveSuccess(true)
        // Update both localStorage items
        localStorage.setItem('userSettings', JSON.stringify(response.data.data))
        localStorage.setItem('user', JSON.stringify({
          ...userData,
          ...response.data.data
        }))
        toast.success('Settings saved successfully')
        setTimeout(() => setSaveSuccess(false), 3000)
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save settings')
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileChange = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }))
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        socialLinks: {
          ...prev.profile.socialLinks,
          [platform]: value
        }
      }
    }))
  }

  const handleNotificationChange = (type: string, field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: {
          ...prev.notifications[type],
          [field]: value
        }
      }
    }))
  }

  const handleAccountChange = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      account: {
        ...prev.account,
        [field]: value
      }
    }))
  }

  const handleEmailDigestChange = (value: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        emailDigestFrequency: value
      }
    }))
  }

  return (
    <DashboardLayout userType="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {saveSuccess && (
          <Alert className="bg-green-50 text-green-800 border-green-200">
            <Check className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your settings have been saved successfully.</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
                <TabsTrigger value="profile" className="justify-start w-full">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="account" className="justify-start w-full">
                  <Lock className="mr-2 h-4 w-4" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications" className="justify-start w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your personal information and public profile</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSave} className="space-y-6">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                            <AvatarFallback>AJ</AvatarFallback>
                          </Avatar>
                          <Button
                            variant="outline"
                            size="icon"
                            className="absolute bottom-0 right-0 rounded-full bg-background"
                          >
                            <Camera className="h-4 w-4" />
                            <span className="sr-only">Upload avatar</span>
                          </Button>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Upload a new profile picture (max 2MB)</p>
                          <Button variant="ghost" size="sm" className="mt-1">
                            Remove photo
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input
                            id="first-name"
                            value={settings?.profile?.firstName || ''}
                            onChange={(e) => handleProfileChange('firstName', e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input
                            id="last-name"
                            value={settings?.profile?.lastName || ''}
                            onChange={(e) => handleProfileChange('lastName', e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={settings?.profile?.email || ''}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={settings?.profile?.bio || ''}
                          onChange={(e) => handleProfileChange('bio', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={settings?.profile?.location || ''}
                            onChange={(e) => handleProfileChange('location', e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={settings?.profile?.phone || ''}
                            onChange={(e) => handleProfileChange('phone', e.target.value)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={settings?.profile?.website || ''}
                          onChange={(e) => handleProfileChange('website', e.target.value)}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Social Links</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="github" className="text-xs">
                              GitHub
                            </Label>
                            <Input
                              id="github"
                              value={settings?.profile?.socialLinks?.github || ''}
                              onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                              disabled={isLoading}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="linkedin" className="text-xs">
                              LinkedIn
                            </Label>
                            <Input
                              id="linkedin"
                              value={settings?.profile?.socialLinks?.linkedin || ''}
                              onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                              disabled={isLoading}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="twitter" className="text-xs">
                              Twitter
                            </Label>
                            <Input
                              id="twitter"
                              value={settings?.profile?.socialLinks?.twitter || ''}
                              onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                      </div>

                      <Button type="submit" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="account" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account security and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        <Button>Update Password</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Two-Factor Authentication</p>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch
                          checked={settings?.account?.twoFactorEnabled || false}
                          onCheckedChange={(checked) => handleAccountChange('twoFactorEnabled', checked)}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Preferences</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select 
                            value={settings?.account?.language || 'en'}
                            onValueChange={(value) => handleAccountChange('language', value)}
                            disabled={isLoading}
                          >
                            <SelectTrigger id="language">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="hi">Hindi</SelectItem>
                              <SelectItem value="es">Spanish</SelectItem>
                              <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select 
                            value={settings?.account?.timezone || 'ist'}
                            onValueChange={(value) => handleAccountChange('timezone', value)}
                            disabled={isLoading}
                          >
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ist">Indian Standard Time (IST)</SelectItem>
                              <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                              <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                              <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Deactivate Account</AlertTitle>
                        <AlertDescription>
                          Deactivating your account will remove your profile and all associated data. This action cannot
                          be undone.
                        </AlertDescription>
                      </Alert>
                      <Button variant="destructive">Deactivate Account</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Email Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Messages</p>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications for new messages
                            </p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.email?.newMessages || false}
                            onCheckedChange={(checked) => handleNotificationChange('email', 'newMessages', checked)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Connection Requests</p>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications for new connection requests
                            </p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.email?.connectionRequests || false}
                            onCheckedChange={(checked) => handleNotificationChange('email', 'connectionRequests', checked)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Mentor Sessions</p>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications for upcoming mentor sessions
                            </p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.email?.mentorSessions || false}
                            onCheckedChange={(checked) => handleNotificationChange('email', 'mentorSessions', checked)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">College Announcements</p>
                            <p className="text-sm text-muted-foreground">
                              Receive email notifications for college announcements
                            </p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.email?.collegeAnnouncements || false}
                            onCheckedChange={(checked) => handleNotificationChange('email', 'collegeAnnouncements', checked)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Push Notifications</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable Push Notifications</p>
                            <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.push?.enabled || false}
                            onCheckedChange={(checked) => handleNotificationChange('push', 'enabled', checked)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Messages</p>
                            <p className="text-sm text-muted-foreground">Receive push notifications for new messages</p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.push?.newMessages || false}
                            onCheckedChange={(checked) => handleNotificationChange('push', 'newMessages', checked)}
                            disabled={isLoading}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Connection Requests</p>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications for new connection requests
                            </p>
                          </div>
                          <Switch 
                            checked={settings?.notifications?.push?.connectionRequests || false}
                            onCheckedChange={(checked) => handleNotificationChange('push', 'connectionRequests', checked)}
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Frequency</h3>
                      <div className="space-y-2">
                        <Label htmlFor="frequency">Email Digest Frequency</Label>
                        <Select 
                          value={settings?.notifications?.emailDigestFrequency || 'daily'}
                          onValueChange={handleEmailDigestChange}
                          disabled={isLoading}
                        >
                          <SelectTrigger id="frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realtime">Real-time</SelectItem>
                            <SelectItem value="daily">Daily Digest</SelectItem>
                            <SelectItem value="weekly">Weekly Digest</SelectItem>
                            <SelectItem value="never">Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button onClick={handleSave} disabled={isLoading}>
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? 'Saving...' : 'Save Notification Settings'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}