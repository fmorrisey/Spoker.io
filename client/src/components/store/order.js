import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Order extends Component {
  render() {
    return (
      <tr>
    <td><Link to={"/details/"+this.props.order._id}>{this.props.order._id}</Link></td>
    <td>{this.props.order.orderStatus}</td>
    {/* <td>{this.props.order.pickUpStatus}</td>
    <td>{this.props.order.products}</td>
    <td>${this.props.order.msrp}/${this.props.order.price}</td> */}
  </tr>
    )
  }
}
