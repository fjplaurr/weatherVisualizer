import React from 'react';
import './style.css';
import ForecastDay from './forecastDay';

export default class BottomSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        const { forecastDays } = this.props;
        console.log('ForecastDayss: ');
        console.log(forecastDays);
        return (
            <div className='bottom-container'>
                {/*The expression 'forecastDays &&' is used to avoid trying to render the array forecastDay before it is loaded from the API */}
                {forecastDays && forecastDays.map((day, index) => {
                    return <ForecastDay day={day} key={index}></ForecastDay>
                })}
            </div>
        )
    }
}