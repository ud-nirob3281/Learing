//! Hoisting
//* Varriable Hoisting

console.log(name); //und...
var name;
name = 'tom';
console.log(name); //tom

//? NOTE: GLC তে var এত value UNDIFINED save হয় কিন্তু let,const UNDIFINED save হয়না uninlisize হয়।
//*console.log(name1); // Error name1 is't defind(TDZ)
let name1;
name1 = 'tom';
console.log(name1); //tom

/*
    Creation Phase
        log func go to memory
        name create in memory name value is undifined

    Excuteing Phase
        Call first log func output is undifined Because name Value set undifined in creation phase
        Assign name value 'tom'
        Call second log func output is 'tom'

    Explanation:https://youtu.be/K0GO30KqS00?si=0rI0P4LqdzYzR_1g&t=85
*/

//*Function Hoisting
ches();
function ches() {
  console.log('ches');
  caugth();
}

function caugth() {
  console.log('caugth');
}
/*
  GLC
      CP
         Save memory in all func
      EP
          Excute ches() So create FEC

  FEC(for ches())
      CP
         save memory in log
      EP
          Excute log
          Excute caugth So create another FEC
          
        FEC(for Caugth())
          CP
             save memory in log
           EP
          Excute log
       
 */

//test();
var test = function () {
  console.log('Hi Safa');
}; //Output: Error test is not a function

/*
We make function like function test(){...} --> This Case 'test' is function name.
But We make function like let test = finction(){...} --> This Case 'test' isn't function name 'test' is varriable name and test value is function.

Our Code case 
  GEC
    CP
      Create Varriabe It value is Undifined
    EP
      Excute test() [test is undi.. so undifined()->test is not a function]
      Assaign test value in function
Explanation:https://youtu.be/K0GO30KqS00?si=0ut-NRivdbjKuDsM&t=696
*/
