let operator = "";
let currentValue = 0;
let display;
function operate(operator,x,y){

}
function changeDisplay(x){
    display = x;
}
const buttons = document.querySelectorAll('.left');
buttons.forEach((button)=>{
    button.addEventListener('click', ()=> {
        changeDisplay(button.textContent);
    });
});
