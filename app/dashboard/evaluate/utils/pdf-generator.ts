import { jsPDF } from "jspdf"
import { format } from "date-fns"
import saveAs from "file-saver"

interface TaxonomyDistribution {
  remembering: number
  understanding: number
  applying: number
  analyzing: number
  evaluating: number
  creating: number
}

interface QuestionAnalysis {
  id: number
  question: string
  type: string
  taxonomy: TaxonomyDistribution
}

interface AnalysisData {
  title: string
  timestamp: Date | string
  source: string
  overallScore: number
  taxonomyDistribution: TaxonomyDistribution
  questionTypeDistribution: {
    mcq: number
    truefalse: number
    shortanswer: number
  }
  questions: QuestionAnalysis[]
}

export async function generateAnalysisPDF(data: AnalysisData): Promise<boolean> {
  try {
    // Create a new PDF document
    const doc = new jsPDF()

    // Add title
    doc.setFontSize(18)
    doc.text("Cognitive Analysis Report", 20, 20)

    // Add subtitle with document title
    doc.setFontSize(14)
    doc.text(data.title, 20, 30)

    // Add timestamp and source
    doc.setFontSize(10)
    const timestamp = typeof data.timestamp === "string" ? data.timestamp : format(data.timestamp, "PPpp")
    doc.text(`Generated on: ${timestamp}`, 20, 40)
    doc.text(`Source: ${data.source}`, 20, 45)

    // Add overall score
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Overall Complexity Score:", 20, 55)
    doc.setFont("helvetica", "normal")
    doc.text(`${data.overallScore}/100`, 150, 55)

    // Add taxonomy distribution
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text("Bloom's Taxonomy Distribution:", 20, 65)
    doc.setFont("helvetica", "normal")

    let y = 70
    Object.entries(data.taxonomyDistribution).forEach(([key, value]) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 25, y)
      y += 5
    })

    // Add question type distribution
    y += 5
    doc.setFont("helvetica", "bold")
    doc.text("Question Type Distribution:", 20, y)
    doc.setFont("helvetica", "normal")
    y += 5
    doc.text(`Multiple Choice: ${data.questionTypeDistribution.mcq}%`, 25, y)
    y += 5
    doc.text(`True/False: ${data.questionTypeDistribution.truefalse}%`, 25, y)
    y += 5
    doc.text(`Short Answer: ${data.questionTypeDistribution.shortanswer}%`, 25, y)

    // Add question-wise analysis
    y += 10
    doc.setFont("helvetica", "bold")
    doc.text("Question-wise Analysis:", 20, y)
    doc.setFont("helvetica", "normal")

    // Group questions by type
    const mcqQuestions = data.questions.filter((q) => q.type === "Multiple Choice")
    const tfQuestions = data.questions.filter((q) => q.type === "True/False")
    const saQuestions = data.questions.filter((q) => q.type === "Short Answer")

    // Add MCQ questions
    y += 10
    if (mcqQuestions.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.text("Multiple Choice Questions:", 20, y)
      doc.setFont("helvetica", "normal")
      y += 10

      mcqQuestions.forEach((question, index) => {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage()
          y = 20
        }

        doc.setFont("helvetica", "bold")
        doc.text(`Q${question.id}:`, 20, y)
        doc.setFont("helvetica", "normal")

        // Handle long question text with wrapping
        const questionLines = doc.splitTextToSize(question.question, 170)
        doc.text(questionLines, 30, y)
        y += 6 * questionLines.length

        // Add taxonomy levels
        doc.text("Bloom's Taxonomy Levels:", 25, y)
        y += 5

        Object.entries(question.taxonomy).forEach(([key, value]) => {
          if (value > 0) {
            doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 30, y)
            y += 5
          }
        })

        y += 5
      })
    }

    // Add True/False questions
    if (tfQuestions.length > 0) {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage()
        y = 20
      }

      doc.setFont("helvetica", "bold")
      doc.text("True/False Questions:", 20, y)
      doc.setFont("helvetica", "normal")
      y += 10

      tfQuestions.forEach((question) => {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage()
          y = 20
        }

        doc.setFont("helvetica", "bold")
        doc.text(`Q${question.id}:`, 20, y)
        doc.setFont("helvetica", "normal")

        // Handle long question text with wrapping
        const questionLines = doc.splitTextToSize(question.question, 170)
        doc.text(questionLines, 30, y)
        y += 6 * questionLines.length

        // Add taxonomy levels
        doc.text("Bloom's Taxonomy Levels:", 25, y)
        y += 5

        Object.entries(question.taxonomy).forEach(([key, value]) => {
          if (value > 0) {
            doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 30, y)
            y += 5
          }
        })

        y += 5
      })
    }

    // Add Short Answer questions
    if (saQuestions.length > 0) {
      // Check if we need a new page
      if (y > 250) {
        doc.addPage()
        y = 20
      }

      doc.setFont("helvetica", "bold")
      doc.text("Short Answer Questions:", 20, y)
      doc.setFont("helvetica", "normal")
      y += 10

      saQuestions.forEach((question) => {
        // Check if we need a new page
        if (y > 270) {
          doc.addPage()
          y = 20
        }

        doc.setFont("helvetica", "bold")
        doc.text(`Q${question.id}:`, 20, y)
        doc.setFont("helvetica", "normal")

        // Handle long question text with wrapping
        const questionLines = doc.splitTextToSize(question.question, 170)
        doc.text(questionLines, 30, y)
        y += 6 * questionLines.length

        // Add taxonomy levels
        doc.text("Bloom's Taxonomy Levels:", 25, y)
        y += 5

        Object.entries(question.taxonomy).forEach(([key, value]) => {
          if (value > 0) {
            doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}%`, 30, y)
            y += 5
          }
        })

        y += 5
      })
    }

    // Save the PDF
    const filename = `cognitive-analysis-${data.title.toLowerCase().replace(/\s+/g, "-")}-${format(new Date(), "yyyy-MM-dd")}.pdf`
    const pdfBlob = doc.output("blob")
    saveAs(pdfBlob, filename)

    return true
  } catch (error) {
    console.error("Error generating PDF:", error)
    return false
  }
}
