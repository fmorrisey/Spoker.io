
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
//============Route: /home===============
class Landing extends Component {
  constructor(props) {
    super(props);
    
  }
  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/inventory");
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12 center-align">
            <div className="col-6">
              <Link to="/register" className="btn btn-primary waves-effect">Register</Link>
            </div>
            <div className="col-6">
              <Link to="/login" className="btn btn-primary waves-effect">Log In</Link>
            </div>
          </div> 
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { loginUser }
)(Landing);