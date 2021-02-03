import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderMngr from "../store/orderMngr";
import Product from "../store/product";

export default class OrdersManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      products: [],
      search: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/orders/", {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((response) => {
        this.setState({ orders: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) });
  }

  render() {
    let isEmptyInventory = this.state.orders.length === 0;

    console.log("State: ", this.state.orders);
    return (
      <div className="container">
        <div className="card col-md-12 paddingDash">
          <Link to="/manager/orders" className="card-header align-center">
            <h3>Orders</h3>
          </Link>
          <div className="tableContainer">
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Order ID</th>
                  <th>Status</th>
                  <th>Pick Up</th>
                  <th>Customer</th>
                </tr>
              </thead>
              <tbody>
                {this.state.orders.map((currentOrder) => {
                  return (
                    <OrderMngr
                      order={currentOrder}
                      key={currentOrder._id}
                      order={currentOrder}
                      key={currentOrder._id}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
