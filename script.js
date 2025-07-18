const apiKey = 'f85211be34b149d5fb745f44e506ac7b'
const options = {
    enableHighAccuracy: true,
    timeout: 500,
    maximumAge: 30000,
}

letsBegin()

// Géolocalisation //
function letsBegin() {
    console.log('je cherche')
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
        alert("Géolocalisation invalide.")
    }
}

function recherche(city) {
    // Récuperation de input //
    if (!city) {
        city = document.getElementById("ville").value
        if (!city) {
            alert("Veuillez entrer une ville.")
            return
        }
    }
    // Affichage Offcanvas // 
    document.getElementById("offcanvasWithBothOptions").innerHTML = `
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">villes favorites</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="ps-3" onclick="favoris()">
                <button class="btn btn-danger"><i class="bi bi-star-fill"></i> ${city}</button>
            </div>
            <div class="list-group px-3 pt-4 list-group-flush" id="list">
            </div>
            `
    // Affichage data dans le Dom //
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            document.getElementById("city").textContent = data.city.name
            document.getElementById("température").textContent = `${Math.round(data.list[0].main.temp)}°`
            document.getElementById("description").textContent = data.list[0].weather[0].description
            document.getElementById("tempMax").innerHTML = `<i class="bi bi-arrow-up"></i> ${Math.round(data.list[0].main.temp_max)}°`
            document.getElementById("tempMin").innerHTML = `<i class="bi bi-arrow-down"></i> ${Math.round(data.list[0].main.temp_min)}°`
            document.getElementById("soleil").innerHTML = `<img src="https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png" alt="icon">`
            document.getElementById("vent").innerHTML = `<i class="bi bi-wind"></i> ${data.list[0].wind.speed} km/h`
            document.getElementById("précipitation").innerHTML = `<i class="bi bi-tornado"></i> ${Math.round(data.list[0].pop * 100)}%`
            document.getElementById("humidity").innerHTML = `<i class="bi bi-droplet-half"></i> ${data.list[0].main.humidity}%`
            document.getElementById("jours1").innerHTML = `${data.list[7].dt_txt}`
            document.getElementById("temp1").innerHTML = `${Math.round(data.list[7].main.temp)}°`
            document.getElementById("jours2").innerHTML = `${data.list[14].dt_txt}`
            document.getElementById("temp2").innerHTML = `${Math.round(data.list[14].main.temp)}°`
            document.getElementById("jours3").innerHTML = `${data.list[22].dt_txt}`
            document.getElementById("temp3").innerHTML = `${Math.round(data.list[22].main.temp)}°`
            document.getElementById("jours4").innerHTML = `${data.list[30].dt_txt}`
            document.getElementById("temp4").innerHTML = `${Math.round(data.list[30].main.temp)}°`
            document.getElementById("jours5").innerHTML = `${data.list[38].dt_txt}`
            document.getElementById("temp5").innerHTML = `${Math.round(data.list[38].main.temp)}°`

            // Affichage Background sous condition //
            let description = data.list[0].weather[0].description
            if (description.includes("pluie")) {
                document.body.style.backgroundImage = "url(image/bg-pluie-mobile.png)"
            } else {
                document.body.style.backgroundImage = "url(image/bg-soleil-mobile.png)"
            }
        })

    // Affichage Favoris // 
    afficherFavoris()
}


// ApiVille //
function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const city = data.name
            if (city) {
                recherche(city)
            } else {
                alert("erreur")
            }
        })
}
// ApiVille //
function error() {
    alert("position invalide.")
}

// localStoragel //
function favoris() {

    // localStorage //
    let city = document.getElementById("ville").value
    let favoris = JSON.parse(localStorage.getItem("favoris")) || []
    console.log(typeof (favoris))
    console.log(typeof (city))
    favoris.push(city)
    localStorage.setItem("favoris", JSON.stringify(favoris))

    // affichageListFavoris //
    afficherFavoris()
}

// Affichage Favoris //
function afficherFavoris() {
    document.getElementById("list").innerHTML = ""
    let list = ""
    JSON.parse(localStorage.getItem("favoris")).forEach(city => {
        list += `<ul class="text-decoration-none border list-unstyled">
                  <li class="fw-bold d-flex justify-content-between p-1">
                    <div onclick="recherche('${city}')">
                      <i class="bi bi-star-fill text-warning"></i> ${city}
                    </div>
                    <div onclick="deleteFavoris('${city}')" class="poubelle">
                      <i class="bi bi-trash3"></i>
                    </div>
                  </li>
                </ul>`
        document.getElementById("list").innerHTML = list
    })
}

function deleteFavoris(city) {

    let favoris = JSON.parse(localStorage.getItem("favoris"))
    let index = favoris.indexOf(city)
    favoris.splice(index, 1)
    localStorage.setItem("favoris", JSON.stringify(favoris))

    afficherFavoris()
}

document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        recherche()
    }
})
