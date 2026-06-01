//! Task
//1
{
  const studentMap = new Map([
    [1, 'Nirob'],
    [2, 'Safa'],
    [3, 'Fatema'],
    [4, 'Raj'],
    [5, 'Shuvo'],
  ]);
  // console.log(studentMap.get(2));
  studentMap.delete(4);
  // console.log(studentMap);

  //2
  const langSet = new Set(['Python', 'PHP', 'Rust', 'JavaScript', 'C', 'PHP']);
  //console.log(langSet);
  // langSet.values().forEach(val => console.log(val));
  //4
  const conTactMap = new Map([
    [0134, 'Nirob'],
    [5414, 'Safa'],
    [4554, 'Raj'],
  ]);
  conTactMap.set(4544, 'Shuvo');
  conTactMap.set(0134, 'Akash');
  conTactMap.delete(4554);
  conTactMap.get(5414);
  //5
  const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
  const reDu = new Set(fruits);
  //console.log(reDu);
  //6
  const loginUser = new Set();
  const newUserId1 = 1;
  const newUserId2 = 2;
  const newUserId3 = 3;
  const newUserId4 = 4;
  const newUserId5 = 5;
  //Login user
  loginUser.add(newUserId1);
  loginUser.add(newUserId2);
  loginUser.add(newUserId3);
  loginUser.add(newUserId4);
  loginUser.add(newUserId5);
  //Log out user
  loginUser.delete(newUserId3);
  loginUser.delete(newUserId1);
  //Specifiq Currently Login User
  //console.log(loginUser.has(newUserId3));
  //console.log(loginUser.has(newUserId5));

  //7
  const book = new Map([
    ['Success', 'Nirob'],
    ['Be Creative', 'Safa'],
    ['First Night', 'Safayet'],
    ['Marrige', 'Shuvo'],
    ['Kill Your Addiction', 'Nirob'],
  ]);
  book.set('First Night', 'Raj');
  //console.log(book.size);
  //10
