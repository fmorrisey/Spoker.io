import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const LogOutButton = (props) => {
  return (
    <button
            onClick={props.onLogoutClick}
            className="btn btn-primary"
          >
            Logout
  </button>
  )
}