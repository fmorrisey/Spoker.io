
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
  <tr>
    <td>{props.product.productName}</td>
    <td>{props.product.manuName}</td>
    <td>{props.product.productType}</td>
    <td>{props.product.style}</td>
    <td>${props.product.msrpCost} / ${props.product.priceRetail}</td>
    <td><br /></td>
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td>
  </tr>
)
export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {products: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        this.setState({ products: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProduct(id) {
    axios.delete('http://localhost:5000/products/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      products: this.state.products.filter(el => el._id !== id)
    })
  }

  productList() {
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
    })
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12">
        <h3>Shop Inventory</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Type</th>
              <th>Style</th>
              <th>MSRP / Retail</th>
              
            </tr>
          </thead>
          <tbody>
            { this.productList() }
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}