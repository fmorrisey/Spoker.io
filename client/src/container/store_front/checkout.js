import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import Select from 'react-select';

const pickUpOptions = [
  { value: "INSTORE", label: "In Store Pick Up" },
  { value: "CURBSIDE", label: "Curbside Pick Up" },
  { value: "DELIVERY", label: "Delivery" },
];

class CheckOut extends Component {
  constructor(props) {
    super(props);

    this.cancelPurchases = this.cancelPurchases.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      product: {},
      address: {},
      pickUpStatus: "",
      orderID: "",
      selectPickUp: null,
      pickUpChoice: null,
    };
  }
  onChange(e) {
    this.setState({ selectPickUp: e.selectPickUp, pickUpChoice: e.value });
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
      pickUpStatus: this.state.pickUpChoice,
    };

    console.log(order);

    axios
      .post("http://localhost:5000/orders/add/", order, {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((res) => (window.location = "/customer/order/" + res.data._id));
  }

  render() {
    const { user } = this.props.auth;
    const {selectPickUp} = this.state;
    console.log(this.state.selectPickUp);

    return (
      <div className="container padding">
        <div className="row">
        <div className="col-md-12">
          <div className="container">
            <h2 className="align-center">Check Out</h2>
            <hr />
            <div className="row">
              <div className="col-md-6">
                {/* images Upload */}
                <div className="form-group">
                  <div>
                    <img
                      className=""
                      src={this.state.product.images}
                    ></img>
                  </div>
                </div>
              </div>
              <div className="col-md-6 ">
                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div className="prodName">{this.state.product.name}</div>
                  <div className="brand-small">{this.state.product.brand}</div>
                  <div>Item ID:{this.state.product._id}</div>
                  <br />
                  <div className="price">
                    Total: ${this.state.product.price}.00
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
                      <Select
                      required
                      type="submit"
                      className="col-md-5"
                      value={selectPickUp}
                      onChange={this.onChange}
                      options={pickUpOptions}
                      />
                    </div>
                  </form>
                  <div className="container form-group">
                    <div className="btn">
                      <div className="btn">
                        <button
                          className="btn btn-success"
                          onClick={this.onSubmit}
                        >
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
            </div>
          </div>

          <hr />
        </div>
        </div>
        <div className="row">
              <div className="bottomSpace"></div>
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
