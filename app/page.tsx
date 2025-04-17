import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, GraduationCap, PenTool } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EduQuest</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="#about" className="text-sm font-medium hover:underline">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 md:px-6">
          <div className="container flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Empower Education with <span className="text-primary">Smart Assessment</span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground">
              Generate high-quality questions, evaluate assessments based on Bloom's taxonomy, and create comprehensive
              rubrics for better learning outcomes.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-10">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Question Generation</h3>
                <p className="text-muted-foreground">
                  Generate authentic questions across all levels of Bloom's taxonomy to challenge students
                  appropriately.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Question Paper Evaluation</h3>
                <p className="text-muted-foreground">
                  Analyze question papers based on the seven cognitive levels to ensure balanced assessment.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <PenTool className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Rubric Creation</h3>
                <p className="text-muted-foreground">
                  Generate comprehensive rubrics to evaluate student answers consistently and fairly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-4 md:px-6">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Simple, Credit-Based Pricing</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Start with 100 free credits. Use them for generating questions, evaluating papers, or creating rubrics.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="border rounded-lg p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                <p className="text-3xl font-bold mb-6">100 Credits</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>100 credits upon signup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Question generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Basic paper evaluation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Simple rubrics</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Sign Up Free</Button>
                </Link>
              </div>
              <div className="border rounded-lg p-8 bg-primary/5 border-primary/20 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Plus Plan</h3>
                <p className="text-3xl font-bold mb-6">Starting at $9.99</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>500+ additional credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Advanced question generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Detailed paper evaluation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Comprehensive rubrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full">Upgrade to Plus</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Education?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join thousands of educators and students who are already using EduQuest to create better assessments and
              learning experiences.
            </p>
            <Link href="/signup">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>
      <footer className="border-t py-10 px-4 md:px-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="font-bold">EduQuest</span>
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} EduQuest. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
