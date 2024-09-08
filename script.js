let display = document.querySelector('#display-container');
let op = null;
let firstNumber = null;
let secondNumber = null;
let replaceDisplay = true;

const MAX_LENGTH = 8;

document.body.addEventListener('keypress', (event) => {
    console.log(event.key);
    if (event.key.charCodeAt(0) >= 48 && event.key.charCodeAt(0) <= 57) {
        changeDisplay(event.key)
    }
    else if (event.key === '.' && !display.textContent.includes('.')) {
        display.textContent += '.';
    }
    else if (event.key === 'backspace' && display.textContent !== '0') {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "" || display.textContent === "-0") 
            display.textContent = '0';   
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key == 'Backspace' && display.textContent !== '0') {
        display.textContent = display.textContent.slice(0, -1);
        if (display.textContent === "" || display.textContent === "-0")
            display.textContent = '0';
    }
})


function resetValues() {
    op = null;
    firstNumber = null;
    secondNumber = null;
    replaceDisplay = true;
}

function getDisplayLength() {
    if (display.textContent.includes('.')) {
        let arrValue = display.textContent.split('.');
        return arrValue[0].length + arrValue[1].length
    }
    else {
        return display.textContent.length;
    }
    
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function mutiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0)
        return "kek";
    return a / b;
}

function roundLength(value) {
    valueStr = String(value);
    if (!valueStr.includes('.') && valueStr.length > MAX_LENGTH) { 
        return NaN;
    }
    else if (valueStr.includes('.')) {
        let valueArr = valueStr.split('.');
        let totalLength = valueArr[0].length + valueArr[1].length;
        let wholeDigitsLen = valueArr[0].length;
        if (totalLength > MAX_LENGTH && wholeDigitsLen < MAX_LENGTH) {
            return value.toPrecision(MAX_LENGTH - wholeDigitsLen);
        }
    }
        
    return value;
}

function operate(op, num1, num2) {
    let result;
    switch (op) {
        case '+':
            result = add(num1, num2)
            break;
        case '-':
            result = subtract(num1, num2)
            break;
        case '*':
            result = mutiply(num1, num2)
            break;
        case '/':
            result = divide(num1, num2)
            break;
    }


    return Number(roundLength(result));
}


function changeDisplay(equationStr) {
      
    if (display.textContent === '0' || replaceDisplay === true) { 
        display.textContent = equationStr;
        replaceDisplay = false;
    }
    else if(getDisplayLength() < MAX_LENGTH)
        display.textContent += equationStr;
    
}

//assign events to number buttons
let display_btn = document.querySelectorAll('.display-btn');
display_btn.forEach(element => { 
    element.addEventListener('click', ()=>changeDisplay(element.textContent));
});

//assign event to decimal button
let decimal_btn = document.querySelector('#decimal-btn');
decimal_btn.addEventListener('click', () => { 
    let displayStr = display.textContent;

    if (!displayStr.includes('.') || replaceDisplay) {
        if (replaceDisplay)
            display.textContent = '0.';
        else
            display.textContent += '.';
        replaceDisplay = false;
    }
});


function utility_operate(utility) {
    switch (utility) {
        case 'AC':
            display.textContent = 0;
            resetValues();
            break;
        case '+/-':
            display.textContent *= -1;
            break;
        case '%':
            display.textContent /= 100;
    } 
}

//assign events to utility buttons
let utility_btn = document.querySelectorAll('.utility-btn');
utility_btn.forEach((element) => {
    element.addEventListener('click',()=>utility_operate(element.textContent));
});

//assign events to operation buttons
let op_btn = document.querySelectorAll('.operation-btn');
op_btn.forEach((element) => {
    element.addEventListener('click', () => {
        if (op !== null) {
            evaluate();
        }
        op = element.innerText;
        firstNumber = display.textContent;
        replaceDisplay = true;
    });
});

function evaluate() {
    let result;
    if (op !== null) {
        secondNumber = display.textContent;
        result = operate(op, Number(firstNumber), Number(secondNumber));
        display.textContent = result;
        replaceDisplay = true;
        op = null;
    }
}

let equal_btn = document.querySelector('#equal-btn');
equal_btn.addEventListener('click', evaluate);

