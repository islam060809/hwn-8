const rot = document.querySelector(".rot")
const root = document.querySelector(".root")
const rooot = document.querySelector(".rooot")
const roooot = document.querySelector(".roooot")
const sale = document.querySelector(".sale")
const canteA = document.querySelectorAll(".cate-a")
const no1 = document.querySelector(".worth")
const no2 = document.querySelector(".new-year")
const no3 = document.querySelector(".less")
const h3 = document.querySelector(".sc-h3")
const per1 = document.querySelector(".per1")
const per2 = document.querySelector(".per2")
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
    <img onclick="getProById(${da.id})" class="imgPro" src="${da.image}">
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
    <img onclick="getProById(${da.id})" class="" src="${da.image}">
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
    <img onclick="getProById(${da.id})" class="imgPro" src="${da.image}">
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
        <div class="card" >
            <div class="test"> 
                <img onclick="getProById(${da.id})" class="imgPro" src="${da.image}" />
                <h2 class="name">${da.title}</h2>
                <p class="card-cate">${da.category}</p>
            </div>

            <p class="card-price">${da.price}$</p>
    </div>
    `
    }
}

async function getProById(id) {
    const res = await fetch(url + "/" + id)
    const data = await res.json()
    console.log(data)
    showSinglPro(data)




}

function showSinglPro(dd) {
    console.log(dd)
    no1.style.display = "none"
    no2.style.display = "none"
    no3.style.display = "none"
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
    </div>
    `
}

let favorites = []
async function addFavo(id) {
    try {
        const res = await fetch(`${url}/${id}`)
        const data = await res.json()
        let isCorzina = favorites.find(x => x.id === id)
        if (!isCorzina) {
            favorites.push(data)
            per2.style.display = "block"
            per2.innerText = parseInt(per2.innerText) + 1;
        }
        else {
            alert("ваш продукт уже в избронных")
        }
    } catch (error) {

    }}

let carzina = []
async function addCart(id) {
    try {
        const res = await fetch(`${url}/${id}`)
        const data = await res.json()
        let isCorzina = carzina.find(x => x.id === id)
        if (!isCorzina) {
            carzina.push(data)
            per1.style.display = "block"
            per1.innerText = parseInt(per1.innerText) + 1;
        }
        else {
            alert("ваш продукт уже в корзине")
        }
    } catch (error) {

    }



    // if (carzina.includes(id)) {
    //     alert("AHHAHAHAHAHAHAHHAHAHAHHAHAHAH")
    // }else{
    //     p
    //     carzina = carzina.push(id)
    // }

    // carzina.push(item)
    // console.log("ok")
}

// carzina.map((item)=>)