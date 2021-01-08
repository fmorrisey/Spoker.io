import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

class CustomerOrder extends Component {
  constructor(props) {
    super(props);
    this.backToTop = this.backToTop.bind(this);
    this.state = {
      order: {},
      address: {},
      product: {},
      pickUpStatus: "",
    };
  }

  backToTop() {
    window.location = "/store";
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  cancelPurchases() {
    window.location = "/shopdetails/" + this.props.match.params.id;
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/orders/customer/", {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((response) => {
        this.setState({ order: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/address/customer/", {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((response) => {
        this.setState({ address: response.data, addId: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log("USER", this.props.auth.user.id);
    console.log("Order", this.state.order);
    console.log("product", this.state.product);
    console.log("address", this.state.address._id);
    console.log("Addid", this.state.addId);
    const { user } = this.props.auth;

    return (
      <div className="container">
        <div className="col-md-12">
          {/* COMEBACK AND ADD A CONDITIONAL FOR NEW BIKE DAY */}
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div>
                  <h3>CONFIRMATION!</h3>
                  <p>Thank you {user.first_name} for your purchase of:</p>
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
                {user.first_name} {user.last_name}
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
        </div>
      </div>
    );
  }
}
CustomerOrder.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(CustomerOrder));
