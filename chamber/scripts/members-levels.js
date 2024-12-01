const URL = "./data/member-levels.json";
import { capitalize } from "./members-utils.js";

async function getMembershipsData() {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    displayMemberships(data.memberships);
  } catch (error) {
    console.error("Error fetching memberships:", error);
  }
}

const levelModal = document.querySelector("#levelModal");
const membershipLevels = document.querySelector("#membership-levels");

function createMembershipCard({ type }) {
  const aside = document.createElement("aside");

  const title = document.createElement("h4");
  title.textContent = `${capitalize(type)} Membership Level`;
  aside.appendChild(title);

  const button = document.createElement("button");
  button.textContent = "More Info";
  button.classList.add("learn-more-btn");
  aside.appendChild(button);

  button.addEventListener("click", () => openModal(type));

  return aside;
}

function createDialogTemplate({ type, benefits, price }) {
  const div = document.createElement("div");

  const title = document.createElement("h3");
  title.textContent = `${capitalize(type)} Membership`;
  div.appendChild(title);

  const listTitle = document.createElement("h4");
  listTitle.textContent = "Benefits:";
  div.appendChild(listTitle);

  const ul = document.createElement("ul");
  ul.innerHTML = benefits.map((benefit) => `<li>${benefit}</li>`).join("");
  div.appendChild(ul);

  const priceParagraph = document.createElement("p");
  priceParagraph.innerHTML = `<b>Price</b>: ${capitalize(price)}`;
  div.appendChild(priceParagraph);

  const button = document.createElement("button");
  button.textContent = "✖";
  button.classList.add("close-modal-btn");
  button.addEventListener("click", () => levelModal.close());
  div.appendChild(button);

  return div;
}

function openModal(type) {
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const membership = data.memberships.find((m) => m.type === type);
      if (membership) {
        levelModal.innerHTML = "";
        const dialogContent = createDialogTemplate(membership);
        levelModal.appendChild(dialogContent);
        levelModal.showModal();
      } else {
        console.error(`Membership type "${type}" not found`);
      }
    })
    .catch((err) => console.error("Error fetching modal data:", err));
}

function displayMemberships(memberships) {
  membershipLevels.innerHTML = "";
  memberships
    .map(createMembershipCard)
    .forEach((card) => membershipLevels.appendChild(card));
}

document.querySelector("#today").value = new Date().toISOString().split("T")[0];

getMembershipsData();
