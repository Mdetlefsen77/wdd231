import { createCardTemplate, getMembersData } from "./members-utils.js";

const URL = "data/members.json";
const display = document.querySelector("#cards");

async function displayMembers() {
  const members = await getMembersData(URL);
  display.innerHTML = "";

  members.forEach((member) => {
    const card = createCardTemplate(member);
    display.appendChild(card);
  });
}

displayMembers();

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
