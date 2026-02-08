const { isPrime } = require("./isPrime");

const numbers = [2, 10, 17, 21, 29, 1, -5, "abc"];

numbers.forEach((num) => {
  const result = isPrime(num);

  if (result === true) {
    console.log(`${num} is a prime number.`);
  } else if (result === false) {
    console.log(`${num} is not a prime number.`);
  } else {
    console.log(`${num} → ${result}`);
  }
});