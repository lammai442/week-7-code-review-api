import fetchMemes from './modules/api.js';
import { getElement, btnAnimation } from './utils/utils.js';
import { generateMeme } from './modules/display-meme.js';
import { setupSearchForm } from './modules/search.js';
pageSetup();

async function pageSetup() {
    // Variabeln som innehåller datan för all 100 meme objekt
    // Här måste await finnas med för att den ska vänta på att API ska köras klart.
    let memes = await fetchMemes();
    
    // Starta från början så att det finns en bild
    generateMeme(memes);
    
    let btnRef = getElement('#formBtn');
    // Eventlyssnare på generate-knappen för att få nya bilder.
    btnRef.addEventListener('click', (event) => {
        event.preventDefault();
        // Funktion som genererar en meme. Arrayen med 100 meme objekt skickas med.
        generateMeme(memes);
        // Vid klick på knappen så kommer det att köras en animation
        btnAnimation(event.target);
    });

    // Startar funktionen så att det går att göra sökningar.
    setupSearchForm(memes);
}
