"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadForm } from "./components/upload-form"
import { AnalysisResults } from "./components/analysis-results"
import { HistoryTable } from "./components/history-table"
import { Loader } from "@/components/ui/loader"

export default function AnalyticsPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [uploadedRubric, setUploadedRubric] = useState<File | null>(null)
  const [uploadedAnswers, setUploadedAnswers] = useState<File | null>(null)

  const handleAnalyze = () => {
    setIsAnalyzing(true)

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
      setHasAnalyzed(true)
    }, 3000)
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Learning Analytics</h1>
        <p className="text-muted-foreground">
          Upload rubrics and answer scripts to analyze student performance and generate insights.
        </p>
      </div>

      <Tabs defaultValue="upload" className="space-y-6">
        <TabsList>
          <TabsTrigger value="upload">Upload & Analyze</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <UploadForm
            isAnalyzing={isAnalyzing}
            uploadedRubric={uploadedRubric}
            setUploadedRubric={setUploadedRubric}
            uploadedAnswers={uploadedAnswers}
            setUploadedAnswers={setUploadedAnswers}
            handleAnalyze={handleAnalyze}
          />

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader size="lg" text="Analyzing student answers..." />
              <p className="mt-4 text-sm text-muted-foreground max-w-md text-center">
                We're comparing student answers with the rubric to generate performance analytics.
              </p>
            </div>
          )}

          {hasAnalyzed && <AnalysisResults />}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Your previously analyzed answer scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <HistoryTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
