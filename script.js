//perform calculation
function operate(op, operand1, operand2) {
    const a = Number(operand1);
    const b = Number(operand2);
    if (op === '+') return (a + b).toString();
    if (op === '-') return (a - b).toString();
    if (op === '*') return (a * b).toString();
    if (op === '%') return (a % b).toString();
    if (op === '/' && operand2 != 0) {
        return (a / b).toString();
    } else {
        return 'ERROR';
    }
}

//operation performed when '=' button is clicked
function result() {
    if (displayValue && displayValue !== 'ERROR') {
        operandArray.push(displayValue);
        let res = operate(operator, operandArray[0], operandArray[1]);
        deactivateOperator(operator);
        clearDisplayText();
        displayValue = (res < 0) ? '' : res;
        displayText();
    }
}

//change the active class of button to deactivate
function deactivateOperator(op = null) {
    Array.from(operators).forEach(operator => {
        console.log(operator.textContent);
        if (op == null) {
            operator.classList.remove('active');
        }
        if (operator.textContent === op) operator.classList.remove('active');
    });
}

//display result in result box
function displayText() {
    inputBox.value = displayValue;
}

//All clear the result box
function clearDisplayText() {
    inputBox.value = '';
    displayValue = '';
    operandArray = [];
    deactivateOperator();
    operator = '';
}

// ----------------------------------------------------


const inputBox = document.querySelector('input');
const operands = document.querySelectorAll('.operand');
const operators = document.querySelectorAll('.operator');
const decimal = document.querySelector('.decimal');
const equal = document.querySelector('.equal');
const allClear = document.querySelector('.clear');
const deleteBtn = document.querySelector('.delete');


let displayValue = '';
let operandArray = [];
let operator;

//If clicked button is operand
Array.from(operands).forEach(operand => {
    operand.addEventListener('click', (e) => {
        let val = e.target.getAttribute('data-value');
        if (val === 'decimal') {
            if (!displayValue.includes('.')) {
                val = (displayValue == '' || displayValue === 0) ? '0.' : '.';
            } else {
                val = '';
            }
        }
        displayValue += val;
        displayText();
    });
});

//If clicked button is operator
Array.from(operators).forEach(op => {
    op.addEventListener('click', () => {
        if (displayValue != 0 && displayValue !== 'ERROR') {
            if (operandArray.length > 0) {
                deactivateOperator(op.textContent);
                result();
            }
            operator = op.textContent;
            op.classList.add('active');
            operandArray.push(displayValue);
            displayValue = '';
        }
    });
});

//If clicked button is =
equal.addEventListener('click', result);

//If clicked button is AC
allClear.addEventListener('click', () => {
    clearDisplayText();
});

//If clicked button is C
deleteBtn.addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1);
    if (displayValue.charAt(displayValue.length - 1) === '.') {
        displayValue = displayValue.slice(0, -1);
    }
    displayText();
});



