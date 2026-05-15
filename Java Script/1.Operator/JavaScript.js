//! Arithmemtic Oparator
let a = 50;
let b = 20;

let c = a + b;
let d = a % b; //ভাগশেষ লাগলে;

//console.log(c);
//console.log(d);

//* Expondicial Oparator
let xx = 2;
let yy = 4;
//console.log(xx ** yy);//? ** = to the power

//* User input
/*let userInput = prompt('Enter a number');
console.log(userInput);

let inputNumber = parseInt(userInput); //* String to convert Number to Use a parseint
console.log(inputNumber);*/

let x = 10;
// x = x + 1;
//console.log(x);
//*এটাকে এ ভাবে করা যায়

/*console.log(x++);
console.log(x);
console.log(++x);

console.log(x--);
console.log(x);
console.log(--x);
*/

//! Assigment Oprstor
/*
let z = 10;
let z1 = z + 5;
console.log(z1);
z += 5; //z = z + 5
console.log(z);

let z2 = z - 5;
console.log(z2);
z -= 5; //z = z - 5
console.log(z);

let z3 = z * 5;
console.log(z3);
z *= 5; //z = z * 5
console.log(z);

let z4 = z / 5;
console.log(z4);
z /= 5; //z = z / 5
console.log(z);

let j = 10;
let k = 15;
// j = j + k;
//j += k; // Same
console.log(j);
*/

//! Comparison Oparator
let p = 10;
let q = '10';
let r = 15;
console.log(p == q);
console.log(p === q);
console.log(p === r);
console.log(p !== r); //* ! = Not Equal

console.log(p < r);
console.log(p <= q);
console.log(p > r);

//! Logical Oparator
/*
//* && And Operator
console.log(false && false); // false
console.log(true && false); // false
console.log(true && true); // true
console.log(false && true); // false

console.log('Cow' && 'Horse'); // "Horse"

console.log(4 > 5 && 4 === 6);
//* || Or Operator
console.log(false || false); // false
console.log(true || false); // true
console.log(true || true); // true
console.log(false || true); // true

console.log('Cow' || 'Horse'); // "Cow"

//* Not Operator
console.log(!false);

//* ?? Nulish Operator
let a1 = null ?? 1; // 1
let a2 = undefined ?? 3; // 3
const a3 = false ?? 'tapaScript'; // false
const a4 = 0 ?? 'tapas'; // 0
*/

//! Conditinial (Ternary) Oparator
j = 10;
k = 20;
let t = j < k ? 'Currect' : 'Incurret';
console.log(t);
let s = j > k ? 'Currect' : 'Incurret';
console.log(s);

const cars = [
  { id: 1, title: 'Toyota', isPremium: false },
  { id: 2, title: 'BMW', isPremium: true },
  { id: 3, title: 'Mercedes', isPremium: true },
];

// টেস্ট ১: শুধু প্রিমিয়াম কার
const result1 = cars.filter(car => (true ? car.isPremium : true));
console.log(result1); // শুধু BMW ও Mercedes দেখাবে

// টেস্ট ২: সব কার
const result2 = cars.filter(car => (false ? car.isPremium : true));
console.log(result2); // সব কার দেখাবে
