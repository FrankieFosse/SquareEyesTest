const out = document.querySelector("ul#myVideos");
const api = "https://v2.api.noroff.dev/square-eyes";

const listProductTemplate = (product) => {
    return `
    <li>
    <a href="product.html?id=${product.id}">
            <img src=${product.image.url}
            </a>
    </li>
    `;
}

export function movieByGenre(movies, genre) {
    if (genre === "none") {
        return movies;
    } else {
        return movies.filter(movie => movie.genre === genre);
    }
}

export function listData(list, out) {
    out.innerHTML = "";
    let output = "";
    for (let product of list) {
        output += listProductTemplate(product);
    }
    if (output) {
        out.innerHTML = output;
    } else {
        out.innerHTML = "<li>No movies to list</li>"
    }
    
}

export let collection = [];

export let cart;
const cartFavourites = localStorage.getItem("cart");

if(!cartFavourites) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
} else {
    cart = JSON.parse(cartFavourites);
}

//console.log(cart);

export function storeCart() {
    if (cart.includes(parseInt(this.id))) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i] === this.id) cart.splice(i, 1);
        }
        this.style.backgroundColor = "red";
        
    }else {
        cart.push(this.id);
        this.style.backgroundColor = "grey";
        this.style.color = "black"

    }
    localStorage.setItem("cart", JSON.stringify(cart));

}

export function removeFromCart(productId) {
    const index = cart.indexOf(productId);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

export function productDetails(api, out) {
    let product = api; 

    out.innerHTML = `<div class="product-detail">
    <h2>${product.title} (${product.released})</h2>
    <img src="${product.image.url}" alt="${product.name} movie cover">
    <h2> ${product.price} kr</h2>
    <button class="addToCart" id="${product.id}">Add to cart</button>
    <h3><a href="videos.html">Genre:</a> ${product.genre}</h3>
    <h4>Rating: ${product.rating}</h3>
    <p>Description: ${product.description}</p>
    </div>`; 

    const btns = document.querySelectorAll("button.addToCart");
    for (const btn of btns) {
        if (cart.includes(btn.id));
        btn.addEventListener("click", storeCart);

    } 
}

export function addToCart(list, out) {
    out.innerHTML = "";
    let newDivs = "";
    for (let product of list) {
        newDivs += `<div class="cartStyle">
        <img src="${product.image.url}" alt="${product.name} Poster">
        <h2>${product.title}</h2>
        <p> ${product.price} kr</p>
        <div><button class="removeBtn" id="${product.id}"">Remove from cart</button></div>
        </div>`;
    }
    
    out.innerHTML = newDivs;
}
