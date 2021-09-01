import React, { Component } from 'react';
// weatherbit api
const API_KEY = '53189c1951814d7a9ccda592dac5a917';
const city = "watertown";
const state = "ma";

class WeatherApp extends Component {
    state = {
        weather: undefined,
        error: undefined
    };

    componentDidMount() {
        this.getWeather();
    }

    getWeather = async e => {
        const api_call = await fetch(
            `http://api.weatherbit.io/v2.0/current?city=${city},${state}&key=${API_KEY}&units=fahrenheit`
        );
        const data = await api_call.json();

        if (data) {
            this.setState({
                weather: data.data[0],
                error: ""
            });
        } else {
            this.setState({
                weather: undefined,
                error: "Please enter a city and state and try again."
            });
        }

    };

    render() {
        // // RELOADS EVEERY 30 SEC
        // setInterval(function () {
        //     window.location.reload();
        // }, 30000);
        if (!this.state.weather) {
            return (
                <h1>Events</h1>
            )
        } else {
            // console.log(this.state)
            return (
                <div className="weather">
                    <div className="weather-logo">
                        <img src="https://tsc.launchpaddev.com/members/media/logo.svg" alt="logo" />
                    </div>
                    <div className="date-info">
                        <h1 className="date">{this.props.month_name}, {this.props.day} {this.props.year}</h1>
                        <h1 className="time">{this.props.hour > 12 ? this.props.hour % 12 : this.props.hour}:{this.props.minute} {this.props.hour > 12 ? "PM" : "AM"}</h1>
                        <h1 className="day">{this.props.day_name}</h1>

                    </div>
                    <div className="weather-app">
                        <div>
                            <div className="weather__info">
                                {/* <h4 className="weather__location"> {this.state.weather.city_name}, {this.state.weather.state_code}</h4> */}
                                <div className="line line-1">
                                    <p className="weather__time">NOW</p>
                                    <img className="weather__icon" src={`https://www.weatherbit.io/static/img/icons/${this.state.weather.weather.icon}.png`} alt={this.state.weather.weather.description} />
                                </div>
                                <div className="line line-2">
                                    <p className="weather__temp time">{Math.round((this.state.weather.temp * 9 / 5) + 32)}&deg;F</p>
                                    <p className="weather__description">{this.state.weather.weather.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
export default WeatherApp;
