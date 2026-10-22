
let currentInput = "0";
let firstNumber = null;
let operator = null;
let resetDisplay = false;

function updateDisplay() {
    document.getElementById("display").textContent = currentInput;
}

function appendNumber(number) {
    if (currentInput === "Error" || resetDisplay) {
        currentInput = number;
        resetDisplay = false;
    } else if (currentInput === "0") {
        currentInput = number;
    } else {
        currentInput += number;
    }

    updateDisplay();
    showMessage("Ready to calculate");
}

function appendDecimal() {
    if (currentInput === "Error" || resetDisplay) {
        currentInput = "0.";
        resetDisplay = false;
    } else if (!currentInput.includes(".")) {
        currentInput += ".";
    }

    updateDisplay();
}

function chooseOperator(selectedOperator) {
    if (currentInput === "Error") return;

    if (operator !== null && !resetDisplay) {
        calculateResult();
        if (currentInput === "Error") return;
    }

    firstNumber = Number(currentInput);
    operator = selectedOperator;
    resetDisplay = true;

    showMessage("Operation selected");
}

function calculateResult() {
    if (operator === null || firstNumber === null) {
        showMessage("Choose an operation first");
        return;
    }

    const secondNumber = Number(currentInput);
    let answer;

    if (operator === "+") {
        answer = firstNumber + secondNumber;
    } else if (operator === "-") {
        answer = firstNumber - secondNumber;
    } else if (operator === "*") {
        answer = firstNumber * secondNumber;
    } else if (operator === "/") {
        if (secondNumber === 0) {
            currentInput = "Error";
            updateDisplay();
            showMessage("Cannot divide by zero");
            firstNumber = null;
            operator = null;
            resetDisplay = true;
            return;
        }

        answer = firstNumber / secondNumber;
    }

    if (!Number.isFinite(answer)) {
        currentInput = "Error";
        showMessage("Result is too large");
    } else {
        currentInput = String(Number(answer.toPrecision(10)));
        showMessage("Calculation complete");
    }

    firstNumber = null;
    operator = null;
    resetDisplay = true;
    updateDisplay();
}

function clearCalculator() {
    currentInput = "0";
    firstNumber = null;
    operator = null;
    resetDisplay = false;

    updateDisplay();
    showMessage("Ready to calculate");
}

function showMessage(message) {
    document.getElementById("message").textContent = message;
}
