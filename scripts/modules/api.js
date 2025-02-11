// Funktion som hämtar ett API och returnerar det som ett promise.objekt 
export default async function fetchMemes() {
    return fetch('https://api.imgflip.com/get_memes')
    .then(response => response.json())
    .then(data => {return data;})
    .catch(error => console.log(error.message));
}