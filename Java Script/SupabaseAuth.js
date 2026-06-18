// ============================================================
// 📚 Supabase অথেন্টিকেশন - জাভাস্ক্রিপ্ট ইনভেন্টরি
// একটি পূর্ণাঙ্গ নোট। প্রতিটি মেথডের কাজ, প্রয়োজনীয়তা,
// ব্যবহারের নিয়ম এবং উদাহরণ কমেন্ট আকারে দেওয়া হলো।
// ============================================================

// ============================================================
// ১. Supabase ক্লায়েন্ট তৈরি করা (Initialization)
// ============================================================
// কাজ: আপনার ফ্রন্টএন্ড অ্যাপকে Supabase প্রকল্পের সাথে সংযুক্ত করা।
// প্রয়োজন: সব অথ অপারেশনের আগে এই ক্লায়েন্ট তৈরি করতে হবে।
// কোথায় ব্যবহার: আপনার JavaScript ফাইলের একদম শুরুতে।
// সিনট্যাক্স: supabaseJs.createClient(PROJECT_URL, PUBLISHABLE_KEY)

// উদাহরণ (CDN ব্যবহার করলে):
// HTML-এ: <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
// JavaScript:
const supabase = supabaseJs.createClient(
  'https://rnaxslopyzdbmvmubefi.supabase.co', // আপনার Project URL
  'sb_publishable_O6yOm9o7uWY9Y6S5Msotg_jR22fiso' // আপনার Publishable (anon) Key
);
// console.log(supabase); // ক্লায়েন্ট অবজেক্ট কনসোলে দেখুন

// বিশেষ টিপস:
// 1. Publishable Key কখনো সিক্রেট রাখতে হয় না, ব্রাউজারে ব্যবহার করা যায়।
// 2. Secret (service_role) Key কখনো ফ্রন্টএন্ডে ব্যবহার করবেন না।
// 3. URL-এর শেষে /rest/v1/ যোগ করবেন না, শুধু মূল URL দিন।

// ============================================================
// ২. সাইনআপ (Sign Up) - নতুন ইউজার তৈরি করা
// ============================================================
// কাজ: ইমেইল ও পাসওয়ার্ড দিয়ে নতুন একটি ইউজার অ্যাকাউন্ট তৈরি করা।
// প্রয়োজন: নতুন ইউজার রেজিস্টার করানোর জন্য।
// কোথায় ব্যবহার: রেজিস্ট্রেশন ফর্ম জমা দেওয়ার সময়।
// সিনট্যাক্স: supabase.auth.signUp({ email, password, options })

async function signUpUser(email, password, fullName) {
  // ১. অথ সার্ভারে রিকোয়েস্ট পাঠানো
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { full_name: fullName }, // ইউজারের মেটাডেটা (ঐচ্ছিক)
      emailRedirectTo: 'https://yourapp.com/welcome' // কনফার্মেশনের পর কোথায় যাবে
    }
  });

  // ২. এরর হ্যান্ডেল করা
  if (error) {
    console.error('❌ সাইনআপ ব্যর্থ:', error.message);
    // যেমন: 'User already registered', 'Password too weak' ইত্যাদি
    return;
  }

  // ৩. সফল হলে
  console.log('✅ সাইনআপ সফল!');
  console.log('ইউজার আইডি:', data.user.id);
  console.log('ইউজার ইমেইল:', data.user.email);
  
  // ৪. ইমেইল কনফার্মেশন চেক করা
  if (data.user && data.user.confirmed_at) {
    console.log('ইমেইল আগেই কনফার্ম করা হয়েছে।');
  } else {
    console.log('📧 ইমেইলে কনফার্মেশন লিংক পাঠানো হয়েছে।');
  }
}

// ব্যবহার:
// signUpUser('rafiq@email.com', 'MyStrongPass123', 'রাফিক আহমেদ');

// কেন ব্যবহার করবেন?
// -> ইউজার রেজিস্ট্রেশন, নতুন অ্যাকাউন্ট তৈরির জন্য।

// ============================================================
// ৩. লগইন (Sign In) - বিদ্যমান ইউজারের প্রবেশ
// ============================================================
// কাজ: ইমেইল ও পাসওয়ার্ড মেলানো এবং ইউজারকে অ্যাপে প্রবেশ করানো।
// প্রয়োজন: ইউজার অথেন্টিকেশন (শনাক্তকরণ) করার জন্য।
// কোথায় ব্যবহার: লগইন ফর্ম জমা দেওয়ার সময়।
// সিনট্যাক্স: supabase.auth.signInWithPassword({ email, password })

async function signInUser(email, password) {
  // ১. লগইন রিকোয়েস্ট
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  // ২. এরর চেক
  if (error) {
    console.error('❌ লগইন ব্যর্থ:', error.message);
    // যেমন: 'Invalid login credentials'
    return;
  }

  // ৩. সফল লগইন
  console.log('✅ লগইন সফল!');
  console.log('ইউজার:', data.user.email);
  console.log('অ্যাক্সেস টোকেন:', data.session.access_token);
  console.log('রিফ্রেশ টোকেন:', data.session.refresh_token);

  // ৪. সেশন অটোমেটিক ব্রাউজারের Local Storage-এ সেভ হয়ে যায়
  // তাই পেজ রিলোড করলেও লগইন থাকে।

  // ৫. UI আপডেট করুন (যেমন: ড্যাশবোর্ড দেখান)
  // window.location.href = '/dashboard';
}

// ব্যবহার:
// signInUser('rafiq@email.com', 'MyStrongPass123');

// কেন ব্যবহার করবেন?
// -> ইউজার লগইন, সেশন তৈরি, অ্যাপ অ্যাক্সেস দেওয়ার জন্য।

// ============================================================
// ৪. লগআউট (Sign Out) - ইউজারকে বের করে দেওয়া
// ============================================================
// কাজ: বর্তমান ইউজারের সেশন শেষ করে দেওয়া।
// প্রয়োজন: ইউজার যখন অ্যাপ থেকে বের হতে চায়।
// কোথায় ব্যবহার: লগআউট বাটনে ক্লিক করলে।
// সিনট্যাক্স: supabase.auth.signOut()

async function signOutUser() {
  // ১. লগআউট রিকোয়েস্ট
  const { error } = await supabase.auth.signOut();

  // ২. এরর চেক
  if (error) {
    console.error('❌ লগআউট ব্যর্থ:', error.message);
    return;
  }

  // ৩. সফল
  console.log('✅ লগআউট সফল!');
  // Local Storage থেকে সেশন ক্লিয়ার হয়ে যায়

  // ৪. UI আপডেট (লগইন পেজে পাঠান)
  // window.location.href = '/login';
}

// ব্যবহার:
// signOutUser();

// কেন ব্যবহার করবেন?
// -> ইউজারের সেশন ক্লিয়ার করা, নিরাপত্তার জন্য।

// ============================================================
// ৫. সেশন চেক করা (Check Session) - ইউজার লগইন আছে কিনা?
// ============================================================
// কাজ: ব্রাউজারের Local Storage থেকে বর্তমান সেশন পড়া।
// প্রয়োজন: পেজ লোড হলে বা API কলের আগে ইউজার চেক করতে।
// কোথায় ব্যবহার: window.onload, প্রাইভেট রুট গার্ডে।
// সিনট্যাক্স: supabase.auth.getSession()

async function checkSession() {
  // ১. লোকাল স্টোরেজ থেকে সেশন পড়া
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('❌ সেশন চেক করতে সমস্যা:', error);
    return;
  }

  // ২. সেশন আছে কিনা চেক
  if (data.session) {
    console.log('✅ ইউজার লগইন আছে!');
    console.log('ইউজার:', data.session.user.email);
    console.log('টোকেন এক্সপায়ার:', data.session.expires_at);
    return true;
  } else {
    console.log('❌ ইউজার লগইন নেই।');
    return false;
  }
}

// ব্যবহার (পেজ লোড হলে):
window.onload = async function() {
  const isLoggedIn = await checkSession();
  if (isLoggedIn) {
    // ড্যাশবোর্ড দেখান
  } else {
    // লগইন পেজ দেখান
  }
};

// কেন ব্যবহার করবেন?
// -> অ্যাপ লোড হলে লগইন স্টেট রিস্টোর করা, রাউট গার্ড তৈরি করা।

// ============================================================
// ৬. বর্তমান ইউজারের তথ্য পাওয়া (Get User)
// ============================================================
// কাজ: সার্ভার থেকে বর্তমান ইউজারের সর্বশেষ তথ্য আনা।
// প্রয়োজন: ইউজারের প্রোফাইল বা মেটাডেটা দেখাতে।
// কোথায় ব্যবহার: প্রোফাইল পেজ, ইউজার সেটিংস।
// সিনট্যাক্স: supabase.auth.getUser()

async function getCurrentUser() {
  // ১. সার্ভারে রিকোয়েস্ট (সবসময় আপডেটেড ডেটা পাবেন)
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('❌ ইউজার তথ্য পেতে সমস্যা:', error);
    // যেমন: 'JWT expired', 'Invalid token'
    return;
  }

  // ২. ইউজার ডেটা
  const user = data.user;
  console.log('✅ বর্তমান ইউজার:');
  console.log('আইডি:', user.id);
  console.log('ইমেইল:', user.email);
  console.log('মেটাডেটা:', user.user_metadata); // { full_name: 'রাফিক' }
  console.log('কখন কনফার্ম হয়েছে:', user.confirmed_at);
  console.log('শেষ লগইন:', user.last_sign_in_at);

  return user;
}

// ব্যবহার:
// const user = await getCurrentUser();

// getSession() আর getUser() এর মধ্যে পার্থক্য:
// - getSession() -> লোকাল স্টোরেজ থেকে দ্রুত পড়ে (অফলাইনেও কাজ করে)
// - getUser() -> সার্ভারে গিয়ে আপডেটেড ডেটা আনে (নেটওয়ার্ক দরকার)

// ============================================================
// ৭. অথ স্টেট চেঞ্জ শোনা (Listen to Auth State Changes)
// ============================================================
// কাজ: লগইন/লগআউট/ইউজার আপডেট ইভেন্ট গুলো শোনা।
// প্রয়োজন: ইউজারের অ্যাকশনের সাথে সাথে UI আপডেট করতে।
// কোথায় ব্যবহার: নেভবার আপডেট, রিডাইরেক্ট, নোটিফিকেশন।
// সিনট্যাক্স: supabase.auth.onAuthStateChange(callback)

// ১. লিসেনার তৈরি করা
const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
  // ২. ইভেন্ট টাইপ অনুযায়ী কাজ করা
  console.log('🔄 অথ ইভেন্ট:', event);
  console.log('সেশন:', session);

  switch (event) {
    case 'SIGNED_IN':
      console.log('🔓 ইউজার লগইন করেছে!');
      // UI-তে ড্যাশবোর্ড দেখান
      break;

    case 'SIGNED_OUT':
      console.log('🔒 ইউজার লগআউট করেছে!');
      // UI-তে লগইন পেজ দেখান
      break;

    case 'USER_UPDATED':
      console.log('📝 ইউজার তথ্য আপডেট হয়েছে!');
      // প্রোফাইল রিফ্রেশ করুন
      break;

    case 'PASSWORD_RECOVERY':
      console.log('🔑 পাসওয়ার্ড রিকভারি ইভেন্ট!');
      // পাসওয়ার্ড রিসেট ফর্ম দেখান
      break;

    case 'TOKEN_REFRESHED':
      console.log('🔄 টোকেন রিফ্রেশ হয়েছে!');
      // ব্যাকগ্রাউন্ডে হয়, সাধারণত UI আপডেটের দরকার নেই
      break;

    default:
      console.log('অজানা ইভেন্ট:', event);
  }
});

// ৩. লিসেনার বন্ধ করা (যদি দরকার হয়)
// authListener.subscription.unsubscribe();

// কেন ব্যবহার করবেন?
// -> ইউজার অন্য ট্যাবে লগইন/আউট করলেও UI আপডেট করতে, 
//    টোকেন রিফ্রেশের খবর পেতে।

// ============================================================
// ৮. পাসওয়ার্ড রিসেট (Forgot Password)
// ============================================================
// কাজ: ইউজারের ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো।
// প্রয়োজন: ইউজার পাসওয়ার্ড ভুলে গেলে।
// কোথায় ব্যবহার: 'Forgot Password' ফর্মে।
// সিনট্যাক্স: supabase.auth.resetPasswordForEmail(email, options)

// ৮.১. রিসেট ইমেইল পাঠানো
async function sendPasswordReset(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://yourapp.com/update-password' // কোথায় রিডাইরেক্ট করবে
  });

  if (error) {
    console.error('❌ রিসেট ইমেইল পাঠাতে সমস্যা:', error);
    // যেমন: 'User not found'
    return;
  }

  console.log('✅ পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে!');
  // ইউজারকে মেসেজ দেখান: 'আপনার ইমেইল চেক করুন'
}

// ৮.২. নতুন পাসওয়ার্ড সেট করা (রিসেট লিংকে ক্লিক করার পর)
// ইউজার রিডাইরেক্ট URL-এ এলে এই কোড রান করবে
async function updatePasswordAfterReset(newPassword) {
  // ১. নতুন পাসওয়ার্ড আপডেট
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    console.error('❌ পাসওয়ার্ড আপডেট করতে সমস্যা:', error);
    return;
  }

  console.log('✅ পাসওয়ার্ড সফলভাবে আপডেট হয়েছে!');
  // ইউজারকে লগইন পেজে পাঠান
  // window.location.href = '/login';
}

// ব্যবহার:
// sendPasswordReset('rafiq@email.com'); // ইমেইল পাঠান
// updatePasswordAfterReset('MyNewPass123'); // নতুন পাসওয়ার্ড সেট

// ============================================================
// ৯. ইউজার প্রোফাইল আপডেট করা (Update User)
// ============================================================
// কাজ: ইমেইল, পাসওয়ার্ড বা মেটাডেটা পরিবর্তন করা।
// প্রয়োজন: প্রোফাইল এডিট, পাসওয়ার্ড চেঞ্জ।
// কোথায় ব্যবহার: সেটিংস পেজ, প্রোফাইল ফর্ম।
// সিনট্যাক্স: supabase.auth.updateUser(attributes)

async function updateUserProfile(newEmail, newFullName) {
  // ১. আপডেট করার জন্য অবজেক্ট তৈরি
  const updates = {};

  if (newEmail) {
    updates.email = newEmail; // ইমেইল চেঞ্জ করলে নতুন ইমেইলে কনফার্মেশন যায়
  }

  if (newFullName) {
    updates.data = { full_name: newFullName }; // মেটাডেটা আপডেট
  }

  // ২. রিকোয়েস্ট পাঠানো
  const { data, error } = await supabase.auth.updateUser(updates);

  if (error) {
    console.error('❌ ইউজার আপডেট করতে সমস্যা:', error);
    return;
  }

  console.log('✅ ইউজার আপডেট হয়েছে!');
  console.log('নতুন তথ্য:', data.user);
}

// শুধু পাসওয়ার্ড চেঞ্জ করতে:
async function changePassword(oldPassword, newPassword) {
  // নোট: Supabase সরাসরি পুরনো পাসওয়ার্ড চেক করে না। 
  // তাই আগে লগইন ভেরিফাই করে নিন, তারপর আপডেট করুন।
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });

  if (error) {
    console.error('❌ পাসওয়ার্ড চেঞ্জ হয়নি:', error);
    return;
  }
  console.log('✅ পাসওয়ার্ড চেঞ্জ হয়েছে!');
}

// ============================================================
// ১০. OAuth (Google, GitHub, Facebook ইত্যাদি) লগইন
// ============================================================
// কাজ: তৃতীয় পক্ষের প্রোভাইডার (Google/GitHub) দিয়ে লগইন করানো।
// প্রয়োজন: সোশ্যাল লগইন, দ্রুত সাইনআপ/লগইন।
// কোথায় ব্যবহার: 'Google দিয়ে লগইন করুন' বাটনে।
// সিনট্যাক্স: supabase.auth.signInWithOAuth({ provider, options })

async function signInWithGoogle() {
  // ১. OAuth রিকোয়েস্ট
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google', // 'github', 'facebook', 'twitter', ইত্যাদি
    options: {
      redirectTo: 'https://yourapp.com/auth-callback', // ফিরে আসার URL
      queryParams: {
        access_type: 'offline', // গুগলের জন্য (রিফ্রেশ টোকেন পেতে)
        prompt: 'consent'
      }
    }
  });

  if (error) {
    console.error('❌ Google লগইন ব্যর্থ:', error);
    return;
  }

  // ২. ইউজারকে Google-এর লগইন পেজে পাঠানো
  if (data.url) {
    window.location.href = data.url; // অটোমেটিক রিডাইরেক্ট
  }
}

// ১০.১. OAuth কলব্যাক হ্যান্ডেল করা (auth-callback পেজে)
async function handleOAuthCallback() {
  // ইউজার Google থেকে ফিরে এলে সেশন চেক করুন
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error('❌ OAuth কলব্যাক সমস্যা:', error);
    return;
  }

  if (data.session) {
    console.log('✅ OAuth লগইন সফল!', data.session.user);
    // ইউজারকে ড্যাশবোর্ডে পাঠান
    // window.location.href = '/dashboard';
  }
}

// ব্যবহার:
// signInWithGoogle();

// ============================================================
// ১১. ম্যাজিক লিংক (Passwordless Login)
// ============================================================
// কাজ: পাসওয়ার্ড ছাড়াই ইমেইলে লিংক পাঠিয়ে লগইন করানো।
// প্রয়োজন: ইউজার পাসওয়ার্ড মনে রাখতে চায় না।
// কোথায় ব্যবহার: 'Magic Link' বা 'লিংকে ক্লিক করে লগইন করুন' ফিচার।
// সিনট্যাক্স: supabase.auth.signInWithOtp({ email, options })

async function sendMagicLink(email) {
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email,
    options: {
      emailRedirectTo: 'https://yourapp.com/auth-callback'
    }
  });

  if (error) {
    console.error('❌ ম্যাজিক লিংক পাঠাতে সমস্যা:', error);
    return;
  }

  console.log('✅ ম্যাজিক লিংক আপনার ইমেইলে পাঠানো হয়েছে!');
  // ইউজারকে মেসেজ দেখান: 'ইমেইল চেক করুন'
}

// ব্যবহার:
// sendMagicLink('rafiq@email.com');

// ============================================================
// ১২. ফোন নম্বর অথেন্টিকেশন (SMS OTP)
// ============================================================
// কাজ: ফোন নম্বর দিয়ে OTP (One-Time Password) পাঠানো ও ভেরিফাই করা।
// প্রয়োজন: ফোন নম্বর ভিত্তিক লগইন/সাইনআপ।
// কোথায় ব্যবহার: মোবাইল অ্যাপ বা ফোন ভেরিফিকেশন দরকার এমন জায়গায়।
// সিনট্যাক্স: supabase.auth.signInWithOtp({ phone }) এবং supabase.auth.verifyOtp({...})

// ১২.১. সাইনআপ (ফোন + পাসওয়ার্ড)
async function signUpWithPhone(phone, password) {
  const { data, error } = await supabase.auth.signUp({
    phone: phone,
    password: password
  });

  if (error) {
    console.error('❌ ফোন সাইনআপ ব্যর্থ:', error);
    return;
  }
  console.log('✅ ফোন সাইনআপ সফল!');
}

// ১২.২. OTP পাঠানো (লগইনের জন্য)
async function sendOTP(phone) {
  const { error } = await supabase.auth.signInWithOtp({
    phone: phone
  });

  if (error) {
    console.error('❌ OTP পাঠাতে সমস্যা:', error);
    return;
  }
  console.log('✅ OTP আপনার ফোনে পাঠানো হয়েছে!');
}

// ১২.৩. OTP ভেরিফাই করা
async function verifyOTP(phone, token) {
  const { data, error } = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: 'sms' // 'sms' অথবা 'phone_change'
  });

  if (error) {
    console.error('❌ OTP ভেরিফাই করতে সমস্যা:', error);
    return;
  }

  console.log('✅ OTP ভেরিফাই সফল!');
  console.log('সেশন:', data.session);
  // ইউজার লগইন হয়ে গেল
}

// ব্যবহার:
// signUpWithPhone('+8801711111111', 'pass123');
// sendOTP('+8801711111111');
// verifyOTP('+8801711111111', '123456');

// ============================================================
// ১৩. অ্যানোনিমাস লগইন (Anonymous Sign-In)
// ============================================================
// কাজ: কোনো অ্যাকাউন্ট ছাড়াই অ্যাপ ব্যবহার করতে দেওয়া।
// প্রয়োজন: ইউজারকে রেজিস্ট্রেশন ছাড়াই অ্যাপের ফিচার দেখানো।
// কোথায় ব্যবহার: ট্রায়াল মোড, ডেমো অ্যাকাউন্ট, ই-কমার্স কার্ট।
// সিনট্যাক্স: supabase.auth.signInAnonymously()

async function signInAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();

  if (error) {
    console.error('❌ অ্যানোনিমাস লগইন ব্যর্থ:', error);
    return;
  }

  console.log('✅ অ্যানোনিমাস লগইন সফল!');
  console.log('অ্যানোনিমাস ইউজার আইডি:', data.user.id);
  // এই আইডি দিয়ে ডেটাবেজে ডেটা সংরক্ষণ করুন
  // পরে এই অ্যানোনিমাস ইউজারকে পার্মানেন্ট ইউজারে কনভার্ট করা যায়
}

// ব্যবহার:
// signInAnonymously();

// ============================================================
// ১৪. রিফ্রেশ টোকেন ম্যানেজমেন্ট (স্বয়ংক্রিয়)
// ============================================================
// Supabase অটোমেটিকভাবে টোকেন রিফ্রেশ করে দেয়।
// আপনি চাইলে onAuthStateChange ইভেন্টে 'TOKEN_REFRESHED' শুনতে পারেন।

// ম্যানুয়ালি টোকেন রিফ্রেশ করতে (প্রয়োজন খুব কমই পড়ে):
async function refreshSession() {
  const { data, error } = await supabase.auth.refreshSession();
  if (error) console.error('রিফ্রেশ ব্যর্থ:', error);
  else console.log('টোকেন রিফ্রেশ হয়েছে');
}

// ============================================================
// 📌 নিরাপত্তা ও গুরুত্বপূর্ণ টিপস (Security Tips)
// ============================================================
// 1. 📛 কখনো Secret (service_role) Key ফ্রন্টএন্ডে ব্যবহার করবেন না।
//    -> শুধু Publishable (anon) Key ব্যবহার করুন।
// 
// 2. 🔒 RLS (Row Level Security) চালু রাখুন।
//    -> ডেটাবেজে প্রতিটি টেবিলের জন্য RLS চালু করুন, যাতে ইউজার শুধু নিজের ডেটাই দেখে।
// 
// 3. 🔗 Redirect URLs কনফিগার করুন।
//    -> Dashboard → Authentication → URL Configuration
//    -> সব প্রোভাইডারের redirectTo URL এখানে যোগ করতে হবে।
// 
// 4. 📧 ইমেইল কনফার্মেশন প্রোডাকশনে চালু রাখুন।
//    -> টেস্টিংয়ে বন্ধ রাখতে পারেন, কিন্তু লাইভে চালু রাখা ভালো।
// 
// 5. 🔑 SMTP সেটআপ করুন (প্রোডাকশনের জন্য)।
//    -> ডিফল্ট ইমেইল রেট লিমিট ২/ঘন্টা। নিজের SMTP দিন।
//
// 6. 🔐 পাসওয়ার্ড শক্তিশালী রাখুন।
//    -> ড্যাশবোর্ডে Password Policy সেট করতে পারেন।

// ============================================================
// 🎯 দ্রুত রেফারেন্স (Cheat Sheet)
// ============================================================
// 
// | কাজ                                     | মেথড
// | :-------------------------------------- | :-------------------------------------------
// | ক্লায়েন্ট তৈরি                          | supabaseJs.createClient(URL, KEY)
// | সাইনআপ (ইমেইল/পাস)                     | supabase.auth.signUp({ email, password })
// | লগইন (ইমেইল/পাস)                       | supabase.auth.signInWithPassword({ email, password })
// | লগআউট                                   | supabase.auth.signOut()
// | সেশন চেক (লোকাল)                        | supabase.auth.getSession()
// | ইউজার তথ্য (সার্ভার)                    | supabase.auth.getUser()
// | অথ স্টেট লিসেনার                        | supabase.auth.onAuthStateChange(callback)
// | পাসওয়ার্ড রিসেট ইমেইল                 | supabase.auth.resetPasswordForEmail(email)
// | ইউজার আপডেট (পাস/ইমেইল/মেটা)          | supabase.auth.updateUser({...})
// | OAuth লগইন (Google/GitHub)             | supabase.auth.signInWithOAuth({ provider })
// | ম্যাজিক লিংক                            | supabase.auth.signInWithOtp({ email })
// | অ্যানোনিমাস লগইন                       | supabase.auth.signInAnonymously()
// | ফোন OTP পাঠানো                          | supabase.auth.signInWithOtp({ phone })
// | ফোন OTP ভেরিফাই                         | supabase.auth.verifyOtp({ phone, token, type })

// ============================================================
// 💡 সম্পূর্ণ উদাহরণ (Login Page এর জন্য একটি ফাংশনালিটি)
// ============================================================

async function handleLoginForm(email, password) {
  // ১. লগইন চেষ্টা
  const { data, error } = await supabase.auth.signInWithPassword({
    email, password
  });

  // ২. এরর হ্যান্ডেল
  if (error) {
    if (error.message.includes('Email not confirmed')) {
      alert('আপনার ইমেইল কনফার্ম করা হয়নি। ইমেইল চেক করুন।');
    } else {
      alert('লগইন ব্যর্থ: ' + e
