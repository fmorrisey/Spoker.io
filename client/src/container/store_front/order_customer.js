import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OrderCust from "../../components/store/orderCust";

export default class CustomerOrders extends Component {
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
      .get("http://localhost:5000/orders/customer/list/", {
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

    let filteredOrders = this.state.orders.filter((order) => {
      return order._id.indexOf(this.state.search) !== -1;
    });

    //console.log("State: ", this.state.orders)
    return (
      <div className="container padding">
        <div className="col-md-12">
          <div className="col-md-12">
            <h3>Orders</h3>
            <div className="mb-2">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                defaultValue={this.state.search}
                onChange={this.updateSearch.bind(this)}
              />
            </div>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Order ID</th>
                  {/* <th>Status</th> */}
                  <th>Pick Up</th>
                  {/* <th>Last Name:</th> */}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((currentOrder) => {
                  return (
                    <OrderCust
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
