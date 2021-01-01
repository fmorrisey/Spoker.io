
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
  <tr>
    <td><Link to={"/details/"+props.product._id}>{props.product.name}</Link></td>
    <td>{props.product.brand}</td>
    <td>{props.product.department}</td>
    <td>{props.product.category}</td>
    <td>${props.product.msrp} / ${props.product.price}</td>
    {/* <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td> */}
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
    const isEmptyInventory = this.state.products.length === 0;
    return (
      <div className="container">
        <div className="col-md-12">
        <h3>Shop Inventory</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Dept.</th>
              <th>Category</th>
              <th>MSRP / Retail</th>
            </tr>
          </thead>
          <tbody>
            { this.productList() }
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}