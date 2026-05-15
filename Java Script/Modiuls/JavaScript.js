//! Static Import

//* Default import
import nam from './default.js';
console.log(nam());

import { default as first } from './default.js';
console.log(first());

//* Named import
import { a, b, pi } from './extra.js';
console.log(a, b, pi);

//* Function import
import { myFunc } from './extra.js';
myFunc();

import { sum } from './extra.js';
console.log(sum(5, 10));

//* All import
import * as test from './extra.js';
console.log(test);
console.log(test.a);
console.log(test.pi);

//* Aliases
import { a as number } from './extra.js';
console.log(number); //a = number

//! Dynamic Import
const { c } = await import('./extra.js');
console.log(c);

const all = Promise.all([
  await import('./extra.js'),
  await import('./default.js'),
]);
all.then(res => {
  console.log(res);
  console.log(res[0].sum(4, 3));
  console.log(res[1].default());
});
