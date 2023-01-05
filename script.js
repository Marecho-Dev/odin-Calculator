let operator = "";
let currentValue = [];
let display = "";
function operate(operator,x,y){

}
function changeDisplay(x){
    if(display != ""){
        console.log(display);
        display = display+x;
    }
    else{
        console.log("'" + display + "'");
    display = x;
    }
    const output = document.querySelector('.Output');
    output.textContent = display;
}
const buttons = document.querySelectorAll('.number');
buttons.forEach((button)=>{
    button.addEventListener('click', ()=> {
        changeDisplay(button.textContent);
        console.log(display);
        
    });
});
