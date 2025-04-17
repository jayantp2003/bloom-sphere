"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PdfGenerator } from "./pdf-generator"

interface Question {
  id: number
  question: string
  type: string
  options?: string[]
  answer: string
  taxonomy: Record<string, number>
  difficulty: string
  selected: boolean
}

interface QuestionModalProps {
  isOpen: boolean
  onClose: () => void
  questions: Question[]
  title: string
  timestamp: string
  source: string
}

export function QuestionModal({ isOpen, onClose, questions, title, timestamp, source }: QuestionModalProps) {
  const [activeTab, setActiveTab] = useState<"MCQ" | "True/False" | "QnA">("MCQ")
  const [localQuestions, setLocalQuestions] = useState<Question[]>(questions)

  const toggleQuestionSelection = (id: number) => {
    setLocalQuestions(localQuestions.map((q) => (q.id === id ? { ...q, selected: !q.selected } : q)))
  }

  const selectedQuestionsCount = localQuestions.filter((q) => q.selected).length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Generated on {timestamp} • Source: {source}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs defaultValue="MCQ" onValueChange={(value) => setActiveTab(value as "MCQ" | "True/False" | "QnA")}>
            <div className="flex border-b pb-2">
              <TabsList className="bg-transparent p-0">
                <TabsTrigger
                  value="MCQ"
                  className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  MCQ ({localQuestions.filter((q) => q.type === "MCQ").length})
                </TabsTrigger>
                <TabsTrigger
                  value="True/False"
                  className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  True/False ({localQuestions.filter((q) => q.type === "True/False").length})
                </TabsTrigger>
                <TabsTrigger
                  value="QnA"
                  className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                >
                  Q&A ({localQuestions.filter((q) => q.type === "QnA").length})
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="MCQ" className="space-y-5 pt-2">
              {localQuestions.filter((q) => q.type === "MCQ").length > 0 ? (
                localQuestions
                  .filter((q) => q.type === "MCQ")
                  .map((question) => (
                    <div key={question.id} className="space-y-3 border rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`modal-question-${question.id}`}
                          checked={question.selected}
                          onCheckedChange={() => toggleQuestionSelection(question.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start mb-2">
                            <h3 className="font-medium mr-2">Q{question.id}:</h3>
                            <p>{question.question}</p>
                          </div>

                          <div className="pl-4 space-y-1 text-sm mb-3">
                            {question.options &&
                              question.options.map((option, index) => (
                                <div key={index} className="flex items-start gap-2">
                                  <div className="font-medium">{String.fromCharCode(65 + index)}.</div>
                                  <div className={option === question.answer ? "font-medium" : ""}>
                                    {option}
                                    {option === question.answer && <span className="ml-2 text-primary">(Correct)</span>}
                                  </div>
                                </div>
                              ))}
                          </div>

                          <div className="space-y-2 mt-4">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="rubric">
                                <AccordionTrigger className="text-sm font-medium py-2">Rubric</AccordionTrigger>
                                <AccordionContent>
                                  <div className="text-sm space-y-2 pt-2">
                                    <p>
                                      Full marks for correctly identifying the main concept and providing a complete
                                      explanation.
                                    </p>
                                    <p>Partial marks for partial understanding or incomplete explanations.</p>
                                    <p>No marks for incorrect answers or missing key components.</p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="taxonomy">
                                <AccordionTrigger className="text-sm font-medium py-2">
                                  Bloom's Taxonomy Levels
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-3 gap-2 pt-2">
                                    {Object.entries(question.taxonomy).map(([key, value]) => (
                                      <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span className="capitalize">{key}</span>
                                          <span>{value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                          <div className="h-full bg-primary" style={{ width: `${value}%` }} />
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
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No MCQ questions available</div>
              )}
            </TabsContent>

            <TabsContent value="True/False" className="space-y-5 pt-2">
              {localQuestions.filter((q) => q.type === "True/False").length > 0 ? (
                localQuestions
                  .filter((q) => q.type === "True/False")
                  .map((question) => (
                    <div key={question.id} className="space-y-3 border rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`modal-question-${question.id}`}
                          checked={question.selected}
                          onCheckedChange={() => toggleQuestionSelection(question.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start mb-2">
                            <h3 className="font-medium mr-2">Q{question.id}:</h3>
                            <p>{question.question}</p>
                          </div>

                          <div className="pl-4 space-y-1 text-sm mb-3">
                            <div className="flex items-start gap-2">
                              <div className={question.answer === "True" ? "font-medium" : ""}>
                                True
                                {question.answer === "True" && <span className="ml-2 text-primary">(Correct)</span>}
                              </div>
                            </div>
                            <div className="flex items-start gap-2">
                              <div className={question.answer === "False" ? "font-medium" : ""}>
                                False
                                {question.answer === "False" && <span className="ml-2 text-primary">(Correct)</span>}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 mt-4">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="rubric">
                                <AccordionTrigger className="text-sm font-medium py-2">Rubric</AccordionTrigger>
                                <AccordionContent>
                                  <div className="text-sm space-y-2 pt-2">
                                    <p>
                                      Full marks for correctly identifying the main concept and providing a complete
                                      explanation.
                                    </p>
                                    <p>Partial marks for partial understanding or incomplete explanations.</p>
                                    <p>No marks for incorrect answers or missing key components.</p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="taxonomy">
                                <AccordionTrigger className="text-sm font-medium py-2">
                                  Bloom's Taxonomy Levels
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-3 gap-2 pt-2">
                                    {Object.entries(question.taxonomy).map(([key, value]) => (
                                      <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span className="capitalize">{key}</span>
                                          <span>{value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                          <div className="h-full bg-primary" style={{ width: `${value}%` }} />
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
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No True/False questions available</div>
              )}
            </TabsContent>

            <TabsContent value="QnA" className="space-y-5 pt-2">
              {localQuestions.filter((q) => q.type === "QnA").length > 0 ? (
                localQuestions
                  .filter((q) => q.type === "QnA")
                  .map((question) => (
                    <div key={question.id} className="space-y-3 border rounded-lg p-5">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`modal-question-${question.id}`}
                          checked={question.selected}
                          onCheckedChange={() => toggleQuestionSelection(question.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-start mb-2">
                            <h3 className="font-medium mr-2">Q{question.id}:</h3>
                            <p>{question.question}</p>
                          </div>

                          <div className="mb-3">
                            <div className="font-medium mt-2">Answer:</div>
                            <div className="text-sm pl-4">{question.answer}</div>
                          </div>

                          <div className="space-y-2 mt-4">
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="rubric">
                                <AccordionTrigger className="text-sm font-medium py-2">Rubric</AccordionTrigger>
                                <AccordionContent>
                                  <div className="text-sm space-y-2 pt-2">
                                    <p>
                                      Full marks for correctly identifying the main concept and providing a complete
                                      explanation.
                                    </p>
                                    <p>Partial marks for partial understanding or incomplete explanations.</p>
                                    <p>No marks for incorrect answers or missing key components.</p>
                                  </div>
                                </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="taxonomy">
                                <AccordionTrigger className="text-sm font-medium py-2">
                                  Bloom's Taxonomy Levels
                                </AccordionTrigger>
                                <AccordionContent>
                                  <div className="grid grid-cols-3 gap-2 pt-2">
                                    {Object.entries(question.taxonomy).map(([key, value]) => (
                                      <div key={key} className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                          <span className="capitalize">{key}</span>
                                          <span>{value}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                                          <div className="h-full bg-primary" style={{ width: `${value}%` }} />
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
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">No Q&A questions available</div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between mt-6">
          <div className="text-sm text-muted-foreground">{selectedQuestionsCount} questions selected</div>
          <div className="flex gap-2">
            <PdfGenerator questions={localQuestions} selectedOnly={true} title={title} />
            <PdfGenerator questions={localQuestions} selectedOnly={false} title={title} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
