"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download, Eye, Filter, Search } from "lucide-react"

// Sample combined history data
const combinedHistoryData = [
  {
    id: "gen-1",
    type: "generation",
    title: "Botany Fundamentals",
    timestamp: new Date("2023-06-15T14:30:00"),
    details: "7 questions generated",
    status: "completed",
  },
  {
    id: "eval-1",
    type: "evaluation",
    title: "Physics Midterm",
    timestamp: new Date("2023-06-14T10:15:00"),
    details: "Bloom's analysis completed",
    status: "completed",
  },
  {
    id: "ana-1",
    type: "analytics",
    title: "Student Responses - Chemistry",
    timestamp: new Date("2023-06-13T16:45:00"),
    details: "14 responses analyzed",
    status: "completed",
  },
  {
    id: "gen-2",
    type: "generation",
    title: "Mathematics Advanced Topics",
    timestamp: new Date("2023-06-12T09:20:00"),
    details: "10 questions generated",
    status: "completed",
  },
  {
    id: "eval-2",
    type: "evaluation",
    title: "Literature Quiz",
    timestamp: new Date("2023-06-11T13:50:00"),
    details: "Bloom's analysis completed",
    status: "completed",
  },
  {
    id: "ana-2",
    type: "analytics",
    title: "Student Responses - History",
    timestamp: new Date("2023-06-10T11:30:00"),
    details: "22 responses analyzed",
    status: "completed",
  },
  {
    id: "gen-3",
    type: "generation",
    title: "Computer Science Basics",
    timestamp: new Date("2023-06-09T15:10:00"),
    details: "12 questions generated",
    status: "completed",
  },
  {
    id: "eval-3",
    type: "evaluation",
    title: "Geography Final",
    timestamp: new Date("2023-06-08T08:45:00"),
    details: "Bloom's analysis completed",
    status: "completed",
  },
  {
    id: "ana-3",
    type: "analytics",
    title: "Student Responses - Biology",
    timestamp: new Date("2023-06-07T14:20:00"),
    details: "18 responses analyzed",
    status: "completed",
  },
]

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)

  // Filter the history data based on search query, type, and date
  const filteredHistory = combinedHistoryData
    .filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.details.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((item) => typeFilter === "all" || item.type === typeFilter)
    .filter(
      (item) =>
        !dateFilter ||
        (item.timestamp.getDate() === dateFilter.getDate() &&
          item.timestamp.getMonth() === dateFilter.getMonth() &&
          item.timestamp.getFullYear() === dateFilter.getFullYear()),
    )
    // Sort by timestamp (newest first)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const getTypeColor = (type: string) => {
    switch (type) {
      case "generation":
        return "bg-blue-100 text-blue-800"
      case "evaluation":
        return "bg-purple-100 text-purple-800"
      case "analytics":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const clearFilters = () => {
    setSearchQuery("")
    setTypeFilter("all")
    setDateFilter(undefined)
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">History</h1>
        <p className="text-muted-foreground">
          View your complete history of question generation, evaluations, and analytics.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>Browse and filter your past activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search history..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="generation">Question Generation</SelectItem>
                  <SelectItem value="evaluation">Cognitive Evaluation</SelectItem>
                  <SelectItem value="analytics">Learning Analytics</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFilter ? format(dateFilter, "PPP") : "Filter by date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateFilter} onSelect={setDateFilter} initialFocus />
                </PopoverContent>
              </Popover>

              <Button variant="ghost" size="icon" onClick={clearFilters} title="Clear filters">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredHistory.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Badge className={getTypeColor(item.type)} variant="outline">
                          {item.type === "generation" && "Generation"}
                          {item.type === "evaluation" && "Evaluation"}
                          {item.type === "analytics" && "Analytics"}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{format(item.timestamp, "PPP p")}</TableCell>
                      <TableCell>{item.details}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium">No results found</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-sm">
                No history items match your current filters. Try adjusting your search or filters.
              </p>
              <Button variant="outline" className="mt-4" onClick={clearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
