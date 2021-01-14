import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser, updateProfile } from "../../actions/authActions";
import classnames from "classnames";
import CustomerOrders from "../store_front/order_customer";
import axios from "axios";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      role: "Anonymous",
      street1: "",
      street2: "",
      city: "",
      country: "",
      state: "",
      zipCode: "",
      errors: {},
    };

    axios
      .get("http://localhost:5000/address/customer/", {
        headers: {
          "x-auth-token": localStorage.jwtToken,
        },
      })
      .then((res) => {
        this.setState({
          street1: res.data.street1,
          street2: res.data.street2,
          city: res.data.city,
          country: res.data.country,
          state: res.data.state,
          zipCode: res.data.zipCode,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.setState({ role: this.props.auth.user.role });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    window.location = "/store";
  };

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      street1: this.state.street1,
      street2: this.state.street2,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      zipCode: this.state.zipCode,
    };

    console.log("Submission", userData);
    this.props.updateProfile(userData);
    window.location = "/profile";
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div className="container padding">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <b>Hey there,</b> {user.first_name.split(" ")[0]}{" "}
              {user.last_name.split(" ")[0]}
            </h4>
            <p className="align-center">
              email: {user.email} <br />
              username: {user.username} <br />
              You are logged into Spoker{" "}
            </p>
            <div className="text-center">
              <button
                onClick={this.onLogoutClick}
                className="btn btn-primary mb-2"
              >
                Logout
              </button>
            </div>
            <div className="col-md-12">
              <CustomerOrders />
            </div>
          </div>
          <div className="align-center col-md-6">
            <div className=" align-center">
            <h3>Address</h3>
            <form noValidate onSubmit={this.onSubmit}>
            
              <div className="form-group">
                <span className="red-text">
                  {errors.street1}
                  {errors.street1notfound}
                </span>
                <input
                  placeholder="Street"
                  onChange={this.onChange}
                  value={this.state.street1}
                  error={errors.street1}
                  id="street1"
                  type="text"
                  className={classnames("", {
                    invalid: errors.street1 || errors.street1notfound,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">
                  {errors.street2}
                  {errors.street2notfound}
                </span>
                <input
                  placeholder="Unit / Apt"
                  onChange={this.onChange}
                  value={this.state.street2}
                  error={errors.street2}
                  id="street2"
                  type="text"
                  className={classnames("", {
                    invalid: errors.street2 || errors.street2notfound,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">
                  {errors.city}
                  {errors.citynotfound}
                </span>
                <input
                  placeholder="City"
                  onChange={this.onChange}
                  value={this.state.city}
                  error={errors.city}
                  id="city"
                  type="text"
                  className={classnames("", {
                    invalid: errors.city || errors.citynotfound,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">
                  {errors.state}
                  {errors.statenotfound}
                </span>
                <input
                  placeholder="State"
                  onChange={this.onChange}
                  value={this.state.state}
                  error={errors.state}
                  id="state"
                  type="text"
                  className={classnames("", {
                    invalid: errors.state || errors.statenotfound,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">
                  {errors.country}
                  {errors.countrynotfound}
                </span>
                <input
                  onChange={this.onChange}
                  value={this.state.country}
                  error={errors.country}
                  id="country"
                  type="text"
                  placeholder="Country"
                  className={classnames("", {
                    invalid: errors.country || errors.countrynotfound,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">
                  {errors.zipCode}
                  {errors.zipCodenotfound}
                </span>
                <input
                  placeholder="Zip Code"
                  onChange={this.onChange}
                  value={this.state.zipCode}
                  error={errors.zipCode}
                  id="zipCode"
                  type="number"
                  className={classnames("", {
                    invalid: errors.zipCode || errors.zipCodenotfound,
                  })}
                />
              </div>
              <div className="form-group">
                <button type="submit" value="Login" className="btn btn-primary">
                  Update Address
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
        <div className="row">
            <div className="bottomSpace"></div>
        </div>
      </div>
    );
  }
}
Profile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps, { logoutUser, updateProfile })(
  withRouter(Profile)
);
