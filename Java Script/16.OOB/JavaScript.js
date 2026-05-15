//! Construcror Wise
{
  function Student(name, age, carriar) {
    this.name = name;
    this.age = age;
    this.carriar = carriar;
    this.myself = function () {
      console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
    };
  }
  const s1 = new Student('UD NIROB', 18, 'Full-Stack Web Developer');
  const s2 = new Student('SK TANVIR', 18, 'Front-End Web Developer');
  /*   console.log(s1);
  console.log(s2);
  s1.myself();
  s2.myself(); */
}
//TODO এখানে mySelf function একই কিন্তু এখানে new keyword ব্যবহার ফলে প্রতিবার memory নিচ্ছে এটা একটা bad প্র্যাক্টিস যেহেতু mySelf function same তাহলে আমরা চাইলে এটাকে prototype এর মধ্যে সেভ করতে পারি এবং যখন দরকার তখন ব্যবহার করতে পারি
{
  //*Ex-1
  function Student(name, age, carriar) {
    this.name = name;
    this.age = age;
    this.carriar = carriar;
    /*     this.myself = function () {
      console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
    }; */
  }

  Student.prototype.IntroduseMyself = function () {
    console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
  };
  // console.log(Student.prototype);

  const s1 = new Student('UD NIROB', 18, 'Full-Stack Web Developer');
  const s2 = new Student('Safa', 15, 'Back-End Web Developer');

  /*   console.log(s1);
  console.log(s2);
  s1.IntroduseMyself();
  s2.IntroduseMyself(); */

  //*Ex-2
  function Bank(name, age, blance = 0) {
    this.name = name;
    this.age = age;
    this.blance = blance;
  }
  Bank.prototype.deopsite = function (amount) {
    this.blance += amount;
  };
  const a1 = new Bank('nirob', 18, 500);
  const a2 = new Bank('safa', 14, 400);
  /*   console.log(a1);
  a1.deopsite(100);
  console.log(a1); */
}

//! Use Class
//* Contructor Object এর মাধ্যমে Manually ProtoType এ method/function Add করা লাগছিল কিন্তু class use করলে Manually Manually ProtoType এ method/function Add করা লাগবে না Automatic Add হয়ে যাবে ।
{
  class Student {
    constructor(name, age) {
      this.name = name;
      this.age = age;
    }
    myself() {
      console.log(`Hi,My Name is ${this.name} ,My age ${this.age}`);
    }
  }

  const s1 = new Student('UD NIROB', 18);
  const s2 = new Student('SK TANVIR', 18);
  /*   console.log(s1);
  s1.myself(); */
}
//!OOB Four pillars of OOP:
/* ❑ Abstraction – hiding complexity and showing only the essential features.
❑ Encapsulation – hiding data inside objects and provide security.
❑ Inheritance – using properties and methods from another object/class.
❑ Polymorphism – same method behaving differently based on the object */
//* Abstraction and Encapsulation
//TODO আমার এখানে বাইরে fuel, Speed, burnFuel and speedRun এগুলোর কোন প্রয়োজন নাই তাই আমি চাইনা এগুলো কেউ বাইরে থেকে থেকে অ্যাক্সেস করুক তখন এখানে কাজে আসে Encapsulation আমি যেটা চাই বাইরে থেকে অ্যাক্সেস করা যাবে না সেটার আগে # দিয়ে দিলে সেটা আর বাইরে থেকে Acess করা যাবে না |
//TODO আমি এখানে ভিতরে burnFuel and speedRun একটা start  method ভেতরে আছে যার ফলে Complexity হাইড হয়েছে তাই Abstraction
{
  class Car {
    #fuel = 500;
    #speed = 0;

    #speedRun() {
      this.#speed += 40;
    }
    #burnFuel() {
      this.#fuel -= 5;
    }

    start() {
      this.#speedRun();
      this.#burnFuel();
      //console.log('Car is starting.....');
    }
  }
  const c1 = new Car();
  c1.start();
  //console.log(c1);
}
{
  class BankAccount {
    constructor(name, blance = 0) {
      this.name = name;
      this.currBlance = blance;
    }
    deopsite(amount) {
      this.blance += amount;
    }
  }
  const a1 = new BankAccount('ud', 20);
  //a1.currBlance = 100; //? এইখানে আমি Deposite না করে Blance Update করতে পারছি আবার Blance এ String ওদিতে পারবো
  //console.log(a1);
}
{
  //? ওপরের Problem Slove করার জন্য এইটা করছি
  class BankAccount {
    #currBlance = 0;
    constructor(name, blance = 0) {
      if (isNaN(blance)) {
        console.log('Invalid Amount');
        return;
      }
      this.name = name;
      this.#currBlance = blance;
    }
    deopsite(amount) {
      if (isNaN(amount)) {
        console.log('Invalid Amount');
        return;
      }
      this.#currBlance += amount;
    }

    /*     setBl(amount) {
      if (isNaN(amount)) {
        console.log('Invalid Amount');
        return;
      }
      this.#currBlance += amount;
    }
    getBl() {
      let bl = this.#currBlance;
      return console.log(bl);
    } */
    //? এইতাকে Call করা লাগছে Method এর মত কিন্তু  Method এর মত call করতে না চাইলে set , get use করতে পারি name = value দিলে set কাজ করবে আর value না দিলে Get কাজ করবে
    set Bl(amount) {
      if (isNaN(amount)) {
        console.log('Invalid Amount');
        return;
      }
      this.#currBlance += amount;
    }
    get Bl() {
      let bl = this.#currBlance;
      return console.log(bl);
    }
  }
  const a1 = new BankAccount('ud', 20);
  const a2 = new BankAccount('safa', 210);
  //a1.#currBlance = 100; //? Not Accesable.Our problem Is Sloved But There is One Problem We Cant Set new blance And Cant Get/Look Blance. So this Problem Solution is make a gatBl and setBl methood

  /*   a2.setBl('jfdj');
  a2.setBl(500); //? Old
  a2.getBl(); */

  /*   a2.Bl = 'jfdj';
  a2.Bl = 500; //? New
  a2.Bl; */
  // console.log(a2);
}

//! Inheritance
//Parent method এর Property child এ ব্যবহার করতে হলে extends keyword use করতে হবে Child এ Consrustor use করতে হলে Consrustor এর ভেতর Super keyword ব্যবহার করতে হবে
//* Parent Class
{
  class Car {
    constructor(brand, color, mileage) {
      this.name = brand;
      this.color = color;
      this.mileage = mileage;
    }

    start() {
      console.log(`This ${this.name} is Starting`);
    }
  }

  //* Child Class
  class ElecTricCar extends Car {
    constructor(brand, color, mileage, charging) {
      super(brand, color, mileage);
      this.charge = charging;
    }
    get char() {
      console.log(`${this.name} is Charing`);
    }
  }

  const o1 = new ElecTricCar('tesla', 'red', 56, 88);
  /*   console.log(o1);
  o1.char;
  o1.start(); */
}
//! Polymorphism

//Polymorphism এ method একটাই কিন্তু ভিন্ন ভিন্ন কাজ করবে
{
  class MediaPlayer {
    play() {
      console.log('Media Player');
    }
  }
  class ViderPlayer extends MediaPlayer {
    play() {
      console.log('Video Play');
    }
  }
  class AudioPlay extends MediaPlayer {
    play() {
      console.log('Audio Play');
    }
  }
  let o1 = new MediaPlayer();
  /*   o1.play();
  new ViderPlayer().play();
  new AudioPlay().play(); */
}
