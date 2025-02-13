import { getElement, randomNumber } from '../utils/utils.js';

// Skicka med meme-arrayen i denna funktion som ska skapa kortet.
export function displayMeme(meme) {
    let figureImgRef = getElement('#figureImg');
    let figureSubTitleRef = getElement('#formSubTitle');
    // Lägger till memes namn till subtitle
    figureSubTitleRef.textContent = `${meme.name}`;
    // Ger rätt url till img-elementet
    figureImgRef.src = `${meme.url}`;
}

// Funktion som genererar en ny meme
export function generateMeme(memes) {
    // Spara en random nummer där längden på den arrayen skickas med till funktionen randomNumber för att den ska ta hänsyn till hur många det finns i den arrayen
    let arrayNumber = randomNumber(memes.data.memes);

    // Med det nya numret så anger den i orginala arrayen och letar upp vilken plats den är i och sparas i en ny array som endast innehåller den specifika memen.
    let meme = memes.data.memes[arrayNumber];
    // Anropar funktionen som använder sig av info från meme-arrayen.
    displayMeme(meme);
}
