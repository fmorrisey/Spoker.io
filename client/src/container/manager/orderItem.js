import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.backToTop = this.backToTop.bind(this);
    this.seeOrder = this.seeOrder.bind(this);

    this.state = {
      order: {},
      address: {},
      product: {},
      customerID: "",
      customer: {},
      pickUpStatus: "",
    };
  }

  backToTop() {
    window.location = "/manager/orders";
  }

  seeOrder() {
    axios
      .get("http://localhost:5000/user/" + this.state.order.user, {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((response) => {
        this.setState({ customer: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/products/" + this.state.order.prodId)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/address/" + this.state.order.address)
      .then((response) => {
        this.setState({ address: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("USER", this.props.auth.user.id);
    console.log("Order", this.state.order.user);
    console.log("product", this.state.product);
    console.log("address", this.state.address._id);
    console.log("Addid", this.state.addId);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  cancelPurchases() {
    window.location = "/shopdetails/" + this.props.match.params.id;
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/orders/id/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ order: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    this.seeOrder();
  }

  render() {
    console.log("CUSTOMER", this.state.order.user);
    const { user } = this.props.auth;

    return (
      <div className="container">
        <div className="col-md-12">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div>
                  <h3>ORDER:</h3>
                </div>
                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div>{this.state.order.prodName}</div>
                  <div>${this.state.order.price}.00</div>
                </div>
              </div>
            </div>

            <div>
              <p>Order ID: {this.state.order._id}</p>
              <p>Product ID: {this.state.order.prodId}</p>
              <p>Tracking Number: {this.state.order.trackingNumber}</p>
            </div>
            <div>
              <p>
                <u>ADDRESSS</u>
                <br />
                {this.state.customer.first_name} {this.state.customer.last_name}
                <br />
                {this.state.address.street1}
                <br />
                {this.state.address.street2}
                <br />
                {this.state.address.city}
                <br />
                {this.state.address.state}
                <br />
                {this.state.address.country}
                <br />
                {this.state.address.zipCode}
              </p>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.backToTop}
          >
            Back
          </button>
          <button className="btn btn-danger" onClick={this.seeOrder}>
            See Details
          </button>
        </div>
      </div>
    );
  }
}
OrderItem.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(OrderItem));
