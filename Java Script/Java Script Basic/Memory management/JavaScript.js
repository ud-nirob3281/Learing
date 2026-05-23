//! Java Script Memory Managemant

//* Definition:
// Memory management মানে হচ্ছে কিভাবে JS engine (V8, SpiderMonkey etc.)
// প্রোগ্রামের জন্য memory allocate করে, ব্যবহার করে, এবং যখন আর দরকার নেই
// তখন release করে। JS একটি high-level garbage-collected ভাষা,
// অর্থাৎ ডেভেলপারকে manually malloc/free করতে হয় না।
// কিন্তু engine-এর internal process বুঝতে পারলে memory leak avoid করা সহজ হয়।

//* 1. Memory Lifecycle (তিনটা ধাপ)
/*
ধাপ ১: Allocation (বরাদ্দ) → Engine variable declaration, function, object এর জন্য
          memory allocate করে (creation phase এইটা করে).
ধাপ ২: Usage (ব্যবহার) → Execution phase-এ variable read/write হয়.
ধাপ ৩: Release (মুক্তি) → যখন data আর reachable না, তখন Garbage Collector
          memory free করে দেয়।
*/

//* 2. Stack বনাম Heap (কোথায় কী থাকে?)
// JavaScript-এ memory প্রধানত দুই জায়গায় জমা হয়:

// ✅ Stack:
// - Fixed size, fast access (LIFO structure like plates).
// - Primitive values (string, number, boolean, null, undefined, symbol, bigint) store হয়।
// - Function call-এর execution context (local variables, references) stack-এ থাকে।
// - Static memory allocation (size compile-time জানা).

// ✅ Heap:
// - Dynamic size, slower access (unstructured, large pool).
// - Reference types (objects, arrays, functions) এখানে store হয়।
// - Dynamic memory allocation (size runtime-এ বাড়তে পারে)।
{
  let myName = 'Safa'; // Stack-এ "Safa" (primitive)
  let age = 25; // Stack-এ 25
  let user = {
    // Heap-এ { name: "Nirob", age: 30 }, user ভেরিয়েবল Stack-এ reference ধরে
    name: 'Nirob',
    age: 30,
  };

  /*
  Stack:
    myName -> "Safa"
    age -> 25
    user -> 0x001 (heap address)
  Heap:
    0x001: { name: "Nirob", age: 30 }
  */

  // যখন user object copy করি:
  let anotherUser = user; // anotherUser stack-এ নতুন reference, কিন্তু heap-এ সেই একই object point করে
  anotherUser.age = 31;
  console.log(user.age); // 31 (mutation, because same reference)

  // Primitive copy করে সম্পূর্ণ নতুন value:
  let newAge = age;
  newAge = 26;
  console.log(age); // 25 (unchanged)
}
//* 3. Execution Context & Memory
// প্রতিটি execution context creation phase-এ memory allocation করে।
// এইটা আমরা আগের নোটে detail দেখেছি।
// Stack-এ প্রতিটি function call-এর জন্য একটা frame push হয়, return-এ pop হয়।
// Call stack overflow যখন infinite recursion হয়।

function eat() {
  let food = 'Biriyani'; // stack-এ food variable, heap-এ "Biriyani" (string primitive stack-এই থাকে আসলে)
  eat(); // infinite recursion (stack overflow)
}
// eat();  // আনকমেন্ট করলে Maximum call stack size exceeded

//* 4. Garbage Collection (GC) – Automatic Cleanup
// JavaScript মেমোরি থেকে ডাটা সরায় যখন সেটা unreachable হয়ে যায়।
// দুটি প্রধান algorithm:

// 4.1 Mark-and-Sweep (আধুনিক engine-এ standard)
/*
🌳 বাগানের গল্প (Garden Analogy)

মনে করো তুমি একটা বাগানের মালিক। বাগানে অনেক গাছপালা আছে। হঠাৎ দেখলে কিছু গাছের শেকড় মাটিতে নেই, সেগুলো মরে গেছে। তুমি চাও শুধু **জীবন্ত গাছগুলো** রেখে বাকিগুলো উপড়ে ফেলতে।

এখন কাজটা করবে কীভাবে?

1. **Roots চিহ্নিত করো** — যেসব গাছের শেকড় মাটির সাথে লেগে আছে, সেগুলো বেস।  
2. **একটা মার্কার দিয়ে** প্রতিটা শেকড় থেকে শুরু করে সেই গাছের ডালপালা, লতাপাতা (অর্থাৎ সেটার সাথে যুক্ত সব কিছু) "Mark" করো।  
3. **Sweep করো** — যেসব জিনিসে মার্ক লাগেনি, সেগুলো তো শেকড়হীন, মরে গেছে। তাই সেগুলোকে টেনে তুলে ফেলে দাও। বাগান পরিষ্কার!

ঠিক একই কাজ করে JavaScript-এর Garbage Collector (GC)।

---

### 🧠 প্রোগ্রামিং ভাষায় Step-by-Step

- **Roots** মানে হলো সেই সব references যা প্রোগ্রাম এখনও ব্যবহার করতে পারে:
  - Global object (window)
  - Call Stack-এ থাকা local variables এবং function arguments
  - Closure-এ আটকে থাকা বাইরের variable

- GC প্রথমে এই roots থেকে শুরু করে **reachability graph** (কোনটা কার সাথে connect) বানায়।  
- যত object এই roots থেকে "পাওয়া যাবে" (reachable), সেগুলোকে `marked` ধরে।  
- বাকি যত object unmarked, সেগুলোকে "কেউ দেখছে না" — মেমোরি ফ্রি করে দেয়।

*/

let person = { name: 'Rahim' }; // 'person' variable global scope-এ root
let friend = person; // friend একই object point করে
person = null; // person root থেকে সরছে, কিন্তু object টা এখনো friend দিয়ে reachable

/*
**এখন GC আসবে:**  
- Roots: global scope-এর `friend` (আর `person` null হয়ে গেছে, সেটা আর root না)  
- `friend` → Object { name:"Rahim" } reachable → মার্কড।  
- তাহলে object টা sweep হবে না। কারণ এখনো reachable।
*/
let car = { brand: 'Toyota' };
car = null;

/*
- Root: global scope-এ `car` null হয়ে গেছে। Object-টার কাছে এখন আর কোনো রাস্তা নেই (unreachable)।  
- GC-এর পরের চক্রে object টা mark পাবে না, sweep হয়ে মেমোরি খালি হবে।

*/

/*
### ✅ মনে রাখার পয়েন্ট

- **Mark Phase:** Roots থেকে start করে সব reachable object-এ "mark" করা।
- **Sweep Phase:** Unmarked objects মেমোরি থেকে সরিয়ে ফেলা।
- এটা **automatic**, developer-কে explicitly free করতে হয় না (C/C++ এর মতো না)।
- তবে developer **unreachable but unintentionally retained** করার ভুল করলে (যেমন global variable, timer, closure misuse) সেগুলো mark হয়ে যায়, sweep হয় না — এইটাই memory leak।
*/

// 4.2 Reference Counting (পুরানো, কদাচিৎ)
/*
প্রত্যেক object-এর একটা count থাকে কতগুলো reference তাকে point করছে।
Reference count 0 হলে object garbage collect হয়।
কিন্তু circular reference-এ সমস্যা: দুইটা object একে অপরকে reference করলে count কখনো 0 হয় না → memory leak।
Mark-and-sweep এই সমস্যার সমাধান করে কারণ reachability check করে, count না।
*/
function circularRef() {
  let obj1 = {};
  let obj2 = {};
  obj1.ref = obj2; // obj2 reference count +1
  obj2.ref = obj1; // obj1 reference count +1
  // function শেষে obj1, obj2 local variables destroy, কিন্তু তারা পরস্পরকে reference করছে।
  // Reference counting-এ leak, কিন্তু modern GC mark-and-sweep-এ তাদের sweep করবে কারণ তারা roots থেকে unreachable.
}

//* 5. Memory Leak Patterns (কি থেকে সাবধান থাকবা)
// GC থাকলেও ডেভেলপারের ভুলে memory leak হয়।

// 5.1 Accidental Global Variables
function leak1() {
  accidental = 'I am global'; // no var/let/const, window.accidental হয়ে গেল, application শেষ না হওয়া পর্যন্ত থাকবে
}
// solution: use "use strict"; or let/const

// 5.2 Forgotten Timers / Callbacks

/* let bigData = { huge: new Array(1000000).fill('*') };
let intervalId = setInterval(() => {
  console.log(bigData.huge.length); // bigData reference hold করে রেখেছে
}, 1000); */

// clearInterval(intervalId) না করলে bigData কখনো GC হবে না। timer live থাকলে তার callback-এর closure-এ সব variable reachable থাকে।

// 5.3 Detached DOM Elements (JavaScript reference-এ রেখে দিলে)
let button = document.getElementById('myButton');
// ধরো button DOM থেকে remove করা হলো

//document.body.removeChild(button);

// কিন্তু button variable এখনো reference ধরে রেখেছে, তাই button object এবং তার সাথে থাকা DOM element heap-এ রয়ে যাবে, GC হবে না।
button = null; // solution: reference null

// 5.4
/*
  parent element-এ click listener যুক্ত করি, যা child element-কে DOM থেকে সরিয়ে দেয়।
  কিন্তু listener function তার closure-এ child variable-কে reference ধরে রেখেছে।
  তাই child element DOM থেকে remove হবার পরও, যতক্ষণ parent-এ listener active,
  ততক্ষণ child element garbage collector remove করতে পারে না।
  কারণ parent live এবং listener-এর closure-এ child এখনো reachable!
*/

let parent = document.getElementById('parent');
let child = document.getElementById('child');

/*parent.addEventListener('click', function handler() {
  child.remove(); // child DOM থেকে gone, কিন্তু child variable এখনো closure-এ
  // child = null; // immediate solution if you don't need listener again
});*/

/*
  এখন child DOM-এ নেই, কিন্তু মেমোরিতে (heap) এখনো জায়গা দখল করে আছে।
  কারণ parent-এর event listener এখনো চালু এবং তার closure child-কে reference করে রেখেছে।
  Screenshot নিলে heap-এ child element দেখাবে।

  Solution 1: একবার কাজ শেষে listener সরিয়ে ফেলা।
    parent.removeEventListener('click', handler); // একই named function ব্যবহার
  Solution 2: child remove করার সাথে সাথে child variable-কে null করে দেওয়া (যদি listener পুনরায় ব্যবহার হবে না)।*/

let parentEl = document.getElementById('parent');
let childEl = document.getElementById('child');
function clickHandler() {
  childEl.remove();
  parentEl.removeEventListener('click', clickHandler); // listener clean
  childEl = null; // reference nullify
}
//parentEl.addEventListener('click', clickHandler);

// 5.5 Closure Misuse (অপ্রয়োজনে বড় ডাটা retain)
function createHeavyFunction() {
  let largeData = new Array(10000000).fill('data'); // বিশাল array
  return function () {
    console.log('I am small but I keep largeData alive');
    // large Data reference না করলেও closure পুরো outer environment pack করে রাখে? (V8 optimizes unused vars, but best practice is to avoid this)
  };
}
let heavy = createHeavyFunction();
// heavy = null; // করলে largeData-ও sweep হবে


//* 6. WeakMap & WeakSet (GC-Friendly Data Structures)
/*
Map/Set-এ key হিসেবে object দিলে strong reference থাকে। GC ওই object সরাতে পারে না যতক্ষণ Map/Set exist করছে।
WeakMap/WeakSet-এ key হিসেবে object দিলে weak reference থাকে। 
GC object কে sweep করতে পারে যদি আর কোনো strong reference না থাকে।
Use case: caching, private data, DOM element metadata.
*/
let visitedMap = new WeakMap();
function track(obj) {
  if (!visitedMap.has(obj)) {
    visitedMap.set(obj, Date.now());
  }
}
let element = { id: 1 };
track(element);
// element = null; করলে visitedMap-এ থাকা entry-ও GC-র মাধ্যমে auto remove হবে, because weak reference.

// WeakSet শুধু object store করে, weak reference-এ। আমরা check করতে পারি কোনো object present কিনা।

//* 7. Performance & Memory Profiling in DevTools
/*
Browser DevTools > Memory tab:
- Heap snapshot: current memory state capture, দুই snapshot-এর comparison দিয়ে leak ধরা।
- Allocation instrumentation on timeline: time-এর সাথে memory usage দেখতে, leak pattern identify।
- Allocation sampling: function-level memory allocation recording।
Chrome-এ "Performance" tab-এ "Memory" checkbox enable করলে time-এর সাথে heap graph দেখতে পারি।
Practice: একটা loop-এ DOM element create করে remove না করলে memory বেড়ে যাওয়া observe করা।
*/

//* 8. Best Practices for Memory Management
/*
- let/const use করো accidental global avoid করতে।
- Timer, interval, event listener clean up করো (componentWillUnmount, useEffect return).
- Closures-এ অপ্রয়োজনীয় বড় variable reference avoid করো, বা null সেট করো।
- DOM references null সেট করো removeChild-এর পর।
- WeakMap/WeakSet use করো temporary metadata-র জন্য।
- Large data set নিয়ে কাজ করলে pagination/virtual scrolling/stream ব্যবহার করো।
- Circular reference intentionally না রাখাই ভালো, যদিও modern GC সামলাতে পারে।
- Performance test করার সময় DevTools-এর memory profiler দিয়ে leak চেক করো।
*/

//! Summary (মুখস্থ করার মতো পয়েন্ট)
/*
✅ Stack: primitive + reference, Heap: objects.
✅ GC: Mark-and-Sweep (reachability check).
✅ Unreachable objects automatically swept.
✅ Memory leak-এর কারণ: global var, forgotten timer, detached DOM, closure overuse, uncleaned listeners.
✅ WeakMap/WeakSet weak reference দিয়ে GC-কে সহযোগিতা করে।
✅ DevTools memory profiler দিয়ে diagnosis করো।
✅ Clean up after yourself – JS GC-র উপর অন্ধ বিশ্বাস না রেখে deterministic cleanup practice করো।
*/
