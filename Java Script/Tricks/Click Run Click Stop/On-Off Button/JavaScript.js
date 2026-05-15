//! Way-1
/*
const btn = document.getElementById('btnx');

let yes = true;

btn.addEventListener('click', function () {
  if (yes) {
    btn.style.boxShadow =
      '0px 0px 10px greenyellow, 0px 0px 20px greenyellow,0px 0px 40px greenyellow, 0px 0px 80px greenyellow,0px 0px 160px greenyellow';
    btn.textContent = 'ON';
    btn.style.background = 'greenyellow';
    btn.style.border = '1px solid greenyellow';
  } else {
    btn.style.boxShadow =
      '0px 0px 10px red, 0px 0px 20px red,0px 0px 40px red, 0px 0px 80px red,0px 0px 160px red';
    btn.textContent = 'OFF';
    btn.style.background = 'red';
    btn.style.border = '1px solid red';
  }
  yes = !yes;
});
*/

//! Way-2
let btn = document.getElementById('btnx');

let yes = true;
let store;

btn.onclick = function x() {
  let btnx = document.getElementById('btnx');

  if (yes) {
    store = btnx.cloneNode(true);

    //?MY Customization
    btnx.textContent = 'OFF';
    btnx.style.background = 'red';
    btnx.style.border = '1px solid red';
    btnx.style.boxShadow =
      '0px 0px 10px red, 0px 0px 20px red,0px 0px 40px red, 0px 0px 80px red,0px 0px 160px red';
  } else {
    store.onclick = x;

    btnx.replaceWith(store);
  }
  yes = !yes;
};
