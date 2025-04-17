"use client"

import { useState } from "react"
import { jsPDF } from "jspdf"
import { Download, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

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

interface PdfGeneratorProps {
  questions: Question[]
  selectedOnly?: boolean
  title?: string
}

export function PdfGenerator({ questions, selectedOnly = false, title = "Generated Questions" }: PdfGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generatePdf = async () => {
    setIsGenerating(true)

    try {
      const questionsToInclude = selectedOnly ? questions.filter((q) => q.selected) : questions

      if (questionsToInclude.length === 0) {
        console.error("No questions to include in PDF")
        setIsGenerating(false)
        return
      }

      // Create a new PDF document
      const doc = new jsPDF()

      // Add title
      doc.setFontSize(18)
      doc.text(title, 20, 20)

      // Add timestamp
      doc.setFontSize(10)
      const timestamp = new Date().toLocaleString()
      doc.text(`Generated on: ${timestamp}`, 20, 30)

      // Add questions
      doc.setFontSize(12)
      let y = 40

      questionsToInclude.forEach((question, index) => {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage()
          y = 20
        }

        // Question number and text
        doc.setFont("helvetica", "bold")
        doc.text(`Q${index + 1}: `, 20, y)
        doc.setFont("helvetica", "normal")

        // Handle long question text with wrapping
        const questionLines = doc.splitTextToSize(question.question, 170)
        doc.text(questionLines, 30, y)
        y += 6 * questionLines.length

        // Question type
        doc.setFont("helvetica", "italic")
        doc.text(`Type: ${question.type}`, 20, y)
        y += 6

        // Difficulty
        doc.text(`Difficulty: ${question.difficulty}`, 20, y)
        y += 10

        // Options for MCQ
        if (question.type === "MCQ" && question.options) {
          question.options.forEach((option, optIndex) => {
            const letter = String.fromCharCode(65 + optIndex)
            const isCorrect = option === question.answer

            // Check if we need a new page
            if (y > 270) {
              doc.addPage()
              y = 20
            }

            doc.setFont("helvetica", isCorrect ? "bold" : "normal")
            const optionText = `${letter}. ${option}${isCorrect ? " (Correct)" : ""}`
            const optionLines = doc.splitTextToSize(optionText, 160)
            doc.text(optionLines, 25, y)
            y += 6 * optionLines.length
          })
        }

        // Answer for True/False
        if (question.type === "True/False") {
          doc.setFont("helvetica", "bold")
          doc.text(`Answer: ${question.answer}`, 20, y)
          y += 6
        }

        // Answer for QnA
        if (question.type === "QnA") {
          doc.setFont("helvetica", "bold")
          doc.text("Answer:", 20, y)
          y += 6

          doc.setFont("helvetica", "normal")
          const answerLines = doc.splitTextToSize(question.answer, 170)
          doc.text(answerLines, 25, y)
          y += 6 * answerLines.length
        }

        // Taxonomy levels
        doc.setFont("helvetica", "bold")
        doc.text("Bloom's Taxonomy Levels:", 20, y)
        y += 6

        doc.setFont("helvetica", "normal")
        Object.entries(question.taxonomy).forEach(([key, value]) => {
          if (value > 0) {
            doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 25, y)
            y += 5
          }
        })

        // Add spacing between questions
        y += 10
      })

      // Save the PDF
      const filename = `${title.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.pdf`
      doc.save(filename)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button onClick={generatePdf} disabled={isGenerating || (selectedOnly && !questions.some((q) => q.selected))}>
      {isGenerating ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          {selectedOnly ? `Download Selected (${questions.filter((q) => q.selected).length})` : "Download All"}
        </>
      )}
    </Button>
  )
}
