import { useEffect, useState } from "react";
import supabase from "./supabase";

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
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Category filtering //
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(function () {
    async function getFacts() {
      setIsLoading(true);
      const { data: facthive, error } = await supabase
        .from("facthive")
        .select("*")
        .order("votesInteresting", { ascending: false })
        .limit(100);

      console.log(error);

      if (!error) setFacts(facthive);
      else alert("There was a problem in getting data");
      setIsLoading(false);
    }
    getFacts();
  }, []);

  // Filtering on category buttons

  const filteredFacts =
    selectedCategory === "all"
      ? facts
      : facts.filter((fact) => fact.category === selectedCategory);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* 2. using state variable */}
      {showForm ? (
        <ThreadForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="app-main">
        <CategoryFilter
          selectedCategory={setSelectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {isLoading ? <Loader /> : <ThreadList facts={filteredFacts} />}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
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

// function to filter URL SOURCE

function isValidHttpUrl(string) {
  let url;
  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}

//

function ThreadForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("http://example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    // 1. Preventing Browser Reload
    e.preventDefault();
    console.log(text, source, category);
    // 2. Checking if data is valid. If so, create a new fact

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object

      const newFact = {
        id: Math.round(Math.random() * 1000000),
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      // 4. Add the new fact to the UI: add the fact to state
      setFacts((facts) => [newFact, ...facts]);

      // 5. Reset the input fields (back to empty)
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
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

function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function ThreadList({ facts }) {
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
