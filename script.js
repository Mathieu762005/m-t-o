const apiKey = 'f85211be34b149d5fb745f44e506ac7b'

function recherche(city) {
    if (!city) {
        city = document.getElementById("ville").value
        if (!city) {
            alert("Veuillez entrer une ville.")
            return
        }
    }

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

            let description = data.list[0].weather[0].description
            if (description.includes("pluie")) {
                document.body.style.backgroundImage = "url(image/bg-pluie-mobile.png)"
            } else {
                document.body.style.backgroundImage = "url(image/bg-soleil-mobile.png)"
            }
        })
}

function success(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        .then(response => response.json())
        .then(data => {
            const city = data.address.city || data.address.town || data.address.village || null
            if (city) {
                recherche(city)
            } else {
                alert("Ville non détectée par géolocalisation.")
            }
        })
}

function error() {
    alert("position invalide.")
}

const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 30000,
}

window.addEventListener("load", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error, options)
    } else {
        alert("Géolocalisation invalide.")
    }
})