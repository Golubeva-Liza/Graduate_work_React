function openOrSenior(data){
   return data.map(el => el[0] >= 55 && el[1] > 7 ? "Senior" : "Open")
}
const res = openOrSenior([[18, 20], [45, 2], [61, 12], [37, 6], [21, 21], [78, 9]]);
console.log(res);

//мое решение
function nbYear(p0, percent, aug, p) {
   let res = p0;
   let iter = 0;
   while (res < p){
      res = Math.floor(res + res*percent/100 + aug);
      iter++;
   }
   return iter;
 }

const res2 = nbYear(1500000, 0.25, 1000, 2000000);
console.log(res2);

//хорошее решение
function nbYear2(p0, percent, aug, p) {
   for (var years = 0; p0 < p; years++) {
     p0 = Math.floor(p0 + p0 * percent / 100 + aug);
   }
   return years
}




// Напишите функцию, которая принимает строку из одного или нескольких слов и возвращает ту же строку, но с перевернутыми всеми словами из пяти или более букв (точно так же, как имя этого Ката). Передаваемые строки будут состоять только из букв и пробелов. Пробелы будут включены только в том случае, если присутствует более одного слова.

// Examples: spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw" spinWords( "This is a test") => returns "This is a test" spinWords( "This is another test" )=> returns "This is rehtona test"

// function spinWords(string){
//    let arr = string.split(' ');
//    arr = arr.map(el => {
//       if (el.length >= 5){
//          return el.split('').reverse().join('')
//       } else {
//          return el
//       }
//    })
//    return arr
// }
function spinWords(string){
   return string.split(' ').map(el => el.length >= 5 ? el.split('').reverse().join('') : el).join(' ')
}


//другое решение
function spinWords2(string){
   return string.replace(/\w{5,}/g, function(w) { return w.split('').reverse().join('') })
}
console.log(spinWords("Just kidding there is still one more"));


// 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
// 999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2)
// 4 --> 0 (because 4 is already a one-digit number)

function persistence(num) {
   let count = 0;
   for (count; num > 9; count++) {
      let numArr = [];
      while(num >= 1){
         numArr.push(num % 10)
         num = Math.floor(num / 10)
      }
      num = 1;
      numArr.forEach(el => num *= el);
   }
   return count;
}

//или так let array = (""+number).split("").map(Number)
console.log(persistence(39));


const persistence2 = num => {
   return `${num}`.length > 1 
      ? 1 + persistence2(`${num}`.split('').reduce((a, b) => a * +b)) 
      : 0;
}





function zero(params) {
   return params ? outerNum(0, params.oper, params.num) : 0;
}
function one(params) {
   return params ? outerNum(1, params.oper, params.num) : 1;
}
function two(params) {
   return params ? outerNum(2, params.oper, params.num) : 2;
}
function three(params) {
   return params ? outerNum(3, params.oper, params.num) : 3;
}
function four(params) {
   return params ? outerNum(4, params.oper, params.num) : 4;
}
function five(params) {
   return params ? outerNum(5, params.oper, params.num) : 5;
}
function six(params) {
   return params ? outerNum(6, params.oper, params.num) : 6;
}
function seven(params) {
   return params ? outerNum(7, params.oper, params.num) : 7;
}
function eight(params) {
   return params ? outerNum(8, params.oper, params.num) : 8;
}
function nine(params) {
   return params ? outerNum(9, params.oper, params.num) : 9;
}

function plus(num) {
   return {
      oper: 'plus',
      num
   }
}
function minus(num) {
   return {
      oper: 'minus',
      num
   }
}
function times(num) {
   return {
      oper: 'times',
      num
   }
}
function dividedBy(num) {
   return {
      oper: 'dividedBy',
      num
   }
}

function outerNum(funcNum, oper, num) {
   switch (oper) {
      case 'plus':
        return funcNum + num;
      case 'minus':
         return funcNum - num;
      case 'times':
         return funcNum * num;
      case 'dividedBy':
         return Math.floor(funcNum / num);
      default:
        return funcNum;
   }
}

console.log(seven(times(five())));
console.log(four(plus(nine())));
console.log(eight(minus(three())));
console.log(six(dividedBy(two())));

//довольно длинное решение, поэтому посмотреть это: https://www.codewars.com/kata/525f3eda17c7cd9f9e000b39/solutions/javascript/all/best_practice




//1^3 + 5^3 + 3^3 = 1 + 125 + 27 = 153

// function narcissistic(value) {
//    let arr = (""+value).split("").map(Number);
//    let res = 0;
//    arr.forEach(num => res+=Math.pow(num, arr.length));
//    return res === value ? true : false;
// }
function narcissistic(value) {
   let res = 0;
   (""+value).split("").map(Number).forEach(num => res+=Math.pow(num, (""+value).length));
   return res === value ? true : false;
}
 
console.log(narcissistic(153));

// function narcissistic(value) {
//    return value.toString()
//    .split('')
//    .map( (x,i,arr) => x ** arr.length)
//    .reduce( (a,b)=> +a + +b) 
//     === value
// }
// function narcissistic( value ) {
//    return ('' + value).split('').reduce(function(p, c){
//      return p + Math.pow(c, ('' + value).length)
//      }, 0) == value;
// }