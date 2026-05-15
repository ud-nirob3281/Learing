let selForm = document.getElementById('form');
let selbtn = document.querySelector('button');
let selOutput = document.querySelector('#output');

const data = {
  name: { label: 'Full Name', type: 'text', required: true },
  email: { label: 'Email', type: 'email', required: true },
  age: { label: 'Age', type: 'number', required: false },
  password: { label: 'Password', type: 'password', required: true },
};
for (const i in data) {
  let outData = data[i];
  let createLabel = document.createElement('label');
  createLabel.innerText = outData.label;

  let createInput = document.createElement('input');
  createInput.type = outData.type;
  createInput.required = outData.required;
  createInput.name = i;

  createLabel.appendChild(createInput);
  selForm.appendChild(createLabel);
}

selbtn.onclick = () => {
  for (const i in data) {
    let selAllInput = document.querySelector(`[name='${i}']`).value;
    let createP = document.createElement('p');
    createP.innerHTML = `${i}: ${selAllInput}`;
    console.log(createP);
    selOutput.appendChild(createP);
  }
};
