// Selectors
const curDisplay = document.getElementById('current-display')
const historyDisplay = document.getElementById('history-display')
const btnCont = document.getElementById('btn-container');
const numCont = document.getElementById('num-container')
const fnCont = document.getElementById('fn-container');
const drkToggle = document.getElementById('switch');

const r1 = document.getElementById('r1')
const r2 = document.getElementById('r2')
const r3 = document.getElementById('r3')
const r4 = document.getElementById('r4')

// Global Variables
let operator = '';    
let num1 = 0;
let num2 = 0;

function createButtons(){
    const ints = 10
    for(let i = 0; i < ints; i++){
        // create number buttons
        let numBtn = document.createElement('button');
        numBtn.textContent = [i];
        numBtn.className = 'num-btn';
        // assign number buttons to rows
        if(numBtn.textContent <= 3 && numBtn.textContent > 0){
            r1.appendChild(numBtn);
        }
        else if(numBtn.textContent >= 4 && numBtn.textContent <= 6){
            r2.appendChild(numBtn);
        }
        else if(numBtn.textContent >= 7){
            r3.appendChild(numBtn);
        }
        else if(numBtn.textContent == 0){
            r4.appendChild(numBtn);
        }
    }
    // create function buttons 
    const opts = ['c','+','-','*','/','='];
    for(let i = 0; i < opts.length; i++){

        let item = document.createElement('button');
        item.textContent = opts[i];
        // sort out non-operator buttons
        if(item.textContent == '='){
            item.className = "submit"
            item.id = "submit"
        }
        else if(item.textContent == 'c'){
            item.className = "clear"
            item.id = "clear"
        }
        else{
            item.className = "func-btn"
        }
        fnCont.appendChild(item);
    }
}

// calculator logic
function calculate(arg){
    let result = '';
    switch(arg){
        case '+':
            result = parseInt(num1) + parseInt(num2)
            break;
        case '-':
            result = num1 - num2
            break;
        case '*':
            result = num1 * num2
            break;
        case '/':
            result = num1 / num2
            break;
    }
    return result;    
}

// hide history when empty
function hideHistory(){
    if(historyDisplay.textContent == ''){
        historyDisplay.style.width = "0px"
        historyDisplay.style.display = 'none';
        curDisplay.style.width = "90%";
    }
    else{
        historyDisplay.style.width = "30%"
        historyDisplay.style.display = 'block';
        curDisplay.style.width = "50%";
    }
}



// Load app
window.addEventListener('DOMContentLoaded', ()=>{
    createButtons();
    hideHistory();
})



// Dark/light mode toggle (THERE IS NO GOD)
drkToggle.addEventListener('change', (e) =>{

    console.info("toggle Dark mode")
    
    const body = document.body;
    const appCont = document.getElementById('app-container');
    const displayCont = document.getElementById('display-container')
    const numButtons = document.getElementsByClassName('num-btn')
    const funcButtons = document.getElementsByClassName('func-btn')
    const clear = document.getElementById('clear')
    const submit = document.getElementById('submit')       

    // Light Mode
    if(drkToggle.checked){
        // container backgrounds
       body.style.backgroundColor = "var(--main-bg-light)";
       appCont.style.backgroundColor = "var(--app-bg-light)";
       displayCont.style.backgroundColor = "var(--display-cont-light)"
        // main display
       curDisplay.style.backgroundColor = "var(--app-bg-light)";
       curDisplay.style.color = "var(--primary-light)";
        // history display
       historyDisplay.style.backgroundColor = "var(--history-bg-light)"
       historyDisplay.style.color = "var(--primary-light)" 
        //num buttons
        for (let i = 0; i < numButtons.length; i++){
            numButtons[i].style.backgroundColor = "var(--btn-bg-light)";
            numButtons[i].style.color = "var(--primary-light)";
        };
        // func buttons
        for (let i = 0; i < funcButtons.length; i++){
            funcButtons[i].style.backgroundColor = "var(--fnc-light)";
            funcButtons[i].style.color = "var(--primary-light)";
        };
        // clear button
        clear.style.backgroundColor = "var(--clear-bg-light)"
        // submit button
        submit.style.backgroundColor = "var(--submit-bg-light)"
    }   
    // (KILL ME) 
    
    // Dark Mode
    else{
        // container backgrounds
        body.style.backgroundColor = "var(--main-bg)";
        appCont.style.backgroundColor = "var(--app-bg)";
        displayCont.style.backgroundColor = "var(--display-cont)"
        // main display
        curDisplay.style.backgroundColor = "var(--app-bg)";
        curDisplay.style.color = "var(--primary-font)";
        // history display
        historyDisplay.style.backgroundColor = "var(--history-bg)"
        historyDisplay.style.color = "var(--primary-font)"
        //num buttons
        for (let i = 0; i < numButtons.length; i++){
            numButtons[i].style.backgroundColor = "var(--btn-bg)"
            numButtons[i].style.color = "var(--primary-font)";
        }
        // func buttons
        for (let i = 0; i < funcButtons.length; i++){
            funcButtons[i].style.backgroundColor = "var(--fnc-bg)";
            funcButtons[i].style.color = "var(--primary-font)";
        }
        // clear button
        clear.style.backgroundColor = "var(--clear-bg)"
        // submit button
        submit.style.backgroundColor = "var(--submit-bg)"
    }

})


// primary event listener
btnCont.addEventListener('click', (e)=>{
    // local variables
    target = e.target;
    currentStr = curDisplay.textContent
    memory = historyDisplay.textContent

    
    // add numbers to display
    if(target.className == "num-btn"){

        console.info("num-btn", target)
        curDisplay.textContent += target.textContent 
    }
    // set operator and current display string to memory 
    else if(target.className == "func-btn"){

        console.info("func-btn", target)
        num1 = curDisplay.textContent;
        
        if(num1 == ''){
           num1 = 0
        }
        // set operator and display to memory and clear display
        operator = target.textContent;
        curDisplay.textContent = '';
        historyDisplay.innerHTML = `${num1} ${operator}`;
        hideHistory();

    }
    // clear memory and reset the displays
    else if(target.className == "clear"){

        console.info("func-btn", target)
        num1 = 0
        num2 = 0
        historyDisplay.textContent = '';
        curDisplay.textContent = ''
        hideHistory();

    }
    // send display to memory and pass variables in memory to calc fucntion 
    else if(target.className == "submit"){

        console.info("func-btn", target)
        num2 = curDisplay.textContent
        
        if(num2 == ''){
           num2 = 0
        }
                
        curDisplay.textContent = calculate(operator);
        historyDisplay.innerHTML = `${num1} ${operator} ${num2} =`;
    }

})