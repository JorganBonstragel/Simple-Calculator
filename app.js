// Selectors
const curDisplay = document.getElementById('current-display')
const historyDisplay = document.getElementById('history-display')
const btnCont = document.getElementById('btn-container');
const numCont = document.getElementById('num-container')
const fnCont = document.getElementById('fn-container')

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
        }
        else if(item.textContent == 'c'){
            item.className = "clear"
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
        curDisplay.style.width = "60%";
    }
}



// Load app
window.addEventListener('DOMContentLoaded', ()=>{
    createButtons();
    hideHistory();
})

// primary event listener
btnCont.addEventListener('click', (e)=>{
    // local variables
    target = e.target;
    currentStr = curDisplay.textContent
    memory = historyDisplay.textContent

    

    if(target.className == "num-btn"){

        console.info("num-btn", target)
        curDisplay.textContent += target.textContent 
    }

    else if(target.className == "func-btn"){

        console.info("func-btn", target)
        num1 = curDisplay.textContent;
        operator = target.textContent;
        curDisplay.textContent = '';
        historyDisplay.innerHTML = `${num1} ${operator}`;
        hideHistory();

    }
    else if(target.className == "clear"){

        console.info("func-btn", target)
        num1 = 0
        num2 = 0
        historyDisplay.textContent = '';
        curDisplay.textContent = ''
        hideHistory();

    }
    else if(target.className == "submit"){

        console.info("func-btn", target)
        num2 = curDisplay.textContent
        curDisplay.textContent = calculate(operator);
        historyDisplay.innerHTML = `${num1} ${operator} ${num2} =`;
    }

})