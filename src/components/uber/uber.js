import React, { Component } from 'react';

const API_KEY =

    class Uber extends Component {
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

            if (data && data2) {
                this.setState({
                    trains: data.data,
                    station: data2.data,
                    buses: undefined,
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
                    <h1>Lyft</h1>
                )
            } else {
                return (
                    <div className="Lyft">
                        <h1>Lyft</h1>
                    </div >
                );
            }
        }
    }

export default Uber;