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
          <h3>CONFIRMATION!</h3>
          <div className="container">
            <div className="row">
              <div className="col-6">
                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div>{this.state.product.name}</div>
                  <div>{this.state.product.brand}</div>
                </div>
                {/* Retail Price */}
                <div className="form-group">
                  <div>${this.state.product.price}</div>
                </div>
              </div>
              <div className="col-6">
                {/* images Upload */}
                <div className="form-group">
                  <div>
                    <img src={this.state.product.images}></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p>{this.state.first_name}</p>
              <p>{this.state.last_name}</p>
            </div>
            <div>
              <p>ORDER</p>
              <p>{this.state.order._id}</p>
              <p>{this.state.order.prodId}</p>
            </div>
            <div>
              <p>ADDRESS</p>
              <p>{this.state.address._id}</p>
              <p>{this.state.address.street1}</p>
              <p>{this.state.address.street2}</p>
              <p>{this.state.address.city}</p>
              <p>{this.state.address.state}</p>
              <p>{this.state.address.country}</p>
              <p>{this.state.address.zipCode}</p>
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
