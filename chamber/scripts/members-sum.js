import { createCardTemplate, getMembersData } from "./members-utils.js";

const URL = "data/members.json";
const display = document.querySelector("#business-sum");

async function displayMembers() {
  const members = await getMembersData(URL);
  const filteredMembers = members.filter(
    (member) => member.membershipLevel > 1
  );
  display.innerHTML = "";

  for (let i = 0; i < 3 && filteredMembers.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * filteredMembers.length);
    const member = filteredMembers[randomIndex];

    const card = createCardTemplate(member);
    display.appendChild(card);

    filteredMembers.splice(randomIndex, 1);
  }
}

displayMembers();
