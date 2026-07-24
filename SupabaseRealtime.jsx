import React, { useEffect, useState } from 'react';

function MealTable({ supabase, houseKey }) {
  const [data, setData] = useState({});

  useEffect(() => {
    let isMounted = true;
    let channel = null;

    // প্রথমবার ডাটা ফেচ (initial fetch)
    async function fetchInitial() {
      const { data: result, error } = await supabase
        .from('houses')
        .select('meal_data')
        .eq('special_key', houseKey)
        .single();

      if (!error && isMounted) {
        setData(result.meal_data);
      }
    }

    // Realtime চ্যানেল খোলো
    channel = supabase
      .channel('meal-realtime')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'houses',
          filter: `special_key=eq.${houseKey}`,
        },
        (payload) => {
          if (isMounted) {
            setData(payload.new.meal_data); // React state auto-rerender
          }
        }
      )
      .subscribe();

    fetchInitial();

    // Cleanup: কম্পোনেন্ট আনমাউন্ট হলে চ্যানেল বন্ধ
    return () => {
      isMounted = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, []); // empty deps → একবারই চলবে

  return <div>{JSON.stringify(data)}</div>;
}

//Js 

// 1. Supabase ক্লায়েন্ট সেটআপ (তোমার কাছে আগে থেকেই আছে)
import { supabase } from './supaBase.js';

// 2. Realtime চ্যানেল খোলো
const channel = supabase
  .channel('my-unique-channel') // চ্যানেলের নাম দাও (যেকোনো ইউনিক নাম)
  .on(
    'postgres_changes',        // আমরা ডাটাবেজ চেঞ্জ শুনছি
    {
      event: 'UPDATE',         // UPDATE ইভেন্ট শোনো (INSERT, DELETEও দিতে পারো)
      schema: 'public',        // ডিফল্ট স্কিমা
      table: 'houses',         // যে টেবিল মনিটর করবে
      filter: 'special_key=eq.abc123', // optional: শুধু নির্দিষ্ট কন্ডিশনের চেঞ্জ শোনো
    },
    (payload) => {
      // এই কলব্যাকে payload পাবে
      console.log('পুরনো ডাটা:', payload.old);
      console.log('নতুন ডাটা:', payload.new);
      
      // UI আপডেট করো
      // document.getElementById('mealList').innerHTML = ...;
    }
  )
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') {
      console.log('রেডিও অন হয়েছে!');
    }
  });

// 3. চ্যানেল বন্ধ করা (পেজ ছেড়ে যাবার সময়)
// window.addEventListener('beforeunload', () => {
//   supabase.removeChannel(channel);
// });

// অথবা cleanup function এ (যদি SPA হয়)
function cleanup() {
  supabase.removeChannel(channel);
}

/*
🎯 ইভেন্ট টাইপস
Event	কখন ট্রিগার হবে
INSERT	নতুন রো যোগ হলে
UPDATE	কোনো রো আপডেট হলে
DELETE	রো ডিলিট হলে
*	সব ইভেন্ট শুনতে চাইলে
💡 দরকারি টিপস
Unsubscribe: কম্পোনেন্ট আনমাউন্ট বা পেজ ছাড়ার সময় removeChannel(channel) কল করবি, না হলে মেমরি লিক হবে।

One channel, many listeners: একই চ্যানেলে একাধিক .on() লাগাতে পারিস (আলাদা টেবিল বা ইভেন্টের জন্য)।

StrictMode issue: React StrictMode ডাবল রান করে; তাই আগের চ্যানেল রিমুভ করে নতুন চ্যানেল বানানো ভালো (উপরের নোটের মতো if (channel) supabase.removeChannel(channel)).

Filter ব্যবহার করলে ডাটা কম আসে: শুধু নিজের houseKey-র চেঞ্জ পাবে, সব হাউজের না।

🔥 এখন তোর মনে রাখার জন্য সিম্পল স্টোরি
"Realtime মানে রেডিও। তুই রেডিও অন করলি (subscribe), স্টেশন বললো কী শুনবি (table + event), আর স্টেশন যখন কিছু পাঠালো (payload), তুই সেটা ধরে UI বদলে ফেললি। রেডিও বন্ধ করতে ভুলিস না (cleanup), না হলে ব্যাটারি শেষ (memory leak)!"

এই নোটটা রাখিস, পরে কখনো দরকার হলে দেখবি আর সব মনে পড়ে যাবে! 😊🔥


*/
