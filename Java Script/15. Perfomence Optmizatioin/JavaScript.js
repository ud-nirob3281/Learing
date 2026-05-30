//! Debounce
function debounce(func, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
      //func(...args); //We Use This But Some Case Problem
    }, delay);
  };
}

//*Work
//const makeItem = Array.from({ length: 1000 }, (_, i) => `Item${i + 1}`);

const inpEl = document.querySelector('#te');

let makeItem = [];
for (let i = 0; i <= 1000; i++) {
  makeItem.push(`Item${i}`);
}

function filterSearch(val) {
  console.log('Function Call'); //Without Debounce a function Call type a Single Word
  const filterVal = makeItem.filter(value => {
    return value.toLowerCase().includes(val.toLowerCase());
  });
  const limitVal = filterVal.slice(0, 20);
  const result = document.getElementById('result');
  result.innerText = '';
  result.innerHTML = limitVal.map(va => `<li>${va}</li>`);
}

const withoutDebosearch = function (e) {
  const value = e.target.value;
  filterSearch(value);
};

const withDebosearch = debounce(function (e) {
  const value = e.target.value;
  filterSearch(value);
}, 1000);

inpEl.addEventListener('input', withDebosearch);

//! Throtle

function throttle(fn, limit) {
  let lastCall = 0;

  return function (...args) {
    let now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

//*uses
const d1 = document.getElementById('s1');

let onscrol = function () {
  console.log('call');
  let y = window.scrollY;
  d1.innerText = `Y Value ${y}`;
};

let useTr = throttle(onscrol, 500);

//window.addEventListener('scroll', onscrol);
window.addEventListener('scroll', useTr);

//! Memoization

function memo(fn) {
  let saveCache = {};
  return function (...args) {
    let key = JSON.stringify(args);
    if (key in saveCache) {
      return saveCache[key];
    } else {
      let result = fn.apply(this, args);
      saveCache[key] = result;
      return result;
    }
    console.log(saveCache);
  };
}

//* Uses
function febo(n) {
  if (n <= 2) {
    return n;
  } else {
    return febo(n - 1) + febo(n - 2);
  }
}
//? WithOut Memoization
/* let t1 = Date.now();
console.log(febo(45));
let t2 = Date.now();
console.log(t2 - t1); */ //? Time 4s

/* let t3 = Date.now();
console.log(febo(45));
let t4 = Date.now();
console.log(t4 - t3); */ //? Time 4s

//? With Memoization
let memoUse = memo(febo);

/* let t1 = Date.now();
console.log(memoUse(45));
let t2 = Date.now();
console.log(t2 - t1); */ //? Time 4s

/* let t3 = Date.now();
console.log(memoUse(45));
let t4 = Date.now();
console.log(t4 - t3); */ //? Time 0s


function suff(list) {
  let listClo = [...list];

  for (let i = 0; i <= lists.length - 1; i++) {
    let j = Math.floor(Math.random() * i + 1);
    [listClo[i], listClo[j]] = [listClo[j], listClo[i]];
  }
  return listClo;
}
console.log(sorting);
sort.onclick = () => {
  newData(sorting);
};
filter.onclick = () => {
  newData(filtering);
};
shuffer.onclick = () => {
  newData(suff(lists));
};
