const URL = "data/members.json";
const display = document.querySelector("#cards");

// Fetch data from JSON file

async function getMembersFromJsonFile() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Failed to fetch members data:", error.message);
  }
}

const displayMembers = (members) => {
  display.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("section");
    const companyName = document.createElement("h2");
    const portrait = document.createElement("img");
    const adress = document.createElement("p");
    const phoneNumbers = document.createElement("p");
    const website = document.createElement("a");
    companyName.textContent = `${member.name}`;

    portrait.src = `images/${member.icon}`;
    portrait.alt = `${member.name} logo`;
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "150");
    portrait.setAttribute("height", "150");
    adress.textContent = member.address;
    phoneNumbers.textContent = member.phoneNumbers;
    website.setAttribute("href", member.website);
    website.textContent = "Website";

    card.appendChild(companyName);
    card.appendChild(portrait);
    card.appendChild(adress);
    card.appendChild(phoneNumbers);
    card.appendChild(website);

    display.appendChild(card);
  });
};

getMembersFromJsonFile(URL);
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");

gridbutton.addEventListener("click", () => {
  display.classList.add("grid");
  display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
  display.classList.add("list");
  display.classList.remove("grid");
});
