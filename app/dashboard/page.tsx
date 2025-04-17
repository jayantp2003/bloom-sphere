import Link from "next/link"
import { ArrowRight, BookOpen, FileText, GraduationCap, Lightbulb, PenTool, Brain, BarChart3 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Available Credits</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">Free credits upon signup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Questions Generated</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Start generating questions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Papers Evaluated</CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Evaluate your first paper</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium">Rubrics Created</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Create assessment rubrics</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="grid gap-5 md:grid-cols-3">
              <Link href="/dashboard/generate" className="block">
                <div className="rounded-lg border bg-card p-5 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Smart Paper Generation</h3>
                      <p className="text-sm text-muted-foreground">Create Bloom's-aligned question papers</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/evaluate" className="block">
                <div className="rounded-lg border bg-card p-5 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Cognitive Analysis</h3>
                      <p className="text-sm text-muted-foreground">Get Bloom's Taxonomy breakdowns</p>
                    </div>
                  </div>
                </div>
              </Link>
              <Link href="/dashboard/analytics" className="block">
                <div className="rounded-lg border bg-card p-5 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Learning Analytics</h3>
                      <p className="text-sm text-muted-foreground">Track performance with rubrics</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Usage</CardTitle>
            <CardDescription>Track your credit usage across different features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Question Generation</span>
                <span className="text-muted-foreground">0/100</span>
              </div>
              <Progress value={0} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Paper Evaluation</span>
                <span className="text-muted-foreground">0/100</span>
              </div>
              <Progress value={0} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Rubric Creation</span>
                <span className="text-muted-foreground">0/100</span>
              </div>
              <Progress value={0} />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/credits" className="w-full">
              <Button variant="outline" className="w-full">
                Buy More Credits
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips & Tricks</CardTitle>
            <CardDescription>Get the most out of EduQuest</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-primary/10 p-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Bloom's Taxonomy</h3>
                  <p className="text-sm text-muted-foreground">
                    Use all levels of Bloom's taxonomy for a well-balanced assessment.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="rounded-full bg-primary/10 p-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Save Credits</h3>
                  <p className="text-sm text-muted-foreground">
                    Download and save your generated content to avoid regenerating similar questions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/dashboard/credits" className="w-full">
              <Button className="w-full">
                Upgrade to Plus
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
