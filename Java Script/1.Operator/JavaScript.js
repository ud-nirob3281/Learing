//! JavaScript Operators (অপারেটরসমূহ)

//* 1. Arithmetic Operators (গাণিতিক অপারেটর)
let a = 50;
let b = 20;

let sum = a + b;         // 70
let sub = a - b;         // 30
let mul = a * b;         // 1000
let div = a / b;         // 2.5
let mod = a % b;         // 10 (ভাগশেষ)  → 50 ÷ 20 ভাগফল 2, ভাগশেষ 10

console.log(sum, sub, mul, div, mod);

// Exponential Operator (**) → পাওয়ার বোঝায়
let xx = 2;
let yy = 4;
console.log(xx ** yy);   // 2⁴ = 16

// Increment / Decrement (++ / --)
// Prefix: আগে বাড়ায় তারপর use; Postfix: আগে use তারপর বাড়ায়
let x = 10;
console.log(x++);    // 10  (আগে print 10, তারপর x = 11)
console.log(x);      // 11
console.log(++x);    // 12  (আগে বাড়িয়ে 12, তারপর print)

console.log(x--);    // 12  (আগে print 12, তারপর x = 11)
console.log(x);      // 11
console.log(--x);    // 10  (আগে কমিয়ে 10, তারপর print)

//* 2. Assignment Operators (এসাইনমেন্ট অপারেটর)
// কোনো ভেরিয়েবলের মান আপডেট করতে ব্যবহার হয়।
let z = 10;
z += 5;   // z = z + 5  → 15
z -= 3;   // z = z - 3  → 12
z *= 2;   // z = z * 2  → 24
z /= 4;   // z = z / 4  → 6
z %= 4;   // z = z % 4  → 2

console.log(z); // 2

//* 3. Comparison Operators (তুলনামূলক অপারেটর)
// সবসময় boolean (true/false) return করে।

let p = 10;
let q = '10';  // string
let r = 15;

// Equality vs Strict Equality
console.log(p == q);    // true  (value সমান, টাইপ check করে না → type coercion)
console.log(p === q);   // false (value + type উভয়ই সমান হতে হবে)

console.log(p != r);    // true  (10 != 15)
console.log(p !== q);   // true  (10 !== '10', কারণ টাইপ ভিন্ন)

// Greater / Less
console.log(p > r);     // false
console.log(p < r);     // true
console.log(p >= 10);   // true
console.log(p <= q);    // true (coercion হয়ে 10 <= 10)

//* 4. Logical Operators (লজিক্যাল অপারেটর)

// 4.1 && (AND) → সবগুলো true হলেই true
console.log(false && false);  // false
console.log(true && false);   // false
console.log(true && true);    // true
// Truthy/Falsy-তে প্রথম falsy value বা শেষ truthy value return করে
console.log('Cow' && 'Horse'); // "Horse" (উভয় truthy → শেষটা return)
console.log(4 > 5 && 4 === 6); // false

// 4.2 || (OR) → যেকোনো একটা true হলেই true
console.log(false || false);  // false
console.log(true || false);   // true
console.log(false || true);   // true
// প্রথম truthy value বা শেষ falsy value return করে
console.log('Cow' || 'Horse'); // "Cow" (প্রথম truthy)
console.log(0 || null || 'Hello'); // "Hello"

// 4.3 ! (NOT) → বিপরীত boolean
console.log(!true);           // false
console.log(!0);              // true (0 falsy)

// 4.4 ?? (Nullish Coalescing) → null / undefined ছাড়া কিছু হলে বাঁ দিক নিবে
let a1 = null ?? 1;           // 1 (null পেল, তাই ডানের 1)
let a2 = undefined ?? 3;      // 3
const a3 = false ?? 'tapa';   // false (false nullish না, তাই বাঁ দিক)
const a4 = 0 ?? 'tapas';      // 0 (0-ও nullish না)

//* 5. Conditional (Ternary) Operator (শর্তসাপেক্ষ অপারেটর)
// Syntax: condition ? exprIfTrue : exprIfFalse
let j = 10;
let k = 20;

let result = j < k ? 'Correct' : 'Incorrect';
console.log(result); // "Correct"

// Real-life example: array filter with ternary
const cars = [
  { id: 1, title: 'Toyota', isPremium: false },
  { id: 2, title: 'BMW', isPremium: true },
  { id: 3, title: 'Mercedes', isPremium: true },
];

// When condition is true → returns the boolean car.isPremium (filter condition)
const premiumCars = cars.filter(car => (true ? car.isPremium : true));
console.log(premiumCars); // BMW, Mercedes (যাদের isPremium true)

// When condition is false → always returns true → keep all cars
const allCars = cars.filter(car => (false ? car.isPremium : true));
console.log(allCars); // সবগুলো car

//* 6. Other Useful Operators (Bonus)
// typeof: data type check
console.log(typeof 42);        // "number"
console.log(typeof 'Safa');    // "string"

// delete: object property remove
const obj = { name: 'Test', age: 20 };
delete obj.age;
console.log(obj); // { name: 'Test' }

// in: property existence check
console.log('name' in obj);   // true
console.log('age' in obj);    // false

//* User Input & String to Number conversion (পূর্বের নোট থেকে)
/*
let userInput = prompt('Enter a number');
let inputNumber = parseInt(userInput); // String থেকে Number
console.log(inputNumber);
*/
