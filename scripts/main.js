import fetchMemes from "./modules/api.js";
import randomNumber, { getElement, btnAnimation } from "./utils/utils.js";

pageSetup()

async function pageSetup() {
    // Variabeln som innehåller datan för all 100 meme objekt 
    // Här måste await finnas med för att den ska vänta på att API ska köras klart.
    let memes = await fetchMemes(); 
    
    // Starta från början så att det finns en bild
    generateMeme(memes)
    
    // Eventlyssnare på generate-knappen för att få nya bilder.
    btnRef.addEventListener('click', (event) => {
        event.preventDefault();
        generateMeme(memes);
        btnAnimation(event.target);
    });

    setupSearchForm(memes);
}

// Kodreferens
let btnRef = getElement('#formBtn');
let formInputRef = getElement('#formInput');


// Skicka med meme-arrayen i denna funktion som ska skapa kortet.
function displayMeme(meme) {
    let figureImgRef = getElement('#figureImg');
    let figureSubTitleRef = getElement('#formSubTitle');
    // Lägger till memes namn till subtitle
    figureSubTitleRef.textContent = `${meme.name}`  
    // Ger rätt url till img-elementet
    figureImgRef.src = `${meme.url}`;
}

function generateMeme(memes) {    
    // Spara en random nummer där längden på den arrayen skickas med till funktionen randomNumber för att den ska ta hänsyn till hur många det finns i den arrayen   
    let arrayNumber = randomNumber(memes.data.memes);
        
    // Med det nya numret så anger den i orginala arrayen och letar upp vilken plats den är i och sparas i en ny array som endast innehåller den specifika memen.
    let meme = memes.data.memes[arrayNumber];      
    // Anropar funktionen som använder sig av info från meme-arrayen.
    displayMeme(meme);
}

// Funktionen för sökning
function setupSearchForm(memes) {
    // En eventlyssnare på inputfältet som kommer göra något för varje bokstav som läggs in här.
    formInputRef.addEventListener('input', (event) => {
        // Här skickas det värde som skrivs in i inputfältet vidare till funktionen.
        updateAutoCompleteList(event.target.value.toLowerCase(), memes.data.memes);
    })

    // Denna eventlyssnare letar efter om Enter trycks in och då utförs följande
    formInputRef.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            let inputValue = formInputRef.value.toLowerCase();

            const matchingMemes = memes.data.memes.filter(meme => meme.name.toLowerCase().includes(inputValue));
            displayMeme(matchingMemes[0]);
        }
    })
}

// Funktion som lägger till nya listitems vid sökningarna.
function updateAutoCompleteList(input, meme) { 
    const listRef = getElement('#formAutoCompleteList');
    
    // Denna behövs för att ifall det är helt tomt i sökfältet så ska den tömma alla li.
    if(input.trim() === '') {
        listRef.innerHTML = '';
        return;
    }

    // Sparar en ny array som letar efter alla meme.names som matchar med input.
    const matchingMemes = meme.filter(meme => meme.name.toLowerCase().includes(input));

    // Tömmer söklistan
    listRef.innerHTML = '';
    // Här skapas nya lielement för varje bokstav som läggs in.
    for(let i = 0; i < matchingMemes.length; i++ ) {
        // Genom att ha denna if-sats så kommer den att ta bort alla arrays som är över 10.
        if(i === 10) break;
        const listItemRef = document.createElement('li');
        listItemRef.classList.add('form__list-item');        
        listItemRef.textContent = matchingMemes[i].name;
        // Ifall man klickar på den listitem i sökbaren så kommer den då att lägga in den texten i inputfältet
        listItemRef.addEventListener('click', (event) => {
            getElement('#formInput').value = event.target.textContent;        
            // När orden är tillagd på sökfältet så tömms hela listRef
            listRef.innerHTML = '';
        } )
        listRef.appendChild(listItemRef);
    }   
}