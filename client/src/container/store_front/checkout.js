import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.cancelPurchases = this.cancelPurchases.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product: {},
      address: {},
      orderRepo: {},
      pickUpStatus: "",
      orderID: "",
    };
  }
  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  cancelPurchases() {
    window.location = "/shopdetails/" + this.props.match.params.id;
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ product: response.data });
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

  onSubmit(e) {
    e.preventDefault();

    const order = {
      prodId: this.state.product._id,
      prodName: this.state.product.name,
      price: this.state.product.price,
      pickUpStatus: this.state.pickUpStatus,
    };

    console.log(order);

    axios
      .post("http://localhost:5000/orders/add/", order, {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((res) => window.location = "/customer/order/" + res.data._id);

    
  }

  render() {
    //console.log(this.props.auth.user.id);
    console.log(this.state.product);
    //console.log("address", this.state.address._id);
    //console.log("Addid", this.state.addId);
    console.log("OrderRepo", this.state.orderRepo._id);
    const { user } = this.props.auth;

    return (
      <div className="container">
        <div className="col-md-12">
          <div className="container">
            <h3>CheckOut</h3>
            <div className="row">
              <div className="col-md-6">
                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div className="prodName">{this.state.product.name}</div>
                  <div className="brand-small">{this.state.product.brand}</div>
                  <div>Item ID:{this.state.product._id}</div>
                </div>
              </div>
              <div className="col-md-6">
                {/* images Upload */}
                <div className="form-group">
                  <div>
                    <img src={this.state.product.images}></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p>
                <u>Your Information:</u> <br />
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
            <div className="form-group">
            <form Validate>
              <div className="form-group">
                <input
                  placeholder="Pick up options"
                  onChange={this.onChange}
                  value={this.state.pickUpStatus}
                  id="pickUpStatus"
                  type="text"
                />
              </div>
            </form>
          </div>
          <div className="price">Total: ${this.state.product.price}</div>
          </div>
          
          <hr />
          {/* SUBMIT */}
          <div className="container form-group">
            <div className="btn">
              <div className="btn">
                <button className="btn btn-primary" onClick={this.onSubmit}>
                  Confirm Purchase
                </button>
              </div>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.cancelPurchases}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CheckOut.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(withRouter(CheckOut));
