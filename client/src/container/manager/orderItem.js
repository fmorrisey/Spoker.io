import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.backToTop = this.backToTop.bind(this);
    //this.seeOrder = this.seeOrder.bind(this);

    this.state = {
      order: {},
      address: {},
      product: {},
      customerID: "",
      customer: {},
      info: {},
      pickUpStatus: "",
      dataPulled: 0,
    };

    axios
      .get("http://localhost:5000/orders/id/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ order: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.dataPulled != 1) {
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
      axios
        .get("http://localhost:5000/info/5ff7bb696fd4d1898bffa18d")
        .then((response) => {
          this.setState({ info: response.data });
        })
        .catch((error) => {
          console.error(error);
        });

      this.setState({ dataPulled: 1 });
    }
  }

  backToTop() {
    window.location = "/manager/orders";
  }

  deleteOrder(id) {
    axios.delete("http://localhost:5000/orders/" + id).then((response) => {
      console.log(response.data);
    });

    window.location = "/manager/orders";
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  cancelPurchases() {
    window.location = "/shopdetails/" + this.props.match.params.id;
  }

  sendEmail() {
    const email = {
      to: this.state.customer.email,
      html: `
      <div>
        <h3>Ready for ${this.state.order.pickUpStatus}!</h3>
       
      </div>
      <div className="form-group">
        <div>${this.state.customer.first_name},<br />
        Your ${this.state.order.prodName} is ready for ${
        this.state.order.pickUpStatus
      }<br />
        at our store.</div>
        <p><strong>Contact:</strong> <br />
      <a href =${"tel:" + this.state.info.phone}>${
        this.state.info.phone
      }</a><br />
          <a href =${"mailto:" + this.state.info.email}>Send Email</a><br />
          </p>
          
      <p><strong>Hours:</strong> <br />
          ${this.state.info.hours}</p>
          
      <p><strong>Location: </strong><br />
      ${this.state.info.street1}
      ${this.state.info.city}, ${this.state.info.state}
      ${this.state.info.zipCode}</p>
      </div>
      <div>
      <p>Order ID: ${this.state.order._id}</p>
      <p>Product ID: ${this.state.order.prodId}</p>
      <p>Tracking Number: ${this.state.order.trackingNumber}</p>
      <img src=${this.state.product.images} style="width:10%;"></img>
    </div>
    <div>
    
  </div>`,
    };

    console.log(email);

    axios
      .post("http://localhost:5000/email/pickUp/", email, {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((res) => console.log(res.data));
    alert("CONFIRMATION EMAIL SENT!");
  }

  render() {
    console.log("USER", this.state.order.user);
    console.log("CUSTOMER", this.state.customer.email);
    console.log("address", this.state.address);
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

              <p>
                Product ID:{" "}
                <Link to={"/details/" + this.state.order.prodId}>
                  {this.state.order.prodId}
                </Link>
              </p>
              <p>
                Tracking Number: {this.state.order.trackingNumber}
                <br />
                Pick Up: {this.state.order.pickUpStatus}
              </p>
            </div>
            <div>
              <p>
                <u>ADDRESS</u>
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
          <div className="container">
            <div className="btn btn-toolbar">
              <button
                type="button"
                className="btn btn-secondary mr-2"
                onClick={this.backToTop}
              >
                Back
              </button>
              <button
                className="btn btn-primary"
                onClick={this.sendEmail.bind(this)}
              >
                Send Email
              </button>
            </div>
            <hr />
            <div className="btn-toolbar">
              <button
                className="btn btn-danger ml-2"
                onClick={() => {
                  this.deleteOrder(this.state.order._id);
                }}
              >
                Delete Order
              </button>
            </div>
          </div>
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
