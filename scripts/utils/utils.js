// Funktion som returnerar en slumpmässig siffra beroende på hur stor arrayen är.
export default function randomNumber(array) {
    return Math.floor(Math.random() * array.length);  
}

// Funktion som hämtar hem element
function getElement(selector) {
    return document.querySelector(selector);
}

function btnAnimation(btn) {
    btn.style.border = '3px solid black';
    btn.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        btn.style.border = '1px solid black';
        btn.style.transform = 'scale(1.00)';
    }, 200);
}


export { getElement, btnAnimation }