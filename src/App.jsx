import { useState } from "react";
import "./style.css";
import logo from "./assets/FactHiveLogo.png";

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

function Counter() {
  const [count, setCount] = useState(5);

  return (
    <>
      <span style={{ fontSize: "50px", marginRight: "20px" }}>{count}</span>
      <button
        className="btn btn-large"
        onClick={() => setCount((count) => count + 1)}
      >
        +1
      </button>
    </>
  );
}

function App() {
  /* 1. defining state variable */
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* 2. using state variable */}
      {showForm ? <ThreadForm /> : null}
      <main className="app-main">
        <CategoryFilter />
        <ThreadList />
      </main>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
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

      <button
        className="btn btn-large btn-open"
        /* 3. updating state variable */
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Post a Fact"}
      </button>
    </header>
  );
}

const CATEGORIES = [
  { name: "technology", color: "#b9fbc0" },
  { name: "science", color: "#cfbaf0" },
  { name: "psychology", color: "#ffcfd2" },
  { name: "society", color: "#96BDC6" },
  { name: "history", color: "#FFDAB3" },
];

function ThreadForm() {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    e.preventDefault();
    console.log(text, source, category);
  }

  return (
    <form className="thread-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a mind-blowing fact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Drop the fact source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn-all-categories">All</button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
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
            <Thread
              key={fact.id}
              fact={fact}
              matchedCategory={matchedCategory}
            />
          );
        })}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Thread({ fact, matchedCategory }) {
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
}

export default App;
