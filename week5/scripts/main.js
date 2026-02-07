const today = new Date();
const year = document.querySelector("#currentyear");
year.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;

document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

document.addEventListener('DOMContentLoaded', function () {
    const selectElement = document.getElementById('productName');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        selectElement.appendChild(option);
    });

    const radios = document.querySelectorAll('input[type="radio"][name="stars"]');
    const starsContainer = document.querySelector('.stars');

    const allStars = starsContainer.querySelectorAll('.material-symbols-outlined');

    allStars.forEach((star, index) => {
        star.addEventListener('click', function () {
            const radio = radios[index];
            radio.checked = true;
            radio.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    radios.forEach((radio) => {
        radio.addEventListener('change', function () {
            console.log('Radio changed:', this.value);
            const selectedValue = parseInt(this.value);
            const allRadios = starsContainer.querySelectorAll('input[type="radio"][name="stars"]');
            const allStarsInContainer = starsContainer.querySelectorAll('.material-symbols-outlined');

            allRadios.forEach((r, index) => {
                const star = allStarsInContainer[index];
                const radioValue = parseInt(r.value);
                if (radioValue <= selectedValue) {
                    star.classList.add('filled');
                } else {
                    star.classList.remove('filled');
                }
            });
        });
    });
});