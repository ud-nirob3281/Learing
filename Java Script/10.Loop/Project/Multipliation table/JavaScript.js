let button = document.querySelector('button');
button.onclick = () => {
  let input = document.querySelector('input');
  let result = document.querySelector('#output');
  let mainInput = parseInt(input.value);
  result.innerHTML = '';

  if (isNaN(mainInput)) {
    result.innerHTML = 'Please Type a curret number';
    return;
  }

  for (let i = 1; i <= 10; i++) {
    const outputValue = `${mainInput} * ${i} = ${mainInput * i}`;
    let createElemP = document.createElement('p');
    createElemP.textContent = outputValue;
    result.appendChild(createElemP);
  }
};
button.addEventListener('submit', x => {
  x.preventDefault();
});
