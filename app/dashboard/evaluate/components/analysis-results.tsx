"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateAnalysisPDF } from "../utils/pdf-generator"
import { type BloomData, calculateOverallBloomDistribution, calculateComplexityScore } from "../utils/data-fetcher"

interface AnalysisResultsProps {
  bloomData: BloomData
}

export function AnalysisResults({ bloomData }: AnalysisResultsProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  // Calculate overall distribution and complexity score
  const distribution = calculateOverallBloomDistribution(bloomData.questions)
  const complexityScore = calculateComplexityScore(distribution)

  const handleDownloadReport = async () => {
    setIsDownloading(true)

    try {
      // Prepare data for the PDF
      const analysisData = {
        title: "Machine Learning Assessment",
        timestamp: new Date(),
        source: "Machine Learning Exam.pdf",
        overallScore: complexityScore,
        taxonomyDistribution: {
          remembering: distribution.Remembering,
          understanding: distribution.Understanding,
          applying: distribution.Applying,
          analyzing: distribution.Analysing,
          evaluating: distribution.Evaluating,
          creating: distribution.Creating,
        },
        questionTypeDistribution: {
          mcq: 0,
          truefalse: 0,
          shortanswer: 100,
        },
        questions: bloomData.questions.map((q) => ({
          id: q.id,
          question: q.text,
          type: "Short Answer",
          taxonomy: {
            remembering: q.bloom.Remembering * 100,
            understanding: q.bloom.Understanding * 100,
            applying: q.bloom.Applying * 100,
            analyzing: q.bloom.Analysing * 100,
            evaluating: q.bloom.Evaluating * 100,
            creating: q.bloom.Creating * 100,
          },
        })),
      }

      await generateAnalysisPDF(analysisData)
    } catch (error) {
      console.error("Error downloading report:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cognitive Analysis Results</CardTitle>
        <CardDescription>Bloom's Taxonomy breakdown of your question paper</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Overall Complexity Score</h3>
            <span className="text-lg font-bold text-primary">{complexityScore}/100</span>
          </div>
          <div className="p-5 bg-muted rounded-lg">
            <p className="text-sm">
              {complexityScore > 75
                ? "This question paper has a high level of cognitive complexity, with a strong emphasis on higher-order thinking skills like analyzing and evaluating. It challenges students to apply critical thinking and problem-solving abilities."
                : complexityScore > 50
                  ? "This question paper has a good balance of lower and higher-order thinking skills, with a moderate emphasis on application and analysis questions. Consider adding more questions that target evaluation and creation to further challenge students."
                  : "This question paper focuses primarily on lower-order thinking skills like remembering and understanding. Consider incorporating more questions that require students to analyze, evaluate, and create to develop higher-order thinking skills."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="font-medium">Bloom's Taxonomy Distribution</h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Remembering</span>
                <span className="text-muted-foreground">{distribution.Remembering}%</span>
              </div>
              <Progress value={distribution.Remembering} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Understanding</span>
                <span className="text-muted-foreground">{distribution.Understanding}%</span>
              </div>
              <Progress value={distribution.Understanding} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Applying</span>
                <span className="text-muted-foreground">{distribution.Applying}%</span>
              </div>
              <Progress value={distribution.Applying} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Analyzing</span>
                <span className="text-muted-foreground">{distribution.Analysing}%</span>
              </div>
              <Progress value={distribution.Analysing} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Evaluating</span>
                <span className="text-muted-foreground">{distribution.Evaluating}%</span>
              </div>
              <Progress value={distribution.Evaluating} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Creating</span>
                <span className="text-muted-foreground">{distribution.Creating}%</span>
              </div>
              <Progress value={distribution.Creating} className="h-2" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Question Type Distribution</h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
            <div className="p-5 border rounded-lg text-center">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">Short Answer</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Question-wise Analysis</h3>

          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="questions" className="flex-1">
                Questions ({bloomData.questions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="space-y-4 pt-4">
              {bloomData.questions.map((question) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start mb-2">
                        <h4 className="font-medium mr-2">Q{question.id}:</h4>
                        <p>{question.text}</p>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          Short Answer
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value={`taxonomy-q${question.id}`}>
                          <AccordionTrigger className="text-sm font-medium py-2">
                            Bloom's Taxonomy Levels
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              {Object.entries(question.bloom).map(([key, value]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>{key}</span>
                                    <span>{Math.round(value * 100)}%</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary" style={{ width: `${value * 100}%` }} />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
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
