//! Creat Symbol
const newSymbol = Symbol('Key1');

//! Object Litarance
const mobilModel = {
  //Key : Value
  name: 'Samsung',
  model: 'S22 Ultra',
  Prossasor: 'Snapdragon Gen-4',
  camera: ['200MP', '12MP', '10MP'],
  hasZoomCamara: true,
  'selfi camara MP': 12,

  // Use Symbol
  [newSymbol]: 'My Key',

  //Use Function
  brandModel: function () {
    return `Mobil Brand is ${this.name} and Moel Is ${this.model}`;
  },

  //object in object
  battery: {
    mah: 5000,
    charging: '65w',
  },
};
//*Full Object Output
//console.log(mobilModel);

//*Only One Value Output
/* console.log(mobilModel.Prossasor); //? Idea-1
console.log(mobilModel['Prossasor']); //? Idea-2
console.log(mobilModel['selfi camara MP']); //? Use case Idea-2
console.log(mobilModel[newSymbol]); //? Symbol Output
console.log(mobilModel.brandModel()); //? Function Output
console.log(mobilModel.battery.mah); //? Object in Object Output
 */
//* Update Value
//console.log(mobilModel.model); //? Old
mobilModel.model = 'S23 Ultra'; //? Update
//console.log(mobilModel.model); //? New

//console.log(mobilModel.camera); //? Old
mobilModel.camera[0] = '18MP'; //? Object > Array Update
//console.log(mobilModel.camera);

//*Add value
let newOb = { num2: 2 };
newOb['num1'] = 1;
newOb['num2'] = newOb['num2'] + 1;
console.log(newOb);

//* Delete
//delete mobilModel.Prossasor;
//console.log(mobilModel);

//* Object Freeze
//console.log(mobilModel.Prossasor);
Object.freeze(mobilModel); //? Old
mobilModel.Prossasor = 'SD-5'; //?Update
//console.log(mobilModel.Prossasor); //? No Update

delete mobilModel.battery;
mobilModel.avaliable = true;
//console.log(mobilModel); //? No Change

//* Object seal
//আমার যদি এরকম দরকার হয় যে আমার কোন Object এ value Update করা দরকার কিন্তু কোন value Delete,Add করা যাবে না তাহলে seal use করতে হবে

const neob = {
  name: 'UD NIROB',
};

Object.seal(neob);

delete neob.name;
neob.age = 17;
//console.log(neob); //No Change

neob.name = 'SAFA';
//console.log(neob); //Change

//?Freeze chek
//console.log(Object.isFrozen(mobilModel));

//*Object Only All key Output in Array
//? Way-1
//console.log(Object.keys(mobilModel)); //? All Key
//console.log(Object.keys(mobilModel)[0]); //? Only One key
//? Way-2
//console.log(Reflect.ownKeys(mobilModel));

//* Object Only All Value Output in Array
//console.log(Object.values(mobilModel)); //? All Value
//console.log(Object.values(mobilModel)[1]); //? Only One Value

//* Object Property Chek (Exist or not)
//? Way-1
//console.log(mobilModel.hasOwnProperty('camera'));
//console.log(mobilModel.hasOwnProperty('cameras'));

//? Way-2
//console.log('camera' in mobilModel);
//console.log('cameras' in mobilModel);

//? Way-3
//console.log(Object.hasOwn(mobilModel, 'camera'));
//console.log(Object.hasOwn(mobilModel, 'cameras'));

//! Object Distaring
const student = {
  namee: 'John Williamson',
  age: 9,
  std: 3,
  subjects: ['Maths', 'English', 'EVS'],
  parents: {
    father: 'Brown Williamson',
    mother: 'Sophia',
    email: 'john-parents@abcde.com',
  },
  address: {
    street: '65/2, brooklyn road',
    city: 'Carterton',
    country: 'New Zealand',
    zip: 5791,
  },
};
//* Value Out Form Object
//? Bad Way
// const nam = student.namee;
//console.log(nam);
//? Good Way
const { namee, age, meal = 'Bread' /*Static Update */ } = student;
//console.log(namee, age, meal);

const { subjects, numberOfSubject = subjects.length /* Dynamic Update */ } =
  student;
//console.log(subjects, numberOfSubject);

//* Nasted Object Out Value
const {
  parents: { father },
} = student;
//console.log(father);

//*Destructure to Function Parameter
//? Normal Way
/* function sentEmail(mainObj) {
  console.log(`Sent Email on a ${mainObj.parents.email}`);
  } */
//?Distruced Way
function sentEmail({ parents: { email } }) {
  //console.log(`Sent Email on a ${email}`);
}
sentEmail(student);

//*Destructure a Function Return Value
const getStudent = () => {
  return {
    namee: 'John Williamson',
    age: 9,
    std: 3,
    subjects: ['Maths', 'English', 'EVS'],
    parents: {
      father: 'Brown Williamson',
      mother: 'Sophia',
      email: 'john-parents@abcde.com',
    },
    address: {
      street: '65/2, brooklyn road',
      city: 'Carterton',
      country: 'New Zealand',
      zip: 5791,
    },
  };
};
//? Bad Way
/* const studentOne = getStudent();
const anotherName = studentOne.namee;
const anotherSubject = studentOne.subjects;
console.log(anotherName, anotherSubject); */

//? Good Way
{
  const { namee, subjects } = getStudent();
  // console.log(namee, subjects);
}
//Name Change
{
  const { namee: anotherName, subjects: anotherSubject } = getStudent();
  // console.log(anotherName, anotherSubject);
}

//* Destructuring in Loops
const students = [
  {
    name: 'William',
    grade: 'A',
  },
  {
    name: 'Tom',
    grade: 'A+',
  },
  {
    name: 'Bob',
    grade: 'B',
  },
];
for (let { name, grade } of students) {
  //console.log(name, grade);
}

//! Many Object Combind
const obj1 = {
  a: 1,
  b: 2,
  c: 3,
};
const obj2 = {
  x: 1,
  y: 2,
  z: 3,
};
const obj3 = {
  p: 1,
  q: 2,
  r: 3,
};

const CombindObject = { ...obj1, ...obj2, ...obj3 }; //Way-1
const CombindObject1 = Object.assign(obj1, obj2, obj3); //Way-2

//console.log(CombindObject);
//console.log(CombindObject1);

//!Object Clone
/* 
//Way-1
const object = { name: 'UD NIROB' };
const object2 = Object.assign({}, object); //New Object With Refarence
console.log(object2);
console.log(object === object2);

//Way-2
const object3 = { ...object }; //New Object With Refarence
console.log(object3);
console.log(object === object3);

//Way-3
const ob = {
  a: 1,
  b: { c: 3 },
};

//? Bad practise for Clone
const ob1 = Object.assign({}, ob);
ob1.b.c = 2;

console.log(ob.b.c);
console.log(ob1.b.c);

ob1.a = 100;

console.log(ob.a);
console.log(ob1.a);

//? Good practise for Clone
const ob2 = {
  a: 1,
  b: { c: 3 },
};
const ob3 = structuredClone(ob2);
ob3.b.c = 2;

console.log(ob2.b.c);
console.log(ob3.b.c);

ob2.a = 100;

console.log(ob2.a);
console.log(ob3.a);
 */

//! Object to Convert Array
const myObj = {
  name: 'UD NIROB',
  age: 17,
};
const newArr = Object.entries(myObj);
//console.log(newArr);

//!Dynamic Key Change
/* let flower = prompt('What is your fav Fruit');

let dyObj = {
  [flower]: 'Sunflower',
};
console.log(dyObj); */

//! Constractor Object
/// NOTE:Constractor Object Function Name First Letter Alaways Write Uppercase

// Use of Constractor Object:যদি আমার এরকম অনেকগুলো Object তৈরি করতে যেখানে Key গুলো একই থাকবে কিন্তু value Change করতে হবে এরকম ক্ষেত্রে Constractor Object Use করতে হবে
function Person(first, last, age) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
}
const Person0 = new Person('UD', 'NIROB', 17);
const Person1 = new Person('MST.SARA', 'AKTAR', 23);
//* Element Add in Constractor Object
Person0.Carrier = 'Web Developer';
Person1.passion = 'House Wife';
//* One Obj Value Access
//console.log(Person0.lastName);
//console.log(Person1.passion);

console.log(Person0);
//console.log(Person1);
//console.log(Person1.lastName);

//* Real life Project Example
//ধরি আমি একটা অনলাইন দোকানের জন্য Product Catalog বানাচ্ছি। প্রত্যেকটা প্রোডাক্টের কিছু ইনফো থাকবে—যেমন নাম, দাম, এবং স্টক।আমরা Product নামে একটি Constructor Function ব্যবহার করব।

function Product(name, price, stock) {
  this.name = name;
  this.price = price;
  this.stock = stock;

  this.showDisplay = function () {
    return `${this.name}-${this.price} ${
      this.stock ? 'Available' : 'Out of Stock'
    }`;
  };
}
const product1 = new Product('AMD Ryzen 7 7700 Prossasor', 26000, true);
const product2 = new Product('Intel Arc A770 GPU', 36500, true);
const product3 = new Product('Kingston Fury RAM', 8300, false);
//console.log(product2);

//console.log(product1.showDisplay());
//console.log(product2.showDisplay());
//console.log(product3.showDisplay());

//* Same Work
function prd(name, price, stock) {
  return `${name}-${price} ${stock ? 'Available' : 'Out of Stock'}`;
}
//console.log(prd('AMD Ryzen 7 7700 Prossasor', 2600, true));
//console.log(prd('Intel Arc A770 GPU', 36500, true));
//console.log(prd('Kingston Fury RAM', 8300, false));

//* Factory Obj
function creatUser(name, age) {
  return {
    yourname: name,
    yourage: age,
  };
}
const user1 = creatUser('NIROB', 17);
const user2 = creatUser('SAFA', 14);
//console.log(user1);
//console.log(user2);

//*
let newObj = {
  //names: '',
  model: 'S22 Ultra',
  Prossasor: 'Snapdragon Gen-4',
};

function news() {
  let key = 'names';
  let value = 'samsung';
  //console.log({ ...newObj, [key]: value });
  //console.log({ ...newObj, apple: 'fruit' });
}
news();

const eas = { ...mobilModel, ['Premium']: true };
//console.log(eas);

//! Optional Chaining
const em = {
  salaty: {
    bonus: 300,
  },
};
//console.log(em.dept); //Undifined
//console.log(em.dept.name); //Error

//console.log(em.dept?.name); //Undifined

//! Task
//1
const user = { name: 'Alex', age: undefined };
//console.log(user.age ?? "Not provided");

//3
const person = {
  name: 'Tapas',
  company: {
    names: 'tapaScript',
    location: {
      city: 'Bangalore',
      zip: '94107',
    },
  },
};
const { name } = person;
//console.log(name);

const {
  company: {
    location: { city },
  },
} = person;
//console.log(city);

//4
const studentDeatail = [
  {
    name: 'UD NIROB',
    age: 17,
    grade: 4.98,
  },
  {
    name: 'SAFA',
    age: 14,
    grade: 4.99,
  },
  {
    name: 'RAJ',
    age: 19,
    grade: 4.75,
  },
  {
    name: 'SHUVO',
    age: 18,
    grade: 5.0,
  },
];
let sum = 0;
const totalStudent = studentDeatail.length;

for (let { grade } of studentDeatail) {
  sum = sum + grade;
}

let avarage = sum / totalStudent;
//console.log(avarage);
//5

const Akhon_Joubon_Zar = {
  quantity: 500,
  author: 'xx',
  price: 450,
};
const mukto_Bataser_Khoje = {
  quantity: 900,
  author: 'xx',
  price: 220,
};
const MuhaChinin = {
  quantity: 0,
  author: 'xx',
  price: 280,
};
/* const kitabut_Tawhid = {
  quantity: 0,
  author: 'xx',
  price: 180,
}; */

function reStock(name, add = 0) {
  const { quantity } = name;
  totalQu = quantity + add;
  name.quantity = totalQu;
  console.log(totalQu);
}
//reStock(Akhon_Joubon_Zar, 50);
//console.log(Akhon_Joubon_Zar);

function checkAvailability(bookName) {
  const { quantity } = bookName;
  if (quantity === 0) {
    console.log('Not Avialiable');
  } else {
    console.log(true, quantity);
  }
}
//checkAvailability(Akhon_Joubon_Zar);
//6
const persons = { name: 'John' };
const newPerson = persons;
newPerson.name = 'Doe';
//console.log(persons.name);

//7
const users = [
  {
    name: 'Alex',
    address: '15th Park Avenue',
    age: 43,
  },
  {
    name: 'Bob',
    address: 'Canada',
    age: 53,
  },
  {
    name: 'Carl',
    address: 'Bangalore',
    age: 26,
  },
];
for (let { name, address, age } of users) {
  //console.log(name, address, age);
}
