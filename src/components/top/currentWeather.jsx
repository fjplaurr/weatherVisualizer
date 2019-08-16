import React from 'react';
import { capitalizeFirstLetter, passToUTC, formatDate } from '../../utils.js';

export default class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
        this.todayDate = passToUTC(new Date());
    }

    render() {
        const { location, currentTemperature, text, iconURL } = this.props;
        return (
            <div className="weatherContainer">
                <div className="header">{location}</div>
                <div className="currentWeather">{Math.round(currentTemperature)}<div>ºC</div></div>
                <div className="currentDate">{capitalizeFirstLetter(formatDate(this.todayDate))}</div>
                <div className="footer">{capitalizeFirstLetter(text)}
                    <div className="imageWrapper"><img src={iconURL} alt='Weather icon'></img></div>
                </div>
            </div>
        )
    }
}