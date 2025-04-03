"use client"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Users, Globe, Mail, Save } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  // Hardcoded data for demonstration
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Campus Connect",
    siteDescription: "A platform connecting students with seniors and resources",
    contactEmail: "admin@campusconnect.edu",
    supportEmail: "support@campusconnect.edu",
    maxFileSize: 10,
    maintenanceMode: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newUserNotifications: true,
    newPostNotifications: true,
    reportNotifications: true,
    mentorSessionNotifications: true,
    systemUpdates: true,
  })

  const [privacySettings, setPrivacySettings] = useState({
    userProfileVisibility: "all",
    allowUserMessaging: true,
    allowAnonymousFeedback: false,
    dataRetentionDays: 90,
    enabledAnalytics: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    googleAuth: true,
    microsoftAuth: false,
    githubAuth: true,
    slackIntegration: false,
    discordIntegration: false,
  })

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your platform settings and configurations.</p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid grid-cols-4 w-full md:w-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Settings
                </CardTitle>
                <CardDescription>Configure basic platform settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="site-name">Site Name</Label>
                    <Input 
                      id="site-name" 
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input 
                      id="contact-email" 
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    rows={3}
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Support Email</Label>
                    <Input 
                      id="support-email" 
                      type="email"
                      value={generalSettings.supportEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-file-size">Max File Upload Size (MB)</Label>
                    <Input 
                      id="max-file-size" 
                      type="number"
                      value={generalSettings.maxFileSize}
                      onChange={(e) => setGeneralSettings({...generalSettings, maxFileSize: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">When enabled, only admins can access the site</p>
                  </div>
                  <Switch 
                    id="maintenance-mode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>Configure notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-user-notifications">New User Registrations</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new users register</p>
                    </div>
                    <Switch 
                      id="new-user-notifications"
                      checked={notificationSettings.newUserNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newUserNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="new-post-notifications">New Posts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when new posts are created</p>
                    </div>
                    <Switch 
                      id="new-post-notifications"
                      checked={notificationSettings.newPostNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, newPostNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="report-notifications">Content Reports</Label>
                      <p className="text-sm text-muted-foreground">Get notified when content is reported</p>
                    </div>
                    <Switch 
                      id="report-notifications"
                      checked={notificationSettings.reportNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, reportNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="mentor-session-notifications">Mentor Sessions</Label>
                      <p className="text-sm text-muted-foreground">Get notified about new mentor sessions</p>
                    </div>
                    <Switch 
                      id="mentor-session-notifications"
                      checked={notificationSettings.mentorSessionNotifications}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, mentorSessionNotifications: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="system-updates">System Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about system updates and maintenance</p>
                    </div>
                    <Switch 
                      id="system-updates"
                      checked={notificationSettings.systemUpdates}
                      onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, systemUpdates: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security Settings
                </CardTitle>
                <CardDescription>Configure privacy and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="user-profile-visibility">User Profile Visibility</Label>
                    <Select 
                      value={privacySettings.userProfileVisibility}
                      onValueChange={(value) => setPrivacySettings({...privacySettings, userProfileVisibility: value})}
                    >
                      <SelectTrigger id="user-profile-visibility">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="registered">Registered Users Only</SelectItem>
                        <SelectItem value="connections">Connections Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-user-messaging">Allow User Messaging</Label>
                      <p className="text-sm text-muted-foreground">Enable messaging between users</p>
                    </div>
                    <Switch 
                      id="allow-user-messaging"
                      checked={privacySettings.allowUserMessaging}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowUserMessaging: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="allow-anonymous-feedback">Allow Anonymous Feedback</Label>
                      <p className="text-sm text-muted-foreground">Enable anonymous feedback submissions</p>
                    </div>
                    <Switch 
                      id="allow-anonymous-feedback"
                      checked={privacySettings.allowAnonymousFeedback}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, allowAnonymousFeedback: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-retention-days">Data Retention Period (days)</Label>
                    <Input 
                      id="data-retention-days" 
                      type="number"
                      value={privacySettings.dataRetentionDays}
                      onChange={(e) => setPrivacySettings({...privacySettings, dataRetentionDays: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="enabled-analytics">Enable Analytics</Label>
                      <p className="text-sm text-muted-foreground">Collect anonymous usage data to improve the platform</p>
                    </div>
                    <Switch 
                      id="enabled-analytics"
                      checked={privacySettings.enabledAnalytics}
                      onCheckedChange={(checked) => setPrivacySettings({...privacySettings, enabledAnalytics: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Integration Settings
                </CardTitle>
                <CardDescription>Configure third-party integrations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="google-auth">Google Authentication</Label>
                      <p className="text-sm text-muted-foreground">Allow users to sign in with Google</p>
                    </div>
                    <Switch 
                      id="google-auth"
                      checked={integrationSettings.googleAuth}
                      onCheckedChange={(checked) => setIntegrationSettings({...integrationSettings, googleAuth: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="microsoft-auth">Microsoft Authentication</Label>
                      <p className="text-sm text-muted-foreground">Allow users to sign in with Microsoft</p>
                    </div>
                    <Switch 
                      id="microsoft-auth"
                      checked={integrationSettings.microsoftAuth}
                      onCheckedChange={(checked) => setIntegrationSettings({...integrationSettings, microsoftAuth: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="github-auth">GitHub Authentication</Label>
                      <p className="text-sm text-muted-foreground">Allow users to sign in with GitHub</p>
                    </div>
                    <Switch 
                      id="github-auth"
                      checked={integrationSettings.githubAuth}
                      onCheckedChange={(checked) => setIntegrationSettings({...integrationSettings, githubAuth: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="slack-integration">Slack Integration</Label>
                      <p className="text-sm text-muted-foreground">Connect with Slack for notifications</p>
                    </div>
                    <Switch 
                      id="slack-integration"
                      checked={integrationSettings.slackIntegration}
                      onCheckedChange={(checked) => setIntegrationSettings({...integrationSettings, slackIntegration: checked})}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="discord-integration">Discord Integration</Label>
                      <p className="text-sm text-muted-foreground">Connect with Discord for community features</p>
                    </div>
                    <Switch 
                      id="discord-integration"
                      checked={integrationSettings.discordIntegration}
                      onCheckedChange={(checked) => setIntegrationSettings({...integrationSettings, discordIntegration: checked})}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}