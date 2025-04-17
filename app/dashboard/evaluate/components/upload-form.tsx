"use client"

import type React from "react"
import { Brain, FileText, Loader2, Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UploadFormProps {
  isAnalyzing: boolean
  uploadedFile: File | null
  setUploadedFile: (file: File | null) => void
  handleAnalyze: () => void
}

export function UploadForm({ isAnalyzing, uploadedFile, setUploadedFile, handleAnalyze }: UploadFormProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, fileType: "pdf" | "image") => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]

      if (fileType === "pdf" && file.type === "application/pdf") {
        setUploadedFile(file)
      } else if (fileType === "image" && file.type.startsWith("image/")) {
        setUploadedFile(file)
      }
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Question Paper</CardTitle>
        <CardDescription>Upload a question paper to analyze its cognitive levels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        <Tabs defaultValue="image" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="pdf">PDF Upload</TabsTrigger>
            <TabsTrigger value="image">Image Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="pdf" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pdf-upload">Upload question paper (PDF)</Label>
              <div
                className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "pdf")}
              >
                {uploadedFile && uploadedFile.type === "application/pdf" ? (
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
          </TabsContent>

          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload question paper (Image)</Label>
              <div
                className="border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "image")}
              >
                {uploadedFile && uploadedFile.type.startsWith("image/") ? (
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-2 relative">
                      <img
                        src={URL.createObjectURL(uploadedFile) || "/placeholder.svg"}
                        alt="Uploaded question paper"
                        className="w-full h-full object-contain rounded-md"
                      />
                    </div>
                    <p className="font-medium">{uploadedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setUploadedFile(null)}>
                      Change image
                    </Button>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="mb-1 font-medium">Drag and drop your image here</p>
                    <p className="text-sm text-muted-foreground mb-3">or click to browse files</p>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <Button variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                      Browse images
                    </Button>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full flex items-center gap-2"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !uploadedFile}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Paper...
            </>
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Analyze Cognitive Levels
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
