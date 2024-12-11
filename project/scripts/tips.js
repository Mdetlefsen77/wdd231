document.addEventListener("DOMContentLoaded", async () => {
  const tipsContainer = document.getElementById("tips-container");
  const modal = document.getElementById("tip-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalIcon = document.getElementById("modal-icon");
  const modalDescription = document.getElementById("modal-description");
  const closeButton = document.querySelector(".close-button");

  async function loadTips() {
      try {
          const response = await fetch("data/tips.json");
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          data.forEach((tip) => {
              const tipCard = document.createElement("div");
              tipCard.className = "tip-card";

              tipCard.innerHTML = `
                  <img src="${tip.icon}" alt="${tip.category} icon" class="tip-icon" loading="lazy">
                  <h3>${tip.title}</h3>
                  <p>${tip.description}</p>
              `;

              tipCard.addEventListener("click", () => {
                  openModal(tip);
              });

              tipsContainer.appendChild(tipCard);
          });
      } catch (error) {
          console.error("Error loading tips:", error);
      }
  }

  function openModal(tip) {
      modalTitle.textContent = tip.title;
      modalIcon.src = tip.icon;
      modalIcon.alt = `${tip.category} icon`;
      modalDescription.textContent = tip.largeDescription;
      modal.style.display = "block";
  }

  closeButton.addEventListener("click", () => {
      modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });

  await loadTips();
});
