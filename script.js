let operator = "";
let display = "";
let previousValue = "";
let currentValue = "";
let answer = "";
let decimalCounter = 0;
let operatorCounter = 0;

function operate(operator,x,y){

}

function stringBuilder(x,buttonType){
    console.log("----------------");
    if (x=="."){
        console.log("calling part 1");
        if (decimalCounter == 0){
            currentValue = currentValue + x;
            decimalCounter+=1;
        }
    }
    else if (buttonType=="number") {
        console.log("calling part 2");
        currentValue = currentValue + x;
    }
    else if (buttonType=="operator"){
        console.log("calling part 3");
        if (operatorCounter == 0){
            console.log(operatorCounter);
            operator = x;
            previousValue = currentValue;
            currentValue = "";
            operatorCounter+=1;
            decimalCounter=0;
        }
        else{
            console.log(operatorCounter);
            console.log("the operator is " + operator);
            previousValue = calculate(operator,previousValue,currentValue);
            answer = "";
            currentValue = "";
            operator = x;
            decimalCounter = 0;

        }
    }
    else if (buttonType=="equal"){
        console.log("calling part 4");
        console.log(operator);
        console.log(previousValue);
        console.log(currentValue);
        answer = "="+calculate(operator,previousValue,currentValue);

    }
    
    console.log(previousValue + " is the previous Value");
    console.log(currentValue + " is the current value");
    console.log("the operator is " + operator);
    console.log("---------------");
    changeDisplay();
}

function changeDisplay(){
    const output = document.querySelector('.Output');
    output.textContent = previousValue+operator+currentValue+answer;
}

function parser(x){
    if (x.search(".") != -1){
        return parseFloat(x);
    }
    else {
        return parseInt(x);
    }
}
function calculate(operator,a,b){
    let x = parser(a);
    let y = parser(b);
    switch (operator){
        case "*":
            return x*y;
            break;
        case "/":
            return x/y;
            break;
        case "-":
            return x-y;
            break;
        case "+":
            return x+y;
            break;
    }
}


const buttons = document.querySelectorAll('.number');
buttons.forEach((button)=>{
    button.addEventListener('click', ()=> {
        changeDisplay(button.textContent,"number");
        stringBuilder(button.textContent,"number");
        // console.log(display);
        
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator)=>{
    operator.addEventListener('click',()=>{
        changeDisplay(operator.textContent,"operator");
        stringBuilder(operator.textContent,"operator");
        // console.log(operator);
    })

})

const equal = document.querySelector('.equal');
equal.addEventListener('click',()=>{
    changeDisplay(equal.textContent,"equal");
    stringBuilder(equal.textContent,"equal");
    // console.log(equal.textContent);
})