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

window.addEventListener('resize
  //9
  let promise8 = new Promise((res, rej) => {
    setTimeout(() => {
      res('First');
    }, 1000);
  });
  promise8
    .then(val => {
      //console.log(val);
      return new Promise((res, rej) => {
        setTimeout(() => {
          res('Second');
        }, 1000);
      });
    })
    .then(val => {
      //console.log(val);
      return new Promise((res, rej) => {
        setTimeout(() => {
          res('Third');
        }, 1000);
      });
    });
  // .then(val => console.log(val));
  //9
  function fakeDBquary() {
    let time = [800, 900, 1000, 1500, 2000];
    let rdn = Math.floor(Math.random() * 4);
    return new Promise((res, rej) => {
      const user = {
        name: 'UD NIROB',
        id: 4744,
        email: 'nirob3281@gmail.com',
      };
      setTimeout(() => {
        res(user);
      }, time[rdn]);
    });
  }
  fakeDBquary()
    .then(us => {
      console.log(us.name);
      return fakeDBquary();
    })
    .then(us1 => console.log(us1.email));
}
, myThrrotle(myRe, 500));

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

    
