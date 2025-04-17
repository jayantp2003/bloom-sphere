import Link from "next/link"
import { ArrowRight, Brain, CheckCircle, FileText, BarChart3, History, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Bloomsphere</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline">
              Pricing
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:underline">
              Contact
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
              Transform Education with <span className="text-primary">Bloom's Taxonomy</span>
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl text-muted-foreground">
              Generate, evaluate, and analyze educational content using Bloom's taxonomy to create balanced assessments
              and improve learning outcomes.
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Question Generation</h3>
                <p className="text-muted-foreground">
                  Generate MCQs, short answer, and essay questions across all levels of Bloom's taxonomy with
                  customizable parameters.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cognitive Evaluation</h3>
                <p className="text-muted-foreground">
                  Upload question papers as PDF or images and analyze their distribution across Bloom's taxonomy levels.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Learning Analytics</h3>
                <p className="text-muted-foreground">
                  Analyze student responses with rubric-based assessment and visualize performance across cognitive
                  levels.
                </p>
              </div>
              <div className="bg-background p-6 rounded-lg shadow-sm border">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <History className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive History</h3>
                <p className="text-muted-foreground">
                  Track all your activities with detailed history, filtering options, and exportable reports.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-6">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Bloom's Taxonomy Made Simple</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Bloomsphere helps educators create balanced assessments by ensuring questions span all cognitive
                  levels:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-medium text-sm">1</span>
                    </div>
                    <div>
                      <span className="font-medium">Remembering</span>
                      <p className="text-sm text-muted-foreground">Recall facts and basic concepts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-medium text-sm">2</span>
                    </div>
                    <div>
                      <span className="font-medium">Understanding</span>
                      <p className="text-sm text-muted-foreground">Explain ideas or concepts</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-medium text-sm">3</span>
                    </div>
                    <div>
                      <span className="font-medium">Applying</span>
                      <p className="text-sm text-muted-foreground">Use information in new situations</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-medium text-sm">4</span>
                    </div>
                    <div>
                      <span className="font-medium">Analyzing</span>
                      <p className="text-sm text-muted-foreground">Draw connections among ideas</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-medium text-sm">5</span>
                    </div>
                    <div>
                      <span className="font-medium">Evaluating</span>
                      <p className="text-sm text-muted-foreground">Justify a stand or decision</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-medium text-sm">6</span>
                    </div>
                    <div>
                      <span className="font-medium">Creating</span>
                      <p className="text-sm text-muted-foreground">Produce new or original work</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-muted rounded-lg p-6 border">
                <h3 className="text-xl font-bold mb-4">How It Works</h3>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Generate Questions</h4>
                      <p className="text-sm text-muted-foreground">
                        Input your topic and select the desired cognitive levels to generate tailored questions.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Evaluate Assessments</h4>
                      <p className="text-sm text-muted-foreground">
                        Upload existing question papers to analyze their cognitive level distribution.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Analyze Student Performance</h4>
                      <p className="text-sm text-muted-foreground">
                        Upload student responses to evaluate performance across different cognitive levels.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-medium">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Track Progress</h4>
                      <p className="text-sm text-muted-foreground">
                        Monitor improvements in assessment quality and student performance over time.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 px-4 md:px-6 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-4">Simple, Credit-Based Pricing</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
              Start with 100 free credits. Use them for generating questions, evaluating papers, or analyzing student
              responses.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="border rounded-lg p-8 shadow-sm bg-background">
                <h3 className="text-xl font-bold mb-2">Free Plan</h3>
                <p className="text-3xl font-bold mb-6">100 Credits</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>100 credits upon signup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Question generation (all types)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>PDF & image paper evaluation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Basic learning analytics</span>
                  </li>
                </ul>
                <Link href="/signup">
                  <Button className="w-full">Sign Up Free</Button>
                </Link>
              </div>
              <div className="border rounded-lg p-8 bg-primary/5 border-primary/20 shadow-sm">
                <h3 className="text-xl font-bold mb-2">Plus Plan</h3>
                <p className="text-3xl font-bold mb-6">Starting at $4.99</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>500+ additional credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Advanced question customization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Detailed cognitive analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Comprehensive rubric generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Exportable reports & history</span>
                  </li>
                </ul>
                <Link href="/pricing">
                  <Button className="w-full">Upgrade to Plus</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-4 md:px-6">
          <div className="container max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
            <p className="text-center text-muted-foreground mb-8">
              Have questions or need assistance? Send us a message and we'll get back to you.
            </p>
            <div className="bg-background rounded-lg border p-6 md:p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea id="message" placeholder="Your message" className="min-h-[150px]" />
                </div>
                <Button type="submit" className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-6">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Assessments?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join educators worldwide who are using Bloomsphere to create balanced assessments and improve learning
              outcomes through cognitive-level analysis.
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
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-bold">Bloomsphere</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bloomsphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
