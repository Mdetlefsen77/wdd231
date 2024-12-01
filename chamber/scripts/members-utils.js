export function capitalize(phrase) {
  return phrase
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function createCardTemplate(member) {
  const card = document.createElement("section");
  const companyName = document.createElement("h2");
  const portrait = document.createElement("img");
  const address = document.createElement("p");
  const phoneNumbers = document.createElement("p");
  const website = document.createElement("a");
  const ul = document.createElement("ul");

  companyName.textContent = member.name || "No Name Provided";
  portrait.src = `images/${member.icon || "default.png"}`;
  portrait.alt = `${member.name || "Unknown"} logo`;
  portrait.setAttribute("loading", "lazy");
  portrait.setAttribute("width", "150");
  portrait.setAttribute("height", "150");
  address.textContent = member.address || "No address provided";
  phoneNumbers.textContent = member.phone || "No phone numbers";
  website.href = member.website || "#";
  website.textContent = "Website";

  const membershipLevel = document.createElement("li");
  const membership =
    {
      2: "Silver",
      3: "Gold",
    }[member.membershipLevel] || "Bronze";
  membershipLevel.innerHTML = `<b>Level</b> <br> ${membership}`;
  membershipLevel.setAttribute("class", "membership");
  ul.appendChild(membershipLevel);

  card.appendChild(companyName);
  card.appendChild(portrait);
  card.appendChild(address);
  card.appendChild(phoneNumbers);
  card.appendChild(website);
  card.appendChild(ul);

  return card;
}

export async function getMembersData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
}
