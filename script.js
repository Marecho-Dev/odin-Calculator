let operator = "";
let currentValue = [];
let display = "";
let decimalCounter = 0;

function operate(operator,x,y){

}


function changeDisplay(x,buttonType){
    const output = document.querySelector('.Output');
    if((decimalCounter == 0 || x!=".") && buttonType=="number"){
        if(display != ""){
            console.log(display);
            display = display+x;
        }
        else{
            console.log("'" + display + "'");
        display = x;
        }
        if(x=="."){
            decimalCounter=1;
        }
        output.textContent = display;
        
    }
    else if(currentValue.length<2){
        currentValue.push(display);
        display = display+x;
        currentValue.push(x);
        console.log(currentValue);
        display = "";
        output.textContent = currentValue[0] + currentValue[1] + display;
        decimalCounter = 0;
        
    }
    else if(buttonType == "equal"){
        display=display+x;
        output.textContent = calculate(currentValue[1],currentValue[0],display);
        console.log(calculate(currentValue[1],currentValue[0],display));

    }

    
}
function parser(x){
    if (x.search(".") != -1){
        console.log(x); 
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
            console.log("calculate "+ x);
            console.log("calculate "+ y);
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
        console.log(display);
        
    });
});

const operators = document.querySelectorAll('.operator');
operators.forEach((operator)=>{
    operator.addEventListener('click',()=>{
        changeDisplay(operator.textContent,"operator");
        console.log(operator);
    })

})

const equal = document.querySelector('.equal');
equal.addEventListener('click',()=>{
    changeDisplay(equal.textContent,"equal");
    console.log(equal.textContent);
})