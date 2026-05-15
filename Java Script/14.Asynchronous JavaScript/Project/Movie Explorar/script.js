//const apiKey = '85dd6442';

const apiKey = '85dd6442';

const result = document.getElementById('result');
const messege = document.getElementById('messege');

document.getElementById('search').onclick = () => {
  let userInpData = document.getElementById('userInput').value;
  apiResFun(userInpData);
};
async function apiResFun(input) {
  console.log(input);
  try {
    wait();
    result.innerHTML = '';
    let response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(input)}`
    );
    if (!response.ok)
      throw new Error('API is not responding. Please try again.');
    let data = await response.json();
    console.log(data);
    if (data.Response === 'False' || !data.Search)
      throw new Error(data.Error || 'No results found');
    assignUi(data);
  } catch (error) {
    result.innerText = error.message || String(error);
  } finally {
    end();
  }
}

function assignUi(data) {
  data.Search.map(value => {
    const creMainDiv = document.createElement('div');
    creMainDiv.id = 'movies';
    const creh2 = document.createElement('h2');
    creh2.innerHTML = `Movie Name:${value.Title},
    <p>Relese Year:${value.Year}</p>`;
    creMainDiv.appendChild(creh2);

    const creImg = document.createElement('img');
    const altImg =
      'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    creImg.src = value.Poster;
    creImg.onerror = () => {
      creImg.src = altImg;
      creImg.alt = 'Image not found';
    };
    creMainDiv.appendChild(creImg);

    result.appendChild(creMainDiv);
  });
}

function wait() {
  messege.innerText = 'Please Wait';
}
function end() {
  messege.innerText = '';
}
window.onload = () => {
  document.getElementById('userInput').value = 'Avengers';
  document.getElementById('search').click();
};
