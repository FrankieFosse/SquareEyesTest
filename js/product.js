import {listData, productDetails} from "./utils.js"

const out = document.getElementById("myProduct");
const status = document.getElementById("myStatus");
let collection = []

let params = new URL (document.location).searchParams;

let id = params.get("id");
//console.log(id);

async function getMovieById() {
    try {
        const api = `https://v2.api.noroff.dev/square-eyes/${id}`;
        const response = await fetch (api);
        const obj = await response.json();
        status.innerHTML = "";

        collection = obj.data;
        //console.log(collection);

        document.title = collection.title;
        productDetails(collection, out);

    } catch (error) {
        console.error(error);
        status.innerHTML = "Something is wrong";
    }
}

getMovieById();