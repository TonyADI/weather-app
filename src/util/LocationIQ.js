const apiKey = null; //redacted

export const locationIQ = {reverse : function(long, lat){
    return fetch(`https://cors-anywhere.herokuapp.com/https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${long}&format=json`,
    {headers:{Authorization:`Bearer ${apiKey}`}}).then(response => {
        return response.json();
    }).then(jsonResponse => {
        return jsonResponse.address ? jsonResponse.address.city : 'Didnt work'
        });
    }
};

