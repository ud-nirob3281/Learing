const form = document.getElementById('form');
const btn = document.getElementById('btn');
const names = document.getElementById('name');
const age = document.getElementById('age');
const role = document.getElementById('role');
const search = document.getElementById('search');

const table = document.querySelector('table');
form.addEventListener('submit', e => e.preventDefault());

btn.addEventListener('click', all);

function all() {
  if (names.value === '' && age.value === '' && role.value === '') return;
  table.style.display = 'block';
  let createTr = document.createElement('tr');
  createTr.classList.add('dynamicTr');

  let createTdForName = document.createElement('td');
  createTdForName.classList.add('nameClass');
  createTdForName.innerHTML = names.value.toUpperCase();
  createTr.appendChild(createTdForName);

  let createTdForAge = document.createElement('td');
  createTdForAge.innerHTML = age.value;
  createTr.appendChild(createTdForAge);

  let createTdForRole = document.createElement('td');
  createTdForRole.innerHTML = role.value.toUpperCase();
  createTr.appendChild(createTdForRole);

  const createTdForDelete = document.createElement('td');
  createTdForDelete.innerText = '❎';
  createTdForDelete.classList.add('delete');
  createTdForDelete.onclick = () => {
    createTr.remove();
  };
  createTr.appendChild(createTdForDelete);

  table.appendChild(createTr);

  names.value = '';
  age.value = '';
  role.value = '';
}
document.addEventListener('keyup', e => {
  if (e === 'Enter') {
    btn.click();
    names.focus();
  }
});

search.addEventListener('keyup', () => {
  const nameClass = document.querySelectorAll('.nameClass');
  nameClass.forEach(val => {
    if (val.innerText.includes(search.value.toUpperCase())) {
      val.parentNode.style.display = 'table-row';
    } else {
      val.parentNode.style.display = 'none';
    }
  });
  console.log(search.value);
});
