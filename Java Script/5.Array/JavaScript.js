//! Create Arrays
//Way-1
const language = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', true, 'Rust'];

//Way-2
const language2 = new Array(
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
  'Python',
  true,
  'Rust'
);
//console.log(language);
//console.log(language2);
//console.log(language === language2);

//* Empty Array Make
const emteyArray = new Array(5);
//console.log(emteyArray);

//* Array Access
//console.log(language); //? Full Arrays Output
//console.log(language[2]); //? Single Element Output

//* Value Change/Update
//console.log(language[6]); //? Old
language[6] = 'C'; //? Update
//console.log(language[6]); //? New

//! Array Method
//* Chek Array
/* console.log(Array.isArray([0, 'apple', true]));
console.log(Array.isArray('apple'));
console.log(Array.isArray({ name: 'UD', age: 5 }));
console.log(Array.isArray([])); */

//* Full Array Value Show in String
//console.log(language.toString());
//console.log(language.join(' $')); //? ,(Comma)Alternative Use

//* Use of length Property
//console.log(language.length); //?How many Element are there in the Array
//console.log(language[language.length - 1]); //? Last Item Access

//* Add / Remove
language.push('red'); //? Add Last Item
language.pop(); //? Remove Last Item
language.unshift('C'); //? Add First Item
language.shift(); //? Remove First Item*/
//console.log(language);

//!Array Destructuring
const salad = ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕', '🥑'];

//*Normal Wat
const tomato1 = salad[0];
const mushroom1 = salad[1];
const carrot1 = salad[5];
///console.log(tomato1, mushroom1, carrot1);

//*Destructured Way
const [tomato, mushroom, carrot] = [
  salad[0],
  salad[1],
  salad[5],
]; /*['🍅', '🍄', '🥕'];*/
//console.log(tomato, mushroom, carrot);

//*Deafault Value
const [copi, sosa = '🥒'] = ['🥦'];
//console.log(copi, sosa);

//* Skip one Value
const [tomato2, , carrot2] = ['🍅', '🍄', '🥕']; //skip mushrom
//console.log(tomato2, carrot2);

//*Swiping Varroiable
let first = '😒';
let second = '😊';

[first, second] = [second, first];
//console.log(first);
//console.log(second);

//* Merge Varriable
let emotion = ['😊', '😒'];
let veg = ['🍅', '🍄', '🥦', '🥒', '🌽'];

const merge = [...emotion, ...veg];
//console.log(merge);

//! Rest and Spread
//*Rest
const [tomato3, mushroom3, carrot3, ...res] = [
  '🍅',
  '🍄',
  '🥦',
  '🥒',
  '🌽',
  '🥕',
  '🥑',
];
//console.log(res);

//*Spread
const newSa = ['🍅', '🍄', '🥦', '🥒', '🌽', '🥕', '🥑'];
const copy = [newSa];
//console.log(newSa === copy);
const copy1 = { ...newSa };
//console.log(copy1);

//! Combind Array
const x = [1, 2, 3, 4];
const y = [1, 3, 5, 7];
const z = [2, 4, 6, 8];

const p = x.concat(y, z);
//console.log(p);

//! Fill()
//Muteable way
//*এটা দিয়ে আমরা একটা array এর সব এলিমেন্টকে নির্দিষ্ট ভ্যালু দিয়ে পূরণ করতে পারি।

let array = ['🥦', '🥒', '🌽', '🥕', '🥑'];
//array.fill(0); //? array.fill(value) → সব এলিমেন্টকে একই value দিয়ে পূরণ করবে
//console.log(array); //? Output: [0, 0, 0, 0, 0]

array.fill('🌽', 1, 4); //?array.fill(value, start, end)
//console.log(array);

//console.log(Array(5).fill('A').join('-')); //? Fill and Join use

//Immuteable way
const arra = [1, 2, 3, 4, 5, 6];
const newArra = [...arra].fill(0);
//console.log(newArra);
//console.log(arra);

//! Includes()
const developer = ['FULL', 'MERN', 'MEAN', 'LARAVEL', 'MERN'];
//console.log(developer.includes('MERN'));
//console.log(developer.includes('njkh'));

//! IndexOf()/LastIndexOf()
/* console.log(developer.indexOf('MERN')); //1
console.log(developer.indexOf('dfg')); //-1
console.log(developer.indexOf('gerh')); //-1

console.log(developer.lastIndexOf('MERN')); //4
console.log(developer.lastIndexOf('dfg')); //-1
console.log(developer.lastIndexOf('gerh')); //-1 */

//! Reverse()
//Muteable
/* let rev = developer.reverse();
console.log(rev);
console.log(developer); */

//! toReverse()
//Immuteable
const toRev = developer.toReversed();
/* console.log(toRev);
console.log(developer); */

//! Sort()
//Muteable
// The default sort() method converts the element types into strings
//  The default sorting order is ascending.
const alphabet1 = ['z', 'c', 'l', 'a', 'x', 'a', 's'];
const sort = alphabet1.sort(); //? Assending Order
//console.log(sort);
//console.log(alphabet);

const artists = [
  'John White Abbott',
  'Leonardo da Vinci',
  'Charles Aubry',
  'Anna Atkins',
  'Barent Avercamp',
];
//console.log(artists.sort());

//*Custom Sorting
alphabet1.sort(function (a, b) {
  //Way-1
  return a === b ? 0 : a > b ? -1 : 1; //? 0 Mean No Change , -1 Mean Desending Order , 1 Mean Element UP -> Down
  //Way-2
  artists.sort(function (a, b) {
    if (a === b) {
      return 0; // No change if both are equal
    } else if (a > b) {
      return -1; // a comes after b (descending order)
    } else {
      return 1; // b comes after a (ascending order)
    }
  });
});
//console.log(alphabet);

//!toSorted
//Immuteable
const alphabet = ['z', 'c', 'l', 'a', 'x', 'a', 's'];
const toSort = alphabet.toSorted();
const sort1 = alphabet.toSorted(() => 0.5);
const sort2 = alphabet.toSorted(() => -0.5);
const sort3 = alphabet.toSorted(() => 0);
/* console.log(toSort);
console.log(sort1);
console.log(sort2);
console.log(sort3); */
//console.log(alphabet);

//! Splice()
//Muteable
//splice(start, deleteCount, item1, item2, item3...);
let languages = ['HTML', 'CSS', 'JavaScript', 'Java', 'Python', true, 'Rust'];
//languages.splice(0, 1);
//languages.splice(3, 2, 'React');
//languages.splice(2, 0, 'React');
//console.log(languages);

//!toSliced()
//Immuteable
const toSli = languages.toSpliced(1, 1, 'React.JS');
//console.log(toSli);
//console.log(languages);

//! Slice()
const copyArr = languages.slice(); // Array কে Copy করতে চাইলে
//console.log(copyArr);
//console.log(languages === copyArr);
//console.log(languages.slice(2, 5)); //Array কে ছোট করতে চাইলে

//! Grouping
const employees = [
  { name: 'Bob', dept: 'Engineering', salary: 5000 },
  { name: 'Alex', dept: 'HR', salary: 1000 },
  { name: 'Ravi', dept: 'Engineering', salary: 7000 },
  { name: 'John', dept: 'Engineering', salary: 1000 },
  { name: 'Tom', dept: 'Sales', salary: 6000 },
];
const groupData = Object.groupBy(employees, ({ dept }) => dept);
//console.log(groupData);

const groupBymore5000usd = Object.groupBy(employees, ({ salary }) => {
  return salary >= 5000 ? 'More than 5K' : 'Less than 5K';
});
console.log(groupBymore5000usd);

//!With()
//with(index,value)
const number = [1, 2, 3, 4, 5, 6, 7];
// TODO /if i need update value 4 to 6 so
//number[3] = 6;
//console.log(number);
//TODO /But problem is a This Array is muted. But I need Update value but Immuteable way so
const newArray = number.with(3, 6);
//console.log(newArray);
//console.log(number);

//! at()
const junkFoodILove = ['🥖', '🍔', '🍟', '🍕', '🌭', '🥪', '🌮', '🍿'];

junkFoodILove.at(0); // '🥖'
junkFoodILove.at(3); // '🍕'
junkFoodILove.at(-1); // '🍿'
junkFoodILove.at(-5); // '🍕'
junkFoodILove.at(-8); // '🥖'
junkFoodILove.at(10); // undefined

//! Flat()
const arr1 = [0, 1, 2, [3, 4]];
//console.log(arr1.flat());

const arr2 = [0, 1, [2, [3, [4, 5]]]];
/* console.log(arr2.flat(2));
console.log(arr2.flat(3));
console.log(arr2.flat(Infinity)); */

//! CopyWithin()
const array0 = [1, 2, 3, 4, 5, 6, 7];
array0.copyWithin(0, 3, 6);
//console.log(array0);

const array1 = [1, 2, 3, 4, 5, 6, 7];
array1.copyWithin(0, 4);
//console.log(array1);

//! Split()
let names = 'UD NIROB';
let arr = names.split('');
//console.log(arr);

//! All Static Methood
//*Array like
const arrlike = { 0: 'UD', 1: 'UG', 2: 'UDN', length: 3 };
//console.log(arrlike);
//console.log(arrlike[1]);

//?Array like Conveert original array
const originalArray = Array.from(arrlike);
//console.log(originalArray);

//* fromAsync()
const originalPromise = Array.fromAsync(arrlike);
//console.log(originalPromise);

//originalPromise.then(value => console.log(value));

//* Of()
const newArr = Array.of(2, true, 'nirob', { age: 17 }, [1, 2, 3]);
//console.log(newArr);

//! Array itarator Methood
//* Filter()
const syntaxFilter = array.filter((element, index, array) => {
  // Some Code
});

let customers = [
  {
    id: 1,
    f_name: 'Abby',
    l_name: 'Thomas',
    gender: 'M',
    married: true,
    age: 32,
    expense: 500,
    purchased: ['Shampoo', 'Toys', 'Book'],
  },
  {
    id: 2,
    f_name: 'Jerry',
    l_name: 'Tom',
    gender: 'M',
    married: true,
    age: 64,
    expense: 100,
    purchased: ['Stick', 'Blade'],
  },
  {
    id: 3,
    f_name: 'Dianna',
    l_name: 'Cherry',
    gender: 'F',
    married: true,
    age: 22,
    expense: 1500,
    purchased: ['Lipstik', 'Nail Polish', 'Bag', 'Book'],
  },
  {
    id: 4,
    f_name: 'Dev',
    l_name: 'Currian',
    gender: 'M',
    married: true,
    age: 8,
    expense: 90,
    purchased: ['Book'],
  },
  {
    id: 5,
    f_name: 'Maria',
    l_name: 'Gomes',
    gender: 'F',
    married: false,
    age: 7,
    expense: 300,
    purchased: ['Toys'],
  },
];
//? filter() - Get 'Senior Citizens' by Filtering out other customers

const seniorCus = customers.filter(customer => {
  return customer.age >= 60;
});
//console.log(seniorCus);

//* Map()
// map() - Transform to add title and full name

const afterArray = customers.map(customer => {
  let title = '';
  if (customer.gender === 'M') {
    title = 'Mr.';
  } else if (customer.gender === 'F' && customer.married) {
    title = 'Mst.';
  } else {
    title = 'Miss.';
  }
  customer.fullName = `${title} ${customer.f_name} ${customer.l_name}`;
  return customer;
});
//console.log(afterArray);

//* Reduce
// A reducer function which is also called as callback function to be called on each element of the array.
//Syntax
/* const ret = arr.reduce((accumulator, currentValue, index, array)=> {
    // do something with accumulator and currentvalue
    // You get a result
    // You return that result
}) */
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const myTotal = numbers.reduce((acc, curr) => {
  // console.log(curr);
  //console.log(`Accmulator ${acc} and Current Value ${curr}`);
  acc = acc + curr;
  return acc;
}, 0);
//console.log(myTotal);

// reduce() - The average age of the Customers who have purchased the Item, 'Book'.
let count = 0;
const total = customers.reduce((acc, customer) => {
  if (customer.purchased.includes('Book')) {
    totalAge = acc + customer.age;
    count = count + 1;
  }
  return totalAge;
}, 0);
const average = total / count;
//console.log(average);

//* RedudceRight()
//Left -> Right
const num = numbers.reduceRight((acc, num) => {
  return acc - num;
});
//Right -> Left
const num1 = numbers.reduce((acc, num) => {
  return acc - num;
});
//console.log(num);
//console.log(num1);

//*some()
// some() - Do we have a Young Customer(age less than 10 years)?

const hasYoungCustomer = customers.some(customer => {
  return customer.age < 10;
});

//console.log('Has Young Customer(Age < 10):', hasYoungCustomer);

//* every
// every() - Every Customer is Married?

const isAllMarried = customers.every(customer => {
  return customer.married;
});

//console.log('All Customer Married?:', isAllMarried);

//*Find
const youngCustomer = customers.find(customer => {
  return customer.age < 10;
});
//console.log(youngCustomer);

//*FindLast
const youngCustomer0 = customers.findLast(customer => {
  return customer.age < 10;
});
//console.log(youngCustomer0);

//* FindIndex
const youngCustomer1 = customers.findIndex(customer => {
  return customer.age < 10;
});
//console.log(youngCustomer1);

//! Array Methood Chaining
// Use Case: Get the total amount spent by Married Customers

// reduce()
// map()
// filter()

// Find all the married customers
//? Way-1
/* const marridCustomar = customers.filter(marrid => {
  return marrid.married;
});
console.log(marridCustomar);

const totalExpance = marridCustomar.reduce((acc, total) => {
  tot = total.expense;
  return acc + tot;
}, 0);
console.log(totalExpance); */
//? Way-2
/* const marridCustomar = customers.filter(marrid => {
  return marrid.married;
});
console.log(marridCustomar);

const expence = marridCustomar.map(ex => {
  return ex.expense;
});
console.log(expence);

const totalExpance = expence.reduce((acc, total) => {
  return acc + total;
}, 0);
console.log(totalExpance); */
//? Chaining
const totals = customers
  .filter(marrid => {
    return marrid.married;
  })
  .map(ex => {
    return ex.expense;
  })
  .reduce((acc, total) => {
    return acc + total;
  }, 0);
//console.log(totals);

//*fromEntries()
const numArr = [
  ['a', 1],
  ['b', 2],
  ['c', 3],
];
//Array - Obj
//console.log(Object.fromEntries(numArr));

// entries()
const arrItr = arr.entries();
/*console.log("Array Iterator", arrItr.next().value) // [0, 1]
console.log("Array Iterator", arrItr.next().value) // [1, 2]*/

for (const [index, element] of arrItr) {
  //console.log(index, element);
}

// values()

const arrItr2 = arr.values();

for (const value of arrItr2) {
  //console.log(value);
}

// flatMap()

const arr3 = [1, 2, 3, 4];

/* console.log(
  'simple map',
  arr3.map(item => item * 2)
);
console.log(
  'simple flatmap',
  arr3.flatMap(item => item * 2)
);

console.log(
  'complex map',
  arr3.map(item => [item * 2])
); //[[2], [4], [6],..]
console.log(
  'complex flat map',
  arr3.flatMap(item => [item * 2])
); */

//! Task
{
  //4
  const number = [0, 1, 2, 3, 4, 4, 5, 5, 7, 9];

  for (let i = 0; i < number.length; i++) {
    //console.log(i);
    if (i % 2 === 1) {
      //console.log(number[i]);
    }
  }

  //5
  number.push(10);
  number.unshift(-1);
  number.pop();
  number.shift();
  // console.log(number);
  //7
  const favouriteFoods = [
    'Biryani',
    'Pizza',
    'Burger',
    'Pasta',
    'Sushi',
    'Ice Cream',
    'Fried Chicken',
    'Noodles',
    'Chocolate',
    'Mango',
  ];
  const [six] = [favouriteFoods[5]];
  //console.log(six);
  //8
  const [food1, food2, ...rest] = [
    'Biryani',
    'Pizza',
    'Burger',
    'Pasta',
    'Sushi',
    'Ice Cream',
    'Fried Chicken',
    'Noodles',
    'Chocolate',
    'Mango',
  ];
  //console.log(rest);
  //9
  const newArr = favouriteFoods.slice();
  const newArr1 = [...favouriteFoods];
  //console.log(favouriteFoods === newArr);
  // console.log(favouriteFoods === newArr1);

  //10
  favouriteFoods.length = 0;
  // console.log(favouriteFoods);
  //11
  const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  for (let i = 0; i <= num.length - 1; i++) {
    /*  if (num[i] === 5) {
      num.length = 6;
      break;
    } */
  }
  // console.log(num);

  //12
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  items.splice(0, 10);
  //console.log(items);

  //! 15 Hard
  //way-1
  const elem = ['apple', 'banana', 'mango', 'grapes'];
  const v = elem.find(element => {
    return element.includes('ba');
  });
  //console.log(v);
  //Way-2
  const elem1 = elem.join(' ').includes('app');
  // console.log(elem1);

  //16
  const alphaNum = [
    'A1',
    'C3',
    'B2',
    'D4',
    'F6',
    'E5',
    'G7',
    'H8',
    'J10',
    'I9',
  ];
  const sortAs = alphaNum.toSorted();
  const sortDe = alphaNum.toSorted(function (a, b) {
    return a === b ? 0 : a > b ? -1 : 1;
  });
  //console.log(sortDe);
  //console.log(sortAs);

  //Data
  const employees = [
    { id: 1, name: 'Alice', departmentId: 1, salary: 5000 },
    { id: 2, name: 'Bob', departmentId: 2, salary: 7000 },
    { id: 3, name: 'Charlie', departmentId: 3, salary: 4500 },
    { id: 4, name: 'Diana', departmentId: 1, salary: 5500 },
    { id: 5, name: 'Edward', departmentId: 2, salary: 8000 },
    { id: 6, name: 'Fiona', departmentId: 4, salary: 6000 },
    { id: 7, name: 'George', departmentId: 3, salary: 5200 },
    { id: 8, name: 'Helen', departmentId: 4, salary: 8000 },
    { id: 9, name: 'Ian', departmentId: 2, salary: 4800 },
    { id: 10, name: 'Jane', departmentId: 1, salary: 5100 },
  ];
  const departments = [
    { id: 1, name: 'HR' },
    { id: 2, name: 'Engineering' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Sales' },
  ];
  //21
  const engnieerFilter = employees.filter(val => {
    return val.departmentId === 2;
  });
  //console.log(engnieerFilter);
  //22
  //*Immuteable way

  /*   const newarr0 = employees.map(employ => {
    const find = departments.find(fi => fi.id === employ.departmentId).name;

    return `${employ.name}(${find})`;
  });
  console.log(newarr0);
  console.log(employees); */

  /*   const newarr = employees.map(employ => {
    let title = '';
    if (employ.departmentId === 1) {
      title = 'HR';
    } else if (employ.departmentId === 2) {
      title = 'Engineering';
    } else if (employ.departmentId === 3) {
      title = 'Marketing';
    } else {
      title = 'Sales';
    }
    //*Muteable way
    employ.name = `${employ.name}(${title})`;
    return employ;

  });
  console.log(employees);
  console.log(newarr); */

  //23
  //Way-1
  const emSa = employees.map(sal => {
    return sal.salary;
  });
  const maxSalary = Math.max(...emSa);
  // console.log(maxSalary);
  //Extra
  const maxSalaryArray = employees.filter(maxArr => {
    return maxArr.salary === maxSalary;
  });
  // console.log(maxSalaryArray);

  //Way-2
  let maxSa = 0;
  for (const maxVa of employees) {
    if (maxVa.salary > maxSa) {
      maxSa = maxVa.salary;
    }
  }
  // console.log(maxSa);
  //24
  const chekSalesEmploy = employees.some(chek => {
    return chek.departmentId === 4;
  });
  //console.log(chekSalesEmploy);

  //25
  function sala(data) {
    return data.filter(sal => {
      return sal.salary > 6000;
    });
  }
  //console.log(sala(employees));
  //
  const salar = employees.filter(sal => {
    return sal.salary > 6000;
  });
  //console.log(salar);
  //26
  const employName = employees.map(emName => {
    return emName.name;
  });
  //console.log(employName);
  //27
  const totalSalary = employees.reduce((acc, employSalary) => {
    let total = acc + employSalary.salary;
    return total;
  }, 0);
  //console.log(totalSalary);
  //28
  const minSa = employees.some(un5000 => un5000.salary < 5000);
  //console.log(minSa);
  //29
  //Way-1
  const findEmsa5100 = employees.find(fi => fi.salary === 5100);
  //console.log(findEmsa5100);
  //way-2
  const filterEmsa5100 = employees.filter(fi => fi.salary === 5100);
  //console.log(...filterEmsa5100);
  //30
  const findLastEmployinHR = employees.findLast(lhr => {
    return lhr.departmentId === 1;
  });
  //console.log(findLastEmployinHR);
  //31
  const findFirstEmployinMarketing = employees.find(
    ffem => ffem.departmentId === 3
  );
  // console.log(findFirstEmployinMarketing);
  //32
  const findFirstEmployinearn4000 = employees.every(
    employ => employ.salary > 4000
  );
  // console.log(findFirstEmployinearn4000);
  //33
  //way-1
  const findEmployinHRSales = employees.filter(employ => {
    return employ.departmentId === 1 || employ.departmentId === 4;
  });
  //console.log(findEmployinHRSales);
  //way-2
  let firstHR = null;
  let firstSales = null;

  for (let employ of employees) {
    if (!firstHR && employ.departmentId === 1) {
      firstHR = employ;
    }
    if (!firstSales && employ.departmentId === 4) {
      firstSales = employ;
    }
    if (firstHR && firstSales) break; // দুইজন মিলে গেলে loop stop
  }

  // console.log(firstHR);
  // console.log(firstSales);

  //34
  //way-1
  const verifyEmploy = employees.every(employ => {
    return (
      employ.departmentId === 1 ||
      employ.departmentId === 2 ||
      employ.departmentId === 3 ||
      employ.departmentId === 4
    );
  });
  //console.log(verifyEmploy);
  //way-2 best
  const verifyEmploy2 = employees.every(employ => {
    return [1, 2, 3, 4].includes(employ.departmentId);
  });
  //console.log(verifyEmploy2);
  //35
  //Way-1
  const deptName = employees.map(employ => {
    let dept = '';
    if (employ.departmentId === 1) {
      dept = 'HR';
    } else if (employ.departmentId === 2) {
      dept = 'Engineering';
    } else if (employ.departmentId === 3) {
      dept = 'Marketing';
    } else {
      dept = 'Sales';
    }
    return `${employ.name} ${dept}`;
  });

  //way-2 Best
  const deptName2 = employees.map(employ => {
    let names = departments.find(dept => dept.id === employ.departmentId);
    let nameadept = employ.name + names.name;
    return nameadept;
  });
  //  console.log(deptName2);
  //36
  const namearray = employees.map(employ => employ.name);
  //console.log(namearray);
  //37

  const salaryIncrase = employees.map(employ => {
    return { ...employ, salary: employ.salary + employ.salary * (10 / 100) };
  });
  // console.log(salaryIncrase);
  // console.log(employees);
  //38
  const employeesWithSkills = [
    { name: 'Alice', skills: ['Excel', 'Management'] },
    { name: 'Bob', skills: ['JavaScript', 'Debugging', 'Problem Solving'] },
    { name: 'Charlie', skills: ['Marketing', 'SEO'] },
    { name: 'Diana', skills: ['Communication', 'Recruitment'] },
    { name: 'Edward', skills: ['Leadership', 'Project Management'] },
    { name: 'Fiona', skills: ['Sales', 'Negotiation'] },
    { name: 'George', skills: ['Graphic Design', 'Branding'] },
    { name: 'Helen', skills: ['Customer Service', 'CRM Tools'] },
    { name: 'Ian', skills: ['React', 'Node.js'] },
    { name: 'Jane', skills: ['Accounting', 'Data Analysis'] },
  ];

  const skill = employeesWithSkills.map(employ => {
    return employ.skills;
  });
  //console.log(skill.flat());
  //39
  const engSalary = employees
    .map(employ => {
      if (employ.departmentId === 2) {
        return employ.salary;
      } else {
        return 0;
      }
    })
    .reduce((acc, emSalary) => {
      return acc + emSalary;
    }, 0);
  // console.log(engSalary);

  //best Practise
  const engSalary2 = employees
    .filter(employ => employ.departmentId === 2)
    .reduce((acc, emSalary) => acc + emSalary);
  // console.log(engSalary);
  //40 //! Fail
  const allem = departments.some(dept => {
    const employ = employees.filter(emp => emp.departmentId === dept.id);
    // console.log(employ);
    return employ.every(emp => emp.salary > 5000);
  });
  //console.log(allem);
  //45
  for (let employ of employees) {
    if (employ.salary > 5000) {
      //  console.log(employ.name);
    }
  }
  //46
  for (let { name, salary } of employees) {
    // console.log(name, salary);
  }
  //47
  for (let employ of employees) {
    const findName = departments.find(
      dept => dept.id === employ.departmentId
    ).name;
    // console.log(`${employ.name} works in ${findName}`);
  }
  //48
  for (let [index, employ] of employees.entries()) {
    // console.log(index, employ.name);
  }
  //49
  const arrayLike = { 0: 'First', 1: 'Second', length: 2 };
  //console.log(arrayLike[1]);

  //50
  function allarfg() {
    // console.log(Array.from(arguments));
  }
  allarfg(10, 20, 30);
  //51
  const div = document.querySelectorAll('div');
  // console.log(Array.from(div));
  //53
  const newArray = new Array(5).fill('A').join('-');
  //console.log(newArray);
  //57
  const str = 'HELLO';
  //console.log(Array.from(str));
  //58
  const fruits = ['apple', 'banana', 'apricot', 'mango', 'blueberry'];

  const grouped = fruits.reduce((acc, word) => {
    const firstLetter = word[0]; // first letter বের করা
    if (!acc[firstLetter]) {
      acc[firstLetter] = []; // যদি group না থাকে, নতুন array তৈরি
    }
    acc[firstLetter].push(word); // word group-এ add করা
    return acc;
  }, {});

  //console.log(grouped);

  /*   const friuit = ['apple', 'banana', 'apricot', 'mango', 'blueberry'];
  const a = friuit.map(fru => fru.charAt(0));
  console.log(a); */
  //59
  const numArr = [
    ['a', 1],
    ['b', 2],
    ['c', 3],
  ];
  //Way-1
  const flatArr = numArr.flat();
  // console.log({ ...flatArr });
  //Way-2 Best
  //console.log(Object.fromEntries(numArr));
  //60
  const letterArr = [
    ['a', 'b'],
    ['c', 'd'],
  ];
  const upperArray = letterArr.flatMap(lett =>
    lett.map(le => le.toUpperCase())
  );
  //console.log(upperArray);

  //61 //!Fail
  const fruitArray = ['apple', 'banana', 'apple', 'mango', 'banana', 'banana'];
  let count = {};
  for (let fruit of fruitArray) {
    //count[fruit] = 1;
    if (count[fruit]) {
      count[fruit] = count[fruit] + 1;
    } else {
      count[fruit] = 1;
    }
  }
  console.log(count);
  //62
  const newLeA = ['a', 'b', 'c', 'd', 'e'];
  console.log(newLeA.slice(1, 4));
  //63
  newNumA = [9, 3, 1, 6, 8];
  console.log(newNumA.toSorted());
  //65
  const users = [
    { name: 'Alice', age: 55 },
    { name: 'Bob', age: 3 },
    { name: 'Charlie', age: 25 },
  ];
  const group = Object.groupBy(users, ({ age }) => {
    if (age >= 40) {
      return 'Adult';
    } else {
      return 'Non-Adult';
    }
  });
  console.log(group);

  //66
  const sentence =
    '40 Days of JavaScript by tapaScript is a powerful initiative';
  const sentArr = sentence.split(' ');
  let long = '';
  for (let sen of sentArr) {
    if (sen.length > long.length) {
      long = sen;
    }
  }
  console.log(long);
  //67
  const numA1 = [1, 2, 3, 4];
  const numA2 = [3, 4, 5, 6];

  const final = [];
  for (let num of numA1) {
    if (numA2.includes(num)) {
      final.push(num);
    }
  }
  console.log(final);
}
