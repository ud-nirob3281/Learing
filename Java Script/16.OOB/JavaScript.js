//! JavaScript Object-Oriented Programming (OOP) – পূর্ণাঙ্গ গভীর নোট

/*
OOP কী?
=======
Object-Oriented Programming হলো একটি প্রোগ্রামিং প্যারাডাইম যেখানে code-কে
objects এবং তাদের interactions-এর মাধ্যমে সংগঠিত করা হয়।
এটি code reusability, scalability, এবং maintainability বাড়ায়।

জাভাস্ক্রিপ্টে OOP prototype-based, যদিও ES6 class syntax এসেছে,
কিন্তু ভিতরে সেটিও prototype chain-এই কাজ করে।

OOP-এর মূল উপাদান:
- Object (instance)
- Constructor function / Class
- Prototype
- Inheritance
- Encapsulation
- Abstraction
- Polymorphism
*/

//* ========================
//* ১. Constructor Function (পুরনো পদ্ধতি)
//* ========================
/*
Constructor function একটি সাধারণ function, যা new keyword দিয়ে call করলে
একটি নতুন object তৈরি করে এবং this-এর মাধ্যমে property set করে।
প্রত্যেকটি constructor function-এর একটি prototype property থাকে,
যেখানে shared methods রাখা যায় (memory efficient)।
*/

function Student(name, age, carriar) {
  // new keyword দিয়ে call হলে:
  // 1. নতুন empty object তৈরি হয়
  // 2. this সেই object-কে point করে
  // 3. property assign হয়
  // 4. object return হয় (যদি অন্য object return না করি)
  this.name = name;
  this.age = age;
  this.carriar = carriar;

  // ❌ Bad practice: method directly inside constructor
  // প্রতিটি instance-এ আলাদা function copy তৈরি হয় → memory waste
  this.myself = function () {
    console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
  };
}

const s1 = new Student('UD NIROB', 18, 'Full-Stack Web Developer');
const s2 = new Student('SK TANVIR', 18, 'Front-End Web Developer');

/*
Execution Context:
new Student(...) call করলে:
  FEC(Student):
    CP: this = new Object, prototype set (Student.prototype)
    EP: this.name = 'UD NIROB', etc.
    return this (auto)
*/

console.log(s1.myself === s2.myself); // false (different references – bad!)

//* ========================
//* ২. Prototype & Memory Efficiency
//* ========================
/*
Prototype কী?
============
প্রত্যেক function-এর একটি prototype নামক object থাকে।
Constructor function দিয়ে তৈরি instance গুলো __proto__-এর মাধ্যমে
এই prototype object-কে share করে।

যদি আমরা method constructor-এর ভেতরে না লিখে prototype-এ রাখি,
তাহলে সেই method একবারই memory-তে থাকে, সব instance share করে।
এতে memory waste হয় না।
*/

function StudentV2(name, age, carriar) {
  this.name = name;
  this.age = age;
  this.carriar = carriar;
  // method এখানে না লিখে prototype-এ রাখব
}

// prototype-এ method সংযুক্ত করা
StudentV2.prototype.introduceMyself = function () {
  console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
};

const s3 = new StudentV2('UD NIROB', 18, 'Full-Stack');
const s4 = new StudentV2('Safa', 15, 'Back-End');

console.log(s3.introduceMyself === s4.introduceMyself); // true – shared reference

s3.introduceMyself(); // Hi,My Name is UD NIROB ,My age 18
s4.introduceMyself(); // Hi,My Name is Safa ,My age 15

/*
Visualisation:
s3.__proto__ === StudentV2.prototype
s4.__proto__ === StudentV2.prototype
So, s3.introduceMyself() প্রথমে s3-এর own property-তে খুঁজবে,
না পেয়ে __proto__ (StudentV2.prototype)-এ খুঁজবে, পেয়ে যাবে।
এটাই Prototype Chain.
*/

// Example: Bank constructor with deposit on prototype
function Bank(name, age, balance = 0) {
  this.name = name;
  this.age = age;
  this.balance = balance;
}
Bank.prototype.deposit = function (amount) {
  this.balance += amount;
};
const a1 = new Bank('nirob', 18, 500);
a1.deposit(100);
console.log(a1.balance); // 600

//* ========================
//* ৩. ES6 Classes (Syntactic Sugar)
//* ========================
/*
Class keyword ES6-এ আনা হয়েছে। ভিতরে এটি constructor function আর prototype-ই ব্যবহার করে।
তবে syntax অনেক পরিষ্কার এবং OOP-এর অন্যান্য feature (extends, super, static) সহজ হয়েছে।

class-এর ভিতরে constructor method-এ instance properties set করি।
অন্য method গুলো সরাসরি class body-তে লিখলে সেগুলো prototype-এ যায় automatically.
*/

class StudentClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // এই method automatically StudentClass.prototype-এ যোগ হবে
  myself() {
    console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
  }
}

const sc1 = new StudentClass('UD NIROB', 18);
sc1.myself(); // Hi,My Name is UD NIROB ,My age 18

// Under the hood:
console.log(typeof StudentClass); // "function"
console.log(sc1.__proto__ === StudentClass.prototype); // true

//* ========================
//* ৪. Four Pillars of OOP (চারটি স্তম্ভ)
//* ========================
/*
1. Abstraction   – জটিলতা লুকিয়ে শুধু প্রয়োজনীয় অংশ দেখানো।
2. Encapsulation – data এবং method-কে একসাথে বেঁধে বাইরের access নিয়ন্ত্রণ।
3. Inheritance   – একটি class আরেকটি class-এর properties ও methods উত্তরাধিকার সূত্রে পাওয়া।
4. Polymorphism  – একই method বিভিন্ন class-এ ভিন্ন আচরণ করতে পারে।
*/

//* ----------------------------
//* 4.1 Abstraction & Encapsulation
//* ----------------------------
/*
Abstraction: complex implementation hide করে simple interface provide করা।
Encapsulation: internal state (data) private রাখা এবং controlled access দেওয়া।

জাভাস্ক্রিপ্টে ES2022 থেকে private fields (#) ব্যবহার করে encapsulation করা যায়।
*/

class Car {
  // private fields (শুধু class-এর ভেতরে accessible)
  #fuel = 500;
  #speed = 0;

  // private methods (শুধু class-এর ভেতরে call করা যায়)
  #speedRun() {
    this.#speed += 40;
  }
  #burnFuel() {
    this.#fuel -= 5;
  }

  // public method (interface) – abstraction
  start() {
    // complex starting logic hide করা হলো
    this.#speedRun();
    this.#burnFuel();
    console.log('Car started...');
  }

  // Getter (read-only view of private data)
  get fuelLevel() {
    return this.#fuel;
  }
  get speed() {
    return this.#speed;
  }
}

const car1 = new Car();
car1.start();
console.log(car1.fuelLevel); // 495
console.log(car1.speed);     // 40
// car1.#fuel = 1000; // SyntaxError: Private field '#fuel' must be declared in an enclosing class

/*
Encapsulation-এর সুবিধা:
- Data integrity: validation logic class-এর ভেতরে রাখা যায়।
- Security: সরাসরি internal state change করা যায় না।
- Flexibility: internal implementation change করলেও external interface একই থাকে।
*/

// Example: BankAccount with proper encapsulation
class BankAccount {
  #balance = 0; // private field

  constructor(name, initialBalance = 0) {
    this.name = name;
    if (typeof initialBalance !== 'number' || initialBalance < 0) {
      throw new Error('Invalid initial balance');
    }
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('Invalid deposit amount');
      return;
    }
    this.#balance += amount;
  }

  // Getter (syntactic sugar for method call without parentheses)
  get balance() {
    return this.#balance;
  }

  // Setter (validation সহ update)
  set addBonus(amount) {
    if (typeof amount !== 'number' || amount < 0) {
      console.log('Invalid bonus');
      return;
    }
    this.#balance += amount;
  }
}

const acc = new BankAccount('UD', 20);
acc.deposit(50);
console.log(acc.balance); // 70 (getter call)
acc.addBonus = 100;       // setter call (method not function call style)
console.log(acc.balance); // 170
// acc.#balance = 500; // SyntaxError

/*
get/set ব্যবহার করলে আমরা property-র মতো করে value read/write করতে পারি,
অথচ ভিতরে validation logic চালু থাকে।
*/

//* ----------------------------
//* 4.2 Inheritance (উত্তরাধিকার)
//* ----------------------------
/*
একটি class (child) আরেকটি class (parent)-এর properties ও methods inherit করে।
extends keyword ব্যবহার হয়।
child constructor-এ super() call করে parent constructor initialize করতে হয়।
*/

// Parent class
class Vehicle {
  constructor(brand, color, mileage) {
    this.brand = brand;
    this.color = color;
    this.mileage = mileage;
  }
  start() {
    console.log(`${this.brand} is starting...`);
  }
}

// Child class
class ElectricCar extends Vehicle {
  constructor(brand, color, mileage, batteryCapacity) {
    // parent constructor call (must be before this)
    super(brand, color, mileage);
    this.batteryCapacity = batteryCapacity; // child own property
  }

  // child own method
  charge() {
    console.log(`${this.brand} is charging...`);
  }

  // method overriding (polymorphism)
  start() {
    console.log(`${this.brand} (electric) silently starts...`);
  }
}

const tesla = new ElectricCar('Tesla', 'red', 56, 88);
tesla.start();  // Tesla (electric) silently starts...
tesla.charge(); // Tesla is charging...

/*
Inheritance-এর সুবিধা:
- Code reuse: parent-এর functionality child পেয়ে যায়।
- Hierarchical classification: real-world relation model করা যায়।
- Method overriding: child প্রয়োজনমতো parent method-কে customize করতে পারে।
*/

//* ----------------------------
//* 4.3 Polymorphism (বহুরূপতা)
//* ----------------------------
/*
Polymorphism মানে "অনেক রূপ"। একই method name বিভিন্ন class-এ ভিন্ন আচরণ করে।
এটি inheritance-এর মাধ্যমে অর্জিত হয় (method overriding)।
*/

class MediaPlayer {
  play() {
    console.log('Playing media...');
  }
}

class VideoPlayer extends MediaPlayer {
  play() {
    console.log('Playing video with visuals...');
  }
}

class AudioPlayer extends MediaPlayer {
  play() {
    console.log('Playing audio only...');
  }
}

// Polymorphism in action
function startPlayback(player) {
  player.play(); // কোন play() call হবে তা runtime-এ object-এর ধরন অনুযায়ী নির্ধারিত হবে
}

startPlayback(new MediaPlayer()); // Playing media...
startPlayback(new VideoPlayer()); // Playing video with visuals...
startPlayback(new AudioPlayer()); // Playing audio only...

/*
এটি Strategy Pattern-এর ভিত্তি, যেখানে behaviour swap করা যায়।
*/

//* ========================
//* ৫. Advanced OOP Features
//* ========================

// 5.1 Static Methods & Properties
// class-এর নিজস্ব method, instance-এ access হয় না। Utility function-এর জন্য ব্যবহার হয়।
class MathHelper {
  static PI = 3.1416;
  static add(a, b) {
    return a + b;
  }
}
console.log(MathHelper.add(5, 3)); // 8
console.log(MathHelper.PI);        // 3.1416
// new MathHelper().add(5,3); // TypeError

// 5.2 Instanceof Operator
console.log(tesla instanceof ElectricCar); // true
console.log(tesla instanceof Vehicle);     // true (prototype chain)
console.log(tesla instanceof Object);      // true

// 5.3 Object.create() (prototypal inheritance directly)
const vehicleProto = {
  start() { console.log('Starting...'); }
};
const bike = Object.create(vehicleProto);
bike.brand = 'Yamaha';
bike.start(); // Starting... (from prototype)

// 5.4 Mixins (multiple inheritance simulation)
const FlyMixin = {
  fly() { console.log('Flying...'); }
};
const SwimMixin = {
  swim() { console.log('Swimming...'); }
};
class Duck {
  constructor(name) { this.name = name; }
}
Object.assign(Duck.prototype, FlyMixin, SwimMixin);
const donald = new Duck('Donald');
donald.fly(); // Flying...
donald.swim(); // Swimming...

// 5.5 Overriding & super in methods
class Parent {
  greet() { console.log('Hello from Parent'); }
}
class Child extends Parent {
  greet() {
    super.greet(); // parent method call
    console.log('Hello from Child');
  }
}
new Child().greet();
// Output:
// Hello from Parent
// Hello from Child

// 5.6 Checking property existence (hasOwnProperty vs in)
console.log(tesla.hasOwnProperty('batteryCapacity')); // true
console.log(tesla.hasOwnProperty('start'));           // false (prototype এ আছে)
console.log('start' in tesla);                        // true

//* ========================
//* ৬. Execution Context & this in OOP
//* ========================
/*
যখন method call হয় (e.g., s1.introduceMyself()), তখন:
- Execution context তৈরি হয়।
- this নির্ধারিত হয় object-টি যা method-এর immediate left-এ থাকে (implicit binding).
- Arrow function methods ব্যবহার করলে this lexical হয় (class body-তে arrow use করলে this instance হবে না,
  কারণ arrow class body-তে directly কাজ করে না, field declaration-এ use করতে হয়)।

class-এর ভেতর arrow function property:
class Test {
  name = 'Test';
  greet = () => console.log(this.name);
}
এটি instance property-এর মতো work করে, this instance কেই ধরে রাখে (lexical this from constructor context)।
*/

//* ========================
//* ৭. Best Practices & Common Pitfalls
//* ========================
/*
- Method গুলো prototype-এ রাখো (class syntax ব্যবহার করলে auto হয়)।
- Inheritance ব্যবহার করার আগে composition-এর কথা ভাবো (has-a vs is-a)।
- Encapsulation-এর জন্য #private fields ব্যবহার করো, getter/setter দিয়ে controlled access দাও।
- Static methods utility কাজে লাগাও, কিন্তু বেশি ব্যবহার করলে testability কমে।
- Method chaining এর জন্য return this করো।
- instanceof চেক করে object type verify করো।
- class-এ arrow function method define না করাই ভালো (prototype-এ যায় না, instance-এ যায়, performance issue)।
*/

//* ========================
//* ৮. Real-life Example: Shopping Cart System
//* ========================
class CartItem {
  #id;
  #name;
  #price;
  #quantity;

  constructor(id, name, price, quantity = 1) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
  }

  get total() { return this.#price * this.#quantity; }
  addQuantity(n) { this.#quantity += n; }

  get info() { return `${this.#name} x${this.#quantity} = ${this.total}`; }
}

class ShoppingCart {
  #items = [];

  addItem(item) { this.#items.push(item); }
  removeItem(id) { this.#items = this.#items.filter(i => i.id !== id); }

  get totalPrice() {
    return this.#items.reduce((sum, item) => sum + item.total, 0);
  }

  printReceipt() {
    this.#items.forEach(i => console.log(i.info));
    console.log('Total:', this.totalPrice);
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem(new CartItem(1, 'Book', 250, 2));
cart.addItem(new CartItem(2, 'Pen', 15, 5));
cart.printReceipt();
// Output:
// Book x2 = 500
// Pen x5 = 75
// Total: 575

/*
এই উদাহরণে Encapsulation, Abstraction, এবং Method ব্যবহার করা হয়েছে।
ShoppingCart-এর internal array বাইরে থেকে modify করা যাবে না।
*/

//* ========================
//* ৯. Prototype Chain & Object Inheritance Visualised
//* ========================
/*
ধরো:
class A {}
class B extends A {}
const b = new B();

Prototype chain:
b.__proto__ -> B.prototype
B.prototype.__proto__ -> A.prototype
A.prototype.__proto__ -> Object.prototype
Object.prototype.__proto__ -> null

Method look-up: b.toString() -> বের হবে Object.prototype.toString থেকে।
*/

//* ========================
//* ১০. OOP vs Functional vs Procedural
//* ========================
/*
OOP: objects and classes, state and behavior together, inheritance.
Functional: pure functions, immutable data, composition over inheritance.
Procedural: functions and data separately, top-down execution.

জাভাস্ক্রিপ্ট multi-paradigm, তাই সবই ব্যবহার করা যায়।
*/

//! সংক্ষেপে মনে রাখার বিষয়:
/*
- Constructor + prototype = memory efficient.
- Class = syntactic sugar over prototype.
- Encapsulation = #private fields, getter/setter.
- Abstraction = simple interface, hide complexity.
- Inheritance = extends, super, reuse code.
- Polymorphism = method overriding, same interface different behavior.
- static = class level utility.
- Composition = mixins, Object.assign.
*/
