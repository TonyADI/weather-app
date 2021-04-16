const apiKey = 'pk.622a845b4757d6cf38c5280a1c036797'; //redacted

export const locationIQ = {reverse : function(long, lat){
    return fetch(`https://cors-anywhere.herokuapp.com/https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${long}&format=json`,
    {headers:{Authorization:`Bearer ${apiKey}`}}).then(response => {
        if(response.ok){
            return response.json();
        }
    }).then(jsonResponse => {
        return jsonResponse.address ? jsonResponse.address.city : null
        });
    },
    search: function(city){
        return fetch(`https://cors-anywhere.herokuapp.com/https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${city}&format=json`,
        {headers:{Authorization:`Bearer ${apiKey}`}}).then(response => {
            if(response.ok){
                return response.json();
            }
        }).then(jsonResponse => {
            return jsonResponse ? {lat: jsonResponse[0].lat, 
                lon: jsonResponse[0].lon} : {}
        });
    }
};



