// First, let's create a fallback data constant with the provided JSON
const FALLBACK_RUBRIC_DATA = {
  question1: {
    question:
      "Evaluate the effectiveness of various audio display configurations (stationary, head-motion-linked, and hand-motion-linked) in enhancing spatial awareness and immersive experience in virtual environments.",
    bloom_category: "Evaluating",
    student_answer:
      "Stationary audio stays in one place, giving a basic ambient feel but not very helpful for locating sounds. Head‑motion‑linked audio improves localization as sounds change when you turn your head. Hand‑motion‑linked audio is good for interaction tasks because sounds follow your hand movements and make it more engaging.",
    rubric_breakdown: {
      "Explanation of each configuration (1 mark)": 1,
      "Impact on spatial awareness (1 mark)": 1,
      "Immersion impact (1 mark)": 1,
    },
    total_score: 3,
  },
  question2: {
    question: "The concept of embodiment relates to the sense of presence in virtual reality. Justify.",
    bloom_category: "Understanding",
    student_answer:
      "Embodiment is when you feel like the virtual body you're seeing is your own, which makes you feel more present. It helps users feel inside the VR world.",
    rubric_breakdown: {
      "Definition of embodiment (1 mark)": 1,
      "Connection to presence (1 mark)": 1,
      "Examples or justifications (1 mark)": 0,
    },
    total_score: 2,
  },
  question3: {
    question:
      "Considering the three dimensions of presence (personal, social, environmental), how can VR designers optimize each aspect to enhance the overall experience of users in a collaborative virtual environment?",
    bloom_category: "Applying",
    student_answer:
      "Designers can use detailed avatars for personal presence and voice chat for social presence, but I'm not sure about environmental presence.",
    rubric_breakdown: {
      "Personal presence (1 mark)": 1,
      "Social presence (1 mark)": 1,
      "Environmental presence (1 mark)": 0,
    },
    total_score: 2,
  },
  question4: {
    question:
      "Using the 'Counterproductive' element of DICE, how can VR be utilized in corporate settings to train employees in soft skills such as conflict resolution and customer service?",
    bloom_category: "Applying",
    student_answer:
      "Counterproductive means using VR to punish mistakes and stop employees from doing wrong. In corporate settings, VR can show employees when they fail and correct them later.",
    rubric_breakdown: {
      "Explanation of 'Counterproductive' in DICE (1 mark)": 1,
      "Application to soft skills training (1 mark)": 0,
      "Value of VR in corporate settings (1 mark)": 0,
    },
    total_score: 1,
  },
  question5: {
    question:
      "How could a game development team integrate principles of responsible gaming to ensure inclusivity and accessibility while designing a fast-paced competitive mobile game?",
    bloom_category: "Creating",
    student_answer:
      "Responsible gaming means adding age ratings and warnings to games. Inclusivity is about having characters with different skin tones. Accessibility is just increasing text size.",
    rubric_breakdown: {
      "Principles of responsible gaming (1 mark)": 1,
      "Inclusivity features (1 mark)": 1,
      "Accessibility options (1 mark)": 1,
    },
    total_score: 3,
  },
  question6: {
    question:
      "In the context of serious games, how can game developers use feedback, rewards, and punishment mechanics to simulate real-life decision-making consequences in a business strategy game?",
    bloom_category: "Applying",
    student_answer:
      "Feedback appears as messages telling you what happened. Rewards give you extra points for good moves, while punishment takes away lives when you make bad business choices.",
    rubric_breakdown: {
      "Role of feedback (1 mark)": 1,
      "Use of rewards (1 mark)": 1,
      "Punishment mechanics (1 mark)": 1,
    },
    total_score: 3,
  },
  question7: {
    question:
      "Can the Proteus effect contribute to improved rehabilitation processes for individuals with physical disabilities when using avatars that display desired physical abilities in virtual environments? Justify.",
    bloom_category: "Evaluating",
    student_answer:
      "The Proteus effect is when your behavior matches what you see in your avatar. In rehab, using a strong avatar can motivate patients. This can improve exercises.",
    rubric_breakdown: {
      "Explanation of the Proteus effect (1 mark)": 1,
      "Application to rehabilitation (1 mark)": 1,
      "Justification (1 mark)": 0,
    },
    total_score: 2,
  },
  question8: {
    question:
      "What is ideation, and how does it fit into the interaction design process? Explain the difference between sketching, wireframing, and prototyping, and discuss their respective benefits.",
    bloom_category: "Understanding",
    student_answer:
      "Ideation is brainstorming ideas in design. Sketching lets you draw interfaces quickly, wireframing shows the layout boxes but you can't click, and prototyping makes it clickable. Sketching boosts creativity.",
    rubric_breakdown: {
      "Definition of ideation and its role (1 mark)": 1,
      "Explanation of sketching, wireframing, and prototyping (1.5 marks)": 1.5,
      "Benefits of each method (1.5 marks)": 0.5,
    },
    total_score: 3,
  },
  question9: {
    question:
      "What are some of the ethical considerations associated with designing interactions for virtual reality experiences? How can designers ensure that their interactions are respectful and responsible towards the user and the environment?",
    bloom_category: "Evaluating",
    student_answer:
      "Ethical issues include user data being stolen and people getting dizzy in VR. Designers should test with diverse users and use clear privacy policies.",
    rubric_breakdown: {
      "Ethical considerations (2 marks)": 2,
      "Strategies for ethical design (2 marks)": 2,
    },
    total_score: 4,
  },
  question10: {
    question:
      "You are designing a virtual reality training program for firefighters. How would you use 6DoF to create a more realistic training experience and enhance the user's ability to navigate and interact with their environment? What types of movements would you track with 6DoF, and how would you ensure they are used in a way that enhances the training experience and does not cause any harm to the user or others?",
    bloom_category: "Applying",
    student_answer:
      "6DoF tracks position and rotation in VR. Firefighters can move and reach objects realistically. You should limit fast movements to prevent falling.",
    rubric_breakdown: {
      "Explanation of 6DoF (1 mark)": 1,
      "Application in firefighter training (1.5 marks)": 1,
      "Safety considerations (1.5 marks)": 1,
    },
    total_score: 3,
  },
  question11: {
    question:
      "You are designing a virtual reality product for a gaming company. How would you determine whether an optical-based display or a video see-through head-mounted display would be more appropriate for this use case? What factors would you consider when making this decision, and how would your choice impact the user's gaming experience?",
    bloom_category: "Analysing",
    student_answer:
      "Optical displays let you see digital content overlaid directly on the real world but video see‑through shows the real world through a camera, which can introduce lag. For games, optical is better for immersion but video see‑through is useful for AR navigation.",
    rubric_breakdown: {
      "Comparison of display types (1.5 marks)": 1,
      "Factors influencing choice (1 mark)": 1,
      "Impact on gaming experience (1.5 marks)": 1,
    },
    total_score: 3,
  },
  question12: {
    question:
      "Considering the multi-modal display systems that integrate visual, audio, haptic, olfactory, and gustatory displays, what are the challenges and potential benefits of creating a fully immersive multisensory virtual reality experience?",
    bloom_category: "Analysing",
    student_answer: "Challenges include expensive equipment. Benefits are better realism in VR.",
    rubric_breakdown: {
      "Challenges (2 marks)": 1,
      "Potential benefits (2 marks)": 1,
    },
    total_score: 2,
  },
  question13: {
    question:
      "Considering the different motivations outlined in Bartle's Taxonomy of Player Types, how can a game designer create an MMORPG that caters to Achievers, Explorers, Socializers, and Killers alike?",
    bloom_category: "Creating",
    student_answer: "Achievers get points for completing quests, and Socializers can chat in guilds.",
    rubric_breakdown: {
      "Explanation of Bartle's Taxonomy (1 mark)": 0,
      "Design strategies for Achievers (1 mark)": 1,
      "Design strategies for Explorers (1 mark)": 0,
      "Design strategies for Socializers (1 mark)": 1,
      "Design strategies for Killers (1 mark)": 0,
    },
    total_score: 2,
  },
  question14: {
    question:
      "You have been hired to design a virtual reality product for a military training program. How would you use haptic feedback to help train soldiers to perform certain tasks and simulations? What types of haptic feedback would you use, and how would you ensure they are used in a way that enhances the training experience and does not cause any harm to the user or others?",
    bloom_category: "Creating",
    student_answer:
      "Haptic feedback can simulate weapon recoil. Using vibration vests and tactile gloves works well, and you must calibrate intensity to avoid pain or injury.",
    rubric_breakdown: {
      "Role of haptic feedback in training (1 mark)": 1,
      "Types of haptic feedback (2 marks)": 2,
      "Safety and usability considerations (2 marks)": 1,
    },
    total_score: 4,
  },
}

export async function fetchRubricAnalysisData() {
  try {
    // First try to fetch from the JSON file
    const response = await fetch("/data/rubric-analysis.json")

    if (!response.ok) {
      console.warn("Failed to fetch rubric analysis data from file, using fallback data")
      return FALLBACK_RUBRIC_DATA
    }

    // Try to parse the JSON
    try {
      return await response.json()
    } catch (parseError) {
      console.warn("Failed to parse rubric analysis JSON, using fallback data", parseError)
      return FALLBACK_RUBRIC_DATA
    }
  } catch (error) {
    console.warn("Error fetching rubric analysis data, using fallback data:", error)
    return FALLBACK_RUBRIC_DATA
  }
}
