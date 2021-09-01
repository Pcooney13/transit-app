import React, { Component } from 'react';

class Food extends Component {

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
            `https://us.openfoodfacts.org/category/fruits/.json`
        );
        // Awaiting the Response...
        const data = await api_call.json()
        // Set state after API response
        if (data) {
            this.setState({
                food: data,
            })
        } else {
            this.setState({
                food: undefined
            })
        }
    }

    render() {
        if (!this.state.food) {
            return (
                <h1>Bicycles</h1>
            )
        } else {
            return (
                <div className="component Events">
                    {console.log(this.state.food.products)}
                    {this.state.food.products.map(food =>
                        <img src={food.image_small_url} alt="food"/>
                        )}
                    <h1>Food</h1>                    
                </div>
            );
        }
    }
}

export default Food;
