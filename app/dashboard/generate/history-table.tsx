"use client"

import { useState } from "react"
import { Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QuestionModal } from "./question-modal"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample history data for demo
const sampleHistory = [
  {
    id: 1,
    title: "Photosynthesis Questions",
    timestamp: "2023-05-15 14:30:22",
    source: "Biology Textbook Chapter 4.pdf",
    questionCount: 5,
    questions: [
      {
        id: 1,
        question: "What is photosynthesis?",
        type: "MCQ",
        options: [
          "The process by which plants make their own food using sunlight",
          "The process by which plants absorb water from soil",
          "The process by which plants release oxygen",
          "The process by which plants grow taller",
        ],
        answer: "The process by which plants make their own food using sunlight",
        taxonomy: {
          remembering: 90,
          understanding: 60,
          applying: 20,
          analyzing: 10,
          evaluating: 5,
          creating: 0,
        },
        difficulty: "Easy",
        selected: false,
      },
      {
        id: 2,
        question: "Explain why plants appear green.",
        type: "QnA",
        answer:
          "Plants appear green because chlorophyll, the main pigment used in photosynthesis, absorbs red and blue light while reflecting green light.",
        taxonomy: {
          remembering: 40,
          understanding: 85,
          applying: 30,
          analyzing: 20,
          evaluating: 10,
          creating: 0,
        },
        difficulty: "Medium",
        selected: false,
      },
      {
        id: 4,
        question: "Chlorophyll is essential for photosynthesis.",
        type: "True/False",
        answer: "True",
        taxonomy: {
          remembering: 80,
          understanding: 40,
          applying: 10,
          analyzing: 5,
          evaluating: 0,
          creating: 0,
        },
        difficulty: "Easy",
        selected: false,
      },
    ],
  },
  {
    id: 2,
    title: "Cell Division",
    timestamp: "2023-05-10 09:15:45",
    source: "Manual Input",
    questionCount: 8,
    questions: [
      {
        id: 1,
        question: "What is mitosis?",
        type: "MCQ",
        options: [
          "Cell division resulting in two identical daughter cells",
          "Cell division resulting in four haploid cells",
          "The process of DNA replication",
          "The process of protein synthesis",
        ],
        answer: "Cell division resulting in two identical daughter cells",
        taxonomy: {
          remembering: 80,
          understanding: 60,
          applying: 20,
          analyzing: 10,
          evaluating: 5,
          creating: 0,
        },
        difficulty: "Medium",
        selected: false,
      },
      {
        id: 2,
        question: "Meiosis produces haploid cells.",
        type: "True/False",
        answer: "True",
        taxonomy: {
          remembering: 70,
          understanding: 50,
          applying: 10,
          analyzing: 5,
          evaluating: 0,
          creating: 0,
        },
        difficulty: "Easy",
        selected: false,
      },
    ],
  },
  {
    id: 3,
    title: "Newton's Laws of Motion",
    timestamp: "2023-05-05 16:45:12",
    source: "Physics Textbook.pdf",
    questionCount: 6,
    questions: [
      {
        id: 1,
        question: "State Newton's First Law of Motion.",
        type: "QnA",
        answer:
          "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.",
        taxonomy: {
          remembering: 90,
          understanding: 60,
          applying: 20,
          analyzing: 10,
          evaluating: 5,
          creating: 0,
        },
        difficulty: "Medium",
        selected: false,
      },
    ],
  },
]

export function HistoryTable() {
  const [selectedHistory, setSelectedHistory] = useState<(typeof sampleHistory)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewQuestions = (history: (typeof sampleHistory)[0]) => {
    setSelectedHistory(history)
    setIsModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Generation History</CardTitle>
          <CardDescription>Your previously generated question sets</CardDescription>
        </CardHeader>
        <CardContent>
          {sampleHistory.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell className="font-medium">{history.title}</TableCell>
                    <TableCell>{history.timestamp}</TableCell>
                    <TableCell>{history.source}</TableCell>
                    <TableCell>{history.questionCount}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewQuestions(history)}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-12 w-12 text-muted-foreground/70 mb-4" />
              <h3 className="text-lg font-medium mb-2">No generation history</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Your generated question sets will appear here once you start creating them.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedHistory && (
        <QuestionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          questions={selectedHistory.questions}
          title={selectedHistory.title}
          timestamp={selectedHistory.timestamp}
          source={selectedHistory.source}
        />
      )}
    </>
  )
}
