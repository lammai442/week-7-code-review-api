import { displayMeme } from "./display-meme.js";
import { getElement } from "../utils/utils.js";

// Funktionen för sökning
export function setupSearchForm(memes) {
    let formInputRef = getElement('#formInput');
    // En eventlyssnare på inputfältet som kommer göra något för varje bokstav som läggs in här.
    formInputRef.addEventListener('input', (event) => {
        // Här skickas det värde som skrivs in i inputfältet vidare till funktionen och även datan för alla 100 meme objekt.
        updateAutoCompleteList(event.target.value.toLowerCase(), memes.data.memes);
    });

    // Denna eventlyssnare letar efter om Enter trycks in och då utförs följande
    formInputRef.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let inputValue = formInputRef.value.toLowerCase();

            const matchingMemes = memes.data.memes.filter((meme) =>
                meme.name.toLowerCase().includes(inputValue)
            );
            displayMeme(matchingMemes[0]);
        }
    });
}

// Funktion som lägger till nya listitems vid sökningarna.
export function updateAutoCompleteList(input, meme) {
    const listRef = getElement('#formAutoCompleteList');

    // Denna behövs för att ifall det är helt tomt i sökfältet så ska den tömma alla li.
    if (input.trim() === '') {
        listRef.innerHTML = '';
        return;
    }

    // Sparar en ny array som letar efter alla meme.names som matchar med input.
    const matchingMemes = meme.filter((meme) => meme.name.toLowerCase().includes(input));

    // Tömmer söklistan
    listRef.innerHTML = '';
    // Här skapas nya lielement för varje bokstav som läggs in.
    for (let i = 0; i < matchingMemes.length; i++) {
        // Genom att ha denna if-sats så kommer den att ta bort alla arrays som är över 10.
        if (i === 5) break;
        const listItemRef = document.createElement('li');
        listItemRef.classList.add('form__list-item');
        listItemRef.textContent = matchingMemes[i].name;
        // Ifall man klickar på den listitem i sökbaren så kommer den då att lägga in den texten i inputfältet
        listItemRef.addEventListener('click', (event) => {
            getElement('#formInput').value = event.target.textContent;
            // När orden är tillagd på sökfältet så tömms hela listRef
            listRef.innerHTML = '';
        });
        listRef.appendChild(listItemRef);
    }
}