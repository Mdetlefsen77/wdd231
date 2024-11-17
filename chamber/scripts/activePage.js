const navLinks = document.querySelectorAll(".navigation a");

const setActiveClass = (link) => {
  navLinks.forEach((nav) => nav.classList.remove("active"));
  link.classList.add("active");
};

navLinks.forEach((link) => {
  if (link.getAttribute("href") === window.location.pathname) {
    setActiveClass(link);
  }
  link.addEventListener("click", (event) => {
    setActiveClass(event.currentTarget);
  });
});
