const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const profile = document.querySelector(".profile");

hamButton.addEventListener("click", () => {
  [navigation, hamButton, profile].forEach((element) =>
    element.classList.toggle("open")
  );
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = new Date(
  document.lastModified
).toLocaleString();

const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

function createNameTags(courses) {
  const subjects = document.querySelector("#subjects");
  subjects.innerHTML = courses
    .map((course) => {
      const completedClass = course.completed ? " completed" : "";
      return `<li class="course-tag${completedClass}" id="${course.title}">${course.subject} ${course.number}</li>`;
    })
    .join("");
}

function getCreditsRequired(coursesArray) {
  const totalCredits = coursesArray.reduce(
    (sum, course) => sum + course.credits,
    0
  );
  document.querySelector("#credits").textContent = totalCredits;
}

function initializeDisplay(coursesToDisplay) {
  createNameTags(coursesToDisplay);
  getCreditsRequired(coursesToDisplay);
}

initializeDisplay(courses);

const filters = {
  all: () => initializeDisplay(courses),
  cse: () =>
    initializeDisplay(courses.filter((course) => course.subject === "CSE")),
  wdd: () =>
    initializeDisplay(courses.filter((course) => course.subject === "WDD")),
};

document.querySelector("#filter-all").addEventListener("click", filters.all);
document.querySelector("#filter-cse").addEventListener("click", filters.cse);
document.querySelector("#filter-wdd").addEventListener("click", filters.wdd);
