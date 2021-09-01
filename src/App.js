import React, { Component } from 'react';
import { prepend_zero_to_single_digits } from './/Utils';
// import Logo from './logo.svg';
import Weather from './components/weather/weather'
import WeatherHourly from './components/weather/weather-hourly'
import Events from './components/events/events'
import BlueBikes from './components/bluebikes/bluebikes'
import Food from './components/Food'
import Lyft from './components/lyft/lyft'
import MBTA from './components/mbta/mbta'
import './App.css';

// Get Day information
const months = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const date = new Date();
const year = date.getFullYear();
//month is 0 indexed
let hour = prepend_zero_to_single_digits(date.getHours());
let minute = prepend_zero_to_single_digits(date.getMinutes());
let month = prepend_zero_to_single_digits(date.getMonth() + 1);
let month_name = months[date.getMonth()];
let day = prepend_zero_to_single_digits(date.getDate());
let day_name = days[date.getDay()];
//week ahead
let weekAhead = new Date(date.getFullYear(), date.getMonth(), date.getDate()+7);
let weekAhead_year = weekAhead.getFullYear();
let weekAhead_month = prepend_zero_to_single_digits(weekAhead.getMonth() + 1);
let weekAhead_day = prepend_zero_to_single_digits(weekAhead.getDate());
weekAhead = `${weekAhead_year}-${weekAhead_month}-${weekAhead_day}`


class App extends Component {
	state = {
		year,
		month,
		month_name,
		day,
		day_name,
		hour,
		minute,
		weekAhead,
	};
	render() {
		return (
			<div className="App" >
				<div className="columns">
					<div className="column">
						<MBTA />
					</div>
					<div className="column">
						<Events
							year={this.state.year}
							month={this.state.month}
							day={this.state.day}
							weekAhead={this.state.weekAhead}
							months={months}
						/>
						<BlueBikes />
						<Food />
						{/* <Lyft /> */}
					</div>
				</div>
				<div className="sidebar">
					<Weather
						year={this.state.year}
						month={this.state.month}
						month_name={this.state.month_name}
						day={this.state.day}
						day_name={this.state.day_name}
						hour={this.state.hour}
						minute={this.state.minute}
					/>
					<WeatherHourly />
				</div>
			</div>
		);
	}
}

export default App;
