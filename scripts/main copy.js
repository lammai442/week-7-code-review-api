import fetchMemes from "./modules/api.js";
import randomNumber, { getElement, btnAnimation } from "./utils/utils.js";


// Variabeln som innehåller datan för all 100 meme objekt 
// Här måste await finnas med för att den ska vänta på att API ska köras klart.
let memes = await fetchMemes();

// Starta från början så att det finns en bild
generateMeme()

// Kodreferens
let btnRef = getElement('#formBtn');
let formRef = getElement('#form');
let formInput = getElement('#formInput');

// Eventlyssnare på generate-knappen för att få nya bilder.
btnRef.addEventListener('click', (event) => {
    event.preventDefault();
    generateMeme();
    btnAnimation(event.target);
});

// Skicka med meme-arrayen i denna funktion som ska skapa kortet.
function displayMeme(meme) {
    let figureImgRef = getElement('#figureImg');
    let figureSubTitleRef = getElement('#formSubTitle');
    // Lägger till memes namn till subtitle
    figureSubTitleRef.textContent = `${meme.name}`  
    // Ger rätt url till img-elementet
    figureImgRef.src = `${meme.url}`;
}

function generateMeme() {    
    // Spara en random nummer där längden på den arrayen skickas med till funktionen randomNumber för att den ska ta hänsyn till hur många det finns i den arrayen
    let arrayNumber = randomNumber(memes.data.memes);    
    // Med det nya numret så anger den i orginala arrayen och letar upp vilken plats den är i och sparas i en ny array som endast innehåller den specifika memen.
    let meme = memes.data.memes[arrayNumber];  
    // Anropar funktionen som använder sig av info från meme-arrayen.
    displayMeme(meme);
}

function setupSearchForm(memes) {
    formInput.addEventListener('input', (event) => {
        console.log(event.target.value);
        
    })
}

