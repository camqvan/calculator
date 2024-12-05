// Get the display elements and all buttons
const display = document.getElementById('display');
const previousOutput = document.getElementById('previousOutput');
const buttons = document.querySelectorAll('.button');

// Variables to store the current input and operation
let currentInput = '';
let previousInput = '';
let currentOperator = '';

// Add event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      clearDisplay();
    } else if (value === 'DEL') {
      deleteLast();
    } else if (value === '=') {
      calculateResult();
    } else if (['+', '-', '×', '÷', '%'].includes(value)) {
      setOperator(value);
    } else {
      updateDisplay(value);
    }
  });
});

// Function to clear everything
function clearDisplay() {
  currentInput = '';
  previousInput = '';
  currentOperator = '';
  display.textContent = '0';
  previousOutput.textContent = '';
}

// Function to delete the last character
function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.textContent = currentInput || '0';
}

// Function to update the display with numbers
function updateDisplay(value) {
  if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
  currentInput += value;
  display.textContent = currentInput;
}

// Function to set the operator
function setOperator(operator) {
  if (currentInput === '') return; // Prevent setting operator without a number
  if (operator === '%') {
    handlePercentage();
    return;
  }

  if (previousInput !== '') {
    calculateResult(); // Evaluate if there's a previous calculation
  }
  currentOperator = operator;
  previousInput = currentInput;
  currentInput = '';
  previousOutput.textContent = `${previousInput} ${currentOperator}`;
  display.textContent = '0';
}

// Function to calculate the result
function calculateResult() {
  if (currentOperator === '' || currentInput === '' || previousInput === '')
    return;

  const num1 = parseFloat(previousInput);
  const num2 = parseFloat(currentInput);
  let result;

  switch (currentOperator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '×':
      result = num1 * num2;
      break;
    case '÷':
      result = num2 === 0 ? 'Error' : num1 / num2;
      break;
    case '%':
      result = num1 * (num2 / 100); // Calculate percentage
      break;
    default:
      return;
  }

  // Round the result to avoid overflow
  if (typeof result === 'number' && !isNaN(result)) {
    result = roundResult(result);
  }

  currentInput = result.toString();
  previousOutput.textContent = `${previousInput} ${currentOperator} ${num2} =`;
  display.textContent = currentInput;
  previousInput = '';
  currentOperator = '';
}

// Function to handle percentage input
function handlePercentage() {
  if (currentInput === '') return;
  currentInput = (parseFloat(currentInput) / 100).toString(); // Convert to decimal
  display.textContent = currentInput;
}

// Function to round the result to 5 decimal places
function roundResult(number) {
  return Math.round(number * 100000) / 100000;
}
