import React from 'react';



export default class CurrentWeather extends React.Component {
    render() {
        const { location, currentTemperature, text, iconURL } = this.props;
        return (
            <div className="weatherContainer">
                <div className="header">{location}</div>
                <div className="inner-container">
                    <div className="image"><img src={iconURL} alt='Weather icon'></img></div>
                    <div className="current-weather">{Math.round(currentTemperature)}º</div>
                </div>
                <div className="footer">{text}</div>
            </div>
        )
    }
}