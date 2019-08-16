import React from 'react';
import './style.css';
import ForecastDay from './forecastDay';
import {capitalizeFirstLetter, passToUTC, formatDate} from '../../utils.js'

export default class BottomSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.todayDate = passToUTC(new Date());
        this.FORECAS_DAYS_NUMBER = 4;
        this.datesToShow = this.getDatesToShow(); //Array with the dates to show (next 4 days of forecast)
    }

    getForecastDate = (unixTimeStamp) => new Date(unixTimeStamp * 1000); //No need to transform into UTC since the API already gives UTC dates

    getDatesToShow = () => {
        var arr = [];
        for (var i = 1; i <= this.FORECAS_DAYS_NUMBER; i++) {
            var nextDay = new Date(this.todayDate);
            nextDay.setDate(this.todayDate.getDate() + i);
            arr.push(nextDay);
        }
        return arr;
    }

    procesados = (arr) => {
        for (var i = 0; i < arr.length; i++) {
            arr[i].procesado = false;
        }
    }

    render() {
        const { forecastDaysArray } = this.props;
        return (
            <div className='bottomContainer'>
                <div className="wrapperDay">
                    <div className='dayContainer'>
                        {<div className='dateForecast'>{capitalizeFirstLetter(formatDate(this.datesToShow[0]))}</div>}
                        {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[0].getDate())
                            .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                    </div>
                </div>
                <div className="wrapperDay">
                    <div className='dayContainer'>
                        {<div className='dateForecast'>{capitalizeFirstLetter(formatDate(this.datesToShow[1]))}</div>}
                        {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[1].getDate())
                            .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                    </div>
                </div>
                <div className="wrapperDay">
                    <div className='dayContainer'>
                        {<div className='dateForecast'>{capitalizeFirstLetter(formatDate(this.datesToShow[2]))}</div>}
                        {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[2].getDate())
                            .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                    </div>
                </div>
                <div className="wrapperDay">
                    <div className='dayContainer'>
                        {<div className='dateForecast'>{capitalizeFirstLetter(formatDate(this.datesToShow[3]))}</div>}
                        {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[3].getDate())
                            .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                    </div>
                </div>
            </div>
        )
    }
}

