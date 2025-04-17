export async function fetchRubricAnalysisData() {
  try {
    const response = await fetch("/data/rubric-analysis.json")
    if (!response.ok) {
      throw new Error("Failed to fetch rubric analysis data")
    }
    return await response.json()
  } catch (error) {
    console.error("Error fetching rubric analysis data:", error)
    return null
  }
}
