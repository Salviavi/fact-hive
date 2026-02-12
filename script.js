// Thread Lists

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

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const threadsList = document.querySelector(".threads-list");

console.dir(btn);

// Create DOM elements: Render facts in list
threadsList.innerHTML = "";

threadsList.insertAdjacentHTML("afterbegin", "<li>Yono</li>");
function createThreadsList(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="thread"><p>
                ${fact.text}
                <a
                  class="link-source"
                  href=${fact.source}
                  target="_blank"
                  >(Source)</a
                >
              </p>
              <span class="tag" style="background-color: #cfbaf0"
                >${fact.category}</span
              ></li>`,
  );

  console.log(htmlArray);

  const html = htmlArray.join("");
  threadsList.insertAdjacentHTML("afterbegin", html);
}

createThreadsList(initialFacts);

// Toggle form visibily

btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Post a Fact";
  }
});
