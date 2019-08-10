import React from 'react';



export default class ForecastDay extends React.Component {
    render() {
        const {day} = this.props;
        return <div className='forecastday-container'>
            <div className="image"><img src={day.day.condition.icon}></img></div>
            <div className="text">{day.day.avgtemp_c}º</div>
        </div>
    }
}