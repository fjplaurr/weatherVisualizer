import React, { Component } from './node_modules/react';
import './app.css';
import TopSection from '../top/index';
import BottomSection from '../bottom/index';
import axios from './node_modules/axios';
import {getLocation} from '../../utils.js';

const KEY = 'db168490cf4a5154faf7efed0866368a';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: 'London',
      isLoading: true
    }
  }

  //Calling updateCity with 2 parameters: latitude and longitud. Calling it with 1 parameter: name of city
  updateCity = (p1, p2) => {
    var URLcurrent = '';
    var URLforecast = '';
    if (typeof p2 == 'undefined') {
      URLcurrent = `http://api.openweathermap.org/data/2.5/weather?q=${p1}&lang=${navigator.language.substring(0,2)}&units=metric&appid=${KEY}`;
      URLforecast = `http://api.openweathermap.org/data/2.5/forecast?q=${p1}&lang=${navigator.language.substring(0,2)}&units=metric&appid=${KEY}`;
    } else {
      URLcurrent = `http://api.openweathermap.org/data/2.5/weather?lat=${p1}&lon=${p2}&lang=${navigator.language.substring(0,2)}&units=metric&appid=${KEY}`;
      URLforecast = `http://api.openweathermap.org/data/2.5/forecast?lat=${p1}&lon=${p2}&lang=${navigator.language.substring(0,2)}&units=metric&appid=${KEY}`
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
    getLocation((lat_lng) => { });
    if (lat_lng.length) {
      this.updateCity(lat_lng[0], lat_lng[1]);
    } else {
      const { cityName } = this.state;
      this.updateCity(cityName);
    }
  }

  render() {
    console.log('CITYPADRE');
    console.log(this.state.cityName);
    const { isLoading, cityName, currentTemperature, text, iconURL, forecastDaysArray } = this.state;
    return (
      <div className='appContainer'>
        <div className='mainContainer'>
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading &&
            <div className='topSection'>
              <TopSection updateCity={this.updateCity.bind(this)} cityName={cityName} currentTemperature={currentTemperature}
                text={text} iconURL={iconURL} eventEmitter={this.props.eventEmitter}></TopSection>
            </div>
          }
          <div className='bottomSecion'>
            <BottomSection forecastDaysArray={forecastDaysArray}></BottomSection>
          </div>
        </div>
      </div>
    );
  }
}