import "./style.css";
import logo from "./assets/FactHiveLogo.png";

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

function App() {
  return (
    <>
      {/* HEADERS */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <img src={logo} height="68px" alt="Fact Hive Logo" />
            <h1>Fact Hive</h1>
          </div>
          <div className="tagline">
            <p>Share facts that matter!</p>
          </div>
        </div>

        <button className="btn btn-large btn-open">Post a Fact</button>
      </header>

      <ThreadForm />

      <main className="app-main">
        <CategoryFilter />
        <ThreadList />
      </main>
    </>
  );
}

function ThreadForm() {
  return <form className="thread-form">Thread Form</form>;
}

function CategoryFilter() {
  return <aside>Category filter</aside>;
}

function ThreadList() {
  // TEMPORARY
  const facts = initialFacts;

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => {
          const matchedCategory = CATEGORIES.find(
            (cat) => cat.name === fact.category,
          );

          return (
            <li key={fact.id} className="thread">
              <p>
                {fact.text}
                <a className="link-source" href={fact.source} target="_blank">
                  (Source)
                </a>
              </p>
              <span
                className="tag"
                style={{
                  backgroundColor: matchedCategory?.color || "#ccc",
                }}
              >
                {fact.category}
              </span>
              <div className="vote-buttons">
                <button>👍 {fact.votesInteresting}</button>
                <button>🤯 {fact.votesMindblowing}</button>
                <button>⛔ {fact.votesFalse}</button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default App;
