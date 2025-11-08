const today = new Date(); // Define the today variable
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;