// Fetch data from JSON file

export function createCardTemplate(member) {
  const card = document.createElement("section");
  const companyName = document.createElement("h2");
  const portrait = document.createElement("img");
  const address = document.createElement("p");
  const phoneNumbers = document.createElement("p");
  const website = document.createElement("a");
  const ul = document.createElement("ul");

  // Configuración del contenido
  companyName.textContent = member.name || "No Name Provided";
  portrait.src = `images/${member.icon || "default.png"}`;
  portrait.alt = `${member.name || "Unknown"} logo`;
  portrait.setAttribute("loading", "lazy");
  portrait.setAttribute("width", "150");
  portrait.setAttribute("height", "150");
  address.textContent = member.address || "No address provided";
  phoneNumbers.textContent = member.phoneNumbers || "No phone numbers";
  website.href = member.website || "#";
  website.textContent = "Website";

  // Membership level
  const membershipLevel = document.createElement("li");
  const membership = {
    2: "Silver",
    3: "Gold",
  }[member.membershipLevel] || "Member";
  membershipLevel.innerHTML = `<b>Level</b> <br> ${membership}`;
  membershipLevel.setAttribute("class", "membership");
  ul.appendChild(membershipLevel);

  // Ensamblar la tarjeta
  card.appendChild(companyName);
  card.appendChild(portrait);
  card.appendChild(address);
  card.appendChild(phoneNumbers);
  card.appendChild(website);
  card.appendChild(ul);

  return card; // Devuelve el nodo creado
}

export function getMembershipName(level) {
  switch (level) {
    case 2:
      return "Silver";
    case 3:
      return "Gold";
    default:
      return "Member";
  }
}

export async function getMembersData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching members:", error);
    return [];
  }
}
