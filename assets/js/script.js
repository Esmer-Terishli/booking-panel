const staff = [
    {
      id: 1,
      name: "Alex Rosetta",
      email: "alexyrosetta@egmail.com",
      image: "assets/image/person1.jpg",
    },
    {
      id: 2,
      name: "Maria July",
      email: "mariajuly@egmail.com",
      image: "assets/image/person2.jpg",
    },
  ];
  
  const selectPersonContainer = document.getElementById("select-person-container");
  
  function generateSelectPersonHTML(staffMember) {
    return `
      <div class="select-person" data-person-id="${staffMember.id}">
        <div class="select-image">
          <img src="${staffMember.image}" alt="Staff Image" />
        </div>
        <div class="select-description">
          <h4>${staffMember.name}</h4>
          <p>${staffMember.email}</p>
        </div>
      </div>
    `;
  }
  
  selectPersonContainer.innerHTML = staff.map(generateSelectPersonHTML).join("");
  
  const selectedPersonId = localStorage.getItem("selectedPersonId");
  if (selectedPersonId) {
    const selectedPerson = document.querySelector(`.select-person[data-person-id="${selectedPersonId}"]`);
    if (selectedPerson) {
      selectedPerson.classList.add("selected");
    }
  }
  
  const nextButtons = document.querySelectorAll(".select-next a");
  nextButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const nextPage = button.getAttribute("data-next-page");
      const selectedPerson = document.querySelector(".select-person.selected");
  
      if (selectedPerson) {
        localStorage.setItem("selectedPersonId", selectedPerson.getAttribute("data-person-id"));
        window.location.href = nextPage;
      } else {
        document.querySelector(".select-error").style.display = "block";
      }
    });
  });
  
  document.querySelectorAll(".select-person").forEach((person) => {
    person.addEventListener("click", () => {
      document.querySelectorAll(".select-person").forEach((p) => p.classList.remove("selected"));
  
      person.classList.add("selected");
  
      const nextPage = person.closest(".select").querySelector(".select-next a").getAttribute("data-next-page");
  
      localStorage.setItem("selectedPersonId", person.getAttribute("data-person-id"));
  
      window.location.href = nextPage;
    });
  });
  