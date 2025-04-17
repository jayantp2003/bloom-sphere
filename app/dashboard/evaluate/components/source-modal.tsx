"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FileText } from "lucide-react"

interface SourceModalProps {
  isOpen: boolean
  onClose: () => void
  source: string
  title: string
}

export function SourceModal({ isOpen, onClose, source, title }: SourceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>Source: {source}</DialogDescription>
        </DialogHeader>

        <div className="mt-4 p-6 border rounded-md bg-muted/50">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Source Preview</h3>
              <p className="text-sm text-muted-foreground">
                This is where the content of {source} would be displayed. In a production environment, this would show
                the actual content of the uploaded document.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
