import React, { Component } from 'react';
import axios from 'axios';

axios.request({
    url: "/oauth/token",
    method: "post",
    baseURL: "https://api.lyft.com/",
    auth: {
        username: "pat",
        password: "cj5YqMl71MAS"
    },
    data: {
        "grant_type": "client_credentials",
        "scope": "public"
    }
}).then(function (res) {
    console.log(res);
});

class Lyft extends Component {
    state = {
        trains: undefined,
        buses: undefined,
        mbta_is_loaded: false,
    };


    render() {
        if (!this.state.trains) {
            return (
                <h1>Lyft</h1>
            )
        } else {
            return (
                <div className="Lyft">
                    <h1>Lyft run</h1>
                </div >
            );
        }
    }
}

export default Lyft;