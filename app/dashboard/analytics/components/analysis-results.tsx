"use client"

import { useState, useEffect } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchRubricAnalysisData } from "../utils/data-fetcher"
import { generateAnalysisPDF } from "../utils/pdf-generator"

export function AnalysisResults() {
  const [activeTab, setActiveTab] = useState<
    "remembering" | "understanding" | "applying" | "analyzing" | "evaluating" | "creating"
  >("understanding")
  const [isDownloading, setIsDownloading] = useState(false)
  const [analysisData, setAnalysisData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      const data = await fetchRubricAnalysisData()
      setAnalysisData(data)
      setIsLoading(false)
    }

    loadData()
  }, [])

  const handleDownloadReport = async () => {
    if (!analysisData) return

    setIsDownloading(true)

    try {
      // Transform data for PDF generation
      const questions = Object.entries(analysisData).map(([key, value]: [string, any]) => {
        return {
          id: Number.parseInt(key.replace("question", "")),
          question: value.question,
          answer: value.student_answer,
          rubric: Object.entries(value.rubric_breakdown).map(([criteria, score]: [string, any]) => ({
            criteria,
            maxScore: Number.parseFloat(criteria.match(/$$(\d+(?:\.\d+)?) mark(?:s)?$$/)?.[1] || "1"),
            score: Number.parseFloat(score),
          })),
          totalScore: value.total_score,
          maxScore: Object.entries(value.rubric_breakdown).reduce((sum, [criteria, _]) => {
            const maxScore = Number.parseFloat(criteria.match(/$$(\d+(?:\.\d+)?) mark(?:s)?$$/)?.[1] || "1")
            return sum + maxScore
          }, 0),
          taxonomyLevel: value.bloom_category,
        }
      })

      // Calculate taxonomy performance
      const taxonomyLevels = ["Remembering", "Understanding", "Applying", "Analyzing", "Evaluating", "Creating"]
      const taxonomyPerformance: Record<string, number> = {}

      taxonomyLevels.forEach((level) => {
        const levelQuestions = questions.filter(
          (q) =>
            q.taxonomyLevel.toLowerCase() === level.toLowerCase() ||
            (level === "Analyzing" && q.taxonomyLevel === "Analysing"),
        )

        if (levelQuestions.length > 0) {
          const totalScore = levelQuestions.reduce((sum, q) => sum + q.totalScore, 0)
          const maxScore = levelQuestions.reduce((sum, q) => sum + q.maxScore, 0)
          taxonomyPerformance[level.toLowerCase()] = Math.round((totalScore / maxScore) * 100)
        } else {
          taxonomyPerformance[level.toLowerCase()] = 0
        }
      })

      // Prepare data for the PDF
      const pdfData = {
        title: "Virtual Reality Course Assessment",
        timestamp: new Date(),
        source: "VR Assessment",
        rubric: "VR Assessment Rubric",
        overallScore: questions.reduce((sum, q) => sum + q.totalScore, 0),
        maxPossibleScore: questions.reduce((sum, q) => sum + q.maxScore, 0),
        taxonomyPerformance,
        questions,
      }

      await generateAnalysisPDF(pdfData)
    } catch (error) {
      console.error("Error downloading report:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading analysis data...</p>
        </CardContent>
      </Card>
    )
  }

  if (!analysisData) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <p className="text-red-500">Failed to load analysis data. Please try again.</p>
        </CardContent>
      </Card>
    )
  }

  // Process the data
  const questions = Object.values(analysisData)
  const totalScore = questions.reduce((sum: number, q: any) => sum + q.total_score, 0)
  const maxScore = questions.reduce((sum: number, q: any) => {
    const maxPossible = Object.entries(q.rubric_breakdown).reduce((s, [criteria, _]) => {
      const maxPoints = Number.parseFloat(criteria.match(/$$(\d+(?:\.\d+)?) mark(?:s)?$$/)?.[1] || "1")
      return s + maxPoints
    }, 0)
    return sum + maxPossible
  }, 0)
  const scorePercentage = Math.round((totalScore / maxScore) * 100)

  // Count questions by taxonomy level
  const taxonomyCounts: Record<string, number> = {}
  questions.forEach((q: any) => {
    const level = q.bloom_category
    taxonomyCounts[level] = (taxonomyCounts[level] || 0) + 1
  })

  // Calculate performance by taxonomy level
  const taxonomyPerformance: Record<string, { score: number; max: number; percentage: number }> = {}
  questions.forEach((q: any) => {
    const level = q.bloom_category
    if (!taxonomyPerformance[level]) {
      taxonomyPerformance[level] = { score: 0, max: 0, percentage: 0 }
    }

    taxonomyPerformance[level].score += q.total_score

    const maxPossible = Object.entries(q.rubric_breakdown).reduce((sum, [criteria, _]) => {
      const maxPoints = Number.parseFloat(criteria.match(/$$(\d+(?:\.\d+)?) mark(?:s)?$$/)?.[1] || "1")
      return sum + maxPoints
    }, 0)

    taxonomyPerformance[level].max += maxPossible
  })

  // Calculate percentages
  Object.keys(taxonomyPerformance).forEach((level) => {
    const { score, max } = taxonomyPerformance[level]
    taxonomyPerformance[level].percentage = Math.round((score / max) * 100)
  })

  // Map taxonomy levels to standard names
  const taxonomyMapping: Record<string, string> = {
    Remembering: "remembering",
    Understanding: "understanding",
    Applying: "applying",
    Analysing: "analyzing",
    Analyzing: "analyzing",
    Evaluating: "evaluating",
    Creating: "creating",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analysis Results</CardTitle>
        <CardDescription>Analysis of student answers against the rubric</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Overall Score</h3>
            <span className="text-lg font-bold text-primary">
              {totalScore}/{maxScore} ({scorePercentage}%)
            </span>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <p className="text-sm">
              {scorePercentage >= 80
                ? "Excellent performance! You've demonstrated a strong understanding of the concepts and applied them effectively."
                : scorePercentage >= 70
                  ? "Good performance. You've shown a solid grasp of most concepts, with some areas for improvement."
                  : scorePercentage >= 60
                    ? "Satisfactory performance. You've understood the basic concepts but need to develop deeper understanding in several areas."
                    : "This assessment shows you need to strengthen your understanding of the core concepts. Focus on reviewing the material and seeking additional support."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-medium">Bloom's Taxonomy Performance</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Remembering</span>
                <span className="text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Understanding</span>
                <span className="text-muted-foreground">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Applying</span>
                <span className="text-muted-foreground">65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analyzing</span>
                <span className="text-muted-foreground">72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Evaluating</span>
                <span className="text-muted-foreground">70%</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Creating</span>
                <span className="text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Question-wise Analysis</h3>

          <Tabs
            defaultValue={Object.keys(taxonomyCounts)[0]?.toLowerCase() || "understanding"}
            onValueChange={(value) =>
              setActiveTab(
                value as "remembering" | "understanding" | "applying" | "analyzing" | "evaluating" | "creating",
              )
            }
          >
            <div className="flex border-b pb-2 overflow-x-auto">
              <TabsList className="bg-transparent p-0">
                {Object.keys(taxonomyCounts).map((level) => (
                  <TabsTrigger
                    key={level}
                    value={taxonomyMapping[level] || level.toLowerCase()}
                    className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    {level}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.keys(taxonomyCounts).map((taxonomyLevel) => (
              <TabsContent
                key={taxonomyLevel}
                value={taxonomyMapping[taxonomyLevel] || taxonomyLevel.toLowerCase()}
                className="space-y-4 pt-4"
              >
                {Object.entries(analysisData)
                  .filter(([_, q]: [string, any]) => q.bloom_category === taxonomyLevel)
                  .map(([key, question]: [string, any]) => {
                    const questionId = key.replace("question", "")
                    const maxPossible = Object.entries(question.rubric_breakdown).reduce((sum, [criteria, _]) => {
                      const maxPoints = Number.parseFloat(criteria.match(/$$(\d+(?:\.\d+)?) mark(?:s)?$$/)?.[1] || "1")
                      return sum + maxPoints
                    }, 0)
                    const percentage = Math.round((question.total_score / maxPossible) * 100)

                    return (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <div className="flex items-start mb-2">
                              <h4 className="font-medium mr-2">Q{questionId}:</h4>
                              <p>{question.question}</p>
                            </div>
                            <div className="text-sm text-muted-foreground mb-3">
                              <div className="flex justify-between">
                                <span>
                                  Score: {question.total_score}/{maxPossible}
                                </span>
                                <span>{percentage}%</span>
                              </div>
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value={`answer-${key}`}>
                                <AccordionTrigger className="text-sm font-medium py-2">Student Answer</AccordionTrigger>
                                <AccordionContent>
                                  <div className="text-sm p-3 bg-muted/50 rounded-md">{question.student_answer}</div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value={`rubric-${key}`}>
                                <AccordionTrigger className="text-sm font-medium py-2">
                                  Rubric Evaluation
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="text-sm space-y-2">
                                    {Object.entries(question.rubric_breakdown).map(
                                      ([criteria, score]: [string, any], idx) => {
                                        const maxPoints = Number.parseFloat(
                                          criteria.match(/$$(\d+(?:\.\d+)?) mark(?:s)?$$/)?.[1] || "1",
                                        )
                                        return (
                                          <div key={idx} className="flex justify-between items-center">
                                            <span>{criteria}</span>
                                            <span>
                                              {score}/{maxPoints}
                                            </span>
                                          </div>
                                        )
                                      },
                                    )}
                                    <div className="flex justify-between items-center font-medium border-t pt-2 mt-2">
                                      <span>Total</span>
                                      <span>
                                        {question.total_score}/{maxPossible}
                                      </span>
                                    </div>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleDownloadReport} disabled={isDownloading}>
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating PDF...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
