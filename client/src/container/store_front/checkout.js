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
        this.setState({ address: response.data,
        addId: response.data.id });
      })
      .catch((error) => {
        console.log(error);
      });
    
  }  

  onSubmit(e) {
    e.preventDefault();

    const order = {
      prodId: this.state.product._id,
      pickUpStatus: this.state.pickUpStatus,
    };

    console.log(order);

    axios
      .post("http://localhost:5000/orders/add/", order, {
        headers: {
          'x-auth-token': localStorage.jwtToken
        }
      })
      .then((res) => console.log(res.data))
      
      axios
      .get("http://localhost:5000/orders/customer/", {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((response) => {
        this.setState({ orderRepo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    window.location = ("/customer/order/"+ this.state.orderRepo._id);
    
  }

  render() {
    //console.log(this.props.auth.user.id);
    //console.log(this.state.product);
    //console.log("address", this.state.address._id);
    //console.log("Addid", this.state.addId);
    console.log("ORderRepo", this.state.orderRepo._id);
    const { user } = this.props.auth;

    return (
      <div className="container">
        <div className="col-md-12">
          <h3>Purchase!</h3>
          <div className="container">
            <div className="row">
              <div className="col-6">
                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div>{this.state.product.name}</div>
                  <div>{this.state.product.brand}</div>
                  <div>{this.state.product._id}</div>
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
              {/* <div className="form-group">
                <label>First Name: </label>
                <input
                  onChange={this.onChange}
                  value={this.state.first_name}
                  id="first_name"
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Last Name: </label>
                <input
                  onChange={this.onChange}
                  value={this.state.last_name}
                  id="last_name"
                  type="text"
                />
              </div> */}
            <div className="form-group">
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
            </div>
            <form Validate >
              <div className="form-group">
                <label>Pick Up: </label>
                <input
                  onChange={this.onChange}
                  value={this.state.pickUpStatus}
                  id="pickUpStatus"
                  type="text"
                />
              </div>
            </form>
            <div>
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
          <div className="container form-group">
            <div className="btn">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.cancelPurchases}
              >
                Cancel
              </button>
            </div>
            <div className="btn">
              <button className="btn btn-primary"
              onClick={this.onSubmit}
              >Confirm Purchase</button>
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
