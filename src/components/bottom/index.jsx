import React from 'react';
import './style.css';
import ForecastDay from './forecastDay';


const FORECAS_DAYS_NUMBER = 4;

export default class BottomSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.todayDate = this.passToUTC(new Date());
        this.datesToShow = this.getDatesToShow(); //Array with the dates to show (next 4 days of forecast)
    }

    getForecastDate = (unixTimeStamp) => new Date(unixTimeStamp * 1000); //No need to transform into UTC since the API already gives UTC dates

    getDatesToShow = () => {
        var arr = [];
        for (var i = 1; i <= FORECAS_DAYS_NUMBER; i++) {
            var nextDay = new Date(this.todayDate);
            nextDay.setDate(this.todayDate.getDate() + i);
            arr.push(nextDay);
        }
        console.log(arr);
        return arr;
    }

    procesados = (arr) => {
        for (var i = 0; i < arr.length; i++) {
            arr[i].procesado = false;
        }
    }

    formatDate = (d) => ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2);

    passToUTC = (date) => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());

    render() {
        const { forecastDaysArray } = this.props;
        return (
            <div className='bottomContainer'>
                <div className="wrapperDay">
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.formatDate(this.datesToShow[0])}</div>}
                    {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[0].getDate())
                        .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                </div>
                </div>
                <div className="wrapperDay">
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.formatDate(this.datesToShow[1])}</div>}
                    {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[1].getDate())
                        .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                </div>
                </div>
                <div className="wrapperDay">
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.formatDate(this.datesToShow[2])}</div>}
                    {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[2].getDate())
                        .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                </div>
                </div>
                <div className="wrapperDay">
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.formatDate(this.datesToShow[3])}</div>}
                    {forecastDaysArray && forecastDaysArray.filter(dayObj => this.getForecastDate(dayObj.dt).getDate() === this.datesToShow[3].getDate())
                        .map((dayObject, index) => { if (index % 2 === 0) return <ForecastDay dayObject={dayObject} key={index} /> })}
                </div>
                </div>

            </div>

        )

    }
}

