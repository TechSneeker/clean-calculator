const keys = document.querySelector(".keys-calculator");
const result = document.querySelector(".result-calculator");
const calculator = document.querySelector(".calculator");

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const keyClicked = key.textContent;
    const action = key.dataset.action;
    const actualNumber = result.textContent;
    const lastKey = calculator.dataset.previousKeyType;

    flushKey(key);

    if (!action) {
      if (
        actualNumber === "0" ||
        lastKey === "operator" ||
        lastKey === "result"
      ) {
        result.textContent = keyClicked;
      } else {
        result.textContent = actualNumber + keyClicked;
      }
      collectKey("number");
    }

    if (action === "decimal") {
      if (!actualNumber.includes(".")) {
        result.textContent = actualNumber + ".";
      }
      collectKey("decimal");
    }

    if (action === "state") {
      if (!actualNumber.includes("-") && actualNumber !== "0") {
        result.textContent = "-" + actualNumber;
      } else if (actualNumber.includes("-")) {
        result.textContent = actualNumber.replace("-", "");
      }
    }

    if (action === "clearSingle") {
      if (actualNumber.length == 1) {
        result.textContent = "0";
      } else {
        result.textContent = actualNumber.slice(0, -1);
      }

      if(secondValue) {
        calculator.dataset.operator = ''
      }

      collectKey("clearSingle");
    }

    if (action === "clearAll") {
      flushValue();
      collectKey("clearAll");
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide" ||
      action === "potency"
    ) {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = actualNumber;

      if (
        firstValue &&
        operator &&
        lastKey !== "operator" &&
        lastKey !== "result"
      ) {
        const resultValue = calc(firstValue, operator, secondValue);
        result.textContent = resultValue;
        calculator.dataset.firstValue = resultValue;
      } else {
        calculator.dataset.firstValue = actualNumber;
      }

      key.classList.add("is-depressed");
      collectKey("operator");
      calculator.dataset.operator = action;
    }

    if (action === "result") {
      let firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      let secondValue = actualNumber;

      if (firstValue) {
        if (lastKey === "result") {
          firstValue = actualNumber;
          secondValue = calculator.dataset.modValue;
        }

        result.textContent = calc(firstValue, operator, secondValue);
      }

      calculator.dataset.modValue = secondValue;
      collectKey("result");
    }
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

const flushKey = (a) => {
  Array.from(a.parentNode.children).forEach((e) =>
    e.classList.remove("is-depressed")
  );
};

const flushValue = () => {
  result.textContent = "0";
  calculator.dataset.firstValue = "";
  calculator.dataset.operator = "";
  calculator.dataset.modValue = "";
};

const collectKey = (a) => {
  calculator.dataset.previousKeyType = a;
};
