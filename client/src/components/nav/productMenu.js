import React, { Component } from "react";
import { Link } from "react-router-dom";
// let OWNER_CODE = process.env.OWNER_CODE

const ProductMenu = (props) => {
  let { userRole } = props;
  if (userRole === "Owner") {
    return (
      <li class="nav-item dropdown">
        <div
          class="nav-link dropdown-toggle"
          id="navbarDropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Products
        </div>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <Link to="/inventory" className="dropdown-item">
            Inventory
          </Link>
          <Link to="/add" className="dropdown-item">
            Add
          </Link>
        </div>
      </li>
    );
  } else {
    return <span></span>;
  }
};
export default ProductMenu;
