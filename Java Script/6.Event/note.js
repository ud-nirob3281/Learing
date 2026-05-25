//! JavaScript Events (সম্পূর্ণ গভীর বিশ্লেষণ – বাংলা+English Note)

/*
Event কী?
==========
Event হলো একটি সংকেত (signal) যা ব্রাউজার তৈরি করে যখন কোনো ঘটনা ঘটে (যেমন: ক্লিক, কী চাপা, পেজ লোড, মাউস সরানো ইত্যাদি)।
আমরা JavaScript দিয়ে এই ইভেন্টগুলো "শুনতে" পারি (listen) এবং নির্দিষ্ট কাজ করতে পারি।

ইভেন্টের মাধ্যমে ওয়েব পেজ interactive হয়।
ইভেন্ট মডেল ৩টি ফেজে কাজ করে:
  1. Capturing Phase   – ইভেন্ট window থেকে target-এর দিকে নামতে থাকে।
  2. Target Phase      – ইভেন্ট target element-এ পৌঁছায়।
  3. Bubbling Phase    – ইভেন্ট target থেকে আবার window-এর দিকে উঠতে থাকে।
*/

//* ========================
//* 1. Event Listener যোগ করা (Adding Event Listeners)
//* ========================

// 1.1 DOM Element Property দিয়ে (onclick, onmouseover etc.)
const btn = document.createElement("button");
btn.textContent = "Click Me";
btn.onclick = function() {
  console.log("Button clicked (property)");
};
// Limitations: একসাথে একটাই handler বসে, পুরোনোটি override হয়।

// 1.2 addEventListener() – আধুনিক ও নমনীয় উপায়
btn.addEventListener("click", function(event) {
  console.log("Button clicked (addEventListener)");
});
// এই method-এ একাধিক listener যোগ করা যায়, remove-ও করা যায়।

// 1.3 removeEventListener() – listener সরানো
function handleClick() {
  console.log("Will be removed");
}
btn.addEventListener("click", handleClick);
btn.removeEventListener("click", handleClick); // must be same function reference

//* ========================
//* 2. Event Object (ইভেন্ট অবজেক্ট)
//* ========================
/*
যে কোনো ইভেন্ট handler-এ প্রথম parameter হিসেবে একটি event object পায়।
এই object-এর মাধ্যমে ইভেন্টের সব তথ্য জানা যায়।
*/
document.addEventListener("click", function(event) {
  // event.type        -> "click"
  // event.target      -> যেখানে ক্লিক হয়েছে
  // event.currentTarget -> যার handler চলছে
  // event.clientX, event.clientY -> মাউস পজিশন
  // event.key (keyboard event-এ)
  console.log(event.type, event.target);
});

//* ========================
//* 3. Event Propagation (বিস্তারিত)
//* ========================
/*
ইভেন্ট propagation ৩ টি phase-এ ঘটে:
  - Capturing: window → document → ... → target-এর parent
  - Target: target element-এ পৌঁছানো
  - Bubbling: target থেকে আবার window-এর দিকে (default behaviour)

addEventListener-এর তৃতীয় argument দিয়ে phase specify করা যায়:
  true → capturing phase-এ ধরবে
  false (default) → bubbling phase-এ ধরবে
*/

// HTML structure জন্য ধরা যাক:
// <div id="outer" style="padding:20px;background:lightblue">
//   <div id="inner" style="padding:20px;background:lightcoral">Click me</div>
// </div>

const outer = document.getElementById("outer");
const inner = document.getElementById("inner");

// Bubbling (default)
outer.addEventListener("click", () => console.log("Outer (bubbling)"));
inner.addEventListener("click", () => console.log("Inner (bubbling)"));
// Inner click → output: Inner, Outer (bubble up)

// Capturing
outer.addEventListener("click", () => console.log("Outer (capturing)"), true);
inner.addEventListener("click", () => console.log("Inner (capturing)"), true);
// Inner click → output: Outer (capturing), Inner (capturing)

//* 3.1 stopPropagation() – ইভেন্টের প্রচার বন্ধ করা
inner.addEventListener("click", function(e) {
  e.stopPropagation();
  console.log("Inner stopped propagation");
});
// এখন Inner-এ ক্লিক করলে Outer-এর listener (bubbling) আর কল হবে না।

//* 3.2 stopImmediatePropagation() – একই element-এর পরবর্তী listeners বন্ধ
inner.addEventListener("click", () => console.log("First handler"));
inner.addEventListener("click", (e) => {
  e.stopImmediatePropagation();
  console.log("Second handler, rest stopped");
});
inner.addEventListener("click", () => console.log("Third handler")); // চলবে না

//* ========================
//* 4. preventDefault() – ব্রাউজারের ডিফল্ট আচরণ রোধ
//* ========================
const link = document.querySelector("a");
link.addEventListener("click", function(e) {
  e.preventDefault(); // নেভিগেশন বন্ধ
  console.log("Link click prevented");
});

//* ========================
//* 5. Event Delegation (ইভেন্ট প্রতিনিধি)
//* ========================
/*
অনেকগুলো child element-এ আলাদা listener না বসিয়ে parent-এ একটি listener দিয়ে
ইভেন্ট handle করা যায়। event.target দিয়ে চেক করে নেওয়া হয় কোন child-এ ইভেন্ট ঘটেছে।
Dynamic element-এর জন্যও কাজ করে।
*/
const list = document.getElementById("list");
list.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    console.log("Clicked on:", e.target.textContent);
  }
});
// পরে নতুন li যোগ করলেও automatically handle হবে।

//* ========================
//* 6. Custom Events (নিজস্ব ইভেন্ট তৈরি)
//* ========================
// CustomEvent constructor ব্যবহার করে:
const myEvent = new CustomEvent("myCustomEvent", {
  detail: { message: "Hello from custom event", time: Date.now() },
  bubbles: true,
  cancelable: true
});
// dispatch:
document.dispatchEvent(myEvent);
// listen:
document.addEventListener("myCustomEvent", (e) => {
  console.log("Custom event received:", e.detail);
});

//* ========================
//* 7. Once, Passive, Signal Options
//* ========================
// 7.1 once: true → listener একবার চালু হবে, তারপর auto-remove
btn.addEventListener("click", () => console.log("Fired once"), { once: true });

// 7.2 passive: true → preventDefault() কল করা হবে না, scroll পারফরমেন্স বাড়ায়
document.addEventListener("touchstart", handler, { passive: true });

// 7.3 signal: AbortController দিয়ে listener remove
const controller = new AbortController();
btn.addEventListener("click", handler, { signal: controller.signal });
// controller.abort(); → listener সরিয়ে ফেলবে

//* ========================
//* 8. ইভেন্টের প্রকারভেদ (Common Event Types)
//* ========================

// Mouse Events: click, dblclick, mousedown, mouseup, mouseenter, mouseleave, mousemove, contextmenu
// Keyboard Events: keydown, keyup, keypress (deprecated)
// Form Events: submit, change, input, focus, blur, focusin, focusout
// Document/Window Events: DOMContentLoaded, load, beforeunload, resize, scroll
// Drag Events: dragstart, drag, dragend, drop, etc.
// Touch Events: touchstart, touchmove, touchend
// Pointer Events: pointerdown, pointermove, pointerup (mouse+touch একসাথে)

// উদাহরণ: Keyboard Event
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    console.log("Escape pressed");
  }
  console.log("Key:", e.key, "Code:", e.code);
});

// উদাহরণ: Form Submit
const form = document.getElementById("myForm");
form.addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  console.log(Object.fromEntries(formData));
});

//* ========================
//* 9. Event Loop ও Events সম্পর্ক
//* ========================
/*
ইভেন্ট Handler asynchronous ভাবে চলে না (মাইক্রোটাস্ক/ম্যাক্রোটাস্ক)।
ইভেন্ট তখনই execute হয় যখন call stack খালি থাকে (event loop)।
UI ইভেন্ট (click) macrotask queue-এ যায়।
Promise (microtask) এর পরে run হয় কিন্তু animation frame এর আগে।
*/

//* ========================
//* 10. Debounce & Throttle (ইভেন্ট ফ্রিকোয়েন্সি নিয়ন্ত্রণ)
//* ========================
// Debounce: শেষ ইভেন্টের নির্দিষ্ট সময় পর execute (search box)
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// Throttle: নির্দিষ্ট সময় অন্তর একবার execute (scroll, resize)
function throttle(fn, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

//* ========================
//* 11. Pointer Events vs Mouse Events
//* ========================
/*
Pointer Events আধুনিক, mouse, touch, pen সব handle করে।
pointerdown, pointerup, pointermove ইত্যাদি।
একই সাথে mouse ও touch সমর্থন করতে চাইলে pointer events ব্যবহার করো।
*/

//* ========================
//* 12. Clipboard, Drag & Drop, Media Events
//* ========================
// Clipboard: copy, cut, paste
document.addEventListener("paste", (e) => {
  const text = e.clipboardData.getData("text/plain");
  console.log("Pasted:", text);
});
// Drag & Drop: draggable attribute, dragstart, dragover, drop
// Media: play, pause, ended, volumechange

//* ========================
//* 13. Event Properties ও Methods সারাংশ
//* ========================
/*
e.type           → ইভেন্টের নাম
e.target         → যে element-এ ইভেন্ট ঘটেছে
e.currentTarget  → যে element-এর handler চলছে
e.preventDefault() → ডিফল্ট আচরণ বন্ধ
e.stopPropagation() → বাবলিং/ক্যাপচারিং বন্ধ
e.stopImmediatePropagation() → একই element-এর বাকি handler বন্ধ
e.clientX/clientY → viewport-এ mouse position
e.pageX/pageY    → document-এর সাপেক্ষে position
e.key, e.code    → keyboard events
e.detail         → custom event data
*/

//* ========================
//* 14. Execution Context & Events
//* ========================
/*
ইভেন্ট handler call হলে তার জন্য new execution context তৈরি হয়।
this দ্বারা handler-এ element-কে নির্দেশ করে (addEventListener-এ)।
Arrow function ব্যবহার করলে this lexical হয় (parent scope)।
*/

//* ========================
//* 15. Best Practices & Performance
//* ========================
/*
- Event delegation ব্যবহার করো (dynamic element)
- removeEventListener দিয়ে অপ্রয়োজনীয় listener clean করো (memory leak এড়াতে)
- scroll, resize, mousemove-এ debounce/throttle ব্যবহার করো
- passive: true touch/wheel event-এ পারফরমেন্স বাড়ায়
- Anonymous function listener না করে named function দিয়ে পরবর্তীতে remove-সুবিধা
- একই element-এ একই ইভেন্টের একাধিক listener avoid করো (stopImmediate যেখানে দরকার)
*/
