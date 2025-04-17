"use client"

import type React from "react"
import { FileText, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface UploadFormProps {
  isAnalyzing: boolean
  uploadedRubric: File | null
  setUploadedRubric: (file: File | null) => void
  uploadedAnswers: File | null
  setUploadedAnswers: (file: File | null) => void
  handleAnalyze: () => void
}

export function UploadForm({
  isAnalyzing,
  uploadedRubric,
  setUploadedRubric,
  uploadedAnswers,
  setUploadedAnswers,
  handleAnalyze,
}: UploadFormProps) {
  const handleRubricUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedRubric(file)
    }
  }

  const handleAnswersUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedAnswers(file)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Upload Rubric</CardTitle>
          <CardDescription>Upload a rubric with questions and evaluation criteria</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rubric-upload">Upload rubric (PDF or DOCX)</Label>
              <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                {uploadedRubric ? (
                  <div className="text-center">
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">{uploadedRubric.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedRubric.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setUploadedRubric(null)}>
                      Change file
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="mb-1 font-medium">Drag and drop your rubric here</p>
                    <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
                    <Input
                      id="rubric-upload"
                      type="file"
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={handleRubricUpload}
                    />
                    <Button variant="outline" onClick={() => document.getElementById("rubric-upload")?.click()}>
                      Browse files
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upload Answer Script</CardTitle>
          <CardDescription>Upload student answers to analyze against the rubric</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="answers-upload">Upload answer script (PDF or DOCX)</Label>
              <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                {uploadedAnswers ? (
                  <div className="text-center">
                    <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                    <p className="font-medium">{uploadedAnswers.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(uploadedAnswers.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setUploadedAnswers(null)}>
                      Change file
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="mb-1 font-medium">Drag and drop your answer script here</p>
                    <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
                    <Input
                      id="answers-upload"
                      type="file"
                      accept=".pdf,.docx"
                      className="hidden"
                      onChange={handleAnswersUpload}
                    />
                    <Button variant="outline" onClick={() => document.getElementById("answers-upload")?.click()}>
                      Browse files
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Analyze Performance</CardTitle>
          <CardDescription>Compare student answers against the rubric to generate insights</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Upload both a rubric and an answer script to analyze student performance. The system will map questions,
            rubrics, and answers to generate scores and insights.
          </p>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full flex items-center gap-2"
            onClick={handleAnalyze}
            disabled={isAnalyzing || !uploadedRubric || !uploadedAnswers}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing Performance...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Analyze Performance
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
