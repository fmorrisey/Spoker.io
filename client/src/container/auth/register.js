import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  constructor(props) {
    super(props);
    // These pass states in the constructor to the events
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
      role: '',
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/inventory");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      role: this.state.role,
    };

    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3 offset-2">
          <h3 className="padding">Sign up for Spoker</h3>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="form-group">
                <span className="red-text">{errors.first_name}</span>
                <input
                  placeholder="First Name"
                  onChange={this.onChange}
                  value={this.state.first_name}
                  error={errors.first_name}
                  id="first_name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.first_name,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">{errors.last_name}</span>
                <input
                  placeholder="Last Name"
                  onChange={this.onChange}
                  value={this.state.last_name}
                  error={errors.last_name}
                  id="last_name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.last_name,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">{errors.username}</span>
                <input
                  placeholder="Username"
                  onChange={this.onChange}
                  value={this.state.username}
                  error={errors.username}
                  id="username"
                  type="text"
                  className={classnames("", {
                    invalid: errors.username,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">{errors.email}</span>
                <input
                  placeholder="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  htmlFor="email"
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">{errors.password}</span>
                <input
                  placeholder="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">{errors.password2}</span>
                <input
                  placeholder="confirm password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2,
                  })}
                />
              </div>
              <div className="form-group">
                <span className="red-text">{errors.role}</span>
                <input
                  placeholder="Role"
                  onChange={this.onChange}
                  value={this.state.role}
                  error={errors.role}
                  id="role"
                  type="text"
                  className={classnames("", {
                    invalid: errors.role,
                  })}
                />
              </div>
              <div className="btn-toolbar">
                <button
                  type="submit"
                  value="Login"
                  className="btn btn-primary mr-2"
                >
                  Sign Up
                </button>
                <Link to="/home" className="btn btn-secondary mr-2">
                    Cancel
                </Link>
                  

              </div>
              <hr />
              <div className="">
                  <h5>Returing to Spoker?</h5>
                <Link to="/login" className="btn btn-success mr-2">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
//Defines our proptypes outside the constructor
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

// Allows us to get our state from redux store within our component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
