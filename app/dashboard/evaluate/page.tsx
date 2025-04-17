"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader } from "@/components/ui/loader"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HistoryTable } from "./components/history-table"
import { UploadForm } from "./components/upload-form"
import { AnalysisResults } from "./components/analysis-results"
import { fetchBloomData, type BloomData } from "./utils/data-fetcher"

export default function EvaluatePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [hasAnalyzed, setHasAnalyzed] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [bloomData, setBloomData] = useState<BloomData | null>(null)

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    try {
      // Fetch the bloom data
      const data = await fetchBloomData()
      setBloomData(data)

      // Simulate analysis process
      setTimeout(() => {
        setIsAnalyzing(false)
        setHasAnalyzed(true)
      }, 2000)
    } catch (error) {
      console.error("Error analyzing paper:", error)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cognitive Analysis</h1>
        <p className="text-muted-foreground">Get instant Bloom's Taxonomy breakdowns with complexity scores.</p>
      </div>

      <Tabs defaultValue="analyze" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analyze">Analyze Paper</TabsTrigger>
          <TabsTrigger value="history">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <UploadForm
            isAnalyzing={isAnalyzing}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            handleAnalyze={handleAnalyze}
          />

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader size="lg" text="Analyzing question paper..." />
              <p className="mt-4 text-sm text-muted-foreground max-w-md text-center">
                We're analyzing your question paper to determine cognitive levels based on Bloom's taxonomy.
              </p>
            </div>
          )}

          {hasAnalyzed && bloomData && <AnalysisResults bloomData={bloomData} />}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Analysis History</CardTitle>
              <CardDescription>Your previously analyzed question papers</CardDescription>
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
