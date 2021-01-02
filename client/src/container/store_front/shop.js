import React, { Component } from 'react';
import Link from 'react-router-dom';
import axios from 'axios';

export class shop extends Component {

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
            <div key={product.id}>
                <h3>{product.name}</h3>
                <p>{product.category}</p>
            </div>
        ));

        return (
            <div>
                {shopItems}
            </div>
        )
    }
}

export default shop
