import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Item extends Component {
  render() {
    return (
      <div className="container">
        <div key={this.props.product._id}>
         <div className="row">
         <div className="col-md-6">
          <h3>
            <Link to={`/shopdetails/${this.props.product._id}`}>{this.props.product.name}</Link>
          </h3>
          <p>{this.props.product.category}</p>
          <p>${this.props.product.price}.00</p>
          </div>
          <div className="col-md-3">
            <h1>IMG</h1>
          </div>
         </div>
        </div>
      </div>
    );
  }
}
