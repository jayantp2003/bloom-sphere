"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Question, QuestionType, QuestionCounts, RubricDetails } from "../types"

interface QuestionDisplayProps {
  questions: Question[]
  onToggleSelection: (id: number) => void
  showRubric?: boolean
  questionCounts?: QuestionCounts
}

export function QuestionDisplay({
  questions,
  onToggleSelection,
  showRubric = true,
  questionCounts = { mcq: 10, truefalse: 10, qna: 10 },
}: QuestionDisplayProps) {
  const [activeTab, setActiveTab] = useState<QuestionType>("MCQ")

  // Filter questions based on the specified counts
  const mcqQuestions = questions.filter((q) => q.type === "MCQ").slice(0, questionCounts.mcq)

  const trueFalseQuestions = questions.filter((q) => q.type === "True/False").slice(0, questionCounts.truefalse)

  const qnaQuestions = questions.filter((q) => q.type === "QnA").slice(0, questionCounts.qna)

  const mcqCount = mcqQuestions.length
  const trueFalseCount = trueFalseQuestions.length
  const qnaCount = qnaQuestions.length

  // Helper function to render rubric content
  const renderRubric = (rubric: string[] | RubricDetails | undefined) => {
    if (!rubric) {
      return (
        <>
          <p>Full marks for correctly identifying the main concept and providing a complete explanation.</p>
          <p>Partial marks for partial understanding or incomplete explanations.</p>
          <p>No marks for incorrect answers or missing key components.</p>
        </>
      )
    }

    if (Array.isArray(rubric)) {
      return rubric.map((item, index) => <p key={index}>{item}</p>)
    }

    // Handle object-style rubric
    return (
      <>
        <div className="mb-2">
          <span className="font-medium">Points: </span>
          <span>{rubric.points}</span>
        </div>
        <div className="mb-2">
          <span className="font-medium">Full Marks: </span>
          <p>{rubric.full_marks}</p>
        </div>
        <div className="mb-2">
          <span className="font-medium">Partial Marks: </span>
          <p>{rubric.partial_marks}</p>
        </div>
        <div className="mb-2">
          <span className="font-medium">No Marks: </span>
          <p>{rubric.no_marks}</p>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-2">
      <Tabs defaultValue="MCQ" onValueChange={(value) => setActiveTab(value as QuestionType)}>
        <div className="flex border-b pb-2">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger
              value="MCQ"
              className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              MCQ ({mcqCount})
            </TabsTrigger>
            <TabsTrigger
              value="True/False"
              className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              True/False ({trueFalseCount})
            </TabsTrigger>
            <TabsTrigger
              value="QnA"
              className="px-2 h-8 text-sm font-medium data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
            >
              Q&A ({qnaCount})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="MCQ" className="space-y-5 pt-2">
          {mcqCount > 0 ? (
            mcqQuestions.map((question, index) => (
              <div key={question.id} className="space-y-3 border rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`question-${question.id}`}
                    checked={question.selected}
                    onCheckedChange={() => onToggleSelection(question.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start mb-2">
                      <h3 className="font-medium mr-2">Q{index + 1}:</h3>
                      <p>{question.question}</p>
                    </div>

                    <div className="pl-4 space-y-1 text-sm mb-3">
                      {question.options &&
                        question.options.map((option, index) => (
                          <div key={index} className="flex items-start gap-2">
                            {!option.startsWith(String.fromCharCode(65 + index) + ")") && (
                              <div className="font-medium">{String.fromCharCode(65 + index)}.</div>
                            )}
                            <div className={option === question.answer ? "font-medium" : ""}>
                              {option}
                              {option === question.answer && <span className="ml-2 text-primary">(Correct)</span>}
                            </div>
                          </div>
                        ))}
                    </div>

                    {showRubric && (
                      <div className="space-y-2 mt-4">
                        <Accordion type="single" collapsible className="w-full">
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
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No MCQ questions available</div>
          )}
        </TabsContent>

        <TabsContent value="True/False" className="space-y-5 pt-2">
          {trueFalseCount > 0 ? (
            trueFalseQuestions.map((question, index) => (
              <div key={question.id} className="space-y-3 border rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`question-${question.id}`}
                    checked={question.selected}
                    onCheckedChange={() => onToggleSelection(question.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start mb-2">
                      <h3 className="font-medium mr-2">Q{index + 1}:</h3>
                      <p>{question.statement || question.question}</p>
                    </div>

                    <div className="pl-4 space-y-1 text-sm mb-3">
                      <div className="flex items-start gap-2">
                        <div className={question.answer === "True" || question.answer === true ? "font-medium" : ""}>
                          True
                          {(question.answer === "True" || question.answer === true) && (
                            <span className="ml-2 text-primary">(Correct)</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className={question.answer === "False" || question.answer === false ? "font-medium" : ""}>
                          False
                          {(question.answer === "False" || question.answer === false) && (
                            <span className="ml-2 text-primary">(Correct)</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {showRubric && (
                      <div className="space-y-2 mt-4">
                        <Accordion type="single" collapsible className="w-full">
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
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">No True/False questions available</div>
          )}
        </TabsContent>

        <TabsContent value="QnA" className="space-y-5 pt-2">
          {qnaCount > 0 ? (
            qnaQuestions.map((question, index) => (
              <div key={question.id} className="space-y-3 border rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id={`question-${question.id}`}
                    checked={question.selected}
                    onCheckedChange={() => onToggleSelection(question.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-start mb-2">
                      <h3 className="font-medium mr-2">Q{index + 1}:</h3>
                      <p>{question.question}</p>
                    </div>

                    {showRubric && (
                      <div className="space-y-2 mt-4">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="rubric">
                            <AccordionTrigger className="text-sm font-medium py-2">Rubric</AccordionTrigger>
                            <AccordionContent>
                              <div className="text-sm space-y-2 pt-2">{renderRubric(question.rubric)}</div>
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
                    )}
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
  )
}
