import React from 'react';
import "./style.css";
import Weather from './weather';
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
        this.setState({locationName: e.target.value});
    }

    onSelectCity = () => {
        const { locationName } = this.state;
        const { eventEmitter } = this.props;
        eventEmitter.emit('updateWeather', locationName);
        this.setState({isSelectlocationOpen: false});
    }

    render() {
        const { isSelectlocationOpen } = this.state;
        return (
            <div className='top-container'>
                <div className="title">Weather Up</div>
                <Weather {...this.props}></Weather>
                <Manager>
                    <Reference>
                        {({ ref }) => (
                            <button className='btn btn-select-location' ref={ref} onClick={this.onToggleSelectLocation}>
                                Select location
                        </button>
                        )}
                    </Reference>
                    <Popper placement="top">
                        {({ ref, style, placement, arrowProps }) => (isSelectlocationOpen &&
                            <div className='popup-container' ref={ref} style={style} data-placement={placement}>
                                <div ref={arrowProps.ref} style={arrowProps.style} />
                                <div className='form-container'>
                                    <label htmlFor='location-name'>Location Name</label>
                                    <input type='text' id='location-name' placeholder='City Name' onChange={this.onLocationNameChange.bind(this)}></input>
                                    <button className='btn btn-select-location' onClick={this.onSelectCity.bind(this)}>Select</button>
                                </div>
                            </div>
                        )}
                    </Popper>
                </Manager>
            </div>
        )
    }
}