import React, { Component } from "react";
import Inventory from "../inventory/product-list";
import Orders from "../manager/orders";
class Manager extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <button className="btn btn-primary">Add</button>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Inventory />
          </div>
          <div className="col-md-6">
            <Orders />
          </div>
        </div>
      </div>
    );
  }
}

export default Manager;
