"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format } from "date-fns"
import { Download, Loader2 } from "lucide-react"
import { generateAnalysisPDF } from "../utils/pdf-generator"

interface ResultsModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: number
    timestamp: Date
    source: string
    title: string
  }
}

export function ResultsModal({ isOpen, onClose, item }: ResultsModalProps) {
  const [activeTab, setActiveTab] = useState<"MCQ" | "True/False" | "Short Answer">("MCQ")
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownloadReport = async () => {
    setIsDownloading(true)

    try {
      // Sample questions for the analysis
      const sampleQuestions = [
        {
          id: 1,
          question: "What is the primary function of chlorophyll in photosynthesis?",
          type: "Multiple Choice",
          taxonomy: {
            remembering: 70,
            understanding: 50,
            applying: 20,
            analyzing: 10,
            evaluating: 5,
            creating: 0,
          },
        },
        {
          id: 2,
          question: "Explain the relationship between light intensity and the rate of photosynthesis.",
          type: "Short Answer",
          taxonomy: {
            remembering: 20,
            understanding: 60,
            applying: 35,
            analyzing: 75,
            evaluating: 40,
            creating: 15,
          },
        },
        {
          id: 3,
          question: "Carbon dioxide is required for photosynthesis.",
          type: "True/False",
          taxonomy: {
            remembering: 90,
            understanding: 30,
            applying: 5,
            analyzing: 0,
            evaluating: 0,
            creating: 0,
          },
        },
      ]

      // Prepare data for the PDF
      const analysisData = {
        title: item.title,
        timestamp: item.timestamp,
        source: item.source,
        overallScore: 72,
        taxonomyDistribution: {
          remembering: 15,
          understanding: 20,
          applying: 25,
          analyzing: 20,
          evaluating: 12,
          creating: 8,
        },
        questionTypeDistribution: {
          mcq: 60,
          truefalse: 15,
          shortanswer: 25,
        },
        questions: sampleQuestions,
      }

      await generateAnalysisPDF(analysisData)
    } catch (error) {
      console.error("Error downloading report:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cognitive Analysis Results</DialogTitle>
          <DialogDescription>
            Analysis for {item.title} • Generated on {format(item.timestamp, "PPp")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 mt-4">
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Overall Complexity Score</h3>
              <span className="text-lg font-bold text-primary">72/100</span>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <p className="text-sm">
                This question paper has a good balance of lower and higher-order thinking skills, with a slight emphasis
                on application and analysis questions. Consider adding more questions that target evaluation and
                creation to further challenge students.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-medium">Bloom's Taxonomy Distribution</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Remembering</span>
                  <span className="text-muted-foreground">15%</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Understanding</span>
                  <span className="text-muted-foreground">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Applying</span>
                  <span className="text-muted-foreground">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Analyzing</span>
                  <span className="text-muted-foreground">20%</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Evaluating</span>
                  <span className="text-muted-foreground">12%</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Creating</span>
                  <span className="text-muted-foreground">8%</span>
                </div>
                <Progress value={8} className="h-2" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Question Type Distribution</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 border rounded-lg text-center">
                <div className="text-2xl font-bold">60%</div>
                <div className="text-sm text-muted-foreground">Multiple Choice</div>
              </div>
              <div className="p-5 border rounded-lg text-center">
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm text-muted-foreground">True/False</div>
              </div>
              <div className="p-5 border rounded-lg text-center">
                <div className="text-2xl font-bold">25%</div>
                <div className="text-sm text-muted-foreground">Short Answer</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Question-wise Analysis</h3>

            <Tabs
              defaultValue="MCQ"
              onValueChange={(value) => setActiveTab(value as "MCQ" | "True/False" | "Short Answer")}
            >
              <div className="flex border-b pb-2">
                <TabsList className="bg-transparent p-0">
                  <TabsTrigger
                    value="MCQ"
                    className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    MCQ (3)
                  </TabsTrigger>
                  <TabsTrigger
                    value="True/False"
                    className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    True/False (2)
                  </TabsTrigger>
                  <TabsTrigger
                    value="Short Answer"
                    className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    Short Answer (2)
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="MCQ" className="space-y-4 pt-4">
                {/* Question 1 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start mb-2">
                        <h4 className="font-medium mr-2">Q1:</h4>
                        <p>What is the primary function of chlorophyll in photosynthesis?</p>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          Multiple Choice
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="taxonomy-q1">
                          <AccordionTrigger className="text-sm font-medium py-2">
                            Bloom's Taxonomy Levels
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Remembering</span>
                                  <span>70%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "70%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Understanding</span>
                                  <span>50%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "50%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Applying</span>
                                  <span>20%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "20%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Analyzing</span>
                                  <span>10%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "10%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Evaluating</span>
                                  <span>5%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "5%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Creating</span>
                                  <span>0%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "0%" }} />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>

                {/* More MCQ questions would be here */}
              </TabsContent>

              <TabsContent value="True/False" className="space-y-4 pt-4">
                {/* Question 3 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start mb-2">
                        <h4 className="font-medium mr-2">Q3:</h4>
                        <p>Carbon dioxide is required for photosynthesis.</p>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          True/False
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="taxonomy-q3">
                          <AccordionTrigger className="text-sm font-medium py-2">
                            Bloom's Taxonomy Levels
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Remembering</span>
                                  <span>90%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "90%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Understanding</span>
                                  <span>30%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "30%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Applying</span>
                                  <span>5%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "5%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Analyzing</span>
                                  <span>0%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "0%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Evaluating</span>
                                  <span>0%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "0%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Creating</span>
                                  <span>0%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "0%" }} />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>

                {/* More True/False questions would be here */}
              </TabsContent>

              <TabsContent value="Short Answer" className="space-y-4 pt-4">
                {/* Question 2 */}
                <div className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start mb-2">
                        <h4 className="font-medium mr-2">Q2:</h4>
                        <p>Explain the relationship between light intensity and the rate of photosynthesis.</p>
                      </div>
                      <div className="text-sm text-muted-foreground mb-3">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                          Short Answer
                        </span>
                      </div>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="taxonomy-q2">
                          <AccordionTrigger className="text-sm font-medium py-2">
                            Bloom's Taxonomy Levels
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-3 gap-2 pt-2">
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Remembering</span>
                                  <span>20%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "20%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Understanding</span>
                                  <span>60%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "60%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Applying</span>
                                  <span>35%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "35%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Analyzing</span>
                                  <span>75%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "75%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Evaluating</span>
                                  <span>40%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "40%" }} />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Creating</span>
                                  <span>15%</span>
                                </div>
                                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                  <div className="h-full bg-primary" style={{ width: "15%" }} />
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>

                {/* More Short Answer questions would be here */}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-end mt-6">
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
        </div>
      </DialogContent>
    </Dialog>
  )
}
