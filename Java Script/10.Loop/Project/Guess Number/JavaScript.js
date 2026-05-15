let selData = document.querySelector('#p');
let selInput = document.querySelector('input');
let selBtn = document.querySelector('#btn');
let selResult = document.querySelector('#result');
let selShowBtn = document.querySelector('#show');
let selRetry = document.querySelector('#retry');

let createAttribute = document.createAttribute('disabled');

let minAttamt = 0;
let maxAttamt;
let randomValue;
let range;

let selSelect = document.querySelector('select');
selSelect.onchange = function () {
  let selSelect1 = document.querySelector('select').value;

  switch (selSelect1) {
    case 'Easy':
      range = 30;
      maxAttamt = 10;
      randomValue = Math.floor(Math.random() * 30);
      break;
    case 'Medium':
      range = 40;
      maxAttamt = 7;
      randomValue = Math.floor(Math.random() * 40);
      break;
    case 'Hard':
      range = 50;
      maxAttamt = 5;
      randomValue = Math.floor(Math.random() * 50);
      break;
    default:
      selBtn.innerHTML = 'Please select a difficulty level';
  }

  selData.innerHTML = `You have ${maxAttamt} attempts to guess the number between 0 and ${range}`;

  selBtn.onclick = function () {
    maxAttamt--;

    let inputValue = parseInt(selInput.value);
    if (inputValue === randomValue) {
      selResult.innerHTML = `🎉 Congratulations! You guessed the number ${randomValue} correctly in ${minAttamt} attempts!`;
      selResult.style.color = 'green';
      selResult.style.transition = '2s';

      selInput.setAttributeNode(createAttribute);
    } else if (inputValue > randomValue) {
      selResult.innerHTML = `Your guess is higher than the correct number.`;
      selResult.style.color = '#EA2027';
      selResult.style.transition = '1s';
    } else {
      selResult.innerHTML = `Your guess is lower than the correct number.`;
      selResult.style.color = '#1e272e';
    }

    if (maxAttamt >= 0) {
      selData.innerHTML = `You have ${maxAttamt} attempts left to guess the number between 0 and ${range}`;
    } else {
      selData.innerHTML = `You have no attempts left`;
      selResult.innerHTML = `Game Over`;
      selResult.style.color = 'red';
    }
  };

  selShowBtn.onclick = () => {
    selShowBtn.innerHTML = randomValue;
    selShowBtn.style.color = 'green';
    selShowBtn.style.transition = '1s';
    selResult.innerHTML = `OH NO OPPS!`;
    selResult.style.color = 'red';
    selResult.style.transition = '1.5s';
  };
};

selRetry.onclick = function () {
  window.location.reload();
};

let from = document.querySelector('form');
from.addEventListener('submit', function (e) {
  e.preventDefault();
});
