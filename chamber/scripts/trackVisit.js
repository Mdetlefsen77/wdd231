document.addEventListener("DOMContentLoaded", function () {
  const visitMessage = document.querySelector(".visit-message");
  const lastVisit = localStorage.getItem("lastVisit");

  const currentDate = new Date();
  const currentTime = currentDate.getTime();

  if (lastVisit) {
    const timeDiff = Math.floor((currentTime - lastVisit) / (1000 * 3600 * 24));
    if (timeDiff < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      visitMessage.textContent = `You last visited ${timeDiff} day${
        timeDiff !== 1 ? "s" : ""
      } ago.`;
    }
  } else {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  }

  localStorage.setItem("lastVisit", currentTime);
});
