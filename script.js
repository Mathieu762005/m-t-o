let city = 'havre'
let apiKey = 'f85211be34b149d5fb745f44e506ac7b'
let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        console.log(data.city.name)
        document.getElementById("city").innerHTML = `${data.city.name}`
        document.getElementById("température").innerHTML = `${Math.round(data.list[0].main.temp)}°`
        document.getElementById("description").innerHTML = `${data.list[0].weather[0].description}`
        document.getElementById("tempMax").innerHTML = `${Math.round(data.list[0].main.temp_max)}°`
        document.getElementById("tempMin").innerHTML = `${Math.round(data.list[0].main.temp_min)}°`
    })