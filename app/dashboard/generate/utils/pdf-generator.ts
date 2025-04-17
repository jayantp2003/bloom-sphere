import { jsPDF } from "jspdf"
import { format } from "date-fns"
import saveAs from "file-saver"
import type { Question } from "../types"

export async function generatePDF(questions: Question[], selectedOnly = false, title = "Generated Questions") {
  try {
    // Filter questions if needed
    const questionsToInclude = selectedOnly ? questions.filter((q) => q.selected) : questions

    if (questionsToInclude.length === 0) {
      console.error("No questions to include in PDF")
      return
    }

    // Create a new PDF document
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text(title, 20, 20)

    // Add timestamp
    doc.setFontSize(10)
    const timestamp = format(new Date(), "PPP")
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
    const filename = `${title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}.pdf`
    const pdfBlob = doc.output("blob")
    saveAs(pdfBlob, filename)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
