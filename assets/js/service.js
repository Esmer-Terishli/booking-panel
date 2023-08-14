const services = [
    {
        "id": 1,
        "name": "Oral hygiene",
        "image": "img1.jpg",
        "duration": "1 hour",
        "price": 50.00,
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "img2.jpg",
        "duration": "1 hour 30 minutes",
        "price": 120.00,
    },
    {
        "id": 3,
        "name": "Check up",
        "image": "img3.jpg",
        "duration": "1 hour 12 minutes",
        "price": 140.00,
    }
];

function generateServiceHTML(service) {
    return `
        <div class="service-person" data-service-id="${service.id}">
            <div class="service-image">
                <img src="./assets/image/${service.image}" alt="${service.name}">
            </div>

            <div class="service-description">
                <h4>${service.name}</h4>
                <p>${service.duration}</p>
            </div>

            <div class="service-price">
                <p>${service.price}$</p>
            </div>
        </div>
    `;
}

const servicePersonContainer = document.querySelector(".service-person-container");

services.forEach((service) => {
    const serviceHTML = generateServiceHTML(service);
    servicePersonContainer.innerHTML += serviceHTML;
});

const selectedServiceId = localStorage.getItem("selectedServiceId");
if (selectedServiceId) {
    const selectedService = document.querySelector(`.service-person[data-service-id="${selectedServiceId}"]`);
    if (selectedService) {
        selectedService.classList.add("selected");
    }
}

document.querySelectorAll(".service-person").forEach((servicePerson) => {
    servicePerson.addEventListener("click", () => {
        document.querySelectorAll(".service-person").forEach((p) => p.classList.remove("selected"));
    
        servicePerson.classList.add("selected");
        
        const nextPage = servicePerson.closest(".select2").querySelector(".service-next a").getAttribute("data-next-page");
        
        localStorage.setItem("selectedServiceId", servicePerson.getAttribute("data-service-id"));
        
        window.location.href = nextPage;
    });
});


const nextButton = document.querySelector(".service-next a");
nextButton.addEventListener("click", (event) => {
    const selectedService = document.querySelector(".service-person.selected");
    if (!selectedService) {
        const serviceError = document.querySelector(".service-error");
        serviceError.style.display = "block";

        event.preventDefault();
    }
});
