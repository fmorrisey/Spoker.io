import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Inventory from "../../components/dashboard/product_list_dash";
import Orders from "../../components/dashboard/orders_list_dash";
import Sales from "../../components/dashboard/sales_dash";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container padding">
        <div className="row">
          <div className="col-lg-12 center-align">
            <div className="row">
              <div className="col-md-6 paddingDash">
                <Sales />
              </div>
              
              <div className="col-md-6">
              <div className="salesHR paddingDash">
                <div className=""></div>
              </div>
                <Orders />
              </div>
            </div>
            <div className="row paddingDash ">
              <div className="col-md-12">
                <Inventory />
              </div>
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
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
