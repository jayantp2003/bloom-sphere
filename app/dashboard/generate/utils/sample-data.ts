// QnA Questions
export const qaQuestions = [
  {
    id: 1,
    question:
      "Describe the economic importance of both algae and gymnosperms, giving at least two distinct uses for each group.",
    type: "QnA",
    answer:
      "Algae contribute commercially as sources of hydrocolloids (e.g., algin from brown algae, carrageenan from red algae) used in food and pharmaceutical industries, and agar from Gelidium/Gracilaria for microbiological media. Gymnosperms provide timber for construction and paper, resin and turpentine from conifers, and ornamental value in horticulture.",
    rubric: {
      points: 10,
      full_marks:
        "10 points if student names ≥2 distinct uses for algae AND ≥2 for gymnosperms, explains the commercial importance of each use, and uses correct botanical terms and examples.",
      partial_marks:
        "5–9 points depending on how many elements are correct (e.g. missing one group's second use, lacking some explanations or terminology).",
      no_marks: "0–4 points if fewer than two valid uses per group OR missing key explanations and terminology.",
    },
    taxonomy: {
      remembering: 40,
      understanding: 60,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 2,
    question:
      "Compare and contrast isogamous, anisogamous, and oogamous sexual reproduction in algae. For each type, define the gamete configuration and give one representative genus.",
    type: "QnA",
    answer:
      "In isogamy, gametes are morphologically identical and motile (e.g., Ulothrix). In anisogamy, gametes differ in size but both are motile (e.g., Eudorina with a larger and a smaller flagellated gamete). In oogamy, the female gamete is large and non‑motile, while the male is small and motile (e.g., Volvox).",
    rubric: {
      points: 10,
      full_marks:
        "10 points if student accurately defines isogamy, anisogamy, and oogamy; gives one correct genus for each; highlights size and motility differences; and uses precise terms.",
      partial_marks: "5–9 points depending on completeness (e.g. one missing genus or one comparison aspect).",
      no_marks: "0–4 points if definitions, examples, or comparisons are largely missing or incorrect.",
    },
    taxonomy: {
      remembering: 30,
      understanding: 10,
      applying: 0,
      analyzing: 60,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Hard",
    selected: false,
  },
  {
    id: 3,
    question: "Explain why Sphagnum mosses are ecologically important in their natural habitats.",
    type: "QnA",
    answer:
      "Sphagnum forms dense mats that retain water, creating boggy conditions which slow decomposition and build peat; this regulates water tables, prevents soil erosion, and sequesters carbon, making them keystone species in peatland ecosystems.",
    rubric: {
      points: 10,
      full_marks:
        "10 points if student describes ≥2 distinct ecological roles, explains impacts on both water regulation and carbon storage, and uses correct ecological terminology.",
      partial_marks: "5–9 points depending on number of roles described and depth of explanations.",
      no_marks: "0–4 points if fewer than two roles or lacking explanations and terminology.",
    },
    taxonomy: {
      remembering: 20,
      understanding: 50,
      applying: 0,
      analyzing: 30,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 4,
    question: "What key features distinguish green algae (Chlorophyceae) from red algae (Rhodophyceae)?",
    type: "QnA",
    answer:
      "Chlorophyceae possess chlorophyll a and b, store starch in pyrenoids, have flagellated zoospores, and occur in fresh/brackish habitats (e.g., Spirogyra). Rhodophyceae contain phycoerythrin in addition to chlorophyll a, store floridean starch, lack flagella, and are predominantly marine (e.g., Porphyra).",
    rubric: {
      points: 10,
      full_marks:
        "10 points if student lists pigments, storage products, motility, and habitat correctly for both groups, explains functional implications of pigment differences, and uses correct terms with examples.",
      partial_marks: "5–9 points depending on how many categories are correct and depth of explanation.",
      no_marks: "0–4 points if fewer than two categories or missing explanations/terminology.",
    },
    taxonomy: {
      remembering: 25,
      understanding: 25,
      applying: 0,
      analyzing: 50,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 5,
    question:
      "Both gymnosperms and angiosperms produce seeds, yet they are classified separately. Explain one key botanical difference that justifies this separation.",
    type: "QnA",
    answer:
      "Angiosperms enclose their ovules within an ovary that develops into a fruit, providing protection and dispersal mechanisms; gymnosperms bear naked ovules on cone scales without an enclosing ovary.",
    rubric: {
      points: 10,
      full_marks:
        "10 points if student identifies the ovary/fruit vs. naked seed distinction, explains why ovule enclosure matters (protection/dispersal), and uses precise terms.",
      partial_marks: "5–9 points depending on level of detail and terminology.",
      no_marks: "0–4 points if key difference is misidentified or explanations/terminology are missing.",
    },
    taxonomy: {
      remembering: 20,
      understanding: 30,
      applying: 0,
      analyzing: 30,
      evaluating: 20,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 6,
    question:
      "In bryophytes and pteridophytes, the dominant life phase differs—identify which phase dominates in each group, and explain why this difference reflects their adaptations.",
    type: "QnA",
    answer:
      "Bryophytes are gametophyte‑dominant, favoring a moisture‑dependent haploid stage that ensures gamete mobility. Pteridophytes are sporophyte‑dominant, with vascularized diploid bodies that overcome water dependence for dispersal and support larger structures.",
    rubric: {
      points: 10,
      full_marks:
        "10 points if student correctly identifies the dominant phase for both groups, links phase dominance to water dependence and vascular adaptation, and uses correct terminology.",
      partial_marks: "5–9 points depending on accuracy of identification and depth of adaptation linkage.",
      no_marks: "0–4 points if phase dominance is misidentified or lacks adaptation explanation/terminology.",
    },
    taxonomy: {
      remembering: 20,
      understanding: 30,
      applying: 0,
      analyzing: 50,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
]

// MCQ Questions
export const mcqQuestions = [
  {
    id: 7,
    question: "Which pigment is most responsible for the brown coloration in Phaeophyceae algae?",
    type: "MCQ",
    options: ["A) Chlorophyll b", "B) Fucoxanthin", "C) Phycoerythrin", "D) Carotene"],
    answer: "B) Fucoxanthin",
    taxonomy: {
      remembering: 100,
      understanding: 0,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
  {
    id: 8,
    question: 'Bryophytes are often called the "amphibians of the plant kingdom" because they:',
    type: "MCQ",
    options: [
      "A) Have both vascular and non‑vascular tissues",
      "B) Require water for sexual reproduction",
      "C) Can live both in soil and water permanently",
      "D) Produce spores and seeds",
    ],
    answer: "B) Require water for sexual reproduction",
    taxonomy: {
      remembering: 0,
      understanding: 100,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
  {
    id: 9,
    question:
      "A filamentous green alga found in freshwater has cup‑shaped chloroplasts and reproduces sexually by fusion of two similar flagellated gametes. Which term correctly describes its mode of sexual reproduction, and which class does it belong to?",
    type: "MCQ",
    options: [
      "A) Oogamous; Rhodophyceae",
      "B) Anisogamous; Phaeophyceae",
      "C) Isogamous; Chlorophyceae",
      "D) Heterogamous; Chlorophyceae",
    ],
    answer: "C) Isogamous; Chlorophyceae",
    taxonomy: {
      remembering: 0,
      understanding: 20,
      applying: 80,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 10,
    question:
      "Match the following pairs (one is incorrect):\n(a) Chlamydomonas – Algae\n(b) Cycas – Pteridophyte\n(c) Selaginella – Pteridophyte\n(d) Sphagnum – Moss\nWhich pairing is wrong?",
    type: "MCQ",
    options: ["A) (a)", "B) (b)", "C) (c)", "D) (d)"],
    answer: "B) (b)",
    taxonomy: {
      remembering: 0,
      understanding: 0,
      applying: 0,
      analyzing: 100,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Hard",
    selected: false,
  },
  {
    id: 11,
    question:
      "A botanist discovers a plant with true roots, stems and leaves bearing sporangia on leaf‑like appendages, plus a free‑living prothallus requiring a moist habitat. This plant produces only one kind of spore. Identify its group and spore condition.",
    type: "MCQ",
    options: [
      "A) Gymnosperm; Heterosporous",
      "B) Bryophyte; Homosporous",
      "C) Pteridophyte; Homosporous",
      "D) Angiosperm; Heterosporous",
    ],
    answer: "C) Pteridophyte; Homosporous",
    taxonomy: {
      remembering: 0,
      understanding: 0,
      applying: 100,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 12,
    question:
      "In which system of classification were organisms grouped based solely on superficial features like habit and leaf shape, often giving equal weight to vegetative and sexual characters?",
    type: "MCQ",
    options: [
      "A) Bentham & Hooker's natural system",
      "B) Linnaeus's artificial system",
      "C) Whittaker's five‑kingdom system",
      "D) Modern phylogenetic system",
    ],
    answer: "B) Linnaeus's artificial system",
    taxonomy: {
      remembering: 100,
      understanding: 0,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
]

// True/False Questions
export const tfQuestions = [
  {
    id: 13,
    statement:
      "Numerical taxonomy assigns equal weight to all observable characteristics and uses computer-based analysis to classify organisms by calculating similarity coefficients among hundreds of traits.",
    question:
      "Numerical taxonomy assigns equal weight to all observable characteristics and uses computer-based analysis to classify organisms by calculating similarity coefficients among hundreds of traits.",
    type: "True/False",
    answer: "True",
    taxonomy: {
      remembering: 90,
      understanding: 10,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
  {
    id: 14,
    statement:
      "In bryophytes, the dominant, photosynthetic gametophyte stage is free‑living, while the sporophyte stage remains attached to and nutritionally dependent on the gametophyte.",
    question:
      "In bryophytes, the dominant, photosynthetic gametophyte stage is free‑living, while the sporophyte stage remains attached to and nutritionally dependent on the gametophyte.",
    type: "True/False",
    answer: "True",
    taxonomy: {
      remembering: 90,
      understanding: 10,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
  {
    id: 15,
    statement: "Brown algae store food reserves primarily in the form of laminarin and mannitol.",
    question: "Brown algae store food reserves primarily in the form of laminarin and mannitol.",
    type: "True/False",
    answer: "True",
    taxonomy: {
      remembering: 90,
      understanding: 10,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
  {
    id: 16,
    statement:
      "Gymnosperms are homosporous, producing only one type of spore that develops into a bisexual gametophyte.",
    question:
      "Gymnosperms are homosporous, producing only one type of spore that develops into a bisexual gametophyte.",
    type: "True/False",
    answer: "False",
    taxonomy: {
      remembering: 20,
      understanding: 20,
      applying: 0,
      analyzing: 20,
      evaluating: 40,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 17,
    statement:
      "Ulothrix exhibits oogamous sexual reproduction, combining a large non‑motile female gamete with a smaller motile male gamete.",
    question:
      "Ulothrix exhibits oogamous sexual reproduction, combining a large non‑motile female gamete with a smaller motile male gamete.",
    type: "True/False",
    answer: "False",
    taxonomy: {
      remembering: 20,
      understanding: 20,
      applying: 0,
      analyzing: 20,
      evaluating: 40,
      creating: 0,
    },
    difficulty: "Medium",
    selected: false,
  },
  {
    id: 18,
    statement:
      "Chlorella, a unicellular green alga rich in proteins, has been used as a food supplement even by space travelers.",
    question:
      "Chlorella, a unicellular green alga rich in proteins, has been used as a food supplement even by space travelers.",
    type: "True/False",
    answer: "True",
    taxonomy: {
      remembering: 90,
      understanding: 10,
      applying: 0,
      analyzing: 0,
      evaluating: 0,
      creating: 0,
    },
    difficulty: "Easy",
    selected: false,
  },
]

// Combined questions
export const allQuestions = [...qaQuestions, ...mcqQuestions, ...tfQuestions]

// Sample history data
export const sampleHistoryData = [
  {
    id: "hist-1",
    timestamp: new Date(),
    source: "Botany Fundamentals.pdf",
    questionCount: {
      mcq: 6,
      truefalse: 6,
      qna: 6,
    },
    questions: allQuestions,
  },
]
