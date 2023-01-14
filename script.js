let operator = "";
let display = "";
let previousValue = "";
let currentValue = "";
let answer = "";
let decimalCounter = 0;
let operatorCounter = 0;

function operate(operator,x,y){

}
function clear(){
    if(currentValue != ""){
        currentValue = currentValue.substring(0,currentValue.length-1);
    }
    else if(operator != ""){
        operator = operator.substring(0,operator.length-1);
        operatorCounter = 0;
        currentValue=previousValue;
        previousValue="";
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
    const output = document.querySelector('.Output');
    output.textContent = "0";
}

function stringBuilder(x,buttonType){
    if (x=="."){
        if (decimalCounter == 0){
            currentValue = currentValue + x;
            decimalCounter+=1;
        }
    }
    else if (buttonType=="number") {
        currentValue = currentValue + x;
    }
    else if (buttonType=="operator"){
        if (x == "C"){
            clear();
        }
        else if(x=="AC"){
            allClear();
        }
        else if (operatorCounter == 0){
            operator = x;
            previousValue = currentValue;
            currentValue = "";
            operatorCounter+=1;
            decimalCounter=0;
        }
        else{
            previousValue = calculate(operator,previousValue,currentValue).toString();
            answer = "";
            currentValue = "";
            operator = x;
            decimalCounter = 0;

        }
    }
    else if (buttonType=="equal" && previousValue != "" && currentValue != ""){
        answer = "="+calculate(operator,previousValue,currentValue);

    }
    changeDisplay();
}

function changeDisplay(){
    const output = document.querySelector('.Output');
    if (operator == "" && display == "" && previousValue == "" && currentValue == "" && answer == "" && decimalCounter == 0 && operatorCounter == 0){
        output.textContent = "0.";
    }
    else{
        output.textContent = previousValue+operator+currentValue+answer;
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
function calculate(operator,a,b){
    let x = parser(a);
    let y = parser(b);
    switch (operator){
        case "*":
            return round(x*y);
            break;
        case "/":
            return round(x/y);
            break;
        case "-":
            return round(x-y);
            break;
        case "+":
            return round(x+y);
            break;
    }
}


const buttons = document.querySelectorAll('.number');
buttons.forEach((button)=>{
    button.addEventListener('click', ()=> {
        // changeDisplay(button.textContent,"number");
        stringBuilder(button.textContent,"number");
        // console.log(display);
        
    });
    window.addEventListener("keydown", function(e) {
        if(e.key == button.textContent){
            stringBuilder(button.textContent, "number");
        }
        // console.log(display);
        
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator)=>{
    operator.addEventListener('click',()=>{
        // changeDisplay(operator.textContent,"operator");
        stringBuilder(operator.textContent,"operator");
        // console.log(operator);
    })
    window.addEventListener("keydown", function(e) {
        if(e.key == operator.textContent){
            stringBuilder(operator.textContent, "operator");
        }
        // console.log(display);
        
    });

})


const equal = document.querySelector('.equal');
equal.addEventListener('click',()=>{
    // changeDisplay(equal.textContent,"equal");
    stringBuilder(equal.textContent,"equal");
    // console.log(equal.textContent);
})
window.addEventListener("keydown", function(e) {
    if(e.key == "=" || e.key == "Enter"){
        stringBuilder(equal.textContent, "equal");
    }
    // console.log(display);
    
});
window.addEventListener("keydown", function(e) {
    if(e.key == "Backspace"){
        clear();
        changeDisplay();
    }
    
});