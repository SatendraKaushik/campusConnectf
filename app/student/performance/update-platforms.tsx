"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import Axios from "@/utils/Axios"
import { Loader2 } from "lucide-react"

interface UpdatePlatformsProps {
  onUpdate: () => void
}

export default function UpdatePlatforms({ onUpdate }: UpdatePlatformsProps) {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [platforms, setPlatforms] = useState({
    leetcode: "",
    codechef: "",
    geeksforgeeks: "",
    github: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPlatforms((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      const userId = user._id

      if (!userId) {
        throw new Error('User not authenticated')
      }

      // Submit platform usernames
      const response = await Axios.post(`/platform/update/${userId}`, platforms)

      if (response.data.success) {
        toast.success("Platform usernames updated successfully")
        setOpen(false)
        // Trigger parent component to refresh data
        onUpdate()
      } else {
        throw new Error(response.data.message || "Failed to update platform usernames")
      }
    } catch (error) {
      console.error("Error updating platform usernames:", error)
      toast.error(error.message || "Failed to update platform usernames")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Update Platform Usernames</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Platform Usernames</DialogTitle>
          <DialogDescription>
            Enter your usernames for different coding platforms to track your performance.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="leetcode" className="text-right">
                LeetCode
              </Label>
              <Input
                id="leetcode"
                name="leetcode"
                value={platforms.leetcode}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Your LeetCode username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="codechef" className="text-right">
                CodeChef
              </Label>
              <Input
                id="codechef"
                name="codechef"
                value={platforms.codechef}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Your CodeChef username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="geeksforgeeks" className="text-right">
                GeeksforGeeks
              </Label>
              <Input
                id="geeksforgeeks"
                name="geeksforgeeks"
                value={platforms.geeksforgeeks}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Your GeeksforGeeks username"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="github" className="text-right">
                GitHub
              </Label>
              <Input
                id="github"
                name="github"
                value={platforms.github}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Your GitHub username"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}