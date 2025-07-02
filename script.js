let city = 'havre'
let apiKey = 'f85211be34b149d5fb745f44e506ac7b'
let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
    })