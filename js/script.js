import {listData} from "./utils.js";
const api = "https://v2.api.noroff.dev/square-eyes";
const out = document.querySelector("ul#myVideos");
let collection = [];

async function getData() {
    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const obj = await response.json();
        //console.log(obj);
        collection = obj.data;
        listData(collection, out);
    } catch (error) {
        console.error(error.message);
        out.innerHTML = "Something went wrong"
    }
}

getData();