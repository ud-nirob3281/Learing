import { download } from './Download.js';

const select = document.getElementById('sel');
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

const form = document.querySelector('form');
const downloadBtn = document.getElementById('dw');
const name = document.getElementById('usn');
const password = document.getElementById('pass');

let selectData;
select.addEventListener('click', e => {
  selectData = e.target.value;
  Array.from(select.children).forEach(el => {
    if (e.target === el) {
      el.className =
        'bg-amber-300 px-3 py-1 w-25 my-5 rounded-xl font-bold border-2 border-purple-600';
    } else {
      el.className = 'bg-amber-300 px-3 py-1 w-25 my-5 rounded-xl font-bold';
    }
  });
  if (selectData === 'Admin') {
    name.value = 'Admin';
    password.value = '1234';
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const info = document.getElementById('info');

  if (!selectData) {
    info.classList.replace('hidden', 'block');
    info.innerHTML = `<span class="text-red-500">Please Select<br/>'Admin' OR 'Member'</span>`;
    return;
  } else {
    info.classList.replace('block', 'hidden');
  }

  if (selectData === 'Admin' && name.value !== 'Admin') {
    info.classList.replace('hidden', 'block');
    info.innerHTML = `<span class="text-red-500">Mismatch Admin account.</span><br /> Admin account<br />
        name='Admin'
        password='1234'.<br />Use It`;
    return;
  } else if (selectData === 'Admin' && password.value !== '1234') {
    info.classList.replace('hidden', 'block');
    info.innerHTML = `Mismatch Admin account.</span><br /> Admin account<br />
        name='Admin'
        password='1234'.<br />Use It`;
    return;
  } else {
    info.classList.replace('block', 'hidden');
  }
  window.location.href = `./MainPage/index.html?userDa=${selectData}&name=${encodeURIComponent(name.value)}&password=${encodeURIComponent(password.value)}`;
  form.reset();
});

downloadBtn.onclick = function () {
  download('./Login Page .zip');
};
