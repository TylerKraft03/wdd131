const today = new Date(); // Define the today variable
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const temperature = 40;
const windSpeed = 10;
/**
@param {number} T
@param {number} V
@returns {number}
 */
function calculateWindChill(T, V) {
    return 35.74 + (0.6215 * T) - (35.75 * Math.pow(V, 0.16)) + (0.4275 * T * Math.pow(V, 0.16));
}

let windChillValue = 'N/A';

if (temperature <= 50 && windSpeed > 3) {
    const calculatedWC = calculateWindChill(temperature, windSpeed);
    
    windChillValue = `${Math.round(calculatedWC)} °F`;
}

document.getElementById('windchill-value').textContent = windChillValue;