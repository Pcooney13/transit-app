import React, { Component } from 'react';

class BlueBikes extends Component {

    state = {
        bike: undefined,
    }




    componentDidMount() {
        this.getWeather();
    }

    getWeather = async e => {
        const location = {
            lat: 42.1260454,
            long: -71.4620601
        }
        console.log(location)
        // API Call
        const api_call = await fetch(
            `https://member.bluebikes.com/data/stations.json`
        );
        // Awaiting the Response...
        const data = await api_call.json()
        // Set state after API response
        let bikeArray = []
        if (data) {
            data.stations.map(station =>
                station.n === "A32043" || station.n === "D32001" ?
                    bikeArray.push(station)
                    : ''
            )
            this.setState({
                bikes: bikeArray,
            })
        } else {
            this.setState({
                bikes: undefined
            })
        }
    }

    render() {
        if (!this.state.bikes) {
            return (
                <h1>Bicycles</h1>
            )
        } else {
            return (
                <div className="component Events">
                    <h1>Nearby Blue Bikes</h1>
                    {this.state.bikes.map((bike, index) =>
                        <div className="bike__block" key={index}>
                            <p className="bike__location"><strong>{bike.s}</strong></p>
                            <div className="bike__info">
                                <div className="bike__stock">
                                    <p className="bike__number">{bike.ba}</p>
                                    <p className="bike__description">Bikes</p>
                                </div>
                                <div className="bike__stock">
                                    <p className="bike__number">{bike.da}</p>
                                    <p className="bike__description">Docks</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
    }
}

export default BlueBikes;
