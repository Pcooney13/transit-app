import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { iso_to_date } from '../../Utils';

class Events extends Component {

    state = {
        events: undefined,
    }

    componentDidMount() {
        this.getWeather();
    }

    getWeather = async e => {
        // API keys
        const API_KEY = 'MjEyMDk3NTd8MTU5MTY2Mjk3MS4z';
        const city = "Boston"
        const start_date = `${this.props.year}-${this.props.month}-${this.props.day}`
        const end_date = `${this.props.weekAhead}`
        console.log(`start: ${start_date} | End: ${end_date}`)
        // API Call
        const api_call = await fetch(
            `https://api.seatgeek.com/2/events?venue.city=${city}&datetime_utc.gte=${start_date}&datetime_utc.lte=${end_date}&client_id=${API_KEY}`
        );
        // Awaiting the Response...
        const data = await api_call.json()
        // Set state after API response
        if (data && data.length !== 0) {
            let popularEvents = [];
            console.log(data)
            data.events.forEach(element => {
                console.log(element.performers)
                // if (element.performers[0].score > .35) {
                    popularEvents.push(element)
                    element.date = iso_to_date(element.datetime_local, this.props.months)
                // }
            });
            this.setState({
                events: popularEvents,
            })
        } else {
            this.setState({
                events: undefined
            })
        }
    }

    render() {
        // // RELOADS EVEERY 30 SEC
        // setInterval(function () {
        //     window.location.reload();
        // }, 30000);
        if (!this.state.events) {
            return (
                <h1>Events</h1>
            )
        } else {
            return (
                <div className="component Events">
                    <h1>Events</h1>
                    <Carousel showArrows={false} showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true} interval={5000} transitionTime={500}>
                        {this.state.events.map(event =>
                            <div key={event.url} className="card event">
                                <div className="event__image">
                                    <div className="event__overlay"></div>
                                    <img src={event.performers[0].image ? event.performers[0].image : `https:via.placeholder.com/280x210/?text=${event.performers[0].name}`} alt={event.performers[0].name} />
                                </div>
                                <p className="event__title"> <strong>{event.title}</strong></p>
                                <p className="event__date">{event.date[0]} - {event.date[1]}</p>
                                <p className="event__venue"><strong>{event.venue.name}</strong></p>
                                <p className="event__address">{event.venue.address} {event.venue.city}, {event.venue.state}</p>
                            </div>
                        )}
                    </Carousel>
                </div>
            );
        }
    }
}

export default Events;
