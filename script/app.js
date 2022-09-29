const keys = document.querySelector(".keys-calculator");
const result = document.querySelector(".result-calculator");
const calculator = document.querySelector(".calculator");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
  }
});

const calc = (firstValue, operator, secondValue) => {
  let result;

  firstValue = parseFloat(firstValue);
  secondValue = parseFloat(secondValue);

  switch (operator) {
    case "add":
      result = firstValue + secondValue;
      break;
    case "subtract":
      result = firstValue - secondValue;
      break;
    case "multiply":
      result = firstValue * secondValue;
      break;
    case "divide":
      result = firstValue / secondValue;
      break;
    case "potency":
      result = firstValue ** secondValue;
      break;
    default:
      result = "0";
      break;
  }

  return result;
};
