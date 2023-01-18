let operator = "";
let display = "";
let previousValue = "";
let currentValue = "";
let answer = "";
let decimalCounter = 0;
let operatorCounter = 0;
let equalCounter = 0;
let errorCounter = 0;

function clear(){
    if (equalCounter == 1){
        allClear();
    }
    else if(currentValue != ""){
        currentValue = currentValue.substring(0,currentValue.length-1);
    }
    else if(operator != ""){
        operator = operator.substring(0,operator.length-1);
        operatorCounter = 0;
        currentValue=previousValue;
        previousValue="";
    }
}

function scientificNotater(x){
    if(x.toString().search("e") != -1){
         return round(x.toString().split('e')[0])+"e"+x.toString().split('e')[1];
    }
    else{
        return x;
    }

}

function allClear(){
    operator = "";
    display = "";
    previousValue = "";
    currentValue ="";
    answer = "";
    decimalCounter = 0;
    operatorCounter = 0;
    equalCounter = 0;
    changeDisplays();
    
}

function percent(){
    currentValue = (parser(currentValue)/100).toString();
}

function sign(){
    currentValue = (parser(currentValue)*-1).toString();
}

function stringBuilder(x,buttonType){
    if (errorCounter == 1){
        errorCounter = 0;
        allClear();
        stringBuilder(x,buttonType);
    }
    else if (x=="." && currentValue.length < 15){
        if (decimalCounter == 0){
            currentValue = currentValue + x;
            decimalCounter+=1;
        }
    }
    else if (buttonType=="number" && currentValue.length<14) {
        if (answer == ""){
            currentValue = currentValue + x;
        }
    }
    else if (buttonType=="operator"){
        if (x == "C"){
            clear();
        }
        else if(x=="AC"){
            allClear();
        }
        else if (x=="%"){
            percent();
        }
        else if (x=="+/-"){
            sign();
        }
        else if (operatorCounter == 0 && currentValue != ""){
            operator = x;
            previousValue = currentValue;
            currentValue = "";
            operatorCounter+=1;
            decimalCounter=0;
        }
        else if (operatorCounter == 1 && currentValue == ""){
            operator = x;
        }
        else{
            console.log("calling this part");
            equalCounter = 0;
            previousValue = operate(operator,previousValue,currentValue).toString();
            answer = "";
            currentValue = "";
            operator = x;
            decimalCounter = 0;

        }
    }
    else if (buttonType=="equal" && previousValue != "" && currentValue != ""){
        equalCounter = 1;
        answer = scientificNotater(operate(operator,previousValue,currentValue));

    }
    changeDisplays();
}


function changeDisplays(){
    const output = document.querySelector('.active');
    const equationOutput = document.querySelector('.equation');
    if (errorCounter == 1){
        output.textContent = "Cannot divide by 0";
        equationOutput.textContent = "0";
    }
    else if (operator == "" && display == "" && previousValue == "" && currentValue == "" && answer == "" && decimalCounter == 0 && operatorCounter == 0){
        output.textContent = "0";
        equationOutput.textContent = "0";
    }
    else if(answer =="" && operator == ""){
        equationOutput.textContent = currentValue;
        output.textContent = currentValue;
    }
    else if(answer ==""){
        equationOutput.textContent = scientificNotater(previousValue)+operator+currentValue;
        output.textContent = currentValue;
    }
    else{
        equationOutput.textContent = scientificNotater(previousValue)+operator+scientificNotater(currentValue)+"=";
        output.textContent = answer;
    }
}

function parser(x){
    if (x.search(".") != -1){
        return parseFloat(x);
    }
    else {
        return parseInt(x);
    }
}

function round(x){
    return Math.round(x*100)/100
}

function divide(x,y){
    if (y==0){
        errorCounter = 1;
    }
    else{
        return round(x/y);
    }
}

function multiply(x,y){
    return round(x*y);
}

function addition(x,y){
    return round(x+y);
}

function subtraction(x,y){
    return round(x-y);
}
function operate(operator,a,b){
    let x = parser(a);
    let y = parser(b);
    switch (operator){
        case "*":
            return multiply(x,y);
            break;
        case "/":
            return divide(x,y);
            break;
        case "-":
            return subtraction(x,y);
            break;
        case "+":
            return addition(x,y);
            break;
    }
}


const buttons = document.querySelectorAll('.number');
buttons.forEach((button)=>{
    button.addEventListener('click', ()=> {
        // changeDisplay(button.textContent,"number");
        stringBuilder(button.textContent,"number");
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, "100")
        
    });
    window.addEventListener("keydown", function(e) {
        if(e.key == button.textContent){
            stringBuilder(button.textContent, "number");
            button.classList.add('pressed');
            setTimeout(() => {
                button.classList.remove('pressed');
            }, "100")
        }
        
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator)=>{
    operator.addEventListener('click',()=>{
        stringBuilder(operator.textContent,"operator");
        operator.classList.add('pressed');
        setTimeout(() => {
            operator.classList.remove('pressed');
        }, "50")
    })
    window.addEventListener("keydown", function(e) {
        if(e.key == operator.textContent){
            stringBuilder(operator.textContent, "operator");
            operator.classList.add('pressed');
            setTimeout(() => {
                operator.classList.remove('pressed');
            }, "50")
        }
    });

})


const equal = document.querySelector('.equal');
equal.addEventListener('click',()=>{
    stringBuilder(equal.textContent,"equal");

})
window.addEventListener("keydown", function(e) {
    if(e.key == "=" || e.key == "Enter"){
        stringBuilder(equal.textContent, "equal");
        
    }
});
window.addEventListener("keydown", function(e) {
    if(e.key == "Backspace"){
        clear();
        changeDisplays();
    }
    
});



