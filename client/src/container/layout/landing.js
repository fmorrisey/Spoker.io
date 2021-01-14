
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
      <div className="container padding">
        <div className="row">
          <div className="col-12 align-center">
            <div className="col-md-12">
              <h3>Welcome to Spoker</h3>
              <Link to="/register" className="btn btn-success mr-2">Register</Link>
              <Link to="/login" className="btn btn-primary mr-2">Log In</Link>
              <Link to="/store" className="btn btn-info waves-effect">Shop</Link>
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