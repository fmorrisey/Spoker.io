import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Product extends Component {
  render() {
    return (
      <tr>
    <td><Link to={"/details/"+this.props.product._id}>{this.props.product.name}</Link></td>
    <td>{this.props.product.brand}</td>
    <td>{this.props.product.department}</td>
    <td>{this.props.product.category}</td>
    <td>${this.props.product.price}</td>
  </tr>
    )
  }
}
