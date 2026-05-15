const btn = document.getElementById('btn');
const from = document.getElementById('form');
const submit = document.querySelector('#submit');

btn.addEventListener('click', function () {
  const text = document.getElementById('text');
  const email = document.getElementById('email');
  const number = document.getElementById('number');

  function creatorFunc(type, labelName) {
    const createLabel = document.createElement('label');
    createLabel.innerText = labelName;
    from.prepend(createLabel);

    const createInput = document.createElement('input');
    createInput.type = type;
    createLabel.appendChild(createInput);

    //Delete
    const creatrBtn = document.createElement('button');
    creatrBtn.innerText = '❎';
    creatrBtn.classList.add('delete');

    createLabel.appendChild(creatrBtn);

    creatrBtn.onclick = () => {
      createLabel.remove();
    };
  }

  if (text.checked) {
    creatorFunc('text', 'Your Name :');
  }
  if (email.checked) {
    creatorFunc('email', 'Your Email :');
  }
  if (number.checked) {
    creatorFunc('number', 'Your Number :');
  }
});

submit.onclick = () => {
  let output = {};

  function submitVal(type, typeName) {
    const test = document.querySelectorAll(`input[type=${type}]`);
    let num = 0;
    test.forEach(val => {
      output[`${typeName}${num}`] = val.value;
      num++;
    });
  }
  submitVal('text', 'Your Text');
  submitVal('email', 'Your Email');
  submitVal('number', 'Your Number');
  console.log(output);
};
from.addEventListener('submit', e => {
  e.preventDefault();
});
