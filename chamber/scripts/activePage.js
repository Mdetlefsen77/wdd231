const navLinks = document.querySelectorAll(".navigation a");

const getFilename = (path) => {
  return path.split("/").pop(); 
};

const setActiveClass = (link) => {
  navLinks.forEach((nav) => nav.classList.remove("active"));
  link.classList.add("active");
};

const currentPage = getFilename(window.location.pathname);

navLinks.forEach((link) => {
  if (getFilename(link.getAttribute("href")) === currentPage) {
    setActiveClass(link);
  }

  link.addEventListener("click", (event) => {
    setActiveClass(event.currentTarget);
  });
});
