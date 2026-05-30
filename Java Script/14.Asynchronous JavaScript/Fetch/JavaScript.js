//! JavaScript Fetch API (সম্পূর্ণ গভীর বিশ্লেষণ – বাংলা+English Note)

/*
Fetch API কী?
=============
Fetch API是现代浏览器内置的用于发送HTTP请求的接口。
এটি Promise-based, মানে asynchronous ভাবে network request পাঠানো যায়।
XMLHttpRequest-এর চেয়ে সহজ, clean, এবং modern।

Fetch-এর মূল বৈশিষ্ট্য:
- Promise-based, async/await সাপোর্ট করে।
- Request এবং Response object ব্যবহার করে।
- JSON, text, blob, formData ইত্যাদি parse করতে পারে।
- CORS, headers, cache control, abort ইত্যাদি handle করতে পারে।
*/

//* ========================
//* ১. Fetch-এর Syntax
//* ========================

/*
fetch(url, options)
  .then(response => {
    // response.ok, response.status, response.headers ইত্যাদি
    return response.json(); // or .text(), .blob()
  })
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

options object-এ method, headers, body, signal, mode, cache ইত্যাদি দেওয়া যায়।
Fetch শুধু network error-এ reject করে, HTTP error (404,500) হলে resolve হয় (response.ok false হয়)।
*/

//* ========================
//* ২. Async/Await দিয়ে Fetch
//* ========================

async function fetchData(url) {
  try {
    const response = await fetch(url); // options optional
    // response.ok check করা গুরুত্বপূর্ণ
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch failed:', error);
  }
}

//* ========================
//* ৩. HTTP Methods (সংক্ষিপ্ত পরিচিতি)
//* ========================

/*
- GET:     সার্ভার থেকে data fetch করা (default method). Body থাকে না।
- POST:    নতুন resource তৈরি করতে server-এ data পাঠানো।
- PUT:     সম্পূর্ণ resource replace/update করা (সব fields পাঠাতে হয়)।
- PATCH:   আংশিক update (শুধু নির্দিষ্ট fields)।
- DELETE:  resource delete করা।
- HEAD:    GET-এর মতো, কিন্তু response body ছাড়া শুধু headers পাঠায়। (resource check)
- OPTIONS: server-এ কোন methods allowed তা জানতে (CORS preflight)।
- TRACE:   request debugging-এর জন্য (সাধারণত disabled)।
- CONNECT: SSL/TLS tunnel তৈরি করতে (proxy)।
*/

//* ========================
//* ৪. GET Request (Data Fetch)
//* ========================

async function getPosts() {
  const api_url = 'http://localhost:3000/posts';
  try {
    const response = await fetch(api_url);
    // network error না হলে catch হবে না, তাই HTTP status check করি
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    // Output: array of posts (JSON)
  } catch (error) {
    console.error('GET Error:', error.message);
  }
}
getPosts();

// Execution Context:
// getPosts FEC তৈরি, await fetch(...) → browser network thread-এ request যায়, main thread free.
// Response এলে microtask queue-তে callback, await resolve, FEC resume.

//* ========================
//* ৫. POST Request (Create Resource)
//* ========================

async function postData(postData) {
  const API_URL = 'http://localhost:3000/posts';
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // content-type গুরুত্বপূর্ণ
      body: JSON.stringify(postData), // object -> JSON string
    });
    if (!response.ok) {
      throw new Error(`Post failed: ${response.status}`);
    }
    const data = await response.json();
    console.log('Created:', data);
  } catch (error) {
    console.error('POST Error:', error.message);
  }
}

const newPost = {
  id: '1',
  title: 'THIS UD NIROB BACKEND SERVER',
  views: 500,
};
document.getElementById('post').onclick = () => postData(newPost);

//* ========================
//* ৬. Query Parameters (GET with filters)
//* ========================
/*
Query parameters কী?
- এগুলি URL-এর শেষে `?` চিহ্নের পরে key=value জোড়া হিসেবে যুক্ত করা হয়।
- সার্ভারে নির্দিষ্ট ডেটা ফিল্টার, পেজিনেশন, সার্চ, সর্ট ইত্যাদি পাঠানোর জন্য ব্যবহৃত হয়।
- উদাহরণ: `http://localhost:3000/posts?views=500&author=nirob`
- `URLSearchParams` API ব্যবহার করে এগুলো সহজেই তৈরি ও ম্যানিপুলেট করা যায়।
*/

// --- কেন দরকার? ---
// - GET রিকোয়েস্টে ডেটা ফিল্টার করতে (যেমন: শুধু views=500 এর পোস্ট আনতে)
// - পেজিনেশন (page=2&limit=10)
// - সার্চ (q=javascript)
// - একাধিক প্যারামিটার একসাথে পাঠানোর ক্ষেত্রে

// --- কিভাবে ব্যবহার করবে? ---
async function queryParamsDeep() {
  const baseURL = 'http://localhost:3000/posts';

  // 1. Object থেকে query string তৈরি
  const params = {
    views: 500,
    author: 'nirob',
    sort: 'desc'
  };

  // URLSearchParams ব্যবহার করে query string বানানো
  const queryString = new URLSearchParams(params).toString();
  // Output: "views=500&author=nirob&sort=desc"


async function queryParams() {
  const baseURL = 'http://localhost:3000/posts';
  const queryParams = { views: 500 };
  // URLSearchParams object use করে query string তৈরি
  const queryString = new URLSearchParams(queryParams).toString();
  // "views=500"
  const fullURL = `${baseURL}?${queryString}`;
  try {
    const response = await fetch(fullURL);
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    console.log('Filtered data:', data);
  } catch (error) {
    console.error(error);
  }
}
queryParams();

//* ========================
//* ৭. PUT Request (Full Update)
//* ========================

async function updateFull(updateData, id) {
  const API_URL = `http://localhost:3000/posts/${id}`;
  try {
    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) throw new Error(`Update failed: ${response.status}`);
    const data = await response.json();
    console.log('Updated (full):', data);
  } catch (error) {
    console.error(error);
  }
}
const fullUpdate = {
  title: 'THIS UD NIROB FRONTEND SERVER',
  views: 123,
};
document.getElementById('update').onclick = () => updateFull(fullUpdate, '2');

//* ========================
//* ৮. PATCH Request (Partial Update)
//* ========================

async function updatePartial(partialData, id) {
  const API_URL = `http://localhost:3000/posts/${id}`;
  try {
    const response = await fetch(API_URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partialData),
    });
    if (!response.ok) throw new Error(`Patch failed: ${response.status}`);
    const data = await response.json();
    console.log('Partially updated:', data);
  } catch (error) {
    console.error(error);
  }
}
document.getElementById('update1').onclick = () =>
  updatePartial({ views: 323 }, '2');

//* ========================
//* ৯. DELETE Request
//* ========================

async function deleteResource(id) {
  const API_URL = `http://localhost:3000/posts/${id}`;
  try {
    const response = await fetch(API_URL, { method: 'DELETE' });
    if (!response.ok) throw new Error(`Delete failed: ${response.status}`);
    const data = await response.json();
    console.log('Deleted:', data);
  } catch (error) {
    console.error(error);
  }
}
document.getElementById('delete').onclick = () => deleteResource('1');

//* ========================
//* ১০. Custom Headers (Authentication, etc.)
//* ========================

/*Custom headers কী?
- HTTP রিকোয়েস্ট/রেসপন্সের অতিরিক্ত তথ্য পাঠানোর জন্য headers ব্যবহার করা হয়।
- কাস্টম হেডার বলতে বোঝায় নিজেদের তৈরি করা অথবা স্ট্যান্ডার্ড নয় এমন headers।
- সাধারণত "X-" প্রিফিক্স দিয়ে কাস্টম হেডার শুরু হতো, তবে এখন RFC 6648 অনুযায়ী প্রিফিক্স এড়ানো উচিত।
*/

// --- কেন দরকার? ---
// - Authentication token (Authorization: Bearer <token>)
// - API key পাঠানো
// - Content-Type নির্দেশ করা (application/json, multipart/form-data)
// - Request metadata (tracking ID, version)
// - CORS নিয়ন্ত্রণ

// --- কিভাবে ব্যবহার করবে? ---
async function loginWithHeaders() {
  const API_URL = 'http://localhost:3000/login';

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        // 1. Standard headers
        'Content-Type': 'application/json', // body format define
        // 2. Authorization header (JWT token)
        Authorization: 'Bearer secret-token-12345',
        // 3. Custom non-standard headers (অ্যাপ্লিকেশনের নিজস্ব)
        'X-Request-ID': crypto.randomUUID(), // unique request track
        'X-Client-Version': '2.0.1',
        // 4. বা RFC-compliant কাস্টম (X- ছাড়া)
        'Custom-Header': 'learn 40 days of JS',
      },
      body: JSON.stringify({ username: 'SAFA', password: 1234 }),
    });

    if (!response.ok) throw new Error(`Login failed: ${response.status}`);

    // রেসপন্স headers পড়া
    console.log('Response Headers:');
    console.log(response.headers.get('content-type'));
    console.log(response.headers.get('x-powered-by'));

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Custom headers error:', error);
  }
    }
//* ========================
//* ১১. Request Object (Reusable Request)
//* ========================
/*Request object কী?
- fetch API-তে পাঠানোর জন্য একটি পূর্ণাঙ্গ রিকোয়েস্ট রিপ্রেজেন্টেশন।
- এটি `new Request(url, options)` দিয়ে তৈরি করা যায়।
- এর সাহায্যে একই রিকোয়েস্ট কনফিগারেশন পুনরায় ব্যবহার করা যায়, clone করা যায়।
*/

// --- কেন দরকার? ---
// - একই base URL বা headers set করে একাধিক রিকোয়েস্ট পাঠাতে।
// - Service Worker-এ রিকোয়েস্ট intercept ও modify করতে।
// - Body read একবার হলেও clone() দিয়ে আবার ব্যবহার করা যায়।
    
    
const req1 = new Request('http://localhost:3000/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Ud Nirob',
    age: 18,
    career: 'MERN Stack Web Developer',
    views: 0,
  }),
});

// clone() তৈরি করে body reuse (original stream already consumed)
const req2 = new Request(req1.clone(), {
  body: JSON.stringify({
    name: 'Safa',
    age: 16,
    career: 'Frontend Web Developer',
    views: 0,
  }),
});

async function postWithRequest(requestObj) {
  const response = await fetch(requestObj);
  const data = await response.json();
  console.log(data);
}
document.getElementById('post1').onclick = () => postWithRequest(req1);
document.getElementById('post2').onclick = () => postWithRequest(req2);

//* ========================
//* ১২. Response Handling (Validate Status & Content-Type)
//* ========================

async function handleResponse() {
  try {
    const api_url = 'http://localhost:3000/posts';
    const response = await fetch(api_url);

    // First check if HTTP status is success (200-299)
    if (!response.ok) {
      throw new Error(`Response Status ${response.status}`);
    }

    // Check Content-Type to avoid parsing error
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new TypeError(`Oops, we haven't got JSON`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Response handling error:', error);
  }
}
handleResponse();

//* ========================
//* ১৩. File Download with Blob & AbortController
//* ========================

const url =
  'https://i.ytimg.com/vi/IbKjb8HNKpo/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLBuMedvPzVeyuYZidx7QCaDEReSzw';

let controller; // store AbortController instance

document.querySelector('.downlod').onclick = download;
document.querySelector('.abort').onclick = abortFu;

function abortFu() {
  if (controller) {
    controller.abort('User Aborted'); // abort message as reason
    console.log('Aborted');
  }
}

async function download() {
  // প্রতিবার download-এ নতুন AbortController
  controller = new AbortController();
  const signal = controller.signal;

  try {
    // 2 সেকেন্ড পর fetch start (simulate delay)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(url, { signal }); // signal pass
    if (!response.ok) throw new Error(`Download failed: ${response.status}`);

    const blob = await response.blob(); // binary data
    const objectUrl = URL.createObjectURL(blob); // temporary URL

    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = 'cuty.jpg'; // desired filename
    anchor.click();

    // revoke object URL after some time to free memory (optional)
    setTimeout(() => URL.revokeObjectURL(objectUrl), 100);
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Download aborted by user');
    } else {
      console.error('Download error:', error);
    }
  }
}

/*
Execution Context Flow (Download):
- download() FEC created.
- controller = new AbortController() → signal তৈরি।
- setTimeout-এর callback পরে macro-task queue-এ।
- fetch কল হলে browser network thread-এ request যায়।
- abort করলে controller.abort() call, fetch-এর signal-এ AbortError trigger হয়।
- catch block-এ error.name === 'AbortError' হলে handle করা হয়।
*/

//* ========================
//* ১৪. Fetch Options Summary
//* ========================
/*
fetch(url, {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify(data), // GET/HEAD-এ body থাকবে না
  mode: 'cors' | 'no-cors' | 'same-origin',
  credentials: 'same-origin' | 'include' | 'omit',
  cache: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached',
  signal: AbortController.signal,
  redirect: 'follow' | 'error' | 'manual',
  referrerPolicy: ...
})
*/

//* ========================
//* ১৫. Response Object Properties & Methods
//* ========================
/*
response.ok          → boolean (status 200-299)
response.status      → HTTP status code (200, 404, 500...)
response.statusText  → status message ("OK", "Not Found")
response.headers     → Headers object (get(), has())
response.url         → final URL (after redirects)
response.redirected  → boolean (redirected or not)
response.type        → "basic" | "cors" | "opaque" | ...

Methods (consume body, promise-based):
  response.json()    → parse JSON
  response.text()    → plain text
  response.blob()    → binary (images, files)
  response.formData()→ FormData object
  response.arrayBuffer() → raw binary buffer
  response.clone()   → clone response to read multiple times
*/

//* ========================
//* ১৬. Error Handling Best Practices
//* ========================
/*
- Always check response.ok, because fetch only rejects on network error.
- Use try-catch with async/await.
- Handle specific error types: AbortError, TypeError, etc.
- For JSON parsing, wrap response.json() in try or check content-type.
- Show user-friendly messages.
- Use finally for cleanup (hide loader).
*/

//* ========================
//* ১৭. Common Pitfalls
//* ========================
/*
1. Forgetting to check response.ok → trying to parse error body as JSON.
2. Not setting 'Content-Type': 'application/json' when sending JSON body.
3. Using GET with body (not allowed).
4. Not handling AbortError separately.
5. CORS issues: server must allow origin.
6. Consuming response body twice without clone().
*/

//* ========================
//* ১৮. Real-life Example: Fetch with Timeout (AbortController)
//* ========================
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      console.error('Request timed out');
    } else {
      console.error('Fetch error:', error.message);
    }
    throw error;
  }
}

//* ========================
//* ১৯. Fetch vs Axios (সংক্ষেপে)
//* ========================
/*
- Fetch: built-in, promise-based, but manually check response.ok, no request/response interceptor built-in, no timeout option (use AbortController).
- Axios: external library, auto JSON transform, easier error handling (rejects on HTTP errors), interceptors, timeout property, cancel token.
*/

//* ========================
//* ২০. Conclusion
//* ========================
/*
Fetch API আধুনিক JavaScript-এর গুরুত্বপূর্ণ অংশ।
- HTTP request পাঠানো, response handle করা, JSON parse করা সব simple.
- Async/await ব্যবহারে code আরও পড়তে সুবিধা হয়।
- বাস্তব অ্যাপ্লিকেশনে authentication, file upload, pagination, retry logic সব fetch দিয়ে করতে পারবে।
*/


