function isPrime(num) {
  // Handle non-numeric inputs
  if (typeof num !== "number" || isNaN(num)) {
    return "Invalid input (not a number)";
  }

  // Handle edge cases
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  // Efficient check: up to sqrt(n)
  for (let i = 3; i * i <= num; i += 2) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

module.exports = { isPrime };