"use client"

import { useState } from "react"
import { Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { SourceModal } from "./source-modal"
import { ResultsModal } from "./results-modal"

// Sample history data for demo
const sampleHistory = [
  {
    id: 1,
    timestamp: new Date("2023-05-15T14:30:22"),
    source: "Biology Textbook Chapter 4.pdf",
    title: "Photosynthesis Assessment",
  },
  {
    id: 2,
    timestamp: new Date("2023-05-10T09:15:45"),
    source: "Physics Exam 2023.pdf",
    title: "Newton's Laws Quiz",
  },
  {
    id: 3,
    timestamp: new Date("2023-04-28T11:20:18"),
    source: "Chemistry Final.pdf",
    title: "Periodic Table Assessment",
  },
]

export function HistoryTable() {
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false)
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<(typeof sampleHistory)[0] | null>(null)

  const handleViewSource = (item: (typeof sampleHistory)[0]) => {
    setSelectedItem(item)
    setIsSourceModalOpen(true)
  }

  const handleViewResults = (item: (typeof sampleHistory)[0]) => {
    setSelectedItem(item)
    setIsResultsModalOpen(true)
  }

  return (
    <>
      {sampleHistory.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Source</TableHead>
              <TableHead className="text-right">Results</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleHistory.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{format(item.timestamp, "PPp")}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <Button variant="link" className="p-0 h-auto" onClick={() => handleViewSource(item)}>
                    {item.source}
                  </Button>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => handleViewResults(item)}>
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
            Your analyzed question papers will appear here once you start using the cognitive analysis tool.
          </p>
        </div>
      )}

      {selectedItem && (
        <>
          <SourceModal
            isOpen={isSourceModalOpen}
            onClose={() => setIsSourceModalOpen(false)}
            source={selectedItem.source}
            title={selectedItem.title}
          />
          <ResultsModal isOpen={isResultsModalOpen} onClose={() => setIsResultsModalOpen(false)} item={selectedItem} />
        </>
      )}
    </>
  )
}
