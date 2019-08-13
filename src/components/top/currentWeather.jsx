import React from 'react';



export default class CurrentWeather extends React.Component {
    capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

    render() {
        const { location, currentTemperature, text, iconURL } = this.props;
        return (
            <div className="weatherContainer">
                <div className="header">{location}</div>
                <div className="inner-container">
                    <div className="imageWrapper"><img src={iconURL} alt='Weather icon'></img></div>
                    <div className="currentWeather">{Math.round(currentTemperature)}º</div>
                </div>
                <div className="footer">{this.capitalizeFirstLetter(text)}</div>
            </div>
        )
    }
}