const dataUrl = "./data/members.json";

async function loadTeamData() {
  try {
    const response = await fetch(dataUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const teamGrid = document.querySelector(".team-grid");
    const teamMembers = data.team;

    teamMembers.forEach((member) => {
      const memberCard = document.createElement("div");
      memberCard.classList.add("team-member");

      memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p>${member.description}</p>
            `;

      teamGrid.appendChild(memberCard);
    });
  } catch (error) {
    console.error("Error fetching team data:", error);
  }
}

loadTeamData();
