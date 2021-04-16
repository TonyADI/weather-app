import React from 'react';
import './App.css';
import { getForecast } from '../../util/OpenWeather';
import { locationIQ } from '../../util/LocationIQ';
import { SearchBar } from '../SearchBar/SearchBar';
import snow from '../../util/images/snow.jfif';
import clear from '../../util/images/clear.jfif';
import clouds from '../../util/images/cloudy.jfif';
import rain from '../../util/images/rain.jfif';

class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {temperature: '', city: '', condition: '', time: '', 
      imageUrl:clear, color: '#fff', firstDay: {}, secondDay: {}, thirdDay: {}, 
      fourthDay: {}, fifthDay: {}, lat: '', lon: ''}
      this.setCondition = this.setCondition.bind(this);
      this.clock = this.clock.bind(this);
      this.setBackground = this.setBackground.bind(this);
      this.handleForecast = this.handleForecast.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
    }

    setCondition(cond){
      this.setState({condition: cond})
    }

    clock(){
      let date = new Date();
      let time = date.toLocaleTimeString();
      this.setState({time: time})
    }

    setBackground(){
      switch(this.state.condition){
        case 'Clouds':
          this.setState({imageUrl:clouds, color:'#fff'});
          break;
        case 'Clear':
          this.setState({imageUrl:clear, color: '#fff'});
          break;
        case 'Snow':
          this.setState({imageUrl:snow, color: '#000'});
          break;
        case 'Rain':
          this.setState({imageUrl:rain, color: '#fff'})
        break;
        default:
          this.setState({imageUrl:clear});
      }
    }

    getMinTemp(list){
      let min = Number.MAX_VALUE;
      for(let i = 0; i < 8; i++){
        if(list[i].main.temp < min){
            min = list[i].main.temp;
        }
      }
      return min;
    }

    getMaxTemp(list){
      let max = 0;
      for(let i = 0; i < 8; i++){
        if(list[i].main.temp > max){
            max = list[i].main.temp;
        }
      }
      return max;
    }

    getCondition(list){
      let frequency = {};
      let max = 0;
      let condition;
      for(let index in list) {
        frequency[list[index].weather[0].main] = 
        (frequency[list[index].weather[0].main] || 0) + 1;
        if(frequency[list[index].weather[0].main] > max) {
          max = frequency[list[index].weather[0].main];
          condition = list[index].weather[0].main;
        }
      }
      return condition;
    }

    handleForecast (long, lat){
      if(long && lat){
        getForecast(long, lat).then(forecast => {
          this.setState({city: forecast.city, temperature: Math.floor(forecast.forecasts[0].main.temp), 
            condition: forecast.forecasts[0].weather[0].main, 
          firstDay: {max: Math.floor(this.getMaxTemp(forecast.forecasts.slice(0,8))), min:
          Math.floor(this.getMinTemp(forecast.forecasts.slice(0,8))), 
          condition: this.getCondition(forecast.forecasts.slice(0,8))},
          secondDay: {max: Math.floor(this.getMaxTemp(forecast.forecasts.slice(8,16))), min:
            Math.floor(this.getMinTemp(forecast.forecasts.slice(8,16))), 
          condition: this.getCondition(forecast.forecasts.slice(8,16))
          },
          thirdDay: {max: Math.floor(this.getMaxTemp(forecast.forecasts.slice(16,24))), min:
            Math.floor(this.getMinTemp(forecast.forecasts.slice(16,24))), 
            condition: this.getCondition(forecast.forecasts.slice(16,24))
          },
          fourthDay: {max: Math.floor(this.getMaxTemp(forecast.forecasts.slice(24,32))), min:
            Math.floor(this.getMinTemp(forecast.forecasts.slice(24,32))),
            condition: this.getCondition(forecast.forecasts.slice(24,32))
          },
          fifthDay: {max: Math.floor(this.getMaxTemp(forecast.forecasts.slice(32,40))), min:
            Math.floor(this.getMinTemp(forecast.forecasts.slice(32,40))),
            condition: this.getCondition(forecast.forecasts.slice(32,40))
          }});
        })
        .catch(error => console.log(error));
    }
    }

    handleSearch(term){
      locationIQ.search(term).then(coords => {
        this.handleForecast(coords.lon, coords.lat);
      })
    }

    componentDidMount(){
       this.myClock = setInterval(this.clock, 0);
       navigator.geolocation.getCurrentPosition(position => {
           const longitude = position.coords.longitude; 
           const latitude = position.coords.latitude;
           this.handleForecast(longitude, latitude);
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
    }

    componentDidUpdate(prevProps, prevState){
      if(prevState.condition !== this.state.condition){
        this.setBackground();
      }
    }

    componentWillUnmount(){
      clearInterval(this.myClock);
    }

    render(){
      return (
        <div className="body" style={{color: this.state.color, backgroundImage: 
        `url(${this.state.imageUrl})`}}>
          <main>
            <div className="header">
              <span id="clock">{this.state.time}</span>
              <SearchBar handleSearch={this.handleSearch}/>
            </div>
            <div id="weather-info">
              <div><span id="temperature">{`${this.state.temperature}°`}</span></div>
              <div><span id="city">{this.state.city}</span></div>
              <div>{this.state.condition}</div>
            </div>
            <div id="days">
                <div className="day"><span id="first-day"></span>
                  <div>
                    {this.state.firstDay ? `${this.state.firstDay.max}°/ 
                    ${this.state.firstDay.min}°` : ''}
                  </div>
                  <div>
                    {this.state.firstDay && this.state.firstDay.condition}
                  </div>
                </div>
                <div className="day"><span id="second-day"></span>
                  <div>
                    {this.state.secondDay ? `${this.state.secondDay.max}°/
                    ${this.state.secondDay.min}°` : ''}
                  </div>
                  <div>
                    {this.state.secondDay && this.state.secondDay.condition}
                  </div>
                </div>
                <div className="day"><span id="third-day"></span>
                  <div>
                    {this.state.thirdDay ? `${this.state.thirdDay.max}°/
                    ${this.state.thirdDay.min}°` : ''}
                  </div>
                  <div>
                    {this.state.thirdDay && this.state.thirdDay.condition}
                  </div>
                </div>
                <div className="day"><span id="fourth-day"></span>
                  <div>
                    {this.state.fourthDay ? `${this.state.fourthDay.max}°/
                    ${this.state.fourthDay.min}°` : ''}
                  </div>
                  <div>
                    {this.state.fourthDay && this.state.fourthDay.condition}
                  </div>
                </div>
                <div className="day"><span id="fifth-day"></span>
                  <div>
                    {this.state.fifthDay ? `${this.state.fifthDay.max}°/ 
                    ${this.state.fifthDay.min}°` : ''}
                  </div>
                  <div>
                    {this.state.fifthDay && this.state.fifthDay.condition}
                  </div>
                </div>
            </div>
          </main>
        </div>
      );
  }
}
export default App;
