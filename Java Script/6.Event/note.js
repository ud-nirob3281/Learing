//! JavaScript Events 

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
*/
document.addEventListener("click", function(event) {
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
/*
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


//* 6. Once, Passive, Signal Options
//* ========================
// 6.1 once: true
/*
একবার execute হওয়ার পর listener auto remove হয়ে যায়।
Use case:
- একবার click করলে কোনো কিছু initialize করা।
- animation শেষে cleanup।
- confirmation prompt একবার দেখানো।
- memory leak কমাতে একবারের listener।
*/
// উদাহরণ: একটি button প্রথম click-এ activate, পরে আর listener থাকবে না
const activateBtn = document.getElementById("activateBtn");
activateBtn.addEventListener("click", function() {
  console.log("Button activated! Listener removed.");
  // activate logic
}, { once: true });

// click যতবারই করি, দ্বিতীয়বার থেকে আর log হবে না।


// 6.2 passive: true
/*
মানে: listener-এ কখনো e.preventDefault() কল করা হবে না বলে ব্রাউজারকে জানানো।
এতে scroll performance দ্রুত হয় কারণ ব্রাউজার main thread-এ preventDefault-এর জন্য অপেক্ষা করে না।
Use case:
- touchstart, touchmove, wheel, scroll ইভেন্টে (scroll smooth রাখতে)।
- passive: true দিয়ে scroll block না করে custom কাজ।
- mobile-এ scroll lag দূর হয়।
*/
// উদাহরণ: scroll listener (passive) - performance boost
document.addEventListener("scroll", function(e) {
  console.log("User scrolled, but we don't prevent default");
  // scroll position track, lazy load ইত্যাদি
}, { passive: true });

// touchmove: default prevent করলে scroll আটকে যায়। passive: true দিলে scroll unrestricted থাকে।
document.addEventListener("touchmove", function(e) {
  // e.preventDefault(); // passive থাকলে এটা ignore হবে বা error দেবে
  console.log("Touch move, but scroll works smoothly");
}, { passive: true });

// কিছু ব্রাউজারে wheel/scroll-এর জন্য passive default true হয়ে গেছে।


// 2.3 signal (AbortController)
/*
signal এর মাধ্যমে একসাথে অনেক listener remove করা যায়।
একটা AbortController instance তৈরি করে তার signal option-এ pass করি।
পরে controller.abort() কল করলেই সব listener remove।
Use case:
- SPA-তে page leave হলে সব listener একবারে clean।
- fetch request cancel (এর সাথে AbortController already ব্যবহার করো)।
- dynamically added listener remove।
*/
// উদাহরণ: multiple listener abort
const abortController = new AbortController();
const signal = abortController.signal;

document.addEventListener("mousemove", function(e) {
  console.log("Mouse moved", e.clientX);
}, { signal });

document.addEventListener("keydown", function(e) {
  console.log("Key pressed", e.key);
}, { signal });

// পরে যখন দরকার (component unmount)
abortController.abort(); // সব listener remove



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

  //* ========================
//* Custom Event (নিজস্ব ইভেন্ট তৈরি)
//* ========================
/*
কেন দরকার?
- যখন built-in ইভেন্ট দিয়ে প্রকাশ করা যায় না এমন কিছু ঘটলে signal পাঠাতে চাই।
- Component-to-component communication (loose coupling) সহজ হয়।
- State change, UI update, custom action track করা।
- Large apps-এ Redux/Context-এর আগে lightweight pub/sub হিসেবেও কাজ করে।

মূল বিষয়:
  - new CustomEvent(eventName, options) দিয়ে ইভেন্ট তৈরি
  - dispatchEvent(element) দিয়ে trigger
  - detail property এর মাধ্যমে data পাঠানো
  - bubbles: true দিলে parent-এ ওঠে (bubbling)
  - cancelable: true দিলে preventDefault() করা যায়
*/

// উদাহরণ 1: Custom event তৈরি, dispatch, ও listen
// একটা custom ইভেন্ট "userLoggedIn" তৈরি করি, সাথে user data পাঠাই
const loginEvent = new CustomEvent("userLoggedIn", {
  detail: {
    username: "Nirob",
    email: "nirob@example.com",
    loginTime: Date.now()
  },
  bubbles: true,    // document পর্যন্ত bubble করবে
  cancelable: false // preventDefault() অকার্যকর
});

// dispatch on document (or any element)
document.dispatchEvent(loginEvent);

// listener
document.addEventListener("userLoggedIn", function(e) {
  console.log("User logged in:", e.detail.username, e.detail.email);
  // UI update, API call, etc.
});

// উদাহরণ 2: UI component এর ভেতর থেকে parent-কে notify
// একটা modal component imagine করি
const modal = document.getElementById("myModal");
const closeBtn = document.getElementById("closeModalBtn");

closeBtn.addEventListener("click", function() {
  // modal close হলে "modalClosed" event fire
  const closedEvent = new CustomEvent("modalClosed", {
    detail: { modalId: "myModal" },
    bubbles: true
  });
  modal.dispatchEvent(closedEvent);
});

// parent component listen
document.addEventListener("modalClosed", function(e) {
  console.log(`Modal ${e.detail.modalId} closed`);
  // overlay remove, body class remove ইত্যাদি
});

// উদাহরণ 3: Validation event – form field-এ custom valid/invalid
const emailInput = document.getElementById("email");
emailInput.addEventListener("blur", function(e) {
  const isValid = e.target.value.includes("@");
  // custom ইভেন্ট fire করি
  const validEvent = new CustomEvent("emailValidated", {
    detail: { field: "email", valid: isValid },
    bubbles: true
  });
  e.target.dispatchEvent(validEvent);
});

// ব্যবহার: error message দেখানো
document.addEventListener("emailValidated", function(e) {
  if (!e.detail.valid) {
    console.log("Email invalid!");
  }
});

// উদাহরণ 4: Timer শেষে custom event
function countdown(seconds) {
  let remaining = seconds;
  const timer = setInterval(() => {
    remaining--;
    if (remaining === 0) {
      clearInterval(timer);
      const endEvent = new CustomEvent("countdownFinished", {
        detail: { totalSeconds: seconds }
      });
      document.dispatchEvent(endEvent);
    }
  }, 1000);
}
document.addEventListener("countdownFinished", (e) => {
  console.log("Countdown finished after", e.detail.totalSeconds, "seconds");
});
countdown(3);




  

//* ========================
//* ২. Script loading: normal, async, defer
//* ========================

/*
HTML parser যখন কোনো <script> tag দেখে (বিনা async/defer), তখন সেটা সাথে সাথে download করে,
execute করে, এবং যতক্ষণ শেষ না হয় ততক্ষণ HTML parsing বন্ধ রাখে (block করে)।
এটা খারাপ, কারণ page slow হয় এবং DOMContentLoaded দেরিতে fire হয়।

async এবং defer attribute ব্যবহার করলে script download asynchronous হয় (HTML parsing block করে না),
কিন্তু execute করার সময় ভিন্ন।
*/

// --- 2.1 Normal <script> (default) ---
// <script src="script.js"></script>
// আচরণ:
//   - HTML parsing থামিয়ে script download করে এবং execute করে।
//   - তারপর আবার parsing resume করে।
//   - DOMContentLoaded তখনই fire হবে যখন parsing শেষ হবে, মানে script block করলে দেরি হয়।
//   - Execution order: script যেই ক্রমে HTML-এ আছে, সেই ক্রমে execute হবে (কারণ synchronous)।

// --- 2.2 async attribute ---
// <script src="script.js" async></script>
// আচরণ:
//   - HTML parsing চলতে থাকে, script parallel download হতে থাকে।
//   - Download শেষ হওয়া মাত্র parsing থামিয়ে সাথে সাথে execute করে ফেলে।
//   - তারপর আবার parsing resume করে।
//   - একাধিক async script থাকলে order maintain করে না — যেটা আগে download শেষ হবে সেটা আগে execute হবে।
//   - DOMContentLoaded: async script execute করা হয়ে গেলে fire হবে,
//     অথবা async script execute হওয়া আগে parsing শেষ হয়ে গেলে DOMContentLoaded আগেও fire হতে পারে।
//     অর্থাৎ async script DOMContentLoaded-কে block করতে পারে যদি execute parsing-এর মাঝে হয়।
//   - ব্যবহার: independent script যেমন analytics, ads, counter (যাদের DOM বা অন্য script-এর দরকার নেই)।

// --- 2.3 defer attribute ---
// <script src="script.js" defer></script>
// আচরণ:
//   - HTML parsing চলতে থাকে, script parallel download হয়।
//   - Download শেষ হওয়া সত্ত্বেও সাথে সাথে execute করে না।
//   - Execute করে **HTML parsing সম্পূর্ণ শেষে**, DOMContentLoaded fire-এর ঠিক আগে।
//   - একাধিক defer script থাকলে তারা HTML-তে যেই ক্রমে আছে সেই ক্রমেই execute হবে (in order)।
//   - DOMContentLoaded: defer scripts সব execute হয়ে যাওয়ার পর fire হয়।
//     তাই defer script-এ সরাসরি DOM element access করা যায়, DOMContentLoaded listener দরকার পড়ে না।
//   - ব্যবহার: যেসব script পুরো DOM-এর উপর নির্ভরশীল বা অন্যান্য defer script-এর সাথে order দরকার।

// Visual Timeline (সংক্ষেপে):
/*
Type      Download          Execution         Block parsing?
normal    synchronous       immediately       yes
async     parallel          as soon as done   yes (during exec)
defer     parallel          after parsing     no (exec after parsing)
*/

//* ========================
//* 3. Common Event Types & তাদের ব্যবহার ক্ষেত্র (Use Cases) with Examples
//* ========================

// নিচে প্রতিটা ইভেন্টের পাশে use case ও ছোট উদাহরণ দেওয়া হলো।

// --- Mouse Events ---

// click: element-এ ক্লিক করলে; button, link, custom UI
document.getElementById("submitBtn").addEventListener("click", () => {
  console.log("Form submit clicked");
});

// dblclick: double click; edit mode activate, details expand
document.querySelector(".editable").addEventListener("dblclick", function() {
  this.contentEditable = true;
  this.focus();
});

// mousedown / mouseup: mouse বাটন চাপা/ছাড়া; drag শুরু, custom button state
const draggable = document.getElementById("box");
draggable.addEventListener("mousedown", function(e) {
  console.log("Drag start");
  // mousemove দিয়ে drag logic
});

// mouseenter / mouseleave: element-এ মাউস ঢুকলে/বেরুলে (bubbling করে না); hover effect, tooltip
const tooltipTrigger = document.getElementById("tooltipBtn");
tooltipTrigger.addEventListener("mouseenter", function() {
  document.getElementById("tooltip").style.display = "block";
});
tooltipTrigger.addEventListener("mouseleave", function() {
  document.getElementById("tooltip").style.display = "none";
});

// mousemove: মাউস সরলে; custom cursor, drawing, drag
document.addEventListener("mousemove", function(e) {
  const coords = `X: ${e.clientX}, Y: ${e.clientY}`;
  document.getElementById("coordsDisplay").textContent = coords;
});

// contextmenu: right-click; custom context menu
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
  const customMenu = document.getElementById("customMenu");
  customMenu.style.top = e.clientY + "px";
  customMenu.style.left = e.clientX + "px";
  customMenu.style.display = "block";
});


// --- Keyboard Events ---

// keydown: key চাপা; shortcut, game control, form navigation
document.addEventListener("keydown", function(e) {
  if (e.ctrlKey && e.key === "s") {
    e.preventDefault();
    console.log("Ctrl+S save shortcut triggered");
  }
});

// keyup: key ছাড়া; live search finish, password strength (real-time check)
const searchInput = document.getElementById("searchBox");
searchInput.addEventListener("keyup", function() {
  console.log("Search query:", this.value);
  // debounced search API call
});

// input: input field-এর value change (paste, cut, delete সহ) – real-time validation
const nameInput = document.getElementById("name");
nameInput.addEventListener("input", function() {
  const isValid = this.value.length >= 3;
  document.getElementById("nameError").textContent = isValid ? "" : "Min 3 chars";
});

// change: value change + field lose focus (select, checkbox, radio, file)
const countrySelect = document.getElementById("country");
countrySelect.addEventListener("change", function() {
  console.log("Selected country:", this.value);
});

// submit: form submit (button বা Enter)
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  console.log(Object.fromEntries(formData));
});

// focus / blur: element focus পায়/হারায়
document.getElementById("email").addEventListener("focus", function() {
  this.style.borderColor = "blue";
});
document.getElementById("email").addEventListener("blur", function() {
  this.style.borderColor = "";
  // validate email
});

// focusin / focusout: focus/blur but bubbles (parent ধরতে পারে)
document.getElementById("formContainer").addEventListener("focusin", function() {
  console.log("Some field focused inside form");
});


// --- Document/Window Events ---
/*
DOMContentLoaded কবে fire হয়?
- ব্রাউজার যখন পুরো HTML file parse করে DOM tree তৈরি শেষ করে ফেলে।
- কিন্তু এই সময় CSS files, images, subframes ইত্যাদি load নাও হতে পারে।
- অর্থাৎ, DOM (HTML structure) ready, JavaScript দিয়ে safely manipulate করা যায়।

সংক্ষেপে: "DOM ready, JavaScript চালানোর জন্য প্রস্তুত।"

এটা document-এ fire হয়, window-এ নয়।
*/

// ব্যবহার করার নিয়ম:
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully parsed! নিরাপদে element access করতে পারবে।");
  // এখন getElementById, querySelector ইত্যাদি কাজ করবে।
});

// কেন দরকার?
// যদি <head> বা body-র একদম শুরুতে script লিখ এবং সেখানে DOM access করতে চাও,
// তখন বেশিরভাগ element এখনো তৈরি হয়নি, তাই null পাবে।
// DOMContentLoaded-র ভেতর লিখলে গ্যারান্টি পাবে যে DOM tree-র সব element ready।

// load: সব resource (images, styles) load হয়ে গেলে
window.addEventListener("load", function() {
  console.log("All resources loaded, hide loader");
  document.getElementById("loader").style.display = "none";
});

// beforeunload: page leave হতে যাচ্ছে (close/refresh); confirm message
window.addEventListener("beforeunload", function(e) {
  e.preventDefault(); // কিছু ব্রাউজারে message দেখায়
  e.returnValue = "Are you sure?";
});

// resize: window resize; responsive layout change, chart redraw
window.addEventListener("resize", function() {
  console.log("Window size:", window.innerWidth);
  // redraw canvas
});

// scroll: page/element scroll; infinite scroll, sticky header, parallax
window.addEventListener("scroll", function() {
  const scrollTop = window.scrollY;
  if (scrollTop > 100) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
});


// --- Drag Events ---

// dragstart: element drag শুরু
const dragItem = document.getElementById("dragMe");
dragItem.addEventListener("dragstart", function(e) {
  e.dataTransfer.setData("text/plain", this.id);
  console.log("Drag started");
});

// dragover: drag করার সময় drop zone-এ hover; default prevent করতে হয় drop সক্ষম করতে
const dropZone = document.getElementById("dropHere");
dropZone.addEventListener("dragover", function(e) {
  e.preventDefault(); // drop allow করতে
  this.style.background = "#eee";
});

// drop: drop zone-এ element ফেলা
dropZone.addEventListener("drop", function(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  const draggedEl = document.getElementById(id);
  this.appendChild(draggedEl);
  this.style.background = "";
});


// --- Touch & Pointer Events (মোবাইল) ---

// touchstart: আঙুল touch; swipe শুরু, long press
document.addEventListener("touchstart", function(e) {
  console.log("Touch started");
}, { passive: true });

// touchmove: আঙুল সরানো; drag, pinch zoom
document.addEventListener("touchmove", function(e) {
  console.log("Touch moving");
}, { passive: true });

// touchend: আঙুল তুলে নেওয়া; swipe end, tap
document.addEventListener("touchend", function(e) {
  console.log("Touch ended");
});

// pointerdown/pointermove/pointerup: mouse+touch unified
document.addEventListener("pointermove", function(e) {
  console.log("Pointer moved, pointerType:", e.pointerType); // "mouse" or "touch"
});


// --- Media Events ---
const video = document.getElementById("myVideo");
video.addEventListener("play", () => console.log("Video playing"));
video.addEventListener("pause", () => console.log("Video paused"));
video.addEventListener("ended", () => console.log("Video ended"));
// ... timeupdate, volumechange etc.

// --- Clipboard Events ---
document.addEventListener("copy", (e) => {
  console.log("Content copied");
});
document.addEventListener("paste", (e) => {
  const pastedText = e.clipboardData.getData("text/plain");
  console.log("Pasted:", pastedText);
});

  
  
