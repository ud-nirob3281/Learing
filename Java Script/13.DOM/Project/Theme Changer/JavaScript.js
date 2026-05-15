const btn = document.querySelector('button');
const body = document.querySelector('body');

function darkBtn() {
  btn.innerHTML = '🌙 Dark Mode';
  btn.style.background = 'black';
  btn.style.color = 'white';
}
function lightBtn() {
  btn.innerHTML = '☀️ Light Mode';
  btn.style.background = 'white';
  btn.style.color = 'black';
}

body.onload = () => {
  let savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    body.classList.add('darkMode');
    body.classList.remove('lightMode');
    darkBtn();
  } else {
    body.classList.add('lightMode');
    body.classList.remove('darkMode');
    lightBtn();
  }
};

btn.onclick = function () {
  body.classList.toggle('darkMode');
  body.classList.toggle('lightMode');

  if (body.classList.contains('darkMode')) {
    localStorage.setItem('theme', 'dark');
    darkBtn();
  } else {
    lightBtn();
    localStorage.setItem('theme', 'light');
  }
};

/* const btn = document.querySelector('button');
const body = document.querySelector('body');

// ✅ Page Load-এ Saved Theme Check করা
window.addEventListener('load', function () {
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    // Dark Theme Apply করা
    body.classList.add('darkMode');
    body.classList.remove('lightMode');
    btn.innerHTML = '🌙 Dark Mode';
    btn.style.background = 'black';
    btn.style.color = 'white';
  } else {
    // Light Theme Apply করা
    body.classList.add('lightMode');
    body.classList.remove('darkMode');
    btn.innerHTML = '☀️ Light Mode';
    btn.style.background = 'white';
    btn.style.color = 'black';
  }
});

btn.onclick = theme;

function theme() {
  body.classList.toggle('darkMode');
  body.classList.toggle('lightMode');

  if (body.classList.contains('darkMode')) {
    btn.innerHTML = '🌙 Dark Mode';
    btn.style.background = 'black';
    btn.style.color = 'white';
    // ✅ Dark Theme Save করা
    localStorage.setItem('theme', 'dark');
  } else {
    btn.innerHTML = '☀️ Light Mode';
    btn.style.background = 'white';
    btn.style.color = 'black';
    // ✅ Light Theme Save করা
    localStorage.setItem('theme', 'light');
  }
}
 */
