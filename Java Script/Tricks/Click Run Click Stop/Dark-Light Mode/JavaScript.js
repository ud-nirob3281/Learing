//! Way-1
/*
let sbtn = document.querySelector('button');

let yes = true;
let cloneStore;
let cloneStore2;

sbtn.addEventListener('click', function x() {
  let btn = document.querySelector('button');
  let selBody = document.querySelector('body');
  if (yes) {
    cloneStore = btn.cloneNode(true);
    cloneStore2 = selBody.cloneNode(true);

    btn.innerHTML = 'Light';
    selBody.style.backgroundColor = 'white';
  } else {
    cloneStore.addEventListener('click', x);
    cloneStore2.addEventListener('click', x);

    btn.replaceWith(cloneStore);
    selBody.replaceWith(cloneStore2);
  }
  yes = !yes;
});
*/

//! Way-2
let btn = document.querySelector('button');
let selBody = document.querySelector('body');

let yes = true;

btn.onclick = () => {
  if (yes) {
    btn.innerHTML = 'Light';
    selBody.style.backgroundColor = 'white';
  } else {
    btn.innerHTML = 'Dark';
    selBody.style.backgroundColor = 'black';
  }
  yes = !yes;
};

//! Way-3
let selbtn1 = document.querySelector('.light');
let selbtn2 = document.querySelector('.dark');

let selData = document.querySelector('h2');

selbtn1.addEventListener('click', function () {
  selBody.style.backgroundColor = 'white';
  selData.innerHTML = 'Light Mode';
});
selbtn2.addEventListener('click', function () {
  selBody.style.backgroundColor = 'red';
  selData.innerHTML = 'Dark Mode';
});


