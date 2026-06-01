//! Map
// Key Can be any type
// Map remember the original order in which the element where added to it
//If key name is Same so Old Value Replaced by a New Value
const map = new Map([
  ['name', 'Nirob'],
  ['age', 23],
  ['self-depended', false],
]);

//* Set()
//Syntax: set(key,value) Work:Add new Key Value on Map
map.set('age', 18);

//console.log(map);

//* Get()
//Syntax: get(key) Work: It give this key Value
//console.log(map.get('name'));

//*Some Method
//console.log(map.size); //It give map size
//console.log(map.has('age')); //It chek this key avialable on the Map
map.delete('self-depended'); // Delete this key value pair on Map
//console.log(map);
//map.clear(); // Delete all Properties
//console.log(map);

const ageMap = new Map([
  ['Nirob', 18],
  ['Raj', 20],
  ['Safa', 14],
  ['Fatema', 19],
]);

//* Map Iterator Method
/* console.log(ageMap.keys()); // Gives all keys and We iterate in ForEach
ageMap.keys().forEach(elem => console.log(elem));

console.log(ageMap.values()); // Gives all values and We iterate in ForEach
ageMap.values().forEach(elem => console.log(elem));

console.log(ageMap.entries()); // Gives all keys and Value and We iterate in ForEach
ageMap.entries().forEach(elem => console.log(elem)); */

//? Directly Iterate In Map
ageMap.forEach((value, key) => {
  // console.log(key, value);
});

for (const [key, value] of ageMap) {
  //console.log(key, value);
}

//* Convertion

//? Object --> Map
const adressObj1 = {
  Nirob: 'Natore',
  Safa: 'Walia',
  Raj: 'Chapai',
};

const adressMap1 = new Map(Object.entries(adressObj1));
//console.log(adressMap1);

//? Map --> Object
const adressMap2 = new Map([
  ['Nirob', 'Natore'],
  ['Safa', 'Walia'],
  ['Raj', 'Chapai'],
  [28, true],
]);

const adressObj2 = Object.fromEntries(adressMap2);
//console.log(adressObj2);

//? Map --> Array
const foodMap = new Map([
  ['milk', 200],
  ['tea', 300],
  ['coffee', 500],
]);

//console.log(Array.from(foodMap));
//console.log([...foodMap]);

//! Set
//A set is a collection of unique elements
//It is Not suppot same Value
const set = new Set([1, 2, 3, 1]);

//* add()
//Syntax : add(value) Work : Add new Value on Set
set.add(4);
//console.log(set);

//* Some Method
//console.log(set.size); //It Gives us Set size
//console.log(set.has(2)); //It chek this key avialable on the Set
set.delete(1); //Delete Element
//console.log(set);
//set.clear(); //Clear all Value

//* Set Iterator Method
/* console.log(set.values()); //It give all value
set.values().forEach(val => console.log(val));
set.forEach(val => console.log(val));
 */
//* Convert
//? Set --> Array
//console.log([...set]);
//console.log(Array.from(set));

//? Array --> Set
const numArr = [0, 1, 2, 1, 3, 4, 2];
const numSet = new Set(numArr);
//console.log(numSet);

const setA = new Set([1, 2, 3]);
const setB = new Set([3, 4, 5]);

//* Merge Element
//console.log(setA.union(setB));

//* Common Element
//console.log(setA.intersection(setB));

//* Neclet/Out Same and second set Element
//console.log(setA.difference(setB));

//* Chek First set all element is aviablable in second set
const numbers = new Set([2, 4, 6, 8, 10, 12, 14, 16, 18]);
const the4Table = new Set([4, 8, 12, 16]);

//console.log(numbers.isSupersetOf(the4Table)); // true

//! WeakMap
/*
WeakMap এর বৈশিষ্ট্য:
✅ শুধুমাত্র Object key গ্রহণ করে (string, number নয়)
✅ Garbage Collection সাপোর্ট করে - যদি object null করা হয়, WeakMap তা remove করে
✅ শুধুমাত্র 4টি method: set(), get(), has(), delete()
✅ Iteration নেই - forEach, keys(), values() কাজ করে না
✅ Size property নেই*/
//WeakMap উদাহরণ:

// Regular Map - memory leak হতে পারে
let user = { name: 'tapaScript' };
const uMap = new Map();
uMap.set(user, true);

user = null;  // কিন্তু uMap এ user object থেকে যায়!
console.log(uMap);  // Map এ এখনো আছে

// WeakMap - garbage collection হয়
let addr = { country: 'India' };
const wMap = new WeakMap();
wMap.set(addr, true);

addr = null;  // এখন WeakMap থেকে সরে যায়!
console.log(wMap);  // WeakMap খালি


//! WeakSet
/*WeakSet এর বৈশিষ্ট্য:
✅ শুধুমাত্র Object values রাখে
✅ Garbage Collection সাপোর্ট করে
✅ শুধুমাত্র 3টি method: add(), has(), delete()
✅ Iteration নেই
✅ Size property নেই*/

//WeakSet উদাহরণ:

const onlineUsers = new WeakSet();

let user1 = { name: 'Alice' };
let user2 = { name: 'Bob' };

onlineUsers.add(user1);
onlineUsers.add(user2);

console.log(onlineUsers.has(user1));  // true

user1 = null;  // এখন WeakSet থেকে সরে যায়
console.log(onlineUsers.has(user1));  

