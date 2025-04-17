"use client"

import type React from "react"

import { useState } from "react"
import { FileText, Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import type { QuestionCounts, TaxonomyWeights } from "../types"

interface GenerationFormProps {
  onGenerate: () => void
  isGenerating: boolean
  questionCounts: QuestionCounts
  updateQuestionCount: (type: keyof QuestionCounts, increment: boolean) => void
  taxonomyWeights: TaxonomyWeights
  updateTaxonomyWeight: (taxonomy: keyof TaxonomyWeights, value: number) => void
  difficulty: "easy" | "medium" | "hard"
  setDifficulty: (difficulty: "easy" | "medium" | "hard") => void
}

export function GenerationForm({
  onGenerate,
  isGenerating,
  questionCounts,
  updateQuestionCount,
  taxonomyWeights,
  updateTaxonomyWeight,
  difficulty,
  setDifficulty,
}: GenerationFormProps) {
  const [generationMethod, setGenerationMethod] = useState<"upload" | "topic" | "source">("upload")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const totalQuestions = questionCounts.mcq + questionCounts.truefalse + questionCounts.qna

  return (
    <div className="space-y-6">
      {/* Step 1: Upload or Select Method */}
      <Card>
        <CardHeader>
          <CardTitle>Step 1: Choose Generation Method</CardTitle>
          <CardDescription>Select how you want to generate questions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-2">
          <RadioGroup
            defaultValue="upload"
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            onValueChange={(value) => setGenerationMethod(value as "upload" | "topic" | "source")}
          >
            <div>
              <RadioGroupItem value="upload" id="upload" className="peer sr-only" />
              <Label
                htmlFor="upload"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <Upload className="mb-3 h-6 w-6" />
                Upload PDF
              </Label>
            </div>
            <div>
              <RadioGroupItem value="source" id="source" className="peer sr-only" />
              <Label
                htmlFor="source"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                <FileText className="mb-3 h-6 w-6" />
                Source text
              </Label>
            </div>
          </RadioGroup>

          {generationMethod === "upload" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">Upload study material (PDF)</Label>
                <div className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center">
                  {uploadedFile ? (
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      <Button variant="outline" size="sm" className="mt-2" onClick={() => setUploadedFile(null)}>
                        Change file
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="mb-1 font-medium">Drag and drop your PDF here</p>
                      <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
                      <Input id="pdf-upload" type="file" accept=".pdf" className="hidden" onChange={handleFileUpload} />
                      <Button variant="outline" onClick={() => document.getElementById("pdf-upload")?.click()}>
                        Browse files
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specific-topic">Specific topic or query (optional)</Label>
                <Input id="specific-topic" placeholder="e.g., Photosynthesis process, Cell division, etc." />
              </div>
            </div>
          )}

          {generationMethod === "source" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source Material</Label>
                <Textarea id="source" placeholder="Paste your source text here..." className="min-h-[200px]" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Step 2: Choose Paper Pattern */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
              2
            </span>
            Step 2: Choose Paper Pattern
          </CardTitle>
          <CardDescription>
            Select the number of questions for each type. The total should not exceed 8 questions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-6">
            <p className="text-amber-800 text-sm flex items-center">
              <span className="font-bold mr-1">Note:</span> Due to compute resource limitations, please limit the total
              number of questions to 8 or fewer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <Label className="mb-2 block">MCQs</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuestionCount("mcq", false)}
                  disabled={questionCounts.mcq <= 0}
                >
                  -
                </Button>
                <div className="w-12 text-center">{questionCounts.mcq}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuestionCount("mcq", true)}
                  disabled={totalQuestions >= 8}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">True/False</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuestionCount("truefalse", false)}
                  disabled={questionCounts.truefalse <= 0}
                >
                  -
                </Button>
                <div className="w-12 text-center">{questionCounts.truefalse}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuestionCount("truefalse", true)}
                  disabled={totalQuestions >= 8}
                >
                  +
                </Button>
              </div>
            </div>
            <div>
              <Label className="mb-2 block">Q&A</Label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuestionCount("qna", false)}
                  disabled={questionCounts.qna <= 0}
                >
                  -
                </Button>
                <div className="w-12 text-center">{questionCounts.qna}</div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateQuestionCount("qna", true)}
                  disabled={totalQuestions >= 8}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Set Bloom's Taxonomy Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
              3
            </span>
            Step 3: Set Bloom's Taxonomy Weights
          </CardTitle>
          <CardDescription>
            Adjust the cognitive level distribution of your questions. The total of all weights should sum to 100.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Remembering</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{taxonomyWeights.remembering}</span>
                </div>
              </div>
              <Slider
                defaultValue={[taxonomyWeights.remembering]}
                max={100}
                step={1}
                className="py-2"
                onValueChange={(value) => updateTaxonomyWeight("remembering", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Understanding</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{taxonomyWeights.understanding}</span>
                </div>
              </div>
              <Slider
                defaultValue={[taxonomyWeights.understanding]}
                max={100}
                step={1}
                className="py-2"
                onValueChange={(value) => updateTaxonomyWeight("understanding", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Applying</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{taxonomyWeights.applying}</span>
                </div>
              </div>
              <Slider
                defaultValue={[taxonomyWeights.applying]}
                max={100}
                step={1}
                className="py-2"
                onValueChange={(value) => updateTaxonomyWeight("applying", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Analyzing</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{taxonomyWeights.analyzing}</span>
                </div>
              </div>
              <Slider
                defaultValue={[taxonomyWeights.analyzing]}
                max={100}
                step={1}
                className="py-2"
                onValueChange={(value) => updateTaxonomyWeight("analyzing", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Evaluating</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{taxonomyWeights.evaluating}</span>
                </div>
              </div>
              <Slider
                defaultValue={[taxonomyWeights.evaluating]}
                max={100}
                step={1}
                className="py-2"
                onValueChange={(value) => updateTaxonomyWeight("evaluating", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Creating</Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{taxonomyWeights.creating}</span>
                </div>
              </div>
              <Slider
                defaultValue={[taxonomyWeights.creating]}
                max={100}
                step={1}
                className="py-2"
                onValueChange={(value) => updateTaxonomyWeight("creating", value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 4: Set Difficulty Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-medium">
              4
            </span>
            Step 4: Set Difficulty Level
          </CardTitle>
          <CardDescription>Choose the overall difficulty level for your question paper.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Label>Select Difficulty Level</Label>
            <div className="space-y-4">
              <Slider
                defaultValue={[1]}
                max={2}
                step={1}
                className="py-2"
                onValueChange={(value) => {
                  if (value[0] === 0) setDifficulty("easy")
                  else if (value[0] === 1) setDifficulty("medium")
                  else setDifficulty("hard")
                }}
              />
              <div className="flex justify-between text-sm">
                <span>Easy</span>
                <span className="text-primary font-medium">Medium</span>
                <span>Hard</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full flex items-center gap-2"
            onClick={onGenerate}
            disabled={isGenerating || totalQuestions === 0}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Question Paper...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4" />
                Generate Question Paper
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
