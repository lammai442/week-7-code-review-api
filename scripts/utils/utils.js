// Funktion som returnerar en slumpmässig siffra beroende på hur stor arrayen är.
function randomNumber(array) {
    return Math.floor(Math.random() * array.length);
}

// Funktion som hämtar hem element
function getElement(selector) {
    return document.querySelector(selector);
}

// Funktion som skapar en animation på knappen
function btnAnimation(btn) {
    // Omedelbart ändras knappens border och storlek
    btn.style.border = '3px solid cyan';
    btn.style.transform = 'scale(1.05)';

    // Efter 200ms återgår knappen till sitt ursprungliga utseende
    setTimeout(() => {
        btn.style.border = '1px solid cyan';
        btn.style.transform = 'scale(1.00)';
    }, 200);
}

export { getElement, btnAnimation, randomNumber };
