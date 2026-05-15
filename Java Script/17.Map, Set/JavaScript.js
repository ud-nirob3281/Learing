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
//weakMap key suppot only object
//weakMap suppot only 4 Methood set, get, has, delete

let user = { name: 'tapaScript' };
//const allUsers = [user];

const uMap = new Map();
uMap.set(user, true);

user = null;

//console.log(uMap);

let addr = { country: 'India' };

const wMap = new WeakMap();
wMap.set(addr, true);

addr = null;

//console.log(wMap);

//! WeakSet
//weakSet key suppot only object
//weakSet suppot method add, has, delete
const onlineUsers = new WeakSet();

let user1 = { name: 'Alice' };
let user2 = { name: 'Bob' };

onlineUsers.add(user1);
onlineUsers.add(user2);
//console.log(onlineUsers.has(user1));

user1 = null;

//console.log(onlineUsers.has(user1));

//! Task
//1
{
  const studentMap = new Map([
    [1, 'Nirob'],
    [2, 'Safa'],
    [3, 'Fatema'],
    [4, 'Raj'],
    [5, 'Shuvo'],
  ]);
  // console.log(studentMap.get(2));
  studentMap.delete(4);
  // console.log(studentMap);

  //2
  const langSet = new Set(['Python', 'PHP', 'Rust', 'JavaScript', 'C', 'PHP']);
  //console.log(langSet);
  // langSet.values().forEach(val => console.log(val));
  //4
  const conTactMap = new Map([
    [0134, 'Nirob'],
    [5414, 'Safa'],
    [4554, 'Raj'],
  ]);
  conTactMap.set(4544, 'Shuvo');
  conTactMap.set(0134, 'Akash');
  conTactMap.delete(4554);
  conTactMap.get(5414);
  //5
  const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
  const reDu = new Set(fruits);
  //console.log(reDu);
  //6
  const loginUser = new Set();
  const newUserId1 = 1;
  const newUserId2 = 2;
  const newUserId3 = 3;
  const newUserId4 = 4;
  const newUserId5 = 5;
  //Login user
  loginUser.add(newUserId1);
  loginUser.add(newUserId2);
  loginUser.add(newUserId3);
  loginUser.add(newUserId4);
  loginUser.add(newUserId5);
  //Log out user
  loginUser.delete(newUserId3);
  loginUser.delete(newUserId1);
  //Specifiq Currently Login User
  //console.log(loginUser.has(newUserId3));
  //console.log(loginUser.has(newUserId5));

  //7
  const book = new Map([
    ['Success', 'Nirob'],
    ['Be Creative', 'Safa'],
    ['First Night', 'Safayet'],
    ['Marrige', 'Shuvo'],
    ['Kill Your Addiction', 'Nirob'],
  ]);
  book.set('First Night', 'Raj');
  //console.log(book.size);
  //10
  const shopingCart = new Map([
    [1, 10],
    [2, 3],
    [3, 8],
    [4, 1],
  ]);
  shopingCart.set(5, 7);
  shopingCart.delete(1);
  shopingCart.size;

  //11

  function chekAnagram(st1, st2) {
    const setA = new Set(st1.split(''));
    const setB = new Set(st2.split(''));
    return setA.isSupersetOf(setB);
  }
  //console.log(chekAnagram('nirob', 'safa'));
  //console.log(chekAnagram('saaf', 'safa'));

  //12
  function st(string) {
    const map = new Map([]);
    for (let str of string) {
      if (map.has(str)) {
        map.set(str, map.get(str) + 1);
      } else {
        map.set(str, 1);
      }
    }
    let fstSiVa;
    for (let str2 of string) {
      if (map.get(str2) === 1) {
        if (fstSiVa === undefined) {
          fstSiVa = str2;
        }
      }
    }
    //console.log(fstSiVa);
  }
  st('safa');

  //13
  const chekObj = {};
  const chekMap = new Map();

  /*   console.time();
  for (let i = 1; i <= 100000; i++) {
    chekObj[`a${i}`] = i;
    //  17.805908203125 ms
  }
  console.timeEnd();
  console.time();
  for (let i = 1; i <= 100000; i++) {
    chekMap.set(`a${i}`, i);
    //  8.428955078125 ms
  }
  console.timeEnd(); */
  //14
  let voteUser = new Set([]);
  function vote(userId) {
    if (voteUser.has(userId)) {
      console.log('You have already voted');
    } else {
      voteUser.add(userId);
      console.log('Your Vote is complete');
    }
  }
  /*   vote('nirob');
  vote('nirob');
  vote('safa'); */
  //15
  const em1 = {
    id: 1,
    name: 'Akash',
  };
  const em2 = {
    id: 2,
    name: 'Shuvo',
  };
  const em3 = {
    id: 3,
    name: 'Safa',
  };
  const em4 = {
    id: 4,
    name: 'Nirob',
  };
  const emMap = new Map([
    [em1, 'Engnieer'],
    [em2, 'Front-End Web Developer'],
    [em3, 'Back-End Web Developer'],
    [em4, 'Full-Stack Web Developer'],
  ]);
  // console.log(emMap.get(em3));
  let pObj = {};
  pObj[em3] = 'Love';
  // console.log(pObj);
}
