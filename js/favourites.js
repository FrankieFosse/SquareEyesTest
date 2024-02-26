import {  addToCart, cart } from "./utils.js"

const out = document.getElementById("cartContainer"); 

async function inCart(cart) {
    try {
        const api = `https://v2.api.noroff.dev/square-eyes/`;
        const response = await fetch(api);
        const obj = await response.json();
        let filtered = obj.data.filter((product)=>{
            let id = product.id;
            return cart.includes(id);
        });
        if (filtered.length > 0) {
            addToCart (filtered, out);
        } else {
            out.innerHTML = `<p>Your cart is empty</p> 
            <a href="index.html">Back to home</a>`;


        }

    }catch (error) {
        console.error(error.message);
        out.innerHTML = `<p>Could not fetch data</p>`;
    }


}

inCart(cart); 

function removeFromCart(ClickedId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const updatedCart = cart.filter(product => product !== ClickedId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    location.reload();
}

document.addEventListener('click', function(event){
    if (event.target.classList.contains('removeBtn')) {
        removeFromCart(event.target.id);
    }
});