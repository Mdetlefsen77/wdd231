import { capitalize } from "./members-utils.js";
const urlParams = new URLSearchParams(window.location.search);

const getFormData = (urlParams) => {
  console.log(urlParams);
  const keyValuePairs = {};
  for (const [key, value] of urlParams.entries()) {
    if (value) keyValuePairs[key] = decodeURIComponent(value);
  }
  return keyValuePairs;
};

const createInfoTemplate = (info) => {
  const container = document.createElement("div");

  const appendParagraph = (text) => {
    const p = document.createElement("p");
    p.textContent = text;
    container.appendChild(p);
  };

  let fullName = `Application from ${capitalize(info.first || "")} ${capitalize(
    info.last || ""
  )}`;
  if (info.organizationtitle) fullName += ` (${info.organizationtitle})`;
  appendParagraph(fullName);

  const fields = [
    { key: "email", label: "Email" },
    { key: "phone", label: "Cell Phone" },
    { key: "organization", label: "Organization Name" },
    { key: "level", label: "Membership Level", transform: capitalize },
    { key: "description", label: "Business Description" },
    { key: "hiddendate", label: "Form submitted on", transform: formatDate },
  ];

  fields.forEach(({ key, label, transform }) => {
    if (info[key]) {
      const value = transform ? transform(info[key]) : info[key];
      appendParagraph(`${label}: ${value}`);
    }
  });

  return container;
};

const formatDate = (rawDate) => {
  if (!rawDate) return "No date provided";
  const date = new Date(rawDate);
  if (isNaN(date)) return "Invalid date";
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    timeZone: "GMT",
    timeZoneName: "short",
  });
};

const displayFormData = () => {
  const formData = getFormData(urlParams);
  const resultsContainer = document.querySelector("#results");
  console.log(resultsContainer);
  if (resultsContainer) {
    const infoTemplate = createInfoTemplate(formData);
    resultsContainer.appendChild(infoTemplate);
  }
};

displayFormData();
