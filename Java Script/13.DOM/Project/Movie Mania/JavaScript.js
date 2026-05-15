import { movieData } from './data.js';
console.log(movieData());

function data() {
  let mainData = movieData();
  main(mainData);
  dateSort(mainData);
  ratingsort(mainData);
}

const totalMovoe = document.querySelector('.totalMovoe');
const avgRating = document.querySelector('.avgRating');
const totalReview = document.querySelector('.totalReview');

function main(mainData) {
  //1
  totalMovoe.innerHTML = mainData.length;
  //2
  let totalRat = mainData.flat().reduce((acc, rat) => {
    return acc + rat.rating;
  }, 0);

  avgRating.innerHTML = (totalRat / mainData.flat().length).toFixed(2);
  //3
  totalReview.innerHTML = mainData.flat().length;
}

const parentMovie = document.querySelector('#indivisualReview');
function dateSort(movies) {
  let sortData = movies.flat().toSorted((a, b) => {
    return a.on === b.on ? 0 : a.on > b.on ? -1 : 1;
  });
  dataStructure(sortData);
}

function ratingsort(movieDa) {
  //Sort
  const mainSort = document.getElementById('sort');

  mainSort.onchange = () => {
    parentMovie.innerHTML = '';
    if (mainSort.value === 'ass') {
      let ratShortDes = movieDa.flat().toSorted((a, b) => {
        return a.rating === b.rating ? 0 : a.rating > b.rating ? -1 : 1;
      });
      dataStructure(ratShortDes);
    } else {
      let ratShorAss = movieDa.flat().toSorted((a, b) => {
        return a.rating === b.rating ? 0 : a.rating > b.rating ? 1 : -1;
      });
      dataStructure(ratShorAss);
    }
  };
  //group
  const group = document.getElementById('group');
  let bulianVal = false;
  group.onclick = function () {
    bulianVal = !bulianVal;
    console.log(bulianVal);
    if (bulianVal) {
      parentMovie.innerHTML = '';

      let data = movieDa.flat();
      let group = Object.groupBy(data, ({ title }) => title);
      let key = Reflect.ownKeys(group);

      key.forEach(val => {
        const crDiv = document.createElement('div');
        crDiv.id = 'mainGroup';
        crDiv.innerHTML = `<b>${val}</b>`;
        parentMovie.appendChild(crDiv);

        group[val].forEach(value => {
          const creMovich = document.createElement('p');
          creMovich.innerHTML = `✅ <b>${value.by}</b> has Given ${value.rating} Rating With a comment ${value.content}`;
          crDiv.appendChild(creMovich);
        });
      });
    } else {
      parentMovie.innerHTML = '';
      dateSort(movieDa);
    }
  };
}

function dataStructure(sort) {
  sort.map(movie => {
    const childMovie = document.createElement('div');
    childMovie.classList.add('movie');

    const nameRating = document.createElement('h3');
    nameRating.classList.add('nameRating');
    nameRating.innerText = `${movie.title}-${movie.rating}`;
    childMovie.appendChild(nameRating);

    const content = document.createElement('p');
    content.innerText = movie.content;
    childMovie.appendChild(content);

    const reviewerTime = document.createElement('p');
    reviewerTime.innerText = `By ${movie.by} on  ${new Intl.DateTimeFormat(
      'en-BD'
    ).format(movie.on)}`;
    childMovie.appendChild(reviewerTime);

    parentMovie.appendChild(childMovie);
  });
}

data();
