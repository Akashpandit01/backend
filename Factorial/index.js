const { factorial } = require("./factorial");

const values = [5, 7, 10];

values.forEach((num) => {
  const result = factorial(num);

  if (typeof result === "number") {
    console.log(`Factorial of ${num} is: ${result}`);
  } else {
    console.log(`Factorial of ${num}: ${result}`);
  }
});