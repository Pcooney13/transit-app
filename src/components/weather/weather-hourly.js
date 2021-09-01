import React, { Component } from 'react'
// open weather map api
const API_KEY = '017bdc5b41896686f26b37ae17daf524'
const zip = '02135'
const country = 'us'
const units = 'imperial'


class WeatherHourly extends Component {
    state = {
        weather: undefined,
        error: undefined
    }

    componentDidMount() {
        this.getWeather()
    }

    getWeather = async e => {
        const api_call = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?zip=${zip},${country}&units=${units}&appid=${API_KEY}`
        )
        const data = await api_call.json()

        // console.log(data.list)

        if (data) {
            this.setState({
                weather: data.list,
                error: ""
            })
        } else {
            this.setState({
                weather: undefined,
                error: "Please enter a city and state and try again."
            })
        }

    }

    render() {
        if (!this.state.weather) {
            return (
                <h1>Hourly weather</h1>
            )
        } else {
            // console.log(this.state)
            return (
                <div className="weather-hourly">
                    <div className="weather-logo">
                        MORE WEATHER INFO TO COME
                    </div>
                </div>
            )
        }
    }
}
export default WeatherHourly
