let city = 'havre'
let apiKey = 'f85211be34b149d5fb745f44e506ac7b'
let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.city.name)
        document.getElementById("city").innerHTML = `Le ${data.city.name}`
        document.getElementById("température").innerHTML = `  ${Math.round(data.list[0].main.temp)}°`
        document.getElementById("description").innerHTML = `${data.list[0].weather[0].description}`
        document.getElementById("tempMax").innerHTML = `<i class="bi bi-arrow-up"></i> ${Math.round(data.list[0].main.temp_max)}°`
        document.getElementById("tempMin").innerHTML = `<i class="bi bi-arrow-down"></i> ${Math.round(data.list[0].main.temp_min)}°`
        document.getElementById("soleil").innerHTML = `<img src="https://openweathermap.org/img/wn/01d@2x.png" alt="">`
        document.getElementById("vent").innerHTML = `<i class="bi bi-wind"></i> ${data.list[0].wind.speed}`
        document.getElementById("précipitation").innerHTML = `<i class="bi bi-tornado"></i> ${data.list[0].pop}%`
        document.getElementById("humidity").innerHTML = `<i class="bi bi-droplet-half"></i> ${data.list[0].main.humidity}%`
    })

if (description = "légère pluie") {
    document.body.style.backgroundImage = "url(image/bg-soleil-mobile.png)"
} else {
    document.body.style.backgroundImage = "url(image/bg-pluie-mobile.png);"
}