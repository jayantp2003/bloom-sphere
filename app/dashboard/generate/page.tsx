"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader } from "@/components/ui/loader"
import { GenerationForm } from "./components/generation-form"
import { QuestionDisplay } from "./components/question-display"
import { HistoryTable } from "./components/history-table"
import { PdfDownloadButton } from "./components/pdf-download-button"
import type { Question, HistoryItem, QuestionCounts, TaxonomyWeights } from "./types"
import { allQuestions, sampleHistoryData } from "./utils/sample-data"

// Replace the sampleQuestions and historyData variables with our imported data
export default function GenerateQuestionsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [questions, setQuestions] = useState<Question[]>(allQuestions)
  const [showRubric, setShowRubric] = useState(true)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium")
  const [questionCounts, setQuestionCounts] = useState<QuestionCounts>({
    mcq: 3,
    truefalse: 2,
    qna: 2,
  })
  const [taxonomyWeights, setTaxonomyWeights] = useState<TaxonomyWeights>({
    remembering: 20,
    understanding: 20,
    applying: 20,
    analyzing: 20,
    evaluating: 10,
    creating: 10,
  })
  const [history, setHistory] = useState<HistoryItem[]>(sampleHistoryData)

  const handleGenerate = () => {
    setIsGenerating(true)

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      setHasGenerated(true)

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: `hist-${Date.now()}`,
        timestamp: new Date(),
        source: "Botany Fundamentals.pdf",
        questionCount: {
          mcq: questionCounts.mcq,
          truefalse: questionCounts.truefalse,
          qna: questionCounts.qna,
        },
        questions: [...questions],
      }

      setHistory([newHistoryItem])
    }, 3000)
  }

  const toggleQuestionSelection = (id: number) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, selected: !q.selected } : q)))
  }

  const selectedQuestionsCount = questions.filter((q) => q.selected).length

  const updateQuestionCount = (type: keyof QuestionCounts, increment: boolean) => {
    setQuestionCounts((prev) => ({
      ...prev,
      [type]: increment ? Math.min(prev[type] + 1, 6) : Math.max(prev[type] - 1, 0),
    }))
  }

  const updateTaxonomyWeight = (taxonomy: keyof TaxonomyWeights, value: number) => {
    setTaxonomyWeights((prev) => ({
      ...prev,
      [taxonomy]: value,
    }))
  }

  const totalQuestionCount = questionCounts.mcq + questionCounts.truefalse + questionCounts.qna

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Paper Generation</h1>
        <p className="text-muted-foreground">
          Create Bloom's-aligned question papers with defined difficulty balancing and cognitive levels.
        </p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <GenerationForm
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            questionCounts={questionCounts}
            updateQuestionCount={updateQuestionCount}
            taxonomyWeights={taxonomyWeights}
            updateTaxonomyWeight={updateTaxonomyWeight}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader size="lg" text="Generating questions based on your criteria..." />
              <p className="mt-4 text-sm text-muted-foreground max-w-md text-center">
                This may take a minute. We're analyzing your content and creating questions across different cognitive
                levels.
              </p>
            </div>
          )}

          {hasGenerated && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Generated Questions</CardTitle>
                  <CardDescription>{totalQuestionCount} questions generated based on your criteria</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm">{selectedQuestionsCount} selected</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="show-rubric"
                      checked={showRubric}
                      onCheckedChange={(checked) => setShowRubric(checked as boolean)}
                    />
                    <Label htmlFor="show-rubric" className="text-sm font-normal">
                      Show Rubric
                    </Label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <QuestionDisplay
                  questions={questions}
                  onToggleSelection={toggleQuestionSelection}
                  showRubric={showRubric}
                  questionCounts={questionCounts}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <PdfDownloadButton questions={questions} selectedOnly={false} />
                <PdfDownloadButton questions={questions} selectedOnly={true} />
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history">
          <HistoryTable history={history} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
