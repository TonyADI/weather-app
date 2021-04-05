import React, {useState} from 'react';
import './Forecast.css';
import Conditions from '../Conditions/Conditions'
import { Display } from '../Display/Display'

export const Forecast = props => {
    let [responseObj, setResponseObj] = useState({});
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    

    function getForecast(e) {
        e.preventDefault();
        if(city.length === 0){
            return setError(true);
        }
        setError(false);
        setResponseObj({});
        setLoading(true);
        let uriEncodedCity = encodeURIComponent(city);
        fetch(`https://community-open-weather-map.p.rapidapi.com/weather?q=${uriEncodedCity}&units=${unit}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "",
                "x-rapidapi-key": ""
            }
        })
        .then(response => response.json())
        .then(jsonResponse => {
            if(jsonResponse.cod !== 200){
                throw new Error();
            }
            // adding this
            props.setCondition(jsonResponse.weather[0].main)
            setResponseObj(jsonResponse);
            setLoading(false);
        })
        .catch(err => {
            setError(true);
            setLoading(false);
            console.log(err);
        });
    }
    return (
        <div>
            <Display weatherObj={responseObj} setCondition={props.setCondition} />
           <form onSubmit={getForecast}>
                <input
                    className="textInput"
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    />
                <label className="radio">
                    <input
                        className="textInput"
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Fahrenheit
                </label>
                <label className="radio">
                    <input
                        className="textInput"
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                        />
                    Celcius
                </label>
                <button className="button" type="submit">Get Forecast</button>
            </form>
           <Conditions
               responseObj={responseObj}
               error={error}
               loading={loading}
               />
       </div>
    )
 }