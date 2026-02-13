// Thread Lists

const CATEGORIES = [
  { name: "technology", color: "#b9fbc0" },
  { name: "science", color: "#cfbaf0" },
  { name: "psychology", color: "#ffcfd2" },
  { name: "society", color: "#96BDC6" },
  { name: "history", color: "#FFDAB3" },
];

console.log(CATEGORIES.find((cat) => cat.name === "society").color);

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

// Load data from Supabase

loadThread();

async function loadThread() {
  const res = await fetch(
    "https://gaztihhknenpfqcyowjg.supabase.co/rest/v1/facthive",
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhenRpaGhrbmVucGZxY3lvd2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDI0MzYsImV4cCI6MjA4NTMxODQzNn0.IeElT9OhDXXPGHI3-cIXD49gSXLQWoN0QIvXAL45SAs",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhenRpaGhrbmVucGZxY3lvd2pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3NDI0MzYsImV4cCI6MjA4NTMxODQzNn0.IeElT9OhDXXPGHI3-cIXD49gSXLQWoN0QIvXAL45SAs",
      },
    },
  );

  const data = await res.json();
  console.log(res);
  console.log(data);

  /*

  filteringData = (data) => {
    const result = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].category === "psychology") {
        result.push(data[i]);
      }
    }

    return result;
  };

  */

  createThreadsList(data);
}

// Create DOM elements: Render facts in list
threadsList.innerHTML = "";

threadsList.insertAdjacentHTML("afterbegin", "<li>Yono</li>");
function createThreadsList(dataArray) {
  const htmlArray = dataArray.map((fact) => {
    // Find the matching category color

    let matchedCategory;

    for (let i = 0; i < CATEGORIES.length; i++) {
      if (CATEGORIES[i].name === fact.category) {
        matchedCategory = CATEGORIES[i];
        break;
      }
    }

    //

    return `<li class="thread"><p>
                ${fact.thread}
                <a
                  class="link-source"
                  href=${fact.source}
                  target="_blank"
                  >(Source)</a
                >
              </p>
              <span class="tag" style="background-color: ${matchedCategory.color}"
                >${fact.category}</span
              ></li>`;
  });

  console.log(htmlArray);

  const html = htmlArray.join("");
  threadsList.insertAdjacentHTML("afterbegin", html);
}

// createThreadsList(initialFacts);

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

console.log(
  "hehe",
  [7, 64, 6, -23, 11].filter((el) => el < 10),
);

const numbers = [7, 64, 6, -23, 11];
const result = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] < 10) {
    result.push(numbers[i]);
  }
}

console.log("hehe", result);

console.log(
  "haha",
  [7, 64, 6, -23, 11].find((el) => el < 10),
);

function myFind(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] < 10) {
      return array[i];
    }
  }
}

console.log("haha2", myFind(numbers));
