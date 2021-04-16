export const getForecast = (long, lat) => {
    return fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?units=metric&lat=${lat}&lon=${long}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": '2374eea181msha6400f3c7ae0a84p1498bejsnf11abe35d8b7',
            "x-rapidapi-host": 'community-open-weather-map.p.rapidapi.com'
        }
    })
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error('Request was not successful.')
    })
    .then(jsonResponse => {
        return jsonResponse.city ? {city: jsonResponse.city.name, 
            forecasts: jsonResponse.list} : null
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
                "x-rapidapi-key": "2374eea181msha6400f3c7ae0a84p1498bejsnf11abe35d8b7",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
        if(response.ok){
            let jsonResponse = await response.json();
            return jsonResponse ? {city: city, 
                condition: jsonResponse.weather[0].main, 
                temp: jsonResponse.main.temp} 
                : null;
        }
        throw new Error('Request was not successful.')
    }
    catch(error){
        console.log(error)
    }
}