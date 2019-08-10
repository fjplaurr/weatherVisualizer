import React from 'react';


export default class Weather extends React.Component{
    render(){
        const {location, temp_c, isDay, text, iconURL} = this.props;

        return <div className="weather-container">
            <div className="header">{location}</div>
            <div className="inner-container">
                <div className="image"><img src={iconURL} alt='Weather icon'></img></div>
                <div className="current-weather">{temp_c}º</div>
            </div>
            <div className="footer">{text}</div>
        </div>
    }
}