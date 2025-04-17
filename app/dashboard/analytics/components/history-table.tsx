"use client"

import { useState } from "react"
import { Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { AnalysisModal } from "./analysis-modal"

// Sample history data for demo
const sampleHistory = [
  {
    id: 1,
    timestamp: new Date("2023-05-15T14:30:22"),
    source: "Biology Midterm Exam",
    rubric: "Biology Midterm Rubric.pdf",
    score: 85,
    maxScore: 100,
  },
  {
    id: 2,
    timestamp: new Date("2023-05-10T09:15:45"),
    source: "Physics Quiz 3",
    rubric: "Physics Quiz Rubric.pdf",
    score: 72,
    maxScore: 100,
  },
  {
    id: 3,
    timestamp: new Date("2023-04-28T11:20:18"),
    source: "Chemistry Lab Report",
    rubric: "Chemistry Lab Rubric.pdf",
    score: 92,
    maxScore: 100,
  },
]

export function HistoryTable() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof sampleHistory)[0] | null>(null)

  const handleViewAnalysis = (item: (typeof sampleHistory)[0]) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  return (
    <>
      {sampleHistory.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Rubric</TableHead>
              <TableHead>Score</TableHead>
              <TableHead className="text-right">Analysis</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{format(item.timestamp, "PPp")}</TableCell>
                <TableCell>{item.source}</TableCell>
                <TableCell>{item.rubric}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>
                      {item.score}/{item.maxScore}
                    </span>
                    <Badge variant={item.score >= 80 ? "default" : item.score >= 60 ? "outline" : "destructive"}>
                      {Math.round((item.score / item.maxScore) * 100)}%
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleViewAnalysis(item)}>
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
          <h3 className="text-lg font-medium mb-2">No analysis history</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Your analyzed answer scripts will appear here once you start using the learning analytics tool.
          </p>
        </div>
      )}

      {selectedItem && <AnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />}
    </>
  )
}
