const today = new Date(); // Define the today variable
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const characters = [
    { name: "Eleven", season: 1 },
    { name: "Dustin Henderson", season: 1 },
    { name: "Steve Harrington", season: 1 },
    { name: "Robin Buckley", season: 3 },
    { name: "Max Mayfield", season: 2 },
    { name: "Jim Hopper", season: 1 },
    { name: "Lucas Sinclair", season: 1 },
    { name: "Will Byers", season: 1 },
    { name: "Mike Wheeler", season: 1 },
    { name: "Nancy Wheeler", season: 1 },
    { name: "Jonathan Byers", season: 1 },
    { name: "Joyce Byers", season: 1 },
    { name: "Murray Bauman", season: 2 }
];

// --- DOM Interaction: Selecting and Modifying ---
const form = document.getElementById('sweepstakesForm');
const characterSelect = document.getElementById('character');
const outputDiv = document.getElementById('output');
const localStorageCheckDiv = document.getElementById('checkLocalStorage');

// --- Function 1: Populate Select and Check LocalStorage ---
function initializeForm() {
    // Use array method (forEach) to build options
    characters.forEach(char => {
        const option = document.createElement('option');
        option.value = char.name;
        option.textContent = char.name;
        characterSelect.appendChild(option);
    });

    // Check localStorage
    const storedEmail = localStorage.getItem('sweepstakes_email');

    // Conditional branching
    if (storedEmail) {
        // Template literal for output
        outputDiv.innerHTML = `
                    <p class="error">
                        🛑 **ENTRY DENIED:** This browser has already submitted an entry 
                        with the email: **${storedEmail}**. Only one entry per person is allowed!
                    </p>
                `;
        // DOM modification: Disable the submit button
        document.getElementById('submitButton').disabled = true;
        document.getElementById('submitButton').textContent = 'Entry Closed';
    } else {
        // Template literal for output
        localStorageCheckDiv.innerHTML = `
                    <p>Good luck! You have not entered yet. Submit your details above.</p>
                `;
    }
}

// --- Function 2: Handle Form Submission (Event Handler) ---
function handleSubmit(event) {
    // Prevent default form submission
    event.preventDefault();

    // DOM selection and value retrieval
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const character = characterSelect.value;

    // Validation
    if (!name || !email || !character) {
        // Template literal for output
        outputDiv.innerHTML = `<p class="error">All fields are required to submit!</p>`;
        return;
    }

    // Conditional Branching & Array Method (find)
    const favoriteChar = characters.find(char => char.name === character);
    const debutSeason = favoriteChar ? favoriteChar.season : "unknown";

    let message;

    if (debutSeason <= 1) { // Conditional Branching
        message = `
                    <p>Excellent Choice! **${name}**, your favorite character, ${character}, 
                    is an OG (debuted in Season ${debutSeason})! Your entry has been received.</p>
                `;
    } else {
        message = `
                    <p>Great Choice! **${name}**, your favorite character, ${character}, 
                    is a later-season favorite (debuted in Season ${debutSeason}). Your entry has been received.</p>
                `;
    }

    // Store email in localStorage (for one-time entry)
    localStorage.setItem('sweepstakes_email', email);

    // DOM Modification: Display success message (using Template Literals)
    outputDiv.innerHTML = `
                <div style="color: var(--st-accent);">
                    <p>🎉 **SUBMISSION SUCCESS!** 🎉</p>
                    ${message}
                    <p>Your entry details: ${name} / ${email}</p>
                    <p>Thank you for entering the Hawkins Gate Giveaway!</p>
                </div>
            `;

    // Clear the localStorage check message
    localStorageCheckDiv.innerHTML = '';

    // DOM Modification: Clear and disable form
    form.reset();
    document.getElementById('submitButton').disabled = true;
    document.getElementById('submitButton').textContent = 'Entry Submitted!';
}

// --- DOM Interaction: Event Listener ---
// Listen for and react to the form submit event
form.addEventListener('submit', handleSubmit);

// Initialize the form when the page loads
initializeForm();