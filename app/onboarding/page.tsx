"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { GraduationCap, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState<"teacher" | "student" | "">("")

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate profile completion
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-muted/30">
      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">EduQuest</span>
      </div>

      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Complete your profile</CardTitle>
          <CardDescription className="text-center">Tell us a bit about yourself to get started</CardDescription>
        </CardHeader>
        <CardContent className="space-y-1">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Step {step} of 3</span>
              <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value) => setUserType(value as "teacher" | "student")}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                >
                  <div>
                    <RadioGroupItem value="teacher" id="teacher" className="peer sr-only" />
                    <Label
                      htmlFor="teacher"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-3 h-6 w-6"
                      >
                        <path d="m20 20-6-6" />
                        <path d="M14 14V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2Z" />
                      </svg>
                      Teacher
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="student" id="student" className="peer sr-only" />
                    <Label
                      htmlFor="student"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mb-3 h-6 w-6"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                      Student
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleNext} className="w-full" disabled={!userType}>
                Continue
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="institution">Institution</Label>
                <Input id="institution" placeholder="School or University name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade/Year</Label>
                <Select>
                  <SelectTrigger id="grade">
                    <SelectValue placeholder="Select grade or year" />
                  </SelectTrigger>
                  <SelectContent>
                    {userType === "teacher" ? (
                      <>
                        <SelectItem value="elementary">Elementary School</SelectItem>
                        <SelectItem value="middle">Middle School</SelectItem>
                        <SelectItem value="high">High School</SelectItem>
                        <SelectItem value="college">College/University</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="grade6">Grade 6</SelectItem>
                        <SelectItem value="grade7">Grade 7</SelectItem>
                        <SelectItem value="grade8">Grade 8</SelectItem>
                        <SelectItem value="grade9">Grade 9</SelectItem>
                        <SelectItem value="grade10">Grade 10</SelectItem>
                        <SelectItem value="grade11">Grade 11</SelectItem>
                        <SelectItem value="grade12">Grade 12</SelectItem>
                        <SelectItem value="year1">University Year 1</SelectItem>
                        <SelectItem value="year2">University Year 2</SelectItem>
                        <SelectItem value="year3">University Year 3</SelectItem>
                        <SelectItem value="year4">University Year 4</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Primary Subject</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select primary subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="computer">Computer Science</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1">
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea
                  id="bio"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell us a bit about yourself"
                />
              </div>
              <div className="space-y-2">
                <Label>Interests</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Question Generation",
                    "Paper Evaluation",
                    "Rubric Creation",
                    "Student Assessment",
                    "Curriculum Design",
                    "Educational Research",
                  ].map((interest) => (
                    <div key={interest} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={interest.toLowerCase().replace(/\s+/g, "-")}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <Label htmlFor={interest.toLowerCase().replace(/\s+/g, "-")} className="text-sm font-normal">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Completing profile...
                    </>
                  ) : (
                    "Complete profile"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-muted-foreground">You can always update your profile information later</p>
        </CardFooter>
      </Card>
    </div>
  )
}
