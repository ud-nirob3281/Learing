//!IF
/*if(condition){
 Condition true হলে আমি যা করবো
}else{
 Condition false হলে আমি যা করবো
}*/
//*Way-1
let age = 41;
if (age >= 40) {
  console.log('You are Older');
} else if (age > 18) {
  console.log('You are eligible to vote.');
} else {
  console.log('You are not eligible to vote.');
}

//*Way-2
let ages = 41;
if ((ages >= 18, ages < 40)) {
  console.log('You are eligible to vote.');
} else if (ages > 40) {
  console.log('You are Older');
} else {
  console.log('You are not eligible to vote.');
}

//! Switch Case
let catagory = 'apple';
let catagoryType;

switch (catagory) {
  case 'car':
    catagoryType = 'This is a car';
    break;
  case 'bike':
    catagoryType = 'This is a bike';
    break;
  case 'bus':  
    catagoryType = 'This is a bus';

  default:
    catagoryType = "I Don't know what it is";
}
console.log(catagoryType);