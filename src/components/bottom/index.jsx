import React from 'react';
import './style.css';
import ForecastDay from './forecastDay';



export default class BottomSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.today = new Date(new Date().getTime()).getDate();
    }

    getForecastDay = (unixTimeStamp) => new Date(unixTimeStamp * 1000).getDate();

    render() {
        const { forecastDaysArray } = this.props;
        return (
            <div className='bottomContainer'>
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.today + 1}</div>}
                    {
                        forecastDaysArray && forecastDaysArray.map((dayObject, index) => {
                            if (this.today + 1 === this.getForecastDay(dayObject.dt) && (index % 2 !== 0))
                                return <ForecastDay dayObject={dayObject} key={index}></ForecastDay>
                        })
                    }
                </div>
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.today + 2}</div>}
                    {
                        forecastDaysArray && forecastDaysArray.map((dayObject, index) => {
                            if (this.today + 2 === this.getForecastDay(dayObject.dt) && (index % 2 !== 0))
                                return <ForecastDay dayObject={dayObject} key={index}></ForecastDay>
                        })
                    }
                </div>
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.today + 3}</div>}
                    {
                        forecastDaysArray && forecastDaysArray.map((dayObject, index) => {
                            if (this.today + 3 === this.getForecastDay(dayObject.dt) && (index % 2 !== 0))
                                return <ForecastDay dayObject={dayObject} key={index}></ForecastDay>
                        })
                    }
                </div>
                <div className='dayContainer'>
                    {<div className='dateForecast'>{this.today + 4}</div>}
                    {
                        forecastDaysArray && forecastDaysArray.map((dayObject, index) => {
                            if (this.today + 4 === this.getForecastDay(dayObject.dt) && (index % 2 !== 0))
                                return <ForecastDay dayObject={dayObject} key={index}></ForecastDay>
                        })
                    }
                </div>
            </div>

        )

    }
}