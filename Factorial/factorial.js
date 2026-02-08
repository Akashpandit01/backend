function factorial(n) {
  // Handle non-numeric inputs
  if (typeof n !== "number" || isNaN(n)) {
    return "Invalid input (not a number)";
  }

  // Handle negative numbers
  if (n < 0) {
    return "Factorial is not defined for negative numbers";
  }

  // Handle 0 and 1
  if (n === 0 || n === 1) {
    return 1;
  }

  // Ensure integer input
  if (!Number.isInteger(n)) {
    return "Factorial is only defined for integers";
  }

  // Iterative factorial (avoids recursion stack issues)
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }

  return result;
}

module.exports = { factorial };