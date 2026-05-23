

//! JavaScript Objects (বাংলা+English Note)

/*
Object হলো key-value pair-এর collection. Property key: string বা Symbol.
Value: যেকোনো data type (primitive, array, function, nested object).
Object হলো reference type, heap-এ store হয়।
*/

//* 1. Object Creation (অবজেক্ট তৈরি)
// 1.1 Object Literal (সবচেয়ে বেশি ব্যবহার)
const mobilModel = {
  name: 'Samsung',                        // key: string
  model: 'S22 Ultra',
  Prossasor: 'Snapdragon Gen-4',
  camera: ['200MP', '12MP', '10MP'],      // array value
  hasZoomCamara: true,
  'selfi camara MP': 12,                  // multi-word key (quotes required)

  // Method (function as property)
  brandModel: function () {
    return `Mobil Brand is ${this.name} and Model Is ${this.model}`;
  },

  // Nested object
  battery: {
    mah: 5000,
    charging: '65w',
  },
};

// 1.2 Constructor Function (new keyword)
// NOTE: Constructor function-এর নামের প্রথম অক্ষর uppercase লিখা convention
function Person(first, last, age) {
  this.firstName = first;
  this.lastName = last;
  this.age = age;
  // method ও থাকতে পারে, তবে prototype-এ রাখা memory-efficient
}
const person0 = new Person('UD', 'NIROB', 17);
const person1 = new Person('MST.SARA', 'AKTAR', 23);

// 1.3 Factory Function (plain object return)
function createUser(name, age) {
  return {
    yourname: name,
    yourage: age,
  };
}
const user1 = createUser('NIROB', 17);

// 1.4 Object.create() (prototype set করে)
const base = { type: 'smartphone' };
const myPhone = Object.create(base);
myPhone.brand = 'Xiaomi'; // own property, prototype = base

//* 2. Symbols as Object Keys
const newSymbol = Symbol('Key1');
const symbolObj = {
  [newSymbol]: 'My Secret Key',  // computed property
};
console.log(symbolObj[newSymbol]); // 'My Secret Key'

// Symbol key শুধুমাত্র bracket notation দিয়ে access করা যায়
// Object.keys() বা for...in Symbol key দেখায় না (hidden)

//* 3. Property Access (মান বের করা)
// Dot notation (সরল key-র জন্য)
console.log(mobilModel.Prossasor);          // 'Snapdragon Gen-4'

// Bracket notation (dynamic key, multi-word, symbol)
console.log(mobilModel['selfi camara MP']); // 12
console.log(mobilModel[newSymbol]);         // symbol key

// Method call
console.log(mobilModel.brandModel());       // ফাংশন execute

// Nested object access
console.log(mobilModel.battery.mah);        // 5000

//* 4. Property Add, Update, Delete
// Add new property
mobilModel.warranty = '2 years';            // dot
mobilModel['color'] = 'Phantom Black';      // bracket

// Update existing
mobilModel.model = 'S23 Ultra';
mobilModel.camera[0] = '108MP';             // nested array update

// Delete
delete mobilModel.hasZoomCamara;

//* 5. Object Immutability (Freeze & Seal)
// 5.1 Object.freeze()
// freeze করলে object পুরোপুরি immutable: add, update, delete কোনোটাই কাজ করে না
const frozenObj = { name: 'Samsung' };
Object.freeze(frozenObj);
frozenObj.name = 'Apple';      // silently ignored (strict mode-এ error)
delete frozenObj.name;         // কাজ করবে না
frozenObj.newProp = 'test';    // কাজ করবে না
console.log(frozenObj.name);   // 'Samsung' (অপরিবর্তিত)
console.log(Object.isFrozen(frozenObj)); // true

// 5.2 Object.seal()
// seal করলে existing property update করা যায়, কিন্তু add/delete করা যায় না
const sealedObj = { name: 'UD NIROB' };
Object.seal(sealedObj);
sealedObj.name = 'SAFA';        // ✅ allowed
delete sealedObj.name;          // ❌ fail
sealedObj.age = 17;             // ❌ fail
console.log(sealedObj.name);    // 'SAFA'
console.log(Object.isSealed(sealedObj)); // true

//* 6. Property Existence Check (কোনো key আছে কিনা)
console.log(mobilModel.hasOwnProperty('camera'));   // true (own property)
console.log('camera' in mobilModel);                // true (prototype chain-ও check)
console.log(Object.hasOwn(mobilModel, 'camera'));   // true (ES2022, safer)

//* 7. Object থেকে Array-তে Convert (Keys/Values/Entries)
const myObj = { name: 'UD NIROB', age: 17 };

console.log(Object.keys(myObj));      // ['name', 'age']
console.log(Object.values(myObj));    // ['UD NIROB', 17]
console.log(Object.entries(myObj));   // [['name','UD NIROB'], ['age',17]]

// Reflect.ownKeys(obj) — all keys including Symbols
console.log(Reflect.ownKeys(mobilModel)); // ['name','model',..., Symbol(Key1)]

//* 8. Looping over Object (Iteration)
// for...in loop (own + inherited enumerable properties)
for (let key in mobilModel) {
  if (mobilModel.hasOwnProperty(key)) {
    console.log(`${key}: ${mobilModel[key]}`);
  }
}

// Object.keys() + forEach (শুধু own properties)
Object.keys(mobilModel).forEach(key => {
  console.log(key, mobilModel[key]);
});

//* 9. Dynamic Keys (Computed Property Names)
let flower = 'rose'; // prompt('What is your fav flower?') থেকে আসলে
let dyObj = {
  [flower]: 'Sunflower', // variable এর মান key হবে
};
console.log(dyObj); // { rose: 'Sunflower' }

// Function দিয়ে নতুন key-value add
function addProperty(obj, key, value) {
  return { ...obj, [key]: value };
}
const updated = addProperty({ a: 1 }, 'b', 2);

//* 10. Object Merging (Spread & Object.assign)
const baseInfo = { brand: 'Samsung', year: 2023 };
const extraInfo = { model: 'S23', color: 'Black' };

// Spread operator (shallow copy)
const merged1 = { ...baseInfo, ...extraInfo, ['Premium']: true };
console.log(merged1);

// Object.assign(target, source1, source2, ...)
const merged2 = Object.assign({}, baseInfo, extraInfo);
console.log(merged2);

//* 11. Shallow Copy vs Deep Copy
const original = { name: 'Nirob', hobbies: ['coding', 'gaming'] };
const shallow = { ...original };
shallow.hobbies.push('reading');
console.log(original.hobbies); // ['coding', 'gaming', 'reading'] (affected!)

// Deep copy (simple but function/Date সাপোর্ট না)
const deep = JSON.parse(JSON.stringify(original));
deep.hobbies.pop();
console.log(original.hobbies); // unchanged

// আধুনিক deep copy: structuredClone (Node 17+, browsers)
// const deepClone = structuredClone(original);

//* 12. Constructor Function in Detail
function Product(name, price, stock) {
  this.name = name;
  this.price = price;
  this.stock = stock;

  // Method (প্রত্যেক instance-এ আলাদা copy, তাই prototype ভালো)
  this.showDisplay = function () {
    return `${this.name} - ${this.price} TK  ${this.stock ? 'Available' : 'Out of Stock'}`;
  };
}
const product1 = new Product('AMD Ryzen 7', 26000, true);
console.log(product1.showDisplay());

// Add property to specific instance
product1.warranty = '3 years';
console.log(product1.warranty);

// Factory function alternative (কোনো new লাগে না, closure/private data রাখা যায়)
function createProduct(name, price, stock) {
  return {
    name,
    price,
    stock,
    showDisplay() {
      return `${name} - ${price} TK  ${stock ? 'Available' : 'Out of Stock'}`;
    }
  };
}

//* 13. Object Destructuring (অবজেক্ট ডিস্ট্রাকচারিং)
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

// Basic destructure
const { namee, age, std } = student;
console.log(namee, age);

// Default value (যদি property না থাকে)
const { hobby = 'reading' } = student;
console.log(hobby); // 'reading'

// Rename variable
const { namee: fullName, age: years } = student;

// Nested destructure
const { parents: { father, email } } = student;
console.log(father, email);

// Function parameter destructuring
function sendEmail({ parents: { email } }) {
  console.log(`Sent email to ${email}`);
}
sendEmail(student);

// Loop-এ destructure
const students = [
  { name: 'William', grade: 'A' },
  { name: 'Tom', grade: 'A+' },
];
for (const { name, grade } of students) {
  console.log(`${name}: ${grade}`);
}

// Rest property (বাকি properties একসাথে)
const { namee: sName, ...rest } = student;
console.log(rest); // namee ছাড়া সব

//* 14. Optional Chaining (?.) — নিরাপদে nested access
const emp = {
  salary: { bonus: 300 },
};
console.log(emp.department?.name); // undefined (Error দেয় না)
console.log(emp.salary?.bonus);    // 300

//* 15. this inside Object Methods
const obj = {
  brand: 'Samsung',
  showBrand() {
    console.log(this.brand); // 'Samsung'
  },
  // Arrow function: this = enclosing lexical context (এখানে global, এড়ানো উচিত)
  showWrong: () => {
    console.log(this.brand); // undefined (window-এর this)
  }
};
obj.showBrand();
obj.showWrong(); // undefined

//* 16. Additional Useful Methods
// Object.assign() - copy properties (উপরে দেখানো)
// Object.defineProperty() - property descriptor set (writable, enumerable, etc.)
// Object.is(val1, val2) - SameValue comparison (NaN===NaN true)
console.log(Object.is(NaN, NaN)); // true

//* 17. Real-life Example: একটি অনলাইন স্টোরের Product Catalog
function CatalogItem(name, price, stock) {
  this.name = name;
  this.price = price;
  this.stock = stock;
}
CatalogItem.prototype.getStatus = function() {
  return this.stock ? 'In Stock' : 'Sold Out';
};
const items = [
  new CatalogItem('Laptop', 80000, true),
  new CatalogItem('Mouse', 1500, false),
];
items.forEach(({ name, price, stock }) =>
  console.log(`${name}: ${price} TK, ${stock ? 'Available' : 'Not Available'}`)
);

//* 18. Object References (একই জায়গায় পয়েন্ট করে)
const personA = { name: 'John' };
const personB = personA;
personB.name = 'Doe';
console.log(personA.name); // 'Doe' (same reference)

//! Summary Table
/*
| Method / Feature          | Description                            |
|---------------------------|----------------------------------------|
| Object.keys(obj)          | Array of own enumerable string keys    |
| Object.values(obj)        | Array of own enumerable values         |
| Object.entries(obj)       | Array of [key,value] pairs             |
| Object.assign(target,...) | Shallow copy source to target          |
| Object.freeze(obj)        | Make immutable (no add/update/delete)  |
| Object.seal(obj)          | Update allowed, no add/delete          |
| Object.hasOwn(obj,key)    | Check own property (ES2022)            |
| obj.hasOwnProperty(key)   | Check own property (old school)        |
| key in obj                | Check property (own+prototype)         |
| delete obj.key            | Remove property                        |
| spread { ...obj }         | Shallow copy                           |
| new Constructor()         | Create instance via constructor        |
*/


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
