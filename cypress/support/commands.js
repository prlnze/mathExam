// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress.Commands.add("convertTextToNumber", (textNumber) => {
//   const singleDigits = [
//     "Zero",
//     "One",
//     "Two",
//     "Three",
//     "Four",
//     "Five",
//     "Six",
//     "Seven",
//     "Eight",
//     "Nine",
//   ];
//   const teens = [
//     "Ten",
//     "Eleven",
//     "Twelve",
//     "Thirteen",
//     "Fourteen",
//     "Fifteen",
//     "Sixteen",
//     "Seventeen",
//     "Eighteen",
//     "Nineteen",
//   ];
//   const tens = [
//     "",
//     "Ten",
//     "Twenty",
//     "Thirty",
//     "Forty",
//     "Fifty",
//     "Sixty",
//     "Seventy",
//     "Eighty",
//     "Ninety",
//   ];

//   const bigNumbers = ["", "Thousand", "Million", "Billion", "Trillion"];

//   // Function to convert a chunk of text to a number
//   function convertChunk(chunk) {
//     if (singleDigits.includes(chunk)) {
//       return singleDigits.indexOf(chunk);
//     } else if (teens.includes(chunk)) {
//       return teens.indexOf(chunk) + 10;
//     } else if (tens.includes(chunk)) {
//       return tens.indexOf(chunk) * 10;
//     } else if (bigNumbers.includes(chunk)) {
//       return Math.pow(1000, bigNumbers.indexOf(chunk));
//     } else {
//       return 0; // Handle other cases if needed
//     }
//   }

//   // Split the text number into chunks and convert each chunk
//   textNumber = textNumber.replace(/-/g, " ");
//   const chunks = textNumber.split(" ");
//   let result = 0;
//   let currentNumber = 0;
//   for (const chunk of chunks) {
//     console.log(chunk);
//     if (bigNumbers.includes(chunk)) {
//       result += currentNumber * convertChunk(chunk);
//       currentNumber = "";
//     } else if (chunk === "Hundred") {
//       currentNumber *= 100;
//     } else {
//       currentNumber += convertChunk(chunk);
//     }
//   }

//   result += currentNumber;

//   return result;
// });

Cypress.Commands.add("convertTextToNumber", (textNumber) => {
  var Small = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,
    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  var Magnitude = {
    thousand: 1000,
    million: 1000000,
    billion: 1000000000,
    trillion: 1000000000000,
    quadrillion: 1000000000000000,
    quintillion: 1000000000000000000,
    sextillion: 1000000000000000000000,
    septillion: 1000000000000000000000000,
    octillion: 1000000000000000000000000000,
    nonillion: 1000000000000000000000000000000,
    decillion: 1000000000000000000000000000000000,
  };

  function feach(w) {
    var x = Small[w];
    if (x != null) {
      g = g + x;
    } else if (w == "hundred") {
      g = g * 100;
    } else {
      x = Magnitude[w];
      if (x != null) {
        n = n + g * x;
        g = 0;
      } else {
        console.log("Unknown number: " + w);
      }
    }
  }
  let n, g;
  let a = "";
  a = textNumber.toString().split(/[\s-]+/);
  a = a.map((item) => item.toLowerCase());
  n = 0;
  g = 0;
  a.forEach(feach);
  return n + g;
});
