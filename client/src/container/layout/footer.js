import React, { Component } from "react";
import { Link } from 'react-router-dom';
export class Footer extends Component {
  render() {
    return (
      <footer class="footer fixed-bottom">
        <div class="d-flex justify-content-center">
          <p className="footerText">
          <Link to="/store" className="">Home</Link>
            <br />&copy; Spoker / Forrest Morrisey - 2020
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
