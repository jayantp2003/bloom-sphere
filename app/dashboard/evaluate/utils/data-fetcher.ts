export interface BloomQuestion {
  id: number
  text: string
  bloom: {
    Remembering: number
    Understanding: number
    Applying: number
    Analysing: number
    Evaluating: number
    Creating: number
  }
}

export interface BloomData {
  questions: BloomQuestion[]
}

export async function fetchBloomData(): Promise<BloomData> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bloom-2EkAli9f8EjfaNOIV8c9WiT7w4Lkei.json",
    )
    if (!response.ok) {
      throw new Error("Failed to fetch data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching Bloom data:", error)
    // Return default data if fetch fails
    return {
      questions: [
        {
          id: 1,
          text: "What are the key differences between classification and regression tasks in supervised learning, and how do you determine which algorithm to use for a specific problem?",
          bloom: {
            Remembering: 0.05,
            Understanding: 0.1,
            Applying: 0.2,
            Analysing: 0.4,
            Evaluating: 0.25,
            Creating: 0.0,
          },
        },
        {
          id: 2,
          text: "How does clustering differ from dimensionality reduction, and can you provide real‑world examples of where each is applied?",
          bloom: {
            Remembering: 0.05,
            Understanding: 0.1,
            Applying: 0.3,
            Analysing: 0.45,
            Evaluating: 0.1,
            Creating: 0.0,
          },
        },
        {
          id: 3,
          text: "What are common evaluation metrics for classification models, and how do precision, recall, and F1‑score relate to each other?",
          bloom: {
            Remembering: 0.2,
            Understanding: 0.4,
            Applying: 0.0,
            Analysing: 0.3,
            Evaluating: 0.1,
            Creating: 0.0,
          },
        },
        {
          id: 4,
          text: "How do convolutional neural networks (CNNs) and recurrent neural networks (RNNs) differ in their architecture and applications?",
          bloom: {
            Remembering: 0.05,
            Understanding: 0.15,
            Applying: 0.1,
            Analysing: 0.6,
            Evaluating: 0.1,
            Creating: 0.0,
          },
        },
        {
          id: 5,
          text: "What steps can be taken to identify and mitigate bias in machine learning models, and why is this an important consideration?",
          bloom: {
            Remembering: 0.05,
            Understanding: 0.1,
            Applying: 0.3,
            Analysing: 0.25,
            Evaluating: 0.2,
            Creating: 0.1,
          },
        },
      ],
    }
  }
}

export function calculateOverallBloomDistribution(questions: BloomQuestion[]): Record<string, number> {
  const distribution: Record<string, number> = {
    Remembering: 0,
    Understanding: 0,
    Applying: 0,
    Analysing: 0,
    Evaluating: 0,
    Creating: 0,
  }

  if (questions.length === 0) return distribution

  questions.forEach((question) => {
    Object.entries(question.bloom).forEach(([key, value]) => {
      distribution[key] = (distribution[key] || 0) + value
    })
  })

  // Calculate average
  Object.keys(distribution).forEach((key) => {
    distribution[key] = Math.round((distribution[key] / questions.length) * 100)
  })

  return distribution
}

export function calculateComplexityScore(distribution: Record<string, number>): number {
  // Weight higher-order thinking skills more heavily
  const weights = {
    Remembering: 0.1,
    Understanding: 0.2,
    Applying: 0.4,
    Analysing: 0.6,
    Evaluating: 0.8,
    Creating: 1.0,
  }

  let weightedSum = 0
  let totalWeight = 0

  Object.entries(distribution).forEach(([key, value]) => {
    weightedSum += value * weights[key as keyof typeof weights]
    totalWeight += value
  })

  return Math.round((weightedSum / totalWeight) * 100)
}
