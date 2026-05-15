const load = document.getElementById('wait');
const error = document.getElementById('error');
const serBtn = document.getElementById('search');
const countryDetails = document.getElementById('data');
const input = document.querySelector('input');
const favBtn = document.getElementById('fav');

let map;
let arrEl = JSON.parse(localStorage.getItem('coNameArr'));
let nameArr;
if (arrEl !== null) {
  nameArr = arrEl;
} else {
  nameArr = [];
}

function saveDa() {
  favBtn.innerHTML = '';
  favBtn.innerHTML = '<option value="">Favorite Countris</option>';
  for (let coNa of nameArr) {
    let creOp = document.createElement('option');
    creOp.innerText = coNa.charAt(0).toUpperCase() + coNa.slice(1);
    favBtn.appendChild(creOp);
  }
}
favBtn.onchange = function (e) {
  const value = e.target.value;
  if (value !== '') {
  }
  input.value = value;
  serBtn.click();
};

window.onload = () => {
  input.value = 'Bangladesh';
  serBtn.click();
};
serBtn.addEventListener('click', function () {
  let inpVal = input.value.trim();
  if (!inpVal) return;
  data(inpVal);
});
async function data(name) {
  load.classList.remove('hidden');
  error.classList.add('hidden');
  try {
    let response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    let data = await response.json();
    let country = data[0];
    if (!country) {
      throw new Error('Invalid Country Name');
    }
    if (!response.ok) throw new Error(`Some problem ${response.status}`);

    showData(country);

    let [lat, lng] = country.latlng;

    showMap(lat, lng, country.name.common);

    favCoun(country.name.common);
  } catch (err) {
    error.classList.remove('hidden');
    error.innerText = err;
  } finally {
    load.classList.add('hidden');
  }
}

function showData(country) {
  const languages = country.languages
    ? Object.values(country.languages).join(',')
    : 'N/A';

  countryDetails.innerHTML = `
            <div>
                <img src="${
                  country.flags.svg
                }" alt="flag" class="w-50 mb-2 rounded-2xl" />
                <h2 class="text-3xl mb-2 font-bold">${country.name.common}</h2>
                <p class='font-semibold'>Capital: ${country.capital}</p>
                <p class='font-semibold'>Population: ${country.population.toLocaleString()}</p>
                <p class='font-semibold'>Languages: ${languages}</p>
            </div>
        `;
}

function showMap(lat, lng, name) {
  if (!map) {
    map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  } else {
    map.setView([lat, lng], 13);
  }

  L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();
}

function favCoun(name) {
  /*
  '<i class="fa-regular fa-star"></i>'
  '<i class="text-amber-300 fa-solid fa-star"></i>'

   */
  let countryName = name.toLowerCase();
  let star = false;
  let starEl = document.createElement('div');
  starEl.id = 'starId';

  if (nameArr.includes(countryName)) {
    star = true;
    starEl.innerHTML = '<i class="text-amber-300 fa-solid fa-star"></i>';
  } else {
    star = false;
    starEl.innerHTML = '<i class="fa-regular fa-star"></i>';
  }
  starEl.onclick = () => {
    star = !star;
    if (star) {
      if (!nameArr.includes(countryName)) {
        nameArr.push(name.toLowerCase());
      }
      starEl.innerHTML = '<i class="text-amber-300 fa-solid fa-star"></i>';
    } else {
      starEl.innerHTML = '<i class="fa-regular fa-star"></i>';
      let index = nameArr.indexOf(countryName);
      if (index !== -1) {
        arrEl.splice(index, 1);
      }
    }
    localStorage.setItem('coNameArr', JSON.stringify(nameArr));
    saveDa();
  };
  countryDetails.append(starEl);
}
saveDa();
