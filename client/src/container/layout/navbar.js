import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import ProductMenu from "../../components/nav/productMenu";
import ManagerMenu from "../../components/nav/managerMenu";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { role: "null" };
  }

  componentDidMount() {
    this.setState({ role: this.props.auth.user.role });
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
    window.location = "/store";
  };

  render() {
    const { user } = this.props.auth;
    const isLoggedIn = this.props.auth.isAuthenticated;

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
              <ProductMenu userRole={this.state.role} />
              <ManagerMenu userRole={this.state.role} />

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
                  {isLoggedIn ? null : (
                    <Link to="/login" className="dropdown-item">
                      Login
                    </Link>
                  )}
                  <navlink
                    className="dropdown-item"
                    onClick={this.onLogoutClick}
                  >
                    Log Out
                  </navlink>

                  {isLoggedIn ? null : (
                    <Link to="/register" className="dropdown-item">
                      Register
                    </Link>
                  )}
                  <Link to="/profile" className="dropdown-item">
                    Profile
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
