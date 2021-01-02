import React, { Component } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';

class Shop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:5000/products/')
          .then(response => {
            this.setState({ products: response.data })
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        const shopItems = this.state.products.map(product => (
            <div className="row">
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>${product.price}.00</p>
                </div>
            </div>
        ));

        return (
            <div className="container">
                {shopItems}
            </div>
        )
    }
}

export default Shop;
