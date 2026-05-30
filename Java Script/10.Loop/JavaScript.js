//! For Use in Array
let car = ['BMW', 'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan'];

//*Array সবগুলো Element একসাথে দেখাবে
//? For Loop
for (let i = 0; i < car.length; i++) {
  //console.log(car);//? Full Array repeat
  //console.log(i);//? Index Number
  //console.log(car[i]);//? Array Value
}

for (let i = 0; i <= 20; i++) {
  if (i % 2 === 0) {
    //console.log(i);
  }
  if (i % 2 === 1) {
    //console.log(i);
  }
}

//Break and continue

for (let i = 0; i <= 10; i++) {
  if (i === 5) {
    break;
  }
  //console.log(i);

  //*Write alternative way
  if (i === 5) break;
  //console.log(i);
}
for (let i = 0; i <= 5; i++) {
  if (i === 3) continue; //skip 3
  //console.log(i);
}

//Multipul condition
for (let i = 1, j = 10; i <= 10 && j >= 1; i++, j--) {
  //console.log(i, j);
}

//? For in Loop use in Array
for (const i in car) {
  //console.log(car); //? Full Array repeat
  //console.log(i); //? Index Number
  //console.log(car[i]);//? Array Value
}

//? For Of Loop
for (let i of car) {
  //console.log(i);
}

//? For Each Loop
car.forEach(function (value, index, array) {
  //console.log(value);
  //console.log(index);
  //console.log(array);
});
// Function পরে Call করতে চাইলে
function valued(value, index, array) {
  //console.log(value);
  //console.log(index);
  //console.log(array);
}
car.forEach(valued);

//! For Use in Object
let car1 = {
  name: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'Black',
  price: 50000,
};

//*For in
for (let i in car1) {
  //console.log(car1); //? Full Obj
  // console.log(i); //? only Key
  //console.log(car1[i]); //? Only Value
  // console.log(`${i}: ${car1[i]}`); //?Key:Value
  let up = i[0].toUpperCase() + i.slice(1);
  //console.log(`${up}: ${car1[i]}`);
}

//*For of Loop use in Object
for (const i of Object.keys(car1)) {
  //console.log(i);//? Key
  //console.log(car1[i]);//?Value
  //console.log(`${i}: ${car1[i]}`);//?Key:value
}

//Slice
let n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
//console.log(n.slice(5, 9)); //Srart,end

//! While Loop

let num = 0;
while (num < 6) {
  //console.log(num);
  num++;
}

//*Different Exmple
let set = new Set();

while (set.size <= 9) {
  let randomNum = Math.floor(Math.random() * 10); // 0 থেকে 9
  set.add(randomNum); // ডুপ্লিকেট হলে add হবে না
}
//console.log(Array.from(set));

let num1 = [];
while (num1.length <= 9) {
  let rdn = Math.floor(Math.random() * 11);
  num1.push(rdn);
}
//console.log(num1);

//*do-while
let count = 1;
do {
  //console.log(count);
  count++;
} while (count <= 10);

//!Infinity Loop
/*for (;;) {
  console.log('hello');
}*/
/*while (true) {
  console.log('hello');
  }*/
/*do {
  console.log('hello');
} while (true);*/

//! Same Text Print
//* Use For Loop
for (let i = 1; i <= 10; i++) {
  // console.log(`${i}.Sorry Baby`);
}

//* Use While Loop
let i = 1;
while (i <= 10) {
  // console.log(`${i}.Sorry Baby`);
  i++;
}

//! Higher Order Array Loop
//* String Break
let lang = 'JavaScript';
for (const i of lang) {
  //console.log(i);
}
let lange = 'JavaScript';
for (const i in lange) {
  //console.log(lange[i]);
}
const language = 'JavaScript';
for (let i = 0; i <= language.length; i++) {
  // console.log(language.charAt(i));
}

//* Array in Objet
const stack = [
  {
    name: 'Mearn Stack',
    property: 'Mongo,Express,React,Node',
  },
  {
    name: 'Laravel',
    property: 'JavaScript,Vue,PHP,Laravel,MySQL',
  },
  {
    name: 'WordPress',
    property: 'JavaScript,PHP,WordPress,MySQL',
  },
];
stack.forEach(info => {
  //console.log(info); //? Full Obj Repeat
  //console.log(info.name); //? Value
  //console.log(`Want to Learn ${info.name}? Learn this ${info.property}`);
});

