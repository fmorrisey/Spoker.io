import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';

class Login extends Component {
    constructor(props) {
        super(props);
        // These pass states in the constructor to the events
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/inventory");
        }
      }
    
      componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/inventory");
        }
    
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
  
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        console.log(userData);
        this.props.loginUser(userData);

    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-2">
                        <p>
                            <Link to="/home" className="btn btn-primary">back to home</Link>
                        </p>
                        <p>
                            Don't have an account? <br />
                            <Link to="/register" className="btn btn-primary">Register</Link>
                        </p>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Email: </label>
                                <span className="red-text">
                                    {errors.email}
                                    {errors.emailnotfound}
                                </span>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                    className={classnames("", {
                                        invalid: errors.email ||
                                        errors.emailnotfound
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <span className="red-text">
                                    {errors.password}
                                    {errors.passwordincorrect}
                                </span>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                    className={classnames("", {
                                        invalid: errors.password ||
                                        errors.passwordincorrect
                                    })}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    value="Login"
                                    className="btn btn-primary"
                                >Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
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
  )(Login);