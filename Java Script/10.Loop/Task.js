//! Task
//*1
//way-1
let sum = '';
for (let i = 1; i <= 5; i++) {
  sum = sum + '*';
  //console.log(sum);
}
//`way-2
for (let i = 1; i <= 5; i++) {
  let line = '';
  for (let j = 1; j <= i; j++) {
    line += '* ';
  }
  //console.log(line);
}
// way-3
for (let i = 1; i <= 5; i++) {
  //console.log('* '.repeat(i));
}
//way-4
for (let i = 1; i <= 5; i++) {
  //console.log(Array(i).fill('*').join(' '));
}

//*2
let number = 3;
for (let i = 1; i <= 10; i++) {
  let main = `${i} * ${number} = ${i * number}`;
  //console.log(main);
}
//*3
let sums = 0;

for (let i = 1; i <= 500; i++) {
  if (i % 2 === 1) {
    sums = sums + i;
  }
}
//console.log(sums);

//*4
for (let i = 1; i < 21; i++) {
  if (i % 3 === 0) continue;
  //console.log(i);
}

let number1 = 67893;
let rev = 0;
while (number1 > 0) {
  let digit = number1 % 10;
  //console.log(digit);
  rev = rev * 10 + digit;
  //console.log(rev);
  number1 = Math.floor(number1 / 10);
}
console.log(rev);

let number2 = 6789;
let rev1 = Number(number2.toString().split('').reverse().join(''));
console.log(rev1); // 9876

