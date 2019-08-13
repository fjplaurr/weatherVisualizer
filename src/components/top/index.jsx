import React from 'react';
import "./style.css";
import CurrentWeather from './currentWeather';
import { Manager, Reference, Popper } from 'react-popper';



export default class TopSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectlocationOpen: false,
        }
    }

    onToggleSelectLocation = () => {
        this.setState((prevState) => ({ isSelectlocationOpen: !prevState.isSelectlocationOpen }));
        console.log(this.state.isSelectlocationOpen);
    }

    onLocationNameChange = (e) => {
        this.setState({ locationName: e.target.value });
    }

    onSelectCity = () => {
        this.props.updateCity(this.state.locationName);
        this.setState({ isSelectlocationOpen: false });
    }

    render() {
        const { isSelectlocationOpen } = this.state;
        return (
            <div className='topContainer'>
                <CurrentWeather {...this.props}></CurrentWeather>
                <Manager>
                    <Reference>
                        {({ ref }) => (
                            <button className='btn btnLocation' ref={ref} onClick={this.onToggleSelectLocation}>
                                Select location
                        </button>
                        )}
                    </Reference>
                    <Popper placement="top">
                        {({ ref, style, placement, arrowProps }) => (isSelectlocationOpen &&
                            <div className='popup-container' ref={ref} style={style} data-placement={placement}>
                                <div ref={arrowProps.ref} style={arrowProps.style} />
                                <div className='form-container'>
                                    <input type='text' id='location-name' placeholder='Enter city name' onChange={this.onLocationNameChange.bind(this)}></input>
                                    <button className='btn btnLocationAccept' onClick={ () => {
                                        this.onSelectCity(this.state.locationName);
                                    }}>Search</button>
                                    <button className='btn btnLocationCancel' onClick={ () => {
                                        this.setState({ isSelectlocationOpen: false });
                                    }}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </Popper>
                </Manager>
            </div>
        )
    }
}