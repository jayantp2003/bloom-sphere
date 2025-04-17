"use client"

import { useState } from "react"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generatePDF } from "../utils/pdf-generator"
import type { Question } from "../types"

interface PdfDownloadButtonProps {
  questions: Question[]
  selectedOnly?: boolean
  title?: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
}

export function PdfDownloadButton({
  questions,
  selectedOnly = false,
  title = "Generated Questions",
  variant = "default",
}: PdfDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)
    await generatePDF(questions, selectedOnly, title)
    setIsGenerating(false)
  }

  const selectedCount = questions.filter((q) => q.selected).length
  const isDisabled = isGenerating || (selectedOnly && selectedCount === 0)

  return (
    <Button onClick={handleDownload} disabled={isDisabled} variant={variant}>
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {selectedOnly ? `Download Selected (${selectedCount})` : "Download All"}
        </>
      )}
    </Button>
  )
}
