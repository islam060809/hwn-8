const rot = document.querySelector(".rot")
const root = document.querySelector(".root")
const rooot = document.querySelector(".rooot")
const roooot = document.querySelector(".roooot")
const canteA = document.querySelectorAll(".cate-a")
const h3 = document.querySelector(".sc-h3")
const url2 = "https://fakestoreapi.com/products"
const url = "https://fakestoreapi.com/products"

async function getPro() {
    fetch(url2)
        .then((request) => request.json())
        .then(data => {
            console.log(data)
            let gg = data.slice(1, 6)
            console.log(gg);
            showPro(gg)
        })
}
getPro()

function showPro(di) {
    for (const da of di) {
        rot.innerHTML += `<div class="card">
    <img class="imgPro" src="${da.image}">
    <h2 class="name">${da.title}</h2>
    <p class="card-cate">${da.category}</p>
    <p class="card-price">${da.price}$</p>
    </div>
    `
    }
}
async function getPro2() {
    fetch(url)
        .then((request) => request.json())
        .then(data => {
            console.log(data)
            let gg = data.slice(8, 13)
            console.log(gg);
            showPro2(gg)
        })
}
getPro2()

function showPro2(di) {
    for (const da of di) {
        root.innerHTML += `<div class="card2">
    <img class="" src="${da.image}">
    <h2 class="name2">${da.title}</h2>
    </div>
    `
    }
}

async function getPro3() {
    fetch(url)
        .then((request) => request.json())
        .then(data => {
            console.log(data)
            let gg = data.filter(checkAdult)
            showPro3(gg.slice(0, 5))
        })
}
getPro3()

function checkAdult(age) {
    return age.price <= 100;
}

function showPro3(di) {
    for (const da of di) {
        rooot.innerHTML += `<div class="card">
    <img class="imgPro" src="${da.image}">
    <h2 class="name">${da.title}</h2>
    <p class="card-cate">${da.category}</p>
    <p class="card-price">${da.price}$</p>
    </div>
    `
    }
}

async function getPro4() {
    fetch(url)
        .then((request) => request.json())
        .then(data => {
            console.log(data)
            canteA[0].onclick = () => {
                let gg = data.filter(li => li.category === "men's clothing")
                showPro4(gg.slice(0, 5))
            }
            canteA[1].onclick = () => {
                let gg = data.filter(li => li.category === "jewelery")
                showPro4(gg.slice(0, 5))
            }
            canteA[2].onclick = () => {
                let gg = data.filter(li => li.category === "electronics")
                showPro4(gg.slice(0, 5))
            }
            canteA[3].onclick = () => {
                let gg = data.filter(li => li.category === "women's clothing")
                showPro4(gg.slice(0, 5))
            }
        })
}
getPro4()



function showPro4(di) {
    rot.innerHTML = ""
    h3.innerHTML = ""
    for (const da of di) {
        h3.innerHTML = `${da.category}`
        rot.innerHTML += `
        <div class="card">
            <div class="test"> 
                <img class="imgPro" src="${da.image}" />
                <h2 class="name">${da.title}</h2>
                <p class="card-cate">${da.category}</p>
            </div>

            <p class="card-price">${da.price}$</p>
    </div>
    `
    }
}