let display = document.querySelector('#display-container');
let op = null;
let firstNumber = null;
let secondNumber = null;
let replaceDisplay = true;


function resetValues() {
    op = null;
    firstNumber = null;
    secondNumber = null;
    replaceDisplay = true;
}

function add(a, b) {
    return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
    return a - b;
}

function mutiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
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

    return result;
}


function changeDisplay(element) {
    
    let equationStr = display.textContent;
    
    if (equationStr === '0' || replaceDisplay === true) { //if display value is 0 or if replaceDisplay is true
        display.textContent = element.textContent;
        replaceDisplay = false;
    }
    else 
        display.textContent += element.textContent;

    if (op !== null)
        secondNumber = display.textContent;

}
//assign events to number buttons
let display_btn = document.querySelectorAll('.display-btn');
display_btn.forEach(element => { 
    element.addEventListener('click', ()=>changeDisplay(element));
});

//assign event to decimal button
let decimal_btn = document.querySelector('#decimal-btn');
decimal_btn.addEventListener('click', () => { 
    let displayStr = display.textContent;

    if (!displayStr.includes('.'))
        display.textContent += '.';
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
        op = element.innerText;
        firstNumber = display.textContent;
        replaceDisplay = true;
    });
});

let equal_btn = document.querySelector('#equal-btn');
equal_btn.addEventListener('click', () => {
    let result;
    if (op !== null) {
        if (secondNumber !== null)
            result = operate(op, firstNumber, secondNumber);
        else
            result = operate(op, firstNumber, firstNumber);
    
        display.textContent = result;
    }
})

