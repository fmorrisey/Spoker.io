import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Item extends Component {
  render() {
    return (
      <div className="m-3">
        <div key={this.props.product._id}>
          <div className="row m-1">
            <div className="col-md-4">
              <Link to={`/shopdetails/${this.props.product._id}`}>
                <img src={this.props.product.images} className="shopItem"></img>
              </Link>
            </div>
            <div className="col-md-8">
              <a className="prodName">
                <Link to={`/shopdetails/${this.props.product._id}`}>
                  {this.props.product.name}
                </Link>
              </a>
              <p className="card-text">
                <a className="brand-small">{this.props.product.brand}</a>
                <br />
                <a className="price-small">${this.props.product.price}.00</a>
              </p>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
