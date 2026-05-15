const btn = document.querySelector('#btn');
const SearchTask = document.querySelector('#searchTask');
const task = document.querySelector('#task');
const newTask = document.querySelector('#newTask');

btn.addEventListener('click', btnEvent);

newTask.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    btn.click();
  }
});

function btnEvent() {
  let myTask = newTask.value;
  let creatli = document.createElement('li');
  creatli.classList.add('liS');
  creatli.innerHTML = myTask;
  task.appendChild(creatli);
  //done
  const doneBtn = document.createElement('button');
  doneBtn.innerText = '☑️';
  doneBtn.classList.add('done');
  doneBtn.onclick = () => {
    creatli.classList.toggle('mark');
  };
  creatli.appendChild(doneBtn);

  //Edit
  const editBtn = document.createElement('button');
  editBtn.innerHTML = '♂️';
  editBtn.classList.add('done');
  creatli.appendChild(editBtn);

  editBtn.onclick = () => {
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.value = creatli.firstChild.textContent;
    console.log(inputBox.value);
    //inputBox.value = creatli.childNodes[0].textContent;//? same
    creatli.appendChild(inputBox);

    inputBox.addEventListener('keyup', e => {
      if (e.key === 'Enter') {
        saveEdit();
      }
    });
    function saveEdit() {
      creatli.firstChild.textContent = inputBox.value;
      inputBox.remove();
    }
  };

  //delete
  const removeBtn = document.createElement('button');
  removeBtn.innerText = '❎';
  removeBtn.classList.add('done');
  creatli.appendChild(removeBtn);
  removeBtn.onclick = () => {
    creatli.remove();
  };

  newTask.value = '';
}

SearchTask.addEventListener('keyup', function () {
  const searchValue = SearchTask.value.toLowerCase();
  let allElemNode = document.querySelectorAll('#task li');
  let allememArray = Array.from(allElemNode);

  allememArray.filter(value => {
    console.log(value);
    value.style.display = value.innerText.toLowerCase().includes(searchValue)
      ? 'block'
      : 'none';
  });
});
/* document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();
}); */
