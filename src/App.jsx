import { useEffect, useState } from "react";
import supabase from "./supabase";

import "./style.css";
import logo from "./assets/FactHiveLogo.png";

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
        <PostForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="app-main">
        <CategoryFilter
          selectedCategory={setSelectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <PostList facts={filteredFacts} setFacts={setFacts} />
        )}
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
  { name: "entertainment", color: "#FFFACD" },
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

function PostForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Preventing Browser Reload
    e.preventDefault();
    console.log(text, source, category);
    // 2. Checking if data is valid. If so, create a new fact

    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3. Create a new fact object

      /*
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
      */

      // 3. Upload fact to Supabase and receive the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facthive")
        .insert([{ text, source, category }])
        .select();

      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to state
      if (!error) setFacts((facts) => [newFact[0], ...facts]);

      // 5. Reset the input fields (back to empty)
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form
      setShowForm(false);
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a mind-blowing fact..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Drop the fact source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
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

function PostList({ facts, setFacts }) {
  if (facts.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: "24px" }}>
        No fact for this category yet. Create the first one! 😉
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => {
          const matchedCategory = CATEGORIES.find(
            (cat) => cat.name === fact.category,
          );

          return (
            <Post
              key={fact.id}
              fact={fact}
              setFacts={setFacts}
              matchedCategory={matchedCategory}
            />
          );
        })}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

function Post({ fact, setFacts, matchedCategory }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedPost, error } = await supabase
      .from("facthive")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      // selecting the data to put and store it to useState
      .select();
    setIsUpdating(false);

    console.log(updatedPost);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedPost[0] : f)),
      );
  }

  return (
    <li key={fact.id} className="post">
      <p>
        {isDisputed ? <span className="disputed">[⛔DISPUTED]</span> : null}
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
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default App;
