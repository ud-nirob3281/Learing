//! This

// `this` Represents the object that calls (invokes) the function.
// We use `this` inside a function; it refers to the owner/caller of that function.

//* 1. Default Binding (Standalone function call)
// - Non-strict mode: `this` = global object (window / global)
// - Strict mode: `this` = undefined

function showThis() {
  console.log(this);
}
showThis(); // window (non-strict) / undefined (strict)
// showThis function er owner hocche global/window, tai `this` represent korche Window

//* 2. Implicit Binding (Method call)
const obj = {
  name: 'Safa',
  age: 14,
  introduce: function () {
    console.log(this);
    console.log(`Hi I am ${this.name} My age ${this.age}`);
  },
};
obj.introduce();
// `introduce` function er owner holo `obj`, tai `this` represent korche `obj`

const obj1 = {
  name: 'Nirob',
  age: 18,
};
obj1.introduce = obj.introduce;

obj1.introduce(); // `this` represent `obj1` because call hoyeche obj1 theke
obj.introduce(); // `this` represent `obj`  because call hoyeche obj theke

// Pitfall: reference হারালে `this` হারায় (detached method)
const detached = obj.introduce;
detached(); // "Hi I am undefined My age undefined" (default binding, this = window/undefined)

//* 3. Explicit Binding: call, apply, bind
//
// কখনো কখনো আমরা নিজের ইচ্ছামতো `this` সেট করতে চাই। তখন use করি:
// call, apply, bind.

// 3.1 call()
// Syntax: func.call(thisArg, arg1, arg2, ...)
// Immediately invoke function, first argument becomes `this`, rest are normal arguments.
function sayHello(greeting) {
  console.log(`${greeting}, I am ${this.name}`);
}
const user1 = { name: 'Safa' };
const user2 = { name: 'Nirob' };
sayHello.call(user1, 'Hi'); // "Hi, I am Safa"
sayHello.call(user2, 'Hello'); // "Hello, I am Nirob"

// 3.2 apply()
// Syntax: func.apply(thisArg, [argsArray])
// Exactly like call, but arguments are passed as an array.
sayHello.apply(user1, ['Hey']); // "Hey, I am Safa"
sayHello.apply(user2, ['Bonjour']); // "Bonjour, I am Nirob"

// 3.3 bind()
// Syntax: const boundFunc = func.bind(thisArg, arg1, arg2, ...)
// Does NOT invoke immediately. Returns a new function with `this` permanently bound.
// Pre-set arguments are also possible.
const greetSafa = sayHello.bind(user1, 'Good morning');
greetSafa(); // "Good morning, I am Safa"
// bind একবার করলে this স্থায়ীভাবে fix হয়, call/apply দিয়েও বদলানো যায় না।
const fakeSafa = greetSafa.bind(user2);
fakeSafa(); // "Good morning, I am Safa"  (still user1)

// 3.4 Fixing the detached method using bind
const detached2 = obj.introduce;
const fixedIntro = detached2.bind(obj);
fixedIntro(); // এখন সঠিকভাবে obj-কে `this` হিসাবে পাবে - "Hi I am Safa My age 14"

// 3.5 Arrow function and explicit binding: call, apply, bind কোনোটাই কাজ করে না।
// কারণ arrow function-এর নিজস্ব `this` নেই, সেটা lexical enclosing context থেকে নেয়।

//* 4. Constructor Behaviour of `this`
// - function-এর সামনে `new` দিলে ৪টা জিনিস ঘটে:
//   1. নতুন empty object তৈরি
//   2. সেই object-এর __proto__ = Constructor.prototype
//   3. `this` হয়ে যায় সেই new object
//   4. function auto return করে সেই object (যদি আলাদা object return না করা হয়)

function Student(name) {
  this.name = name;
  console.log(this);
}
const st = new Student('Rahat'); // `this` = new empty object, at the end returns that object
console.log(st.name); // "Rahat"

Student('Rojob'); // without new → regular call → `this` = Window (or undefined in strict mode)

//* 5. Event Handling Behaviour of `this`
const btn = document.querySelector('button');
btn.addEventListener('click', function () {
  console.log(this); // `this` = btn element (যে element event শুনছে)
});
// Callback function এর implicit owner is the element, so `this` → btn

//* 6. Arrow Function Behaviour of `this`
// Arrow function-এর নিজস্ব `this` থাকে না। এটি বাইরের (outer) scope-এর `this` কে ধার করে (lexical this)।

function f1() {
  let a = 10;
  console.log(this);
  const arrowFu = () => {
    console.log(a);
    console.log(this); // Outer scope f1 এর `this` refer করবে
  };
  arrowFu();
}
f1(); // Non-strict → f1-র ভেতরে this = window, তাই arrow-ও window দেখাবে
new f1(); // Constructor call → f1-র ভেতরে this = new object, তাই arrow-ও সেই object দেখাবে

const obj2 = {
  a: 15,
  f1: function () {
    console.log(this.a);
    setTimeout(function () {
      console.log(this); // regular function → default binding → window (non-strict)
    }, 1000);
  },
  f2: function () {
    console.log(this.a);
    setTimeout(() => {
      console.log(this); // arrow function → lexical this = obj2 (since f2-র this ছিল obj2)
    }, 1000);
  },
  f3: function () {
    console.log(this); // obj2
    function a() {
      console.log(this); // regular standalone function → window
    }
    a();
  },
};
obj2.f1();
obj2.f2();
obj2.f3();

/*
f1 ও f3-র ভেতরের regular function callback – নিজস্ব `this` থাকে,
কিন্তু সেটা object-এর সাথে bound নয়, standalone call হয়, তাই default binding → global/window.
f2-এর setTimeout-এ arrow function – নিজস্ব `this` নেই, lexical ভাবে f2-র `this` (obj2) কে capture করে রাখে।
*/

//* Recommendation:
// Callback-এ arrow function ব্যবহার করাই ভালো, এতে enclosing context-এর `this` পাওয়া যায়।
// Arrow function constructor হিসাবে use করা যায় না, এবং এর ভেতরে `arguments` object থাকে না।

//! সংক্ষেপে:
/*
Default binding:    func() → this = window (non-strict) / undefined (strict)
Implicit binding:   obj.func() → this = obj
Explicit binding:   func.call(x) / apply(x) / bind(x) → this = x
new binding:        new Func() → this = fresh empty object
Arrow function:     this = lexical enclosing context (birthplace), call/apply/bind ignore
*/
