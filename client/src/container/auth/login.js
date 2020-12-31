import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { registeruser } from '../../actions/authActions';
import classnames from 'classnames';

export default class Register extends Component {
    constructor(props) {
        super(props);
        // These pass states in the constructor to the events
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            errors: {}
        };
    }
  
    onChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit(e) {
        e.preventDefault();

        const userData = {
            username: this.state.username,
            password: this.state.password,
        };

        console.log(userData);

    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-2">
                        <p>
                            <Link to="/home" className="btn btn-primary waves-effect">back to home</Link>
                        </p>
                        <p>
                            Don't have an account? <br />
                            <Link to="/register" className="btn btn-primary waves-effect">Register</Link>
                        </p>

                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Username: </label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.username}
                                    error={errors.username}
                                    id="username"
                                    type="text"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    value="Register"
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