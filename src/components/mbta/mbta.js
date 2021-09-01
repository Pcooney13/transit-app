import React, { Component } from 'react';
import { iso_to_seconds, display_train_information } from './../../Utils';

const API_KEY = '7b9199fcfb024d1e86a0bee07183de49';
// const STATION_STOP = 'place-alfcl' // (ALEWIFE)
const STATION_STOP = 'place-davis' // (DAVIS)
// const STATION_STOP = 'place-harsq' // (HARVARD SQUARE)
// const STATION_STOP = 'place-WML-0035' // (BOSTON LANDING)
// const STATION_STOP = 'place-north' // (NORTH STATION)
// const STATION_STOP = 'place-mvbcl' // (PARK STREET)


var date = new Date();
var ISO_date = date.toISOString();
var current_time_in_seconds = iso_to_seconds(ISO_date);

console.log(current_time_in_seconds)

class MBTA extends Component {
    state = {
        trains: undefined,
        buses: undefined,
        mbta_is_loaded: false,
    };

    componentDidMount() {
        this.getWeather();
    }

    getWeather = async e => {
        const api_call = await fetch(
            `https://api-v3.mbta.com/predictions?stop=${STATION_STOP}&api_key=${API_KEY}`
        );
        const api_call_2 = await fetch(
            `https://api-v3.mbta.com/stops/${STATION_STOP}?api_key=${API_KEY}`
        );
        const data = await api_call.json();
        const data2 = await api_call_2.json();
        let trains = {
            inbound: {
                trains: [],
            },
            outbound: {
                trains: [],
            },
        }
        let buses = {}
        let rawRoutes = [];
        if (data && data2) {
            data.data.map(train =>
                rawRoutes.push(train.relationships.route.data.id)
            )
            data.data.map(train =>
                train.relationships.route.data.id === "Red" && train.attributes.direction_id === 0 &&
                trains.inbound.trains.push(train)
            )
            data.data.map(train =>
                train.relationships.route.data.id === "Red" && train.attributes.direction_id === 1 &&
                trains.outbound.trains.push(train)
            )
            const routesSet = new Set(rawRoutes)
            const routes = [...routesSet]
            routes.map(route =>
                buses[route] = route.split()
            )
            routes.map(route =>
                data.data.map(train =>
                    train.relationships.route.data.id === route &&
                    buses[route].push(train)
                )
            )
            this.setState({
                trains: trains,
                station: data2.data,
                buses: buses,
                mbta_is_loaded: true,
                error: ""
            });
        } else {
            this.setState({
                trains: undefined,
                buses: undefined,
                mbta_is_loaded: false,
                error: "Please enter a city and state and try again."
            });
        }

    };

    render() {
        if (!this.state.trains) {
            return (
                <h1>Choo Choo</h1>
            )
        } else {
            { let count = 0 }
            return (
                <div className="component Train">
                    {/* {console.log(this.state)} */}
                    <h1>{this.state.station.attributes.name}</h1>
                    <p>{this.state.station.attributes.address.split(',', 1)}</p>

                    {Object.keys(this.state.buses).map((bus, index) =>
                        <div key={index} className="train__block">
                            <div className="train__inbound">
                                {display_train_information(bus)}
                                <div className="train__direction"><p><strong>Inbound</strong></p></div>
                                <div className="train__time">
                                    {Object.values(this.state.buses)[index].slice(1, -1).map(train =>
                                        train.attributes.direction_id === 0 && train.attributes.arrival_time ?
                                            parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < -200 &&
                                                parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < -200 ?
                                                <p key={train.attributes.arrival_time}>no more trains</p>
                                                :
                                                parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < 0 ?
                                                    <p key={train.attributes.arrival_time}>BRD</p> :
                                                    parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < 60 &&
                                                        parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) > 0 ?
                                                        <p key={train.attributes.arrival_time}>ARR</p> :
                                                        parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) > 60 &&
                                                        <p key={train.attributes.arrival_time}>{parseInt((iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) / 60, 10)}</p>
                                            :
                                            train.attributes.direction_id === 0 && train.attributes.departure_time ?

                                                parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) < -200 ?
                                                    <p key={train.attributes.departure_time}>no more trains</p>
                                                    :
                                                    parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) < 0 ?
                                                        <p key={train.attributes.departure_time}>BRD</p> :
                                                        parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) < 60 &&
                                                            parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) > 0 ?
                                                            <p key={train.attributes.departure_time}>ARR</p> :
                                                            parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) > 60 &&
                                                            <p key={train.attributes.departure_time}>{parseInt((iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) / 60, 10)}</p>
                                                : ''
                                    )}
                            </div>
                            </div>
                            <div className="train__outbound">
                                {display_train_information(bus)}
                                <div className="train__direction"><p><strong>Outbound</strong></p></div>
                                <div className="train__time">
                                    {Object.values(this.state.buses)[index].slice(1, -1).map(train =>
                                        train.attributes.direction_id === 1 && train.attributes.arrival_time ?
                                            parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < -200 &&
                                                parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < -200 ?
                                                <p key={train.attributes.arrival_time}>no more trains</p>
                                                :
                                                parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < 0 ?
                                                    <p key={train.attributes.arrival_time}>BRD</p> :
                                                    parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) < 60 &&
                                                        parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) > 0 ?
                                                        <p key={train.attributes.arrival_time}>ARR</p> :
                                                        parseInt(iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) > 60 &&
                                                        <p key={train.attributes.arrival_time}>{parseInt((iso_to_seconds(train.attributes.arrival_time) - current_time_in_seconds) / 60, 10)}</p>
                                            :
                                            train.attributes.direction_id === 1 && train.attributes.departure_time ?

                                                parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) < -200 ?
                                                    <p key={train.attributes.departure_time}>no more trains</p>
                                                    :
                                                    parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) < 0 ?
                                                        <p key={train.attributes.departure_time}>BRD</p> :
                                                        parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) < 60 &&
                                                            parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) > 0 ?
                                                            <p key={train.attributes.departure_time}>ARR</p> :
                                                            parseInt(iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) > 60 &&
                                                            <p key={train.attributes.departure_time}>{parseInt((iso_to_seconds(train.attributes.departure_time) - current_time_in_seconds) / 60, 10)}</p>
                                                : ''
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                    }
                </div>
            );
        }
    }
}

export default MBTA;
