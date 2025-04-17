export type QuestionType = "MCQ" | "True/False" | "QnA"
export type DifficultyLevel = "Easy" | "Medium" | "Hard"

export interface RubricDetails {
  points: number
  full_marks: string
  partial_marks: string
  no_marks: string
}

export interface Question {
  id: number
  question?: string
  statement?: string
  type: QuestionType
  options?: string[]
  answer: string | boolean
  taxonomy: {
    remembering: number
    understanding: number
    applying: number
    analyzing: number
    evaluating: number
    creating: number
  }
  difficulty?: DifficultyLevel
  selected: boolean
  rubric?: string[] | RubricDetails
}

export interface HistoryItem {
  id: string
  timestamp: Date
  source: string
  questionCount: {
    mcq: number
    truefalse: number
    qna: number
  }
  questions: Question[]
}

export interface TaxonomyWeights {
  remembering: number
  understanding: number
  applying: number
  analyzing: number
  evaluating: number
  creating: number
}

export interface QuestionCounts {
  mcq: number
  truefalse: number
  qna: number
}
