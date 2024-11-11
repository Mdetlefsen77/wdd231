document.addEventListener("DOMContentLoaded", fetchProphetData);

async function fetchProphetData() {
  const url =
    "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const { prophets } = await response.json();
    displayProphets(prophets);
  } catch (error) {
    console.error("Failed to fetch prophet data:", error.message);
  }
}

function displayProphets(prophets) {
  const container = document.getElementById("prophet-cards");
  container.innerHTML = "";

  prophets.forEach((prophet) => {
    const card = document.createElement("div");
    card.classList.add("prophet-card");

    const createElementWithText = (tag, text) => {
      const element = document.createElement(tag);
      element.textContent = text;
      return element;
    };

    card.append(
      createElementWithText("h2", `${prophet.name} ${prophet.lastname}`),
      createElementWithText("p", `Birthdate: ${prophet.birthdate}`),
      createElementWithText("p", `Birthplace: ${prophet.birthplace}`)
    );

    const image = document.createElement("img");
    image.src = prophet.imageurl;
    image.alt = `Portrait of ${prophet.name} ${prophet.lastname}`;
    card.appendChild(image);

    container.appendChild(card);
  });
}
