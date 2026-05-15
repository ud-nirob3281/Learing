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

//!Task
//1
function myDebounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const teAr = document.getElementById('textAr');
const textVal = document.getElementById('textVal');
const mes = document.getElementById('mess');

const fn = function (e) {
  let carrteterCount = teAr.value.length;

  textVal.innerHTML = `Characters typed: ${carrteterCount}`;
  if (carrteterCount === 200) {
    mes.innerText = `Maximum 200 characters allowed`;
  } else {
    mes.innerText = '';
  }
};

teAr.addEventListener('input', myDebounce(fn, 500));

//2

const showHW = document.getElementById('showHW');
const catagory = document.getElementById('catagory');

function myThrrotle(fn, lim) {
  let lastCall = 0;
  return function (...args) {
    let now = Date.now();
    if (now - lastCall >= lim) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

const myRe = function () {
  const valueX = window.innerWidth;
  const valueY = window.innerHeight;
  showHW.innerText = `Window X:${valueX} Y:${valueY}`;

  if (valueX >= 1024) {
    catagory.innerText = `Catagory DETOP`;
  } else if (valueX >= 640) {
    catagory.innerText = `Catagory TABLET`;
  } else {
    catagory.innerText = `Catagory MOBIL`;
  }
};

window.addEventListener('resize', myThrrotle(myRe, 500));

//3

function myMemo(fn) {
  let cache = {};

  return function (...args) {
    let key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      let result = fn.apply(this, args);
      cache[key] = result;
      return result;
    }
  };
}
let count = 0;
const celToFa = function (temIncel) {
  count++;
  console.log(`Function1 Call ${count} time`);
  return (temIncel * 9) / 5 + 32;
};

let count1 = 0;
const faToCel = function (temInFa) {
  count1++;
  console.log(`Function2 Call ${count1} time`);
  return ((temInFa - 32) * 5) / 9;
};

let celToFamemo = myMemo(celToFa);
let faToCelmemo = myMemo(faToCel);

console.log(celToFamemo(34));
console.log(celToFamemo(34));
console.log(celToFamemo(50));
console.log(faToCelmemo(93.2));
console.log(faToCelmemo(93.2));
console.log(faToCelmemo(120));

//4
// বাস্তব API কল এর মতো দেখতে কিন্তু সেটা না
function mockSearchAPI(query) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
      ]);
    }, 1500); // 1.5s সেকেন্ড দেরি করে ডাটা দিবে
  });
}
const inp = document.getElementById('text');
const load = document.getElementById('load');
const result2 = document.getElementById('result2');
const searchQuarry = async function () {
  result2.innerHTML = '';
  load.style.display = 'block';
  const myData = await mockSearchAPI(inp.value);
  console.log(myData);
  load.style.display = 'none';

  myData.forEach(val => {
    let creli = document.createElement('li');
    creli.innerText = val;
    result2.appendChild(creli);
  });
};

inp.addEventListener('input', myDebounce(searchQuarry, 600));
//5
const modalPopup = document.getElementById('modalPopup');
const modales = document.getElementById('modales');
const open = document.getElementById('open');
const close = document.getElementById('close');

const keyClose = function (e) {
  console.log(e.keyCode);
  if (e.key === 'c') {
    closeModal();
  }
};

function openModal() {
  modales.style.display = 'block';
  document.addEventListener('keypress', keyClose);
}
function closeModal() {
  modales.style.display = 'none';
  document.removeEventListener('keypress', keyClose);
  console.log('Remove Listener');
}

open.addEventListener('click', openModal);
close.addEventListener('click', closeModal);

//6 //FAil
const list = document.getElementById('list');
const sort = document.getElementById('sort');
const filter = document.getElementById('filter');
const shuffer = document.getElementById('shuffer');

const lists = [];

for (let i = 1; i <= 1000; i++) {
  lists.push({ id: `id${i}`, name: `Safa${i}` });
}

function fullRender(data) {
  list.innerHTML = '';
  data.forEach(item => {
    const creP = document.createElement('p');
    creP.innerText = item.name;
    list.appendChild(creP);
  });
}
fullRender(lists);

function newData(newList) {
  let currentItem = list.children;
  if (currentItem.length !== newList.length) {
    fullRender(newList);
    console.log('call1');
    return;
  }
  for (let i = 0; i < newList.length; i++) {
    if (currentItem[i]?.innerText !== newList[i].name) {
      currentItem[i].innerText = newList[i].name;
      console.log('call2');
    }
  }
}
const sorting = lists.toSorted(function (a, b) {
  return a.name === b.name ? 0 : a.name > b.name ? -1 : 1;
});

const filtering = lists.filter(value => value.name.includes('10'));

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
