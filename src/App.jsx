import React, { Component } from 'react';
import './App.css';
import './sass/app.css';
import TopSection from './components/top/index';
import BottomSection from './components/bottom/index';
import axios from 'axios';


const WEATHER_KEY = 'b5d34978469a407ea64182413190908';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: 'Almeria',
      numForecastDays: 4,
      isLoading: true,
    }
  }

  updateCity = (city) => {
    const { numForecastDays } = this.state;
    const URL = `https://api.apixu.com/v1/forecast.json?key=${WEATHER_KEY}&q=${city}&days=${numForecastDays}`;
    console.log('LA URL es: ');
    console.log(URL);
    axios.get(URL)
      .then((res) => {
        console.log(res)
        return res.data;
      })
      .then((data) => {
        console.log('call to API: ')
        console.log(data);
        return data;
      }).then(data => this.setState({
        isLoading: false, cityName: data.location.name,
        isDay: data.current.isDay,
        temp_c: data.current.temp_c,
        text: data.current.condition.text,
        iconURL: data.current.condition.icon,
        forecastDays: data.forecast.forecastday
      }))
      .catch(error => {
        error && console.log('Cannot fetch Weather Data from API ', error);
      });

      
  }

  componentDidMount() {
    const { cityName } = this.state;
    const { eventEmitter } = this.props;
    //Initial visualization
    this.updateCity(cityName);
    //Event for updating data
    eventEmitter.on('updateWeather', data => this.updateCity(data));
  }

  render() {
    const { isLoading, cityName, temp_c, isDay, text, iconURL, forecastDays } = this.state;
    return (
      <div className='app-container'>
        <div className='main-container'>
          {isLoading && <h3>Loading Weather...</h3>}
          {!isLoading &&
            <div className='top-section'>
              <TopSection location={cityName} temp_c={temp_c} isDay={isDay} text={text} iconURL={iconURL} eventEmitter={this.props.eventEmitter}></TopSection>
            </div>
          }
          <div className='bottom-section'>
            <BottomSection forecastDays={forecastDays}></BottomSection>
          </div>
        </div>
      </div>
    );
  }
}

export default App;