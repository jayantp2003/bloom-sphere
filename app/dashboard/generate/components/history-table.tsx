"use client"

import { useState } from "react"
import { Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { format } from "date-fns"
import { QuestionDisplay } from "./question-display"
import { PdfDownloadButton } from "./pdf-download-button"
import type { HistoryItem, Question } from "../types"

interface HistoryTableProps {
  history: HistoryItem[]
}

export function HistoryTable({ history }: HistoryTableProps) {
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalQuestions, setModalQuestions] = useState<Question[]>([])

  const handleViewQuestions = (historyItem: HistoryItem) => {
    setSelectedHistory(historyItem)
    setModalQuestions([...historyItem.questions])
    setIsModalOpen(true)
  }

  const handleToggleSelection = (id: number) => {
    setModalQuestions(modalQuestions.map((q) => (q.id === id ? { ...q, selected: !q.selected } : q)))
  }

  const selectedQuestionsCount = modalQuestions.filter((q) => q.selected).length

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Generation History</CardTitle>
          <CardDescription>Your previously generated question sets</CardDescription>
        </CardHeader>
        <CardContent>
          {history.length > 0 ? (
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
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.source.split(".")[0] || "Generated Questions"}</TableCell>
                    <TableCell>{format(item.timestamp, "PPp")}</TableCell>
                    <TableCell>{item.source}</TableCell>
                    <TableCell>
                      {item.questionCount.mcq + item.questionCount.truefalse + item.questionCount.qna}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleViewQuestions(item)}>
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedHistory?.source.split(".")[0] || "Generated Questions"}</DialogTitle>
            <DialogDescription>
              Generated on {selectedHistory && format(selectedHistory.timestamp, "PPp")} • Source:{" "}
              {selectedHistory?.source}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <QuestionDisplay
              questions={modalQuestions}
              onToggleSelection={handleToggleSelection}
              showRubric={true}
              questionCounts={{ mcq: 10, truefalse: 10, qna: 10 }}
            />
          </div>

          <div className="flex justify-between mt-6">
            <div className="text-sm text-muted-foreground">{selectedQuestionsCount} questions selected</div>
            <div className="flex gap-2">
              <PdfDownloadButton
                questions={modalQuestions}
                selectedOnly={true}
                title={selectedHistory?.source.split(".")[0] || "Generated Questions"}
              />
              <PdfDownloadButton
                questions={modalQuestions}
                selectedOnly={false}
                title={selectedHistory?.source.split(".")[0] || "Generated Questions"}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
