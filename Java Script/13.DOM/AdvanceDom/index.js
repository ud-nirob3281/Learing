//! Efficient DOM traversal
//! Childrens/ChildNodes/firstChild/firstElementChild

const parent = document.getElementById('parent');

//* Childrens/ChildNodes

//? childNodes (সব কিছু - এলিমেন্ট, টেক্সট, কমেন্ট)
//console.log(parent.childNodes); // Returns: [text, p, text, span, text, p, text]

//? children (শুধু HTML Element গুলো)
//console.log(parent.children); // Returns: [p, span, p] (শুধু এলিমেন্ট)

//* firstChild/firstElementChild - lastChild/lastElementChild
//? firstChild
//console.log(parent.firstChild); // সাধারণত whitespace/text node returns করে
//console.log(parent.firstChild.textContent); // Only Text Rerurn করে

// Way-2 Best
//console.log(parent.childNodes[0]); // সাধারণত whitespace/text node returns করে
//console.log(parent.childNodes[0].textContent); // Only Text Rerurn করে

//? lastChild
//console.log(parent.lastChild); // Returns: "Text"
//console.log(parent.lastChild.textContent); // Only Text Rerurn করে

//? firstElementChild
//console.log(parent.firstElementChild); // Returns: <p>First paragraph</p>
//console.log(parent.firstElementChild.textContent); // Only Text Rerurn করে

//Way-2 Best
//console.log(parent.children[0]); // Returns: <p>First paragraph</p>
//console.log(parent.children[0].textContent); // Only Text Rerurn করে

//? lastElementChild
//console.log(parent.lastElementChild); // Returns: <p>Second paragraph</p>
//console.log(parent.lastElementChild.textContent); // Only Text Rerurn করে

//! ParentNode
//*আমারা যেমন Parent থেকে Child Acess করতে পারি তেমন Child থেকে Parent Acess করতে হলে
// Button (child) থেকে Div (parent) Access
const button = document.querySelector('.child');
const parentDiv = button.parentNode; // #parent পাবেন
//const parentDiv = button.parentElement; //Same
console.log(parentDiv);

//! Document Fragment and Range

//! Document Fragment
// - Not part of the main DOM tree until you insert it
// - Acts like a temporary container
// - Great for building chunks of DOM before adding them.
const fragment = document.createDocumentFragment();
for (let i = 1; i < 4; i++) {
  const li = document.createElement('li');
  li.innerText = `Item${i}`;
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);

//!Range
const p = document.getElementById('para');

const range = document.createRange();

range.setStart(p.childNodes[0], 4); // After "Hello "
range.setEnd(p.childNodes[2], 4);
const content = range.cloneContents();
console.log(content);

//!Shadow DOM
const box = document.getElementById('box');
const shadow = box.attachShadow({ mode: 'open' });
shadow.innerHTML = `<style>p { color: red; }</style><p>Hello Shadow!</p>`;

//! cloneNode 
//node.cloneNode();    // shallow clone (false)
//node.cloneNode(false); // shallow clone
//node.cloneNode(true);  // deep clone

const template = document.querySelector('#card-Tem');
const clone = template.content.cloneNode(true);
clone.querySelector('.title').textContent = 'Advance DOM';
console.log(clone);

document.body.appendChild(clone);

// Mutation Observer

// const observer = new MutationObserver(callback);
// observer.observe(targetNode, config);

const target = document.getElementById('watchMe');

const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    console.log(`Type of mutation: ${mutation.type}`);

    if (mutation.type === 'childList') {
      console.log('A child node was added or removed.');
    }

    if (mutation.type === 'attributes') {
      console.log(`Attribute ${mutation.attributeName} was changed.`);
    }

    if (mutation.type === 'characterData') {
      console.log(`Text content changed to: ${mution.target.data}`);
    }
  }
});

const config = {
  subtree: true,
  characterData: true,
  childList: true,
  attributes: true,
};

observer.observe(target, config);

function changeDOM() {
  target.textContent = 'Goodbye!';
  target.setAttribute('data-status', 'Changed');
}
