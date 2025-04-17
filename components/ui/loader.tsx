import type React from "react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  text?: string
}

export function Loader({ size = "md", text, className, ...props }: LoaderProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)} {...props}>
      <div
        className={cn(
          "animate-spin rounded-full border-t-2 border-primary",
          size === "sm" && "h-4 w-4 border-2",
          size === "md" && "h-8 w-8 border-2",
          size === "lg" && "h-12 w-12 border-4",
        )}
      />
      {text && <p className="mt-2 text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
