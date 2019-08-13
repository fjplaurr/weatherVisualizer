import React from 'react';




export default class ForecastDay extends React.Component {
    getTime = (unixTimeStamp) => {
        const date = new Date(unixTimeStamp * 1000); // --> No está dando UTc   
        const dateUTC = this.convertDateToUTC(date);
        const hours = dateUTC.getHours();
        return `${hours}:00`;
    }

    convertDateToUTC = (date) => {
        return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
    }

    render() {
        const { dayObject } = this.props;
        return (
            <div className='forecastHourContainer'>

                <div className="imageWrapper"><img src={`http://openweathermap.org/img/wn/${dayObject.weather[0].icon}@2x.png`}></img></div>
                <div className='wrapperTempTime'>
                    <div className="temperature">{Math.round(dayObject.main.temp)}º</div>
                    <div className='time'>{this.getTime(dayObject.dt)}</div>
                </div>

            </div>
        )
    }
}