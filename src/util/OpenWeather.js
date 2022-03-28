const getMinTemp = list => {
    let min = Number.MAX_VALUE;
    for(let i = 0; i < 8; i++){
      if(list[i].main.temp < min){
          min = list[i].main.temp;
      }
    }
    return min;
  }

const getMaxTemp = list => {
    let max = 0;
    for(let i = 0; i < 8; i++){
      if(list[i].main.temp > max){
          max = list[i].main.temp;
      }
    }
    return max;
}

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
        return jsonResponse.list ? 
                                    [
                                        {firstDay: {min: Math.floor(getMinTemp(jsonResponse.list.slice(0, 8))),
                                            max: Math.floor(getMaxTemp(jsonResponse.list.slice(0, 8)))}},

                                        {secondDay: {min: Math.floor(getMinTemp(jsonResponse.list.slice(8, 16))),
                                            max: Math.floor(getMaxTemp(jsonResponse.list.slice(8, 16)))}},

                                        {thirdDay: {min: Math.floor(getMinTemp(jsonResponse.list.slice(16, 24))),
                                            max: Math.floor(getMaxTemp(jsonResponse.list.slice(16, 24)))}},

                                        {fourthDay: {min: Math.floor(getMinTemp(jsonResponse.list.slice(24, 32))),
                                            max: Math.floor(getMaxTemp(jsonResponse.list.slice(24, 32)))}},

                                        {fifthDay: {min: Math.floor(getMinTemp(jsonResponse.list.slice(32, 40))),
                                            max: Math.floor(getMaxTemp(jsonResponse.list.slice(32, 40)))}},

                                    ] : 
                                []
    })
    .catch(err => {
        console.error(err);
    });
}

const searchForecast = async city => {
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
                : {};
        }
        throw new Error('Request was not successful.')
    }
    catch(error){
        console.log(error)
    }
}
