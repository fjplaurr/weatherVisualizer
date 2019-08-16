import React from 'react';
import "./style.css";
import CurrentWeather from './currentWeather';
import TextFieldCustomized from './textFieldCustomized';


export default class TopSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: props.cityName
        }
    }

    onLocationNameChange = (e) => {
        this.setState({ locationName: e.target.value });
    }

    onSelectCity = () => {
        this.props.updateCity(this.state.locationName);
    }

    render() {
        return (
            <div className='topContainer'>
                <CurrentWeather {...this.props}></CurrentWeather>
                <TextFieldCustomized cityName={this.state.locationName} onLocationNameChange={this.onLocationNameChange.bind(this)} onSelectCity={this.onSelectCity.bind(this)}/>
            </div>
        )
    }
}