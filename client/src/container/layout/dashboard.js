import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {Link} from 'react-router-dom';
import Inventory from "../inventory/product-list";
import Orders from "../manager/orders_list";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">
        <div className="col s12 center-align">
          <div className="row">
            <div className="col-md-10">
              <h4>
                <p className="">You are logged into Spoker </p>
                <b>Hey there,</b> {user.first_name}
              </h4>
            </div>
            <div className="col-md-2">
              <button onClick={this.onLogoutClick} className="btn btn-primary">
                Logout
              </button>
              <Link to="/add" className="nav-link">
              <button className="btn btn-primary">Add Product</button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <Inventory />
            </div>
            <div className="col-md-6">
              <Orders />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
