import React from 'react';
import './App.css';
import { getForecast, searchForecast } from '../../util/OpenWeather';
import { SearchBar } from '../SearchBar/SearchBar';
import snow from '../../util/images/snow.jfif';
import clear from '../../util/images/clear.jfif';
import clouds from '../../util/images/cloudy.jfif';
import rain from '../../util/images/rain.jfif';

class App extends React.Component{
    constructor(props){
      super(props);
      this.state ={temperature: '', city: '', condition: '', forecasts: [], time: '', 
      imageUrl:clear, color: '#fff'}
      this.setCondition = this.setCondition.bind(this)
      this.clock = this.clock.bind(this)
      this.setBackground = this.setBackground.bind(this)
      this.handleForecast = this.handleForecast.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
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

    handleForecast (long, lat){
      if(long && lat){
        getForecast(long, lat).then(forecast => {
          this.setState({forecasts: forecast.forecasts, city: forecast.city, 
          temperature: forecast.forecasts[0].main.temp, condition:
        forecast.forecasts[0].weather[0].main})})
        .catch(error => console.log(error))
      }
    }

    handleSearch(term){
      searchForecast(term).then(forecast => {this.setState({city: forecast.city,
         condition: forecast.condition, temperature: Math.floor(forecast.temp)})})
         .catch(error => console.log(error))
    }

    componentDidMount(){
       this.myClock = setInterval(this.clock, 0);
       navigator.geolocation.getCurrentPosition(position => {
           const longitude = position.coords.longitude; 
           const latitude = position.coords.latitude;
           this.handleForecast(longitude, latitude);
       });
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
            <div><span id="temperature">{`${this.state.temperature}°`}</span></div>
            <div><span>{this.state.city}</span></div>
            <div>{this.state.condition}</div>
          </main>
          <footer>
            App created by TonyADI
          </footer>
        </div>
      );
  }
}
export default App;
