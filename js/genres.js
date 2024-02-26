import {listData, movieByGenre} from "./utils.js"

let collection = [];

const out = document.getElementById("container");
const chosenOne = document.getElementById("genreSelector");

async function collectMovies() {
    try {
        const api = `https://v2.api.noroff.dev/square-eyes`;
        const response = await fetch(api);
        const data = await response.json();

        collection = data.data;

        listData(collection, out);

        chosenOne.addEventListener("change", () => {
            const genreSelected = chosenOne.value;
            const filteredMovies = movieByGenre(collection, genreSelected);
            listData(filteredMovies, out);
        })
    } catch(error) {
        console.error("Could not fetch data", error)
        out.innerHTML = "Could not fetch data"
    }
}

collectMovies();

