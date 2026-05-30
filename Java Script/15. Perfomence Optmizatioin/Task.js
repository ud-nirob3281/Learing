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

