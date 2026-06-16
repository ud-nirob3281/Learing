// ============================================================
// 📚 Supabase JavaScript মেথড ইনভেন্টরি (স্ক্রিপ্ট আকারে)
// সব মেথডের কাজ ও ব্যবহার উদাহরণসহ
// ============================================================

// ---------- ১. .from() - টেবিল নির্বাচন ----------
// কাজ: কোন টেবিল থেকে ডেটা নেবেন বা কোন টেবিলে ডেটা দেবেন, তা নির্ধারণ করে
// ব্যবহার: সব কোয়েরির শুরুতেই
const { data } = await supabase.from('users'); // 'users' টেবিল নির্বাচন
const { data } = await supabase.from('posts'); // 'posts' টেবিল নির্বাচন

// ---------- ২. .select() - কোন কলাম নেবেন ----------
// কাজ: ডেটাবেজ থেকে কোন কলামগুলো নিতে চান, তা নির্ধারণ করে
// ব্যবহার: ডেটা পড়ার সময় (GET)
const { data } = await supabase.from('users').select('*'); // সব কলাম
const { data } = await supabase.from('users').select('id, name, email'); // নির্দিষ্ট কলাম
// সম্পর্কিত টেবিলের ডেটাও একসাথে আনা (JOIN)
const { data } = await supabase.from('posts').select('id, title, users(name, email)');

// ---------- ৩. .eq() - সমান (WHERE) ----------
// কাজ: নির্দিষ্ট কলামের মান নির্দিষ্ট মানের সমান—এমন রেকর্ড ফিল্টার করে
// ব্যবহার: সবচেয়ে বেশি ব্যবহৃত ফিল্টার
const { data } = await supabase.from('posts').select('*').eq('status', 'published');
const { data } = await supabase.from('posts').select('*').eq('user_id', currentUserId);

// ---------- ৪. .order() - সাজানো (ORDER BY) ----------
// কাজ: ফলাফল কোন ক্রমে আসবে তা নির্ধারণ করে
// ব্যবহার: লিস্ট দেখানোর সময় (নতুন পোস্ট আগে, নামের ক্রমে ইত্যাদি)
const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false }); // নতুন থেকে পুরোনো
const { data } = await supabase.from('users').select('*').order('name', { ascending: true }); // নামের Alphabetical order
// একাধিক কলামে সাজানো
const { data } = await supabase.from('users').select('*').order('last_name', { ascending: true }).order('first_name', { ascending: false });

// ---------- ৫. .single() - একটি মাত্র রেকর্ড ----------
// কাজ: কোয়েরির ফলাফল একটিই রেকর্ড হবে—তা নিশ্চিত করে
// ব্যবহার: প্রোফাইল দেখা, কোনো নির্দিষ্ট আইটেমের ডিটেইল দেখানো
const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

// ---------- ৬. .limit() - কতগুলো রেকর্ড ----------
// কাজ: সর্বোচ্চ কতগুলো রেকর্ড নেবেন, তা নির্ধারণ করে
// ব্যবহার: পেজিনেশন বা "সবচেয়ে নতুন ৫টি" দেখানোর সময়
const { data } = await supabase.from('posts').select('*').limit(10);

// ---------- ৭. .neq() - সমান নয় (NOT EQUAL) ----------
// কাজ: নির্দিষ্ট মানের সমান নয়—এমন রেকর্ড ফিল্টার করে
// ব্যবহার: বাদ দিতে চাইলে
const { data } = await supabase.from('posts').select('*').neq('status', 'deleted');

// ---------- ৮. .gt() - বড় (Greater Than) ----------
// কাজ: নির্দিষ্ট মানের থেকে বড়—এমন রেকর্ড ফিল্টার করে
// ব্যবহার: সংখ্যা বা তারিখের তুলনায়
const { data } = await supabase.from('users').select('*').gt('age', 18);

// ---------- ৯. .gte() - বড় বা সমান (Greater Than or Equal) ----------
// কাজ: নির্দিষ্ট মানের থেকে বড় বা সমান—এমন রেকর্ড ফিল্টার করে
const { data } = await supabase.from('products').select('*').gte('price', 100);

// ---------- ১০. .lt() - ছোট (Less Than) ----------
// কাজ: নির্দিষ্ট মানের থেকে ছোট—এমন রেকর্ড ফিল্টার করে
const { data } = await supabase.from('products').select('*').lt('stock', 10);

// ---------- ১১. .lte() - ছোট বা সমান (Less Than or Equal) ----------
// কাজ: নির্দিষ্ট মানের থেকে ছোট বা সমান—এমন রেকর্ড ফিল্টার করে
const { data } = await supabase.from('products').select('*').lte('discount', 50);

// ---------- ১২. .like() - প্যাটার্ন মিলানো (কেস সংবেদী) ----------
// কাজ: টেক্সট প্যাটার্ন মিলিয়ে খোঁজে (বড়/ছোট হরফের পার্থক্য বুঝে)
// ব্যবহার: খোঁজ/সার্চ ফাংশনে
const { data } = await supabase.from('users').select('*').like('name', 'R%'); // 'R' দিয়ে শুরু
const { data } = await supabase.from('users').select('*').like('name', '%an%'); // 'an' যেকোনো জায়গায়

// ---------- ১৩. .ilike() - প্যাটার্ন মিলানো (কেস অসংবেদী) ----------
// কাজ: টেক্সট প্যাটার্ন মিলিয়ে খোঁজে (বড়/ছোট হরফের পার্থক্য বুঝে না)
// ব্যবহার: কেস নিয়ে চিন্তা না করে খোঁজার জন্য
const { data } = await supabase.from('users').select('*').ilike('name', 'rahim'); // RAHIM/rahim সব মিলবে

// ---------- ১৪. .is() - NULL চেক ----------
// কাজ: NULL বা NOT NULL চেক করে
const { data } = await supabase.from('users').select('*').is('deleted_at', null); // যাদের deleted_at NULL
const { data } = await supabase.from('users').select('*').is('deleted_at', 'not.null'); // যাদের deleted_at NULL নয়

// ---------- ১৫. .in() - একাধিক মানের মধ্যে ----------
// কাজ: নির্দিষ্ট একাধিক মানের যেকোনো একটি থাকলে দেখায়
const { data } = await supabase.from('posts').select('*').in('status', ['active', 'pending']);

// ---------- ১৬. .not() - উল্টো শর্ত ----------
// কাজ: প্রদত্ত শর্তের উল্টোটা ফিল্টার করে
const { data } = await supabase.from('posts').select('*').not('status', 'eq', 'deleted');

// ---------- ১৭. .or() - OR শর্ত ----------
// কাজ: একাধিক শর্তের যেকোনো একটি মিললেই দেখায়
const { data } = await supabase.from('posts').select('*').or('status.eq.published,status.eq.featured');

// ---------- ১৮. .range() - নির্দিষ্ট রেঞ্জের রেকর্ড ----------
// কাজ: নির্দিষ্ট সংখ্যা থেকে নির্দিষ্ট সংখ্যা পর্যন্ত রেকর্ড আনে (পেজিনেশনের জন্য)
// ব্যবহার: ০-৯ মানে প্রথম ১০টি
const { data } = await supabase.from('posts').select('*').order('id').range(0, 9); // প্রথম ১০টি
const { data } = await supabase.from('posts').select('*').order('id').range(10, 19); // ১১-২০তম

// ---------- ১৯. .textSearch() - টেক্সট সার্চ ----------
// কাজ: টেক্সট ফিল্ডে ফুল-টেক্সট সার্চ করে
const { data } = await supabase.from('posts').select('*').textSearch('content', 'javascript programming');

// ---------- ২০. .match() - একাধিক শর্ত একসাথে ----------
// কাজ: একাধিক শর্ত সবগুলো মিললেই দেখায় (AND)
const { data } = await supabase.from('users').select('*').match({ status: 'active', role: 'admin' });

// ---------- ২১. .filter() - কাস্টম ফিল্টার ----------
// কাজ: যেকোনো কাস্টম ফিল্টার প্রয়োগ করতে
const { data } = await supabase.from('users').select('*').filter('age', 'gte', 18);

// ---------- ২২. .contains() - অ্যারের মধ্যে আছে কিনা ----------
// কাজ: অ্যারে কলামে নির্দিষ্ট মান আছে কিনা চেক করে
const { data } = await supabase.from('posts').select('*').contains('tags', ['javascript']);

// ---------- ২৩. .containedBy() - অ্যারের মধ্যে আছে কিনা ----------
// কাজ: অ্যারে কলামের সব মান নির্দিষ্ট অ্যারের মধ্যে আছে কিনা
const { data } = await supabase.from('posts').select('*').containedBy('tags', ['javascript', 'react', 'node']);

// ---------- ২৪. .overlaps() - অ্যারে ওভারল্যাপ ----------
// কাজ: অ্যারে কলামের সাথে প্রদত্ত অ্যারের কোনো সাধারণ মান আছে কিনা
const { data } = await supabase.from('posts').select('*').overlaps('tags', ['javascript', 'python']);

// ============================================================
// 📝 CRUD অপারেশনসমূহ
// ============================================================

// ---------- INSERT (যোগ করা) ----------
// কাজ: টেবিলে নতুন ডেটা যোগ করা
const { data, error } = await supabase.from('users').insert([{ name: 'Rafiq', email: 'rafiq@email.com' }]);

// ---------- UPDATE (আপডেট করা) ----------
// কাজ: টেবিলের ডেটা পরিবর্তন করা
// সাবধান: শর্ত (WHERE) না দিলে সব রেকর্ড আপডেট হয়ে যাবে!
const { data, error } = await supabase.from('users').update({ name: 'Rafiq Ahmed' }).eq('id', 1);

// ---------- DELETE (মুছে ফেলা) ----------
// কাজ: টেবিল থেকে ডেটা মুছে ফেলা
// সাবধান: শর্ত (WHERE) না দিলে সব রেকর্ড মুছে যাবে!
const { data, error } = await supabase.from('users').delete().eq('id', 1);

// ---------- UPSERT (যোগ বা আপডেট) ----------
// কাজ: থাকলে আপডেট, না থাকলে যোগ করা
const { data, error } = await supabase.from('users').upsert([{ id: 1, name: 'Rafiq', email: 'new@email.com' }]);

// ============================================================
// 🔐 অথেন্টিকেশন মেথডসমূহ
// ============================================================

// ---------- সাইনআপ (নতুন ইউজার) ----------
const { data, error } = await supabase.auth.signUp({ email: 'user@email.com', password: 'password123' });

// ---------- লগইন ----------
const { data, error } = await supabase.auth.signInWithPassword({ email: 'user@email.com', password: 'password123' });

// ---------- লগআউট ----------
const { error } = await supabase.auth.signOut();

// ---------- বর্তমান ইউজার ----------
const { data: userData } = await supabase.auth.getUser();

// ---------- সেশন চেক ----------
const { data } = await supabase.auth.getSession();

// ============================================================
// 💡 পূর্ণ উদাহরণ (সবকিছু একসাথে)
// ============================================================

const { data, error } = await supabase
  .from('posts')                      // ১. 'posts' টেবিল থেকে
  .select('id, title, created_at, users(name)') // ২. শুধু এই কলামগুলো + ইউজারের নাম
  .eq('status', 'published')          // ৩. যাদের status = 'published'
  .gte('view_count', 100)             // ৪. এবং view_count >= 100
  .order('created_at', { ascending: false }) // ৫. নতুনটা আগে
  .limit(10);                         // ৬. সর্বোচ্চ ১০টি

// ============================================================
// ⚠️ গুরুত্বপূর্ণ টিপস
// ============================================================
// 1. সব মেথড চেইন আকারে কাজ করে
// 2. .single() ও .limit() সাধারণত শেষে বসে
// 3. UPDATE ও DELETE-এ শর্ত (WHERE) দেওয়া বাধ্যতামূলক
// 4. সব async ফাংশনের ভেতর await ব্যবহার করতে হবে
// 5. error চেক করা সবসময় ভালো অভ্যাস
