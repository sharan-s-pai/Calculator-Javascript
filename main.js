class Calculator {
  constructor(previousText, currentText, historyText) {
    this.currentText = currentText;
    this.previousText = previousText;
    this.historyText = historyText;
    this.clear();
  }

  clear() {
    this.current = "";
    this.previous = "";
    this.history = [];
    this.historyText.innerText = "";
    this.operation = undefined;
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
  }

  displayNumbers(number) {
    let string = number.toString();
    let integerDigit = parseFloat(string.split(".")[0]);
    let decimalDigit = string.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigit)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigit.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigit != null) {
      return `${integerDisplay}.${decimalDigit}`;
    } else {
      return integerDisplay;
    }
  }

  getNumbers(numbers) {
    if (isNaN(numbers.toString() === "." && this.current.includes("."))) return;
    this.current = this.current.toString() + numbers.toString();
  }

  getOperators(operator) {
    if (operator === "") return;
    if (operator !== "=") this.compute();
    this.operation = operator;
    this.previous = this.current.toString() + this.operation.toString();
    this.current = "";
  }

  compute() {
    let comp;
    let curr = parseFloat(this.current);
    let prev = parseFloat(this.previous);
    this.historyText.innerText = "";
    this.history = [this.previous];
    this.history.push(this.current);

    if (isNaN(curr) || isNaN(prev)) return;
    switch (this.operation) {
      case "+":
        comp = curr + prev;
        break;
      case "-":
        comp = prev - curr;
        break;
      case "*":
        comp = prev * curr;
        break;
      case "÷":
        comp = prev / curr;
        break;
    }
    this.current = comp;
    this.operation = undefined;
    this.history.push(" = ");
    this.previous = "";
    this.history.push(this.displayNumbers(comp));
    this.history.forEach((ele) => {
      this.historyText.innerText = ele.toString();
    });
    this.history = [];
  }

  displayUpdate() {
    this.currentText.innerText = this.displayNumbers(this.current);
    this.previousText.innerText = this.previous.toString();
  }
}
let previousText = document.querySelector("[data-previous]");
let currentText = document.querySelector("[data-current]");
let clearButton = document.querySelector("[data-clear]");
let deleteButton = document.querySelector("[data-delete]");
let numbers = document.querySelectorAll("[data-number]");
let operators = document.querySelectorAll("[data-operation");
let equals = document.querySelector("[data-equals]");
let historyText = document.querySelector("[data-history]");
let calculator = new Calculator(previousText, currentText, historyText);
numbers.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.getNumbers(button.innerText);
    calculator.displayUpdate();
  });
});
operators.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.getOperators(button.innerText);
    calculator.displayUpdate();
  });
});
equals.addEventListener("click", () => {
  calculator.compute();
  calculator.displayUpdate();
});
clearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.displayUpdate();
});
deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.displayUpdate();
});
