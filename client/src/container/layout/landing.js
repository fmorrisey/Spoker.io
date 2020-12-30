
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//============Route: /home===============
export default class Landing extends Component {
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