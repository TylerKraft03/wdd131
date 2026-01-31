const today = new Date();
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const temperature = -3;
const windSpeed = 21;

/**
 * @param {number} T
 * @param {number} V
 * @returns {number}
 */
function calculateWindChill(T, V) {
    return 13.12 + (0.6215 * T) - (11.37 * Math.pow(V, 0.16)) + (0.3965 * T * Math.pow(V, 0.16));
}

let windChillValue = 'N/A';
if (temperature <= 10 && windSpeed > 4.8) {
    const calculatedWC = calculateWindChill(temperature, windSpeed);
    windChillValue = `${calculatedWC.toFixed(1)} °C`;
}

document.getElementById('windchill-value').textContent = windChillValue;