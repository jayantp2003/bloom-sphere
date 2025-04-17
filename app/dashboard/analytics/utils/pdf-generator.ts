import { jsPDF } from "jspdf"
import { format } from "date-fns"
import saveAs from "file-saver"

interface RubricItem {
  criteria: string
  maxScore: number
  score: number
}

interface Question {
  id: number
  question: string
  rubric: RubricItem[]
  answer: string
  totalScore: number
  maxScore: number
  taxonomyLevel: string
}

interface AnalysisData {
  title: string
  timestamp: Date | string
  source: string
  rubric: string
  overallScore: number
  maxPossibleScore: number
  taxonomyPerformance: {
    remembering: number
    understanding: number
    applying: number
    analyzing: number
    evaluating: number
    creating: number
  }
  questions: Question[]
}

export async function generateAnalysisPDF(data: AnalysisData): Promise<boolean> {
  try {
    // Create a new PDF document
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text("Learning Analytics Report", 20, 20)

    // Add subtitle with document title
    doc.setFontSize(14)
    doc.text(data.title, 20, 30)

    // Add timestamp and source
    doc.setFontSize(10)
    const timestamp = typeof data.timestamp === "string" ? data.timestamp : format(data.timestamp, "PPpp")
    doc.text(`Generated on: ${timestamp}`, 20, 40)
    doc.text(`Source: ${data.source}`, 20, 45)
    doc.text(`Rubric: ${data.rubric}`, 20, 50)

    // Add overall score
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Overall Score:", 20, 60)
    doc.setFont("helvetica", "normal")
    const percentage = Math.round((data.overallScore / data.maxPossibleScore) * 100)
    doc.text(`${data.overallScore}/${data.maxPossibleScore} (${percentage}%)`, 150, 60)

    // Add taxonomy performance
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Performance by Taxonomy Level:", 20, 70)
    doc.setFont("helvetica", "normal")

    let y = 75
    Object.entries(data.taxonomyPerformance).forEach(([key, value]) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 25, y)
      y += 5
    })

    // Add question-wise analysis
    y += 10
    doc.setFont("helvetica", "bold")
    doc.text("Question-wise Analysis:", 20, y)
    doc.setFont("helvetica", "normal")

    data.questions.forEach((question, index) => {
      y += 10

      // Check if we need a new page
      if (y > 270) {
        doc.addPage()
        y = 20
      }

      doc.setFont("helvetica", "bold")
      doc.text(`Question ${question.id}:`, 20, y)
      doc.setFont("helvetica", "normal")

      // Handle long question text with wrapping
      const questionLines = doc.splitTextToSize(question.question, 170)
      doc.text(questionLines, 25, y + 5)
      y += 5 + questionLines.length * 5

      // Add taxonomy level
      doc.text(`Taxonomy Level: ${question.taxonomyLevel}`, 25, y)
      y += 5

      // Add score
      const questionPercentage = Math.round((question.totalScore / question.maxScore) * 100)
      doc.text(`Score: ${question.totalScore}/${question.maxScore} (${questionPercentage}%)`, 25, y)
      y += 10

      // Add student answer
      doc.setFont("helvetica", "bold")
      doc.text("Student Answer:", 25, y)
      doc.setFont("helvetica", "normal")
      y += 5

      const answerLines = doc.splitTextToSize(question.answer, 165)
      doc.text(answerLines, 30, y)
      y += answerLines.length * 5 + 5

      // Add rubric evaluation
      doc.setFont("helvetica", "bold")
      doc.text("Rubric Evaluation:", 25, y)
      doc.setFont("helvetica", "normal")
      y += 5

      // Check if we need a new page for the rubric
      if (y + question.rubric.length * 5 + 15 > 280) {
        doc.addPage()
        y = 20
      }

      // Add rubric table headers
      doc.text("Criteria", 30, y)
      doc.text("Score", 140, y)
      doc.text("Max", 160, y)
      y += 5

      // Add rubric items
      question.rubric.forEach((item) => {
        doc.text(item.criteria, 30, y)
        doc.text(item.score.toString(), 140, y)
        doc.text(item.maxScore.toString(), 160, y)
        y += 5
      })

      // Add total
      doc.setFont("helvetica", "bold")
      doc.text("Total", 30, y)
      doc.text(question.totalScore.toString(), 140, y)
      doc.text(question.maxScore.toString(), 160, y)
      doc.setFont("helvetica", "normal")

      y += 10

      // Add feedback based on score
      doc.setFont("helvetica", "bold")
      doc.text("Feedback:", 25, y)
      doc.setFont("helvetica", "normal")
      y += 5

      let feedback = ""
      if (questionPercentage >= 80) {
        feedback =
          "Excellent work on this question. You demonstrated a strong understanding of the concepts and provided a comprehensive answer that addresses most of the key points in the rubric."
      } else if (questionPercentage >= 60) {
        const weakCriteria =
          question.rubric.find((r) => r.score / r.maxScore < 0.7)?.criteria.toLowerCase() || "some areas"
        feedback = `Good attempt on this question. You've covered the main points, but there's room for improvement in ${weakCriteria}. Try to provide more detailed explanations and examples in future responses.`
      } else {
        feedback =
          "This question needs more work. Focus on improving your understanding of the core concepts and providing more comprehensive answers that address all aspects of the question."
      }

      const feedbackLines = doc.splitTextToSize(feedback, 165)
      doc.text(feedbackLines, 30, y)
      y += feedbackLines.length * 5 + 15
    })

    // Save the PDF
    const filename = `learning-analytics-${data.source.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}.pdf`
    const pdfBlob = doc.output("blob")
    saveAs(pdfBlob, filename)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
