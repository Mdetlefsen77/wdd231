const dataUrl = "./data/members.json";
fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
        const teamGrid = document.querySelector('.team-grid');
        const teamMembers = data.team;

        teamMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.classList.add('team-member');

            memberCard.innerHTML = `
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <h3>${member.name}</h3>
                <p class="role">${member.role}</p>
                <p>${member.description}</p>
            `;

            teamGrid.appendChild(memberCard);
        });
    })
    .catch(error => console.error('Error fetching team data:', error));
