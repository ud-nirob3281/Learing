//! Date and Time

const myDate = new Date();
console.log(myDate);
console.log(myDate.toString()); //?Use in Node.js
console.log(myDate.toDateString()); //? Only date
console.log(myDate.toTimeString()); //? Only time
console.log(myDate.toLocaleString()); //? Local date and time
//* Custom format
console.log(
  myDate.toLocaleString('xy', {
    // weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    //timeZoneName: 'long',
  })
);

//* Customizwed date format
let updateDate = new Date(2025, 10, 15, 12, 45, 45, 0); //? year, month, day, hour, minute, second, millisecond
console.log(updateDate);

let updateDate2 = new Date('02-05-2025'); //? month-day-year
console.log(updateDate2);

//* Time in milliseconds
let timeInMilliseconds = Date.now(); //? Current time in milliseconds
console.log(timeInMilliseconds);

//? Function run time count
function runTime() {
  for (let i = 1; i <= 100; i++) {
    console.log(`${i}.Sorry Baby`);
  }
}
let startTime = Date.now();
runTime();
let endTime = Date.now();

let runTimes = `The Function Exicuted in ${endTime - startTime} milliseconds`;
console.log(runTimes);

//* Only
console.log(new Date().getDate()); //? Date
console.log(new Date().getFullYear()); //? Year
console.log(new Date().getMonth()); //? Month (0-11)
console.log(new Date().getHours()); //? Hours (0-23)
console.log(new Date().getMinutes()); //? Minutes
console.log(new Date().getSeconds()); //? Seconds
console.log(new Date().getMilliseconds()); //? Milliseconds
console.log(new Date().getTime()); //? Time in milliseconds since 1970-01-01T00:00:00Z
console.log(new Date().getDay()); //? Day of the week (0-6)
