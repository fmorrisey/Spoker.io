import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

class CustomerOrder extends Component {
  constructor(props) {
    super(props);
    this.backToTop = this.backToTop.bind(this);
    this.emailConfirm = this.emailConfirm.bind(this);
    this.state = {
      order: {},
      address: {},
      product: {},
      pickUpStatus: "",
      dataPulled: false,
    };

    axios
      .get("http://localhost:5000/orders/id/" + this.props.match.params.id, {
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

  componentDidUpdate() {
    if (this.state.dataPulled !== true) {
      axios
        .get("http://localhost:5000/products/" + this.state.order.prodId)
        .then((response) => {
          this.setState({ product: response.data });
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({ dataPulled: true });
      //console.log("prodId", this.state.order.prodId)
    }
  }

  emailConfirm() {
    const email = {
      to: this.props.auth.user.email,
      html: `
      <div>
        <h3>CONFIRMATION!</h3>
        <img src=${this.state.product.images} style="width:10%;"></img>
        <p>Thank you ${this.props.auth.user.first_name} for your purchase of:</p>
      </div>
      <div className="form-group">
        <div>${this.state.order.prodName}</div>
        <div>$${this.state.order.price}.00</div>
      </div>
      <div>
      <p>Order ID: ${this.state.order._id}</p>
      <p>Product ID: ${this.state.order.prodId}</p>
      <p>Tracking Number: ${this.state.order.trackingNumber}</p>
    </div>
    <div>
      <p>
        <u>ADDRESSS</u>
        <br />
        ${this.props.auth.user.first_name} ${this.props.auth.user.last_name}
        <br />
        ${this.state.address.street1}
        <br />
        ${this.state.address.street2}
        <br />
        ${this.state.address.city}
        <br />
        ${this.state.address.state}
        <br />
        ${this.state.address.country}
        <br />
        ${this.state.address.zipCode}
      </p>
    </div>`,
    };

    //console.log(email);

    axios
      .post("http://localhost:5000/email/confirm/", email, {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((res) => console.log(res.data));
    alert("CONFIRMATION EMAIL SENT!");
  }

  backToTop() {
    window.location = "/profile";
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  cancelPurchases() {
    window.location = "/shopdetails/" + this.props.match.params.id;
  }

  render() {
    // console.log("USER", this.props.auth.user.id);
    // console.log("Order", this.state.order);
    // console.log("product", this.state.product);
    // console.log("address", this.state.address._id);
    // console.log("Addid", this.state.addId);
    const { user } = this.props.auth;

    return (
      <div className="container padding">
        <div className="col-md-12">
          {/* COMEBACK AND ADD A CONDITIONAL FOR NEW BIKE DAY */}
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div>
                  <h3>CONFIRMATION!</h3>
                  <p>Thank you {user.first_name} for your purchase of:</p>
                </div>
                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div>
                    <b>{this.state.order.prodName}</b>
                  </div>
                  <div>
                    <u>Total: ${this.state.order.price}.00</u>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p>Pick up option: {this.state.order.pickUpStatus}</p>
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
            {/* SUBMIT */}
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={this.backToTop}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.emailConfirm}
            >
              Send Email
            </button>
          </div>
        </div>

        <div className="row">
          <div className="bottomSpace"></div>
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
