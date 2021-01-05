import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
class SalesManager extends Component {
  
  componentDidMount() {
    if (this.props.auth.user.role.toLowerCase() != 'owner') {
      this.props.history.push("/shop");
    } else {
      console.log('YEP')
    }

  }
  render() {
    return (
      <div>
        <p>You are on the Sales component!</p>

      </div>
    )
  }
}
SalesManager.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SalesManager);