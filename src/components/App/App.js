import { useState, useEffect } from 'react';
import { DaysList } from './DaysList';
import { WeatherInfo } from './WeatherInfo';
import { getForecast } from '../../util/OpenWeather';
import { locationIQ } from '../../util/LocationIQ';
import { SearchBar } from '../SearchBar/SearchBar';
import snow from '../../util/images/snow.jfif';
import clear from '../../util/images/clear.jfif';
import clouds from '../../util/images/cloudy.jfif';
import rain from '../../util/images/rain.jfif';
import './App.css';

const App = () => {
    const [temperature, setTemperature] = useState('');
    const [city, setCity] = useState('');
    const [condition, setCondition] = useState('');
    const [time, setTime] = useState('');
    const [imageUrl, setImageUrl] = useState(clear);
    const [color, setColor] = useState('#fff');
    const [days, setDays] = useState([]);

    const startClock = () => {
      let time = new Date().toLocaleTimeString();
      setTime(time);
    }

    const setBackground = () => {
      switch(condition){
        case 'Clouds':
          setImageUrl(clouds);
          setColor('#fff');
          break;
        case 'Clear':
          setImageUrl(clear)
          setColor('#fff');
          break;
        case 'Snow':
          setImageUrl(snow)
          setColor('#fff');
          break;
        case 'Rain':
          setImageUrl(rain);
          setColor('#fff');
        break;
        default:
          setImageUrl(clear);
          setColor('#fff');
      }
    }

    const handleForecast = (long, lat) => {
        if(long && lat){
            getForecast(long, lat).then(forecast => {
            setCity(forecast.city);
            setDays(forecast.days);
            setTemperature(forecast.temp);
            setCondition(forecast.condition);
            })
            .catch(error => console.log(error));
        }
    }

    const handleSearch = term => {
      locationIQ.search(term).then(coords => {
        handleForecast(coords.lon, coords.lat);
      })
    }

    useEffect(() => {
      const myClock = setInterval(startClock, 0);
      navigator.geolocation.getCurrentPosition(position => {
          const longitude = position.coords.longitude; 
          const latitude = position.coords.latitude;
          handleForecast(longitude, latitude);
      });
      
      const today = new Date(); 
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();

      document.getElementById('first-day').innerHTML = 
      new Date(year, month, day + 1).toLocaleString('en-us', {weekday:'long'});
      document.getElementById('second-day').innerHTML = 
      new Date(year, month, day + 2).toLocaleString('en-us', {weekday:'long'});
      document.getElementById('third-day').innerHTML = 
      new Date(year, month, day + 3).toLocaleString('en-us', {weekday:'long'});
      document.getElementById('fourth-day').innerHTML = 
      new Date(year, month, day + 4).toLocaleString('en-us', {weekday:'long'});
      document.getElementById('fifth-day').innerHTML = 
      new Date(year, month, day + 5).toLocaleString('en-us', {weekday:'long'});

      return () => {
          clearInterval(myClock);
        }
      }, [])

    useEffect(() => {
      setBackground();
    }, [condition]);

    return (
      <div className="body" 
           style={{color: color, backgroundImage: `url(${imageUrl})`}}>
          <main>
              <div className="header">
                  <span id="clock">
                      {time}
                  </span>
                  <SearchBar handleSearch={handleSearch}/>
              </div>
              <WeatherInfo 
                condition={condition}
                city={city}
                temperature={temperature}
              />
              <DaysList days={days}/>
            </main>
        </div>
      );
}

export default App;
