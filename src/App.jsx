import "./style.css";
import logo from "./assets/FactHiveLogo.png";

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
  return <section>Thread List</section>;
}

export default App;
