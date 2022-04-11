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
      ? 1 + persistence(`${num}`.split('').reduce((a, b) => a * +b)) 
      : 0;
}