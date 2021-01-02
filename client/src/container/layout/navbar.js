import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions'

class Navbar extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
        window.location = "/home";
      };
   

    render() {
        const { user } = this.props.auth;

        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg">

                <div>
                    <Link to="/home" className="navbar-brand order-1">Spoker.io</Link>
                </div>

                <div className="search">
                    <ul className="navbar-nav mx-auto ">
                        <li className="navbar-item">
                            <form className="d-flex form-inline">
                                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success mt-sm-0" type="submit">Search</button>
                            </form>
                        </li>
                    </ul>
                </div>

                <div>
                    <span><button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button></span>
                </div>

                <div className="collapse navbar-collapse order-3" id="navbarNavDropdown">
                    <ul className="navbar-nav mr-auto">
                        <li class="nav-item dropdown">
                            <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Products
                            </div>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/inventory" className="nav-link">Inventory</Link>
                                <Link to="/add" className="nav-link">Add</Link>

                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Manager
                            </div>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/orders" className="nav-link">Orders</Link>
                                <Link to="/sales" className="nav-link">Sales</Link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Store
                            </div>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/shop" className="nav-link">Shop</Link>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                Login
                            </div>
                            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link to="/login" className="nav-link">Login</Link>
                                <navlink className="nav-link" onClick={this.onLogoutClick} >log out</navlink>
                                <Link to="/register" className="nav-link">Register</Link>
                            </div>
                        </li>
                       
                    </ul>
                </div>
                
            </nav>
        )
    }
}
Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth
  });
  
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Navbar);