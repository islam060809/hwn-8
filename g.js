const rot = document.querySelector(".rot");
const root = document.querySelector(".root");
const rooot = document.querySelector(".rooot");
const roooot = document.querySelector(".roooot");
const sale = document.querySelector(".sale");
const canteA = document.querySelectorAll(".cate-a");
const no1 = document.querySelector(".worth");
const no2 = document.querySelector(".new-year");
const no3 = document.querySelector(".less");
const h3 = document.querySelector(".sc-h3");
const per1 = document.querySelector(".per1");
const per2 = document.querySelector(".per2");
const cart = document.querySelector("#cart");
const favo = document.querySelector("#favo");
const url2 = "https://fakestoreapi.com/products";
const url = "https://fakestoreapi.com/products";

async function getPro() {
    fetch(url2)
        .then((request) => request.json())
        .then(data => {
            console.log(data);
            let gg = data.slice(1, 6);
            console.log(gg);
            showPro(gg);
        });
}
getPro();

function showPro(di) {
    for (const da of di) {
        rot.innerHTML += `<div class="card">
            <img onclick="getProById(${da.id})" class="imgPro" src="${da.image}">
            <h2 class="name">${da.title}</h2>
            <p class="card-cate">${da.category}</p>
            <p class="card-price">${da.price}$</p>
        </div>`;
    }
}

async function getPro2() {
    fetch(url)
        .then((request) => request.json())
        .then(data => {
            console.log(data);
            let gg = data.slice(8, 13);
            console.log(gg);
            showPro2(gg);
        });
}
getPro2();

function showPro2(di) {
    for (const da of di) {
        root.innerHTML += `<div class="card2">
            <img onclick="getProById(${da.id})" class="" src="${da.image}">
            <h2 class="name2">${da.title}</h2>
        </div>`;
    }
}

async function getPro3() {
    fetch(url)
        .then((request) => request.json())
        .then(data => {
            console.log(data);
            let gg = data.filter(checkAdult);
            showPro3(gg.slice(0, 5));
        });
}
getPro3();

function checkAdult(age) {
    return age.price <= 100;
}

function showPro3(di) {
    for (const da of di) {
        rooot.innerHTML += `<div class="card">
            <img onclick="getProById(${da.id})" class="imgPro" src="${da.image}">
            <h2 class="name">${da.title}</h2>
            <p class="card-cate">${da.category}</p>
            <p class="card-price">${da.price}$</p>
        </div>`;
    }
}

async function getPro4() {
    fetch(url)
        .then((request) => request.json())
        .then(data => {
            console.log(data);
            canteA[0].onclick = () => {
                let gg = data.filter(li => li.category === "men's clothing");
                showPro4(gg.slice(0, 5));
            };
            canteA[1].onclick = () => {
                let gg = data.filter(li => li.category === "jewelery");
                showPro4(gg.slice(0, 5));
            };
            canteA[2].onclick = () => {
                let gg = data.filter(li => li.category === "electronics");
                showPro4(gg.slice(0, 5));
            };
            canteA[3].onclick = () => {
                let gg = data.filter(li => li.category === "women's clothing");
                showPro4(gg.slice(0, 5));
            };
        });
}
getPro4();

function showPro4(di) {
    rot.innerHTML = "";
    h3.innerHTML = "";
    for (const da of di) {
        h3.innerHTML = `${da.category}`;
        rot.innerHTML += `
            <div class="card">
                <div class="test">
                    <img onclick="getProById(${da.id})" class="imgPro" src="${da.image}" />
                    <h2 class="name">${da.title}</h2>
                    <p class="card-cate">${da.category}</p>
                </div>
                <p class="card-price">${da.price}$</p>
            </div>`;
    }
}

async function getProById(id) {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    console.log(data);
    showSinglePro(data);
}

function showSinglePro(dd) {
    console.log(dd);
    no1.style.display = "none";
    no2.style.display = "none";
    no3.style.display = "none";
    sale.innerHTML = `<div class="blok">
        <div class="blok1">
            <img id="sin-img" src="${dd.image}">
        </div>
        <div class="blok2">
            <h3 id="sin-h2">${dd.title}</h3>
            <h3 id="sin-h3">${dd.price}$</h3>
            <p id="sin-p">${dd.description}</p>
            <button onclick="addCart(${dd.id})">Add to cart</button>
            <button onclick="addFavo(${dd.id})" id="sin-btn">Add to favorites</button>
        </div>
    </div>`;
}

let favorites = [];
async function addFavo(id) {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    let isFavo = favorites.find(x => x.id === id);
    if (!isFavo) {
        favorites.push(data);
        per2.style.display = "block";
        per2.innerText = favorites.length
        console.log(favorites, "Favo");
        localStorage.setItem("favorites", JSON.stringify(favorites))
    } else {
        per2.innerText = favorites.length;
        alert("ваш продукт уже в избронных");
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }
}

let carzina = [];
async function addCart(id) {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    let isCorzina = carzina.find(x => x.id === id);
    if (!isCorzina) {
        const newData = { ...data, count: 1 };
        carzina.push(newData);
        per1.style.display = "block";
        per1.innerText = carzina.length;
        console.log(carzina, "carzina");
        localStorage.setItem("carzina", JSON.stringify(carzina))
    } else {
        isCorzina.count += 1;
        console.log(isCorzina);
        per1.innerText = carzina.length;
        alert("ваш продукт уже в корзине");
        localStorage.setItem("carzina", JSON.stringify(carzina))
    }
}

function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + item.price * item.count, 0)
}

function showCart(da) {
    sale.innerHTML = "<h2 class='yourCart'>Your cart</h2>";
    for (const gg of da) {
        sale.innerHTML += `
            <div class="cart-box">
                <img onclick="getProById(${gg.id})" width="20px" src="${gg.image}">
                <div class="cart-text">
                    <h3 onclick="getProById(${gg.id})">${gg.title}</h3>
                    <p>${gg.category}</p>
                </div>
                <h2 class="first-price">${gg.price}$</h2>
                <div>
                    <button onclick="incrCountMinus(${gg.id})" class="minus" >-</button>
                    <span>${gg.count}<span>
                    <button onclick="incrCount(${gg.id})" class="plus" >+</button>
                </div>
                <h2 class="end-price">${gg.price * gg.count}$</h2>
                <img onclick="deletCart(${gg.id})" class="iks" src="iks.png">
            </div>
        `;
    }
    let totalPrice = calculateTotalPrice(da);
    let roundTotalPrice = Math.round(totalPrice)
    sale.innerHTML += `<div class="end-cart">
        <h2 class="total-price">TOTAL PRICE:<span> ${roundTotalPrice}$</span></h2>
        <button class="checkBtn">Proceed to checkout</button>
    </div>`;
}
function showFavo(da) {
    sale.innerHTML = "<h2 class='yourCart'>Your Favorites</h2>";
    for (const gg of da) {
        sale.innerHTML += `
            <div class="cart-box">
                <img onclick="getProById(${gg.id})" width="20px" src="${gg.image}">
                <div class="cart-text">
                    <h3 onclick="getProById(${gg.id})">${gg.title}</h3>
                    <p>${gg.category}</p>
                </div>
                <h2 class="first-price">${gg.price}$</h2>
                <img onclick="deletFavo(${gg.id})" class="iks" src="iks.png">
            </div>
        `;
    }
}

cart.onclick = () => {
    showCart(carzina);
};
favo.onclick=()=>{
    showFavo(favorites)
}

function incrCount(id) {
    const index = carzina.findIndex(el => el.id === id)
    const befor = carzina.slice(0, index)
    const after = carzina.slice(index + 1)
    const carInd = carzina[index]
    const updItem = { ...carInd, count: ++carInd.count }
    console.log(updItem);
    showCart(carzina)
    carzina = [...befor, updItem, ...after]
    localStorage.setItem("carzina", JSON.stringify(carzina))
}

function incrCountMinus(id) {
    const index = carzina.findIndex(el => el.id === id)
    const befor = carzina.slice(0, index)
    const after = carzina.slice(index + 1)
    const carInd = carzina[index]
    if (carInd.count === 1) {

    } else {
        const updItem = { ...carInd, count: --carInd.count }
        console.log(updItem);
        showCart(carzina)
        carzina = [...befor, updItem, ...after]
        localStorage.setItem("carzina", JSON.stringify(carzina))
    }
}

function deletCart(id) {
    const index = carzina.findIndex(el => el.id === id)
    const befor = carzina.slice(0, index)
    const after = carzina.slice(index + 1)
    carzina = [...befor, ...after]
    localStorage.setItem("carzina", JSON.stringify(carzina))
    showCart(carzina)
    showInCart()
}
function deletFavo(id) {
    const index = favorites.findIndex(el => el.id === id)
    const befor = favorites.slice(0, index)
    const after = favorites.slice(index + 1)
    favorites = [...befor, ...after]
    localStorage.setItem("favorites", JSON.stringify(favorites))
    showFavo(favorites)
    showInFavo()
}

favorites = JSON.parse(localStorage.getItem("favorites"))
carzina = JSON.parse(localStorage.getItem("carzina"))
console.log(carzina);

function showInCart() {
    per1.innerText = carzina.length
    if (carzina.length == 0) {
        per1.style.display = "none"
    } else {
        per1.style.display = "block"
    }
}
showInCart()

function showInFavo() {
    per2.innerText = favorites.length;
    if (favorites.length == 0) {
        per2.style.display = "none"
    } else {
        per2.style.display = "block"
    }
}
showInFavo()