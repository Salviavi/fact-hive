const CATEGORIES = [
  { name: "technology", color: "#b9fbc0" },
  { name: "science", color: "#cfbaf0" },
  { name: "psychology", color: "#ffcfd2" },
  { name: "society", color: "#96BDC6" },
  { name: "history", color: "#FFDAB3" },
];

const initialFacts = [
  {
    id: 1,
    text: "Next.js is developed by the team at Vercel",
    source: "https://nextjs.org/governance",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2024,
  },
  {
    id: 2,
    text: "While children who are exposed to childhood violence may have more problems as adults, they're not automatically doomed to become abusers themselves",
    source:
      "https://developingchild.harvard.edu/resources/briefs/8-things-remember-child-development/",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2023,
  },
  {
    id: 3,
    text: "Vienna is the capital of Austria",
    source: "https://www.britannica.com/place/Vienna",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

// LINK TO APP SAMPLE DATA: https://docs.google.com/spreadsheets/d/1eeldcA_OwP4DHYEvjG0kDe0cRys-cDPhc_E9P9G1e3I/edit#gid=0

// 👍 🤯 ⛔️
