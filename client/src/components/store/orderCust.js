import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class OrderCust extends Component {
  render() {
    return (
    <tr className="col-md-12">
    <td><Link to={"/customer/order/"+this.props.order._id}>{this.props.order.prodName}</Link></td>
    {/* <td>{this.props.order.orderStatus}</td> */}
    <td>{this.props.order.pickUpStatus}</td>
    {/* <td>{this.props.order.customerName}</td> */}
    {/* <td>{this.props.order.pickUpStatus}</td>
    <td>{this.props.order.products}</td>
    <td>${this.props.order.msrp}/${this.props.order.price}</td> */}
  </tr>
    )
  }
}
