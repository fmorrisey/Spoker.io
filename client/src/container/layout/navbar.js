import React, { Component, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ProductMenu from "../../components/nav/productMenu";
import ManagerMenu from "../../components/nav/managerMenu";

function Navbar(props) {
  //   constructor(props) {
  //     super(props);
  //     this.state = { role: "null" };
  //   }

  const [userRole, setRole] = useState("null");

  useEffect(() => setRole(props.auth.user.role));

  //   componentDidMount() {
  //     this.setState({ role: this.props.auth.user.role });
  //   }

  const onLogoutClick = () => {
    props.logoutUser();
    window.location = "/store";
  };

  const { user } = props.auth;
  const isLoggedIn = props.auth.isAuthenticated;

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div>
          <Link to="/store" className="navbar-brand order-1 siteBrand">
            Spoker
          </Link>
        </div>
        <div>
          <span>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </span>
        </div>

        <div
          className="collapse navbar-collapse order-3"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav mr-auto">
            <ProductMenu userRole={userRole} />
            <ManagerMenu userRole={userRole} />

            <li class="nav-item dropdown">
              <Link to="/store" className="nav-link">
                Store
              </Link>
            </li>
            <li class="nav-item dropdown">
              <div
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Login
              </div>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                {isLoggedIn ? ( //   True
                  <>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <navlink className="dropdown-item" onClick={onLogoutClick}>
                      Log Out
                    </navlink>
                  </>
                ) : (
                  //   False
                  <>
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                    <Link to="/register" className="dropdown-item">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
