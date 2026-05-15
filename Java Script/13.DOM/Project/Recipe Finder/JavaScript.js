const recipes = [
  {
    title: 'Spaghetti Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Parmesan Cheese', 'Bacon'],
    instructions: 'Cook pasta. Mix with eggs and cheese. Add bacon.',
  },
  {
    title: 'Chicken Curry',
    ingredients: ['Chicken', 'Curry Powder', 'Onions', 'Tomatoes'],
    instructions: 'Cook onions, add chicken, spices, and tomatoes.',
  },
  {
    title: 'Grilled Cheese Sandwich',
    ingredients: ['Bread', 'Cheddar Cheese', 'Butter'],
    instructions: 'Butter bread, place cheese between slices, and grill.',
  },
  {
    title: 'Veggie Stir Fry',
    ingredients: ['Broccoli', 'Carrots', 'Bell Peppers', 'Soy Sauce'],
    instructions: 'Stir fry vegetables and add soy sauce.',
  },
];
const mainrecipeParDiv = document.getElementById('allRecipes');
const searchSection = document.querySelector('#searchSection');
//
const crateInput = document.createElement('input');
crateInput.id = 'search';
crateInput.type = 'text';
crateInput.value = '';
crateInput.autocomplete = 'off';
searchSection.appendChild(crateInput);

const createBtn = document.createElement('button');
createBtn.id = 'btnClear';
createBtn.innerText = '❎';
createBtn.onclick = function () {
  crateInput.value = '';
  crateInput.dispatchEvent(new Event('keyup'));
  localStorage.removeItem('saveSearchValue');
};
searchSection.appendChild(createBtn);

window.onload = function () {
  crateInput.value = localStorage.getItem('saveSearchValue');
  crateInput.dispatchEvent(new Event('keyup'));
};
//
function dynamicDataAdd(data) {
  data.forEach(recipe => {
    const createDiv = document.createElement('div');
    createDiv.classList.add('recipesChild');
    const createH3 = document.createElement('h3');
    createH3.classList.add('title');
    createH3.innerText = `➡️ ${recipe.title}`;
    createDiv.appendChild(createH3);

    const createP1 = document.createElement('p');
    createP1.innerHTML = `<h4 style="display: inline-block;color: #9c88ff;">Ingredients :</h4> ${recipe.ingredients.join(
      ', '
    )}`;
    createDiv.appendChild(createP1);

    const createP2 = document.createElement('p');
    createP2.innerHTML = `<h4 style="display: inline-block;color: #9c88ff;">Instruction :</h4> ${recipe.instructions}`;
    createDiv.appendChild(createP2);

    mainrecipeParDiv.appendChild(createDiv);
  });
}

function showHide() {
  mainrecipeParDiv.addEventListener('click', e => {
    let parent = e.target.parentElement;
    e.stopPropagation();
    const selectP = parent.querySelectorAll('p');
    selectP.forEach(val => {
      val.classList.toggle('hide');
    });
  });
}

function search() {
  const recipesChild = document.querySelectorAll('.title');
  const resultDiv = document.getElementById('result');
  crateInput.addEventListener('keyup', () => {
    let searchValue = crateInput.value;
    let visiAble = 0;

    recipesChild.forEach(title => {
      if (title.innerText.toLowerCase().includes(searchValue.toLowerCase())) {
        title.style.display = 'block';
        visiAble++;
      } else {
        title.style.display = 'none';
      }
    });
    console.log(visiAble);
    if (visiAble === 0) {
      resultDiv.innerText = '✖️ কোনো রেসিপি পাওয়া যায়নি';
      resultDiv.style.color = 'red';
    } else {
      resultDiv.innerText = '';
    }

    localStorage.setItem('saveSearchValue', `${searchValue}`);
  });
}

dynamicDataAdd(recipes);
showHide();
search();
