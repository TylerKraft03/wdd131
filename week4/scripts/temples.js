const today = new Date(); // Define the today variable
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Saratoga Springs Utah",
    location: "Saratoga Springs, Utah, United States",
    dedicated: "2023, August, 13",
    area:97836,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/saratoga-springs-utah-temple/saratoga-springs-utah-temple-32872-main.jpg"
  },
  {
    templeName: "Halifax Nova Scotia",
    location: "Halifax, Nova Scotia, Canada",
    dedicated: "1999, November, 14",
    area: 10700,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/halifax-nova-scotia-temple/halifax-nova-scotia-temple-57120-main.jpg"
  },
  {
    templeName: "Winnipeg Manitoba",
    location: "Winnipeg, Manitoba, Canada",
    dedicated: "2021, October, 31",
    area: 16100,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/winnipeg-manitoba-temple/winnipeg-manitoba-temple-22437-main.jpg"
  }
];

const gallery = document.querySelector(".temple-gallery");
const navLinks = document.querySelectorAll('nav a');

/**
 * Creates the HTML for a single temple card.
 * Displays all required fields (Name, Location, Dedicated, Area, Image with alt/lazy loading).
 * @param {object} temple - The temple data object.
 */
function createTempleCard(temple) {
    let card = document.createElement('figure');
    card.classList.add('temple-card');

    let img = document.createElement('img');
    img.setAttribute('src', temple.imageUrl);
    img.setAttribute('alt', temple.templeName); // Appropriate alt value
    img.setAttribute('loading', 'lazy');        // Native lazy loading
    img.setAttribute('onerror', `this.onerror=null;this.src='https://placehold.co/400x250/766153/ffffff?text=Image+Unavailable'`); // Fallback image

    let figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `
        <h3>${temple.templeName}</h3>
        <p>Location: ${temple.location}</p>
        <p>Dedicated: ${temple.dedicated}</p>
        <p>Area: ${temple.area.toLocaleString()} sq ft</p>
    `; // All data fields displayed

    card.appendChild(img);
    card.appendChild(figcaption);
    gallery.appendChild(card);
}

/**
 * Renders the temple cards to the gallery based on the provided array.
 * @param {array} filteredTemples - An array of temple objects to display.
 */
function displayTemples(filteredTemples) {
    // Clear existing content
    gallery.innerHTML = '';
    
    // Loop through the array and create a card for each temple
    filteredTemples.forEach(createTempleCard);
}

/**
 * Removes 'active' class from all nav links and adds it to the target link.
 * @param {HTMLElement} activeLink - The link element that was clicked.
 */
function updateActiveClass(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// ------------------------------------------------------------------
// --- Navigation and Filtering ---
// ------------------------------------------------------------------

// Hamburger Button Toggle
const nav = document.querySelector('nav');
const menuButton = document.getElementById('hamburger');

if (menuButton) {
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuButton.textContent = nav.classList.contains('open') ? 'X' : '☰';
    });
}


// Navigation Links Event Handlers (Filtering logic)
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Stop the default anchor behavior

        // Update active state visual indicator
        updateActiveClass(event.target);

        // Optional: Close the menu after clicking on mobile
        if (window.innerWidth < 768) {
            nav.classList.remove('open');
            menuButton.textContent = '☰';
        }

        const filterType = event.target.textContent;
        let filteredList = [];

        switch (filterType) {
            case 'Home':
                // Home – displays all the temples
                filteredList = temples; 
                break;
            case 'Old':
                // Old – temples built before 1900
                filteredList = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(',')[0].trim());
                    return year < 1900;
                });
                break;
            case 'New':
                // New – temples built after 2000
                filteredList = temples.filter(temple => {
                    const year = parseInt(temple.dedicated.split(',')[0].trim());
                    return year > 2000;
                });
                break;
            case 'Large':
                // Large – temples larger than 90,000 square feet
                filteredList = temples.filter(temple => temple.area > 90000);
                break;
            case 'Small':
                // Small – temples smaller than 10,000 square feet
                filteredList = temples.filter(temple => temple.area < 10000);
                break;
            default:
                filteredList = temples; 
        }

        displayTemples(filteredList);
    });
});

// Initial load: Display all temples and set 'Home' as active
window.onload = () => {
    displayTemples(temples);
    // Find the 'Home' link element and set it active initially
    const homeLink = document.querySelector('.nav-link');
    if (homeLink && homeLink.textContent === 'Home') {
        updateActiveClass(homeLink);
    }
};
