export const getForecast = (long, lat) => {
    //let uriEncodedCity = encodeURIComponent(city);
    return fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&lat=${lat}&lon=${long}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": '',
            "x-rapidapi-host": ''
        }
    })
    .then(response => {
        console.log(response);
        if(response.ok){
            return response.json();
        }
        throw new Error('Request was not successful.')
    })
    .then(jsonResponse => {
        return jsonResponse.city ? {city: jsonResponse.city.name, forecasts: jsonResponse.list} : null
    })
    .catch(err => {
        console.error(err);
    });
}

export const searchForecast = async city => {
    try{
        let uriEncodedCity = encodeURIComponent(city);
        let response = await fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&units=metric`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "",
                "x-rapidapi-host": ""
            }
        })
        if(response.ok){
            let jsonResponse = await response.json();
            return jsonResponse ? {city: city, 
                condition: jsonResponse.weather[0].main, temp: jsonResponse.main.temp} 
                : null;
        }
        throw new Error('Request was not successful.')
    }
    catch(error){
        console.log(error)
    }
}