
let display = document.querySelector('#display-container');

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
    
    if (equationStr === '0') 
        display.textContent = element.textContent;
    else 
        display.textContent += element.textContent;
}

let display_btn = document.querySelectorAll('.display-btn');
display_btn.forEach(element => { 
    element.addEventListener('click', ()=>changeDisplay(element));
});

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
            break;
        case '+/-':
            display.textContent *= -1;
            break;
        case '%':
            display.textContent /= 100;
    } 
}

let utility_btn = document.querySelectorAll('.utility-btn');
utility_btn.forEach((element) => {
    element.addEventListener('click',()=>utility_operate(element.textContent));
});