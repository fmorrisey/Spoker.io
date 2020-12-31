import React , { Component } from 'react';
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
            first_name: '',
            last_name: '',
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    }

    /*
    componentDidMount() {
         //Redirect is logged in
         if (this.props.auth.isAuthenticated()) {
             this.props.history.push('/inventory');
         }
    }

    componentWillReceiveProps(nextProps) {
         if (nextProps.errors) {
             this.setState({ errors: nextProps.errors});
         }
    }
    */

    onChange(e) {
        this.setState({ [e.target.id]: e.target.value});
    };
  
    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        console.log(newUser);
        // this.props.registerUser(newUser, this.props.history);
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
                            Already have an account? <br /> 
                            <Link to="/login" className="btn btn-primary waves-effect">Login</Link>
                        </p>
                   
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>First Name: </label>
                                <input 
                                onChange={this.onChange}
                                value={this.state.first_name}
                                error={errors.first_name}
                                id="first_name"
                                type="text"
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name: </label>
                                <input 
                                onChange={this.onChange}
                                value={this.state.last_name}
                                error={errors.last_name}
                                id="last_name"
                                type="text"
                                />
                            </div>
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
                                <label htmlFor="email">Email: </label>
                                <input 
                                onChange={this.onChange}
                                value={this.state.email}
                                error={errors.email}
                                id="email"
                                type="email"
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
                                <label htmlFor="password">Confirm Password: </label>
                                <input 
                                onChange={this.onChange}
                                value={this.state.password2}
                                error={errors.password2}
                                id="password2"
                                type="password"
                                />
                            </div>
                            <div className="form-group">
                            <button
                                type="submit"
                                value="Register"
                                className="btn btn-primary"
                                // onClick={this.onSubmit}
                                >Register Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}