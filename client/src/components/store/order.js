import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Order extends Component {
  render() {
    return (
      <tr>
    <td><Link to={"/details/"+this.props.order._id}>{this.props.order.name}</Link></td>
    <td>{this.props.order.brand}</td>
    <td>{this.props.order.department}</td>
    <td>{this.props.order.category}</td>
    <td>${this.props.order.msrp}/${this.props.order.price}</td>
  </tr>
    )
  }
}
