import React from 'react';




export default class ForecastDay extends React.Component {

    getTime = (unixTimeStamp) => {
        const date = new Date(unixTimeStamp * 1000);
        const hours = date.getHours();
        return  `${hours}:00`;
    }


    render() {
        const { dayObject } = this.props;
        console.log('mireda');
        console.log(new Date(dayObject.dt * 1000).getDate());
        return (
            <div className='forecastHourContainer'>
                <div className="image"><img src={`http://openweathermap.org/img/wn/${dayObject.weather[0].icon}@2x.png`}></img></div>
                <div className="temperature">{Math.round(dayObject.main.temp)}º</div>
                <div className='time'>{this.getTime(dayObject.dt)}</div>
            </div>
        )
    }


}