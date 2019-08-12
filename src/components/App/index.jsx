import React, { Component } from 'react';
import './app.css';
import TopSection from '../top/index';
import BottomSection from '../bottom/index';
import axios from 'axios';



const KEY = 'db168490cf4a5154faf7efed0866368a';



function getLocation(callback) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var user_position = {};
      user_position.lat = position.coords.latitude;
      user_position.lng = position.coords.longitude;
      callback(user_position);
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: 'Almeria',
      isLoading: true,
      numForecastDays: 5
    }
  }

  //Calling updateCity with 2 parameters indicated those parameters are latitude and longitud whereas calling it with one parameters indicate name of city.
  updateCity = (p1, p2) => {
    var URLcurrent = '';
    var URLforecast = '';
    if (typeof p2 == 'undefined') {
      URLcurrent = `http://api.openweathermap.org/data/2.5/weather?q=${p1}&units=metric&appid=${KEY}`;
      URLforecast = `http://api.openweathermap.org/data/2.5/forecast?q=${p1}&units=metric&appid=${KEY}`;
    } else {
      URLcurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${p1}&lon=${p2}&units=metric&appid=${KEY}`;
      URLforecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${p1}&lon=${p2}&units=metric&appid=${KEY}`
    }
    console.log('URL current: ');
    console.log(URLcurrent);
    console.log('URL forecast: ');
    console.log(URLforecast);
    axios.get(URLcurrent)
      .then(res => {
        return res.data;
      })
      .then(data =>
        this.setState({
          isLoading: false,
          cityName: data.name,
          currentTemperature: data.main.temp,
          text: data.weather[0].description,
          iconURL: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        }))
      .catch(error => {
        error && console.log('Could not get current weather data from API', error);
      });

    axios.get(URLforecast)
      .then(res => {
        return res.data;
      })
      .then(data =>
        this.setState({
          forecastDaysArray: data.list
        }))
      .catch(error => {
        error & console.log('Could not get forecast weather data from API', error);
      });
  }

  componentWillMount() {
    //Initial visualization
    var lat_lng = [];
    getLocation((lat_lng) => {});
    if (lat_lng.length) {
      this.updateCity(lat_lng[0], lat_lng[1]);
    } else {
      const { cityName } = this.state;
      this.updateCity(cityName);
    }
  }

  render() {
    const { isLoading, cityName, currentTemperature, text, iconURL, forecastDaysArray, numForecastDays } = this.state;
    return (
      <div className='appContainer'>
        <div className='mainContainer'>
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading &&
            <div className='topSection'>
              <TopSection updateCity={this.updateCity.bind(this)} location={cityName} currentTemperature={currentTemperature}
                text={text} iconURL={iconURL} eventEmitter={this.props.eventEmitter}></TopSection>
            </div>
          }
          <div className='bottomSecion'>
            <BottomSection forecastDaysArray={forecastDaysArray} numForecastDays={numForecastDays}></BottomSection>
          </div>
        </div>
      </div>
    );
  }
}