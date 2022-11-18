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

function appendOperand(val) {
    if (val === 'decimal') {
        if (!displayValue.includes('.')) {
            val = (displayValue == '' || displayValue === 0) ? '0.' : '.';
        } else {
            val = '';
        }
    }
    displayValue += val;
    displayText();
}

function clickOperator(op) {
    if (displayValue != 0 && displayValue !== 'ERROR') {
        if (operandArray.length > 0) {
            deactivateOperator(op);
            result();
        }
        operator = op;
        activateOperator(op);
        operandArray.push(displayValue);
        displayValue = '';
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
    operators.forEach(operator => {
        if (op == null) {
            operator.classList.remove('active');
        }
        if (operator.textContent === op) operator.classList.remove('active');
    });
}

function activateOperator(op) {
    operators.forEach(operator => {
        if (operator.textContent === op) operator.classList.add('active');
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

function deleteText() {
    displayValue = displayValue.slice(0, -1);
    if (displayValue.charAt(displayValue.length - 1) === '.') {
        displayValue = displayValue.slice(0, -1);
    }
    displayText();
}

//if keyBoard values are pressed
function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendOperand(e.key);
    if (e.key === '.') appendOperand('.');
    if (e.key === '=' || e.key === 'Enter') result();
    if (e.key === 'Backspace') deleteText();
    if (e.key === 'Escape') clearDisplayText();
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        clickOperator(e.key);
    }
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
operands.forEach(operand => {
    operand.addEventListener('click', (event) => {
        let val = event.target.getAttribute('data-value');
        appendOperand(val);
    });
});

//If clicked button is operator
operators.forEach(opr => {
    opr.addEventListener('click', (event) => {
        let val = event.target.getAttribute('data-value');
        clickOperator(val);
    });
});

//If clicked button is =
equal.addEventListener('click', result);

//If clicked button is AC
allClear.addEventListener('click', () => {
    clearDisplayText();
});

//If clicked button is C
deleteBtn.addEventListener('click', deleteText);

document.addEventListener('keydown', handleKeyboardInput);

