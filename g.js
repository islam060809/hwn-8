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
    let isCorzina = favorites.find(x => x.id === id);
    if (!isCorzina) {
        favorites.push(data);
        per2.style.display = "block";
        per2.innerText = parseInt(per2.innerText) + 1;
        console.log(favorites, "Favo");
    } else {
        alert("ваш продукт уже в избронных");
    }
}

let carzina = [];
async function addCart(id) {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    const newData = { ...data, count: 1 };
    let isCorzina = carzina.find(x => x.id === id);
    if (!isCorzina) {
        // carzina.push(newData);
        // per1.style.display = "block";
        // per1.innerText = carzina.length;
        // console.log(carzina, "carzina");

        const newData = { ...data, count: 1 };
        carzina.push(newData);
        per1.style.display = "block";
        per1.innerText = carzina.length;
        console.log(carzina, "carzina");
    } else {
        // isCorzina.count += 1;
        // console.log(isCorzina);
        // alert("ваш продукт уже в корзине");

        isCorzina.count += 1;
        console.log(isCorzina);
        per1.innerText = carzina.length;
        alert("ваш продукт уже в корзине");
    }
}

function calculateTotalPrice(cart) {
    return cart.reduce((total, item) => total + item.price * item.count, 0);
}

function showCart(da) {
    sale.innerHTML = "<h2>Your cart</h2>";
    for (const gg of da) {
        sale.innerHTML += `
            <div class="cart-box">
                <img width="20px" src="${gg.image}">
                <div class="cart-text">
                    <h3>${gg.title}</h3>
                    <p>${gg.category}</p>
                </div>
                <h2 class="first-price">${gg.price}$</h2>
                <div>
                    <button class="minus" >-</button>
                    <span>${gg.count}<span>
                    <button class="plus" >+</button>
                </div>
                <h2 class="end-price">${gg.price * gg.count}$</h2>
                <img class="iks" src="iks.png">
            </div>
        `;
    }
    const totalPrice = calculateTotalPrice(da);
    sale.innerHTML += `<div class="end-cart">
        <h2 class="total-price">TOTAL PRICE:<span> ${totalPrice}$</span></h2>
        <button class="checkBtn">Proceed to checkout</button>
    </div>`;
    console.log(`Total price: ${totalPrice}$`);
}

cart.onclick = () => {
    showCart(carzina);
};

// function updateCount(id, increment) {
//     let product = carzina.find(x => x.id === id);
//     if (product) {
//         product.count += increment;
//         if (product.count < 1) {
//             product.count = 1; // Ensure count doesn't go below 1
//         }
//         showCart(carzina); // Re-render the cart with the updated count
//         per1.innerText = carzina.length; // Update cart item count
//         console.log(carzina, "Updated cart");
//     }
// }
