//! Quarry Selactor
document.querySelector('h1').innerHTML = 'Developer';

//! Quarry Selactor ALL
{
  const menu = document.querySelectorAll('a');
  menu[0].style.color = 'yellow';

  //*All Text color change
  menu.forEach(p => {
    //p.style.color = 'red';
  });
  //* Use Class Same Work
  const menu2 = document.getElementsByClassName('nav-list'); //Prototype:  HTMLCollection
  //? Convert Array
  const convArray = Array.from(menu2);
  //console.log(convArray);
  for (const key in convArray) {
    //console.log(convArray[key]);
    convArray[key].style.backgroundColor = 'green';
  }
}

//! ID Selector
{
  document.getElementById('UD').innerHTML = 'JavaScript';

  //* Show/Add Id,Class
  let show = document.querySelector('#UD');

  show.id = 'newId'; //? Change Id
  //show.className = 'newClass'; //? Change Class //Bad
  show.classList.add('newClass2'); //? Add Class
  //show.classList.remove('newClass2'); //? Remove Class
  //show.classList.replace('newClass', 'myClass'); //? Replace Class
  //console.log(show.classList.contains('newClass2'));//? Class avilable or not
  //console.log(show.classList.contains('newCla'));

  //*toggole
  //show.classList.toggle('newClass2');//remove
  //show.classList.toggle('newClass2');//add
  //console.log(show);
  //? Exmple
  document.getElementById('togle').onclick = function () {
    const para = document.getElementById('para');

    para.classList.toggle('hide');
  };
}

//! Add Element
{
  let sel6 = document.getElementById('container');

  let newElement = document.createElement('button');
  newElement.innerHTML = '<h6>Learn More</h6>';

  //* Add Id,Class
  newElement.id = 'btn1';
  newElement.className = 'newClass';

  sel6.before(newElement); // Before
  sel6.after(newElement); // after
  sel6.prepend(newElement); // First
  sel6.append(newElement); // Last

  //*Inseart before (কোন Tag এর আগে অন্য Tag দিতে চাইলে)
  const h1Elem = document.getElementById('UDN');
  const creP = document.createElement('p');
  creP.innerHTML = 'Using Inseart Before';

  document.body.insertBefore(creP, h1Elem);
  //*পরে Add করতে চাইলে
  //document.body.insertBefore(creP, h1Elem.nextElementSibling);
}
//! Create Element
{
  let sel7 = document.querySelector('.fruits');

  function newFruit(fruitName) {
    let newli = document.createElement('li');
    newli.innerHTML = fruitName;

    sel7.appendChild(newli);
  }
  newFruit('Apple');
  newFruit('Banana');
  newFruit('papa');
}

//! Edit

//* Edit Element
let sel8 = document.querySelector('.fruits li:nth-child(1)');
//console.log(sel8);
//sel8.innerHTML = 'Orange';

//* Edit eith Tag
let sel9 = document.querySelector('.fruits li:last-child');
//sel9.outerHTML = '<p>Grapes</p>'; //? Change with Tag

//! Replace/Remove
{
  const newText = 'My name is nirob, I am reading, 2nd Semester';
  //console.log(newText.replace(',', ' ')); //Only first , remove
  //console.log(newText.replaceAll(',', ' ')); //All, remove

  //* Use Replace with
  const newFruit2 = document.createElement('li');
  newFruit2.innerHTML = 'Banana';
  //sel8.replaceWith(newFruit2);

  //* Remove Element
  //1
  let sel10 = document.querySelector('.fruits li:nth-child(3)');
  // sel10.remove(); //? Remove Element
  //2
  let select = document.querySelector('#menu');
  //console.log(select);
  //select.removeChild(select.children[0]);
  //3
  const sel11 = document.querySelector('#UDN');
  //console.log(sel11);
  //select.replaceChildren(sel11);
  //4
  //select.innerHTML = '';
  //select.children[1].innerHTML = '';
}

/*
  button/input ke disabled korte caile
      btn.disabled = true;
    input.disabled = true;
*/

//!Attribute
const showon = document.getElementById('UDN');
//console.log(showon.getAttribute('id'));

//* Create Attribute
//1 Best
let sel2 = document.querySelector('h3');
sel2.setAttribute('title', 'UNKNOWN DEVELOPER NIROB');
//console.log(sel2);

//2
let sel = document.querySelector('input');
let creAtt = document.createAttribute('disabled');
sel.setAttributeNode(creAtt);

//sel.setAttribute('disabled', 'true');
//3
let sel1 = document.querySelector('h2');
let creAtt1 = document.createAttribute('title');
creAtt1.value = 'UNKNOWN DEVELOPER NIROB';

sel1.setAttributeNode(creAtt1);

//? No Overwrite
let sel3 = document.querySelector('h4');
sel3.setAttribute('class', 'newClass'); //? Overwrite
sel3.setAttribute('class', 'newClass c1'); //? No Overwrite

//*Remove Attribute
//showon.removeAttribute('class');
//console.log(showon);

//*Chek Arrribute
//console.log(showon.hasAttribute('id'));
//console.log(showon.hasAttribute('src'));

//! Html + Js add text
let sel4 = document.querySelector('.class1');
sel4.innerHTML = `${sel4.innerHTML} UNKNOWN FAMILY`;

//! Change Text
let sel5 = document.querySelectorAll('.class2');

//* Way 1
/*for (let i = 0; i < sel5.length; i++){
  console.log(sel5[i]);
  sel5[i].innerHTML = `New Box ${i}`
}*/
//* Way 2
let i = 1;
for (const key in sel5) {
  sel5[key].innerHTML = `New Box ${i}`;
  i++;
}
//? I have use all loop to same work

//!Task
//*Video1
//1
const text = document.getElementById('text').textContent;

const myWord = text.toLocaleLowerCase().replaceAll('.', '').split(' ');

let allWord = Array.from(myWord);

let similarWords = {};
for (let word of allWord) {
  if (similarWords[word]) {
    similarWords[word] = similarWords[word] + 1;
  } else {
    similarWords[word] = 1;
  }
}

let maxWord = '';
let maxWordCount = 0;

for (let i in similarWords) {
  //console.log(similarWords[i]);
  //console.log(i);
  if (maxWordCount < similarWords[i]) {
    maxWordCount = similarWords[i];
    maxWord = i;
  }
}
document.getElementById(
  'result'
).innerHTML = `The most frequent word is ${maxWord} in ${maxWordCount}`;
//console.log(maxWordCount);
//console.log(maxWord);
//console.log(similarWords);
//2
const data = document.querySelectorAll('#cars li');
const dataArray = Array.from(data);

dataArray.forEach((dat, index) => {
  if (index % 2 === 0) {
    dat.style.color = 'blue';
    dat.style.backgroundColor = 'green';
  } else {
    dat.style.color = 'green';
    dat.style.backgroundColor = 'blue';
  }
});
//*Video 2
