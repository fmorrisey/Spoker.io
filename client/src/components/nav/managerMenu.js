import React, { Component } from 'react'
import {Link} from 'react-router-dom';
let OwnerCode = process.env.OWNER_CODE;

const ManagerMenu = props => {
    let {userRole} = props;
        if (userRole === 'Owner') {
            return (
                
                <li class="nav-item dropdown">
                <div class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Manager
                </div>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <Link to="/manager/dashboard" className="dropdown-item">Dashboard</Link>
                    <Link to="/manager/orders" className="dropdown-item">Orders</Link>
                    <Link to="/manager/sales" className="dropdown-item">Sales</Link>
                    <Link to="/manager/info" className="dropdown-item">Info</Link>
                </div>
                </li>              
                
            )
        } else {
            return <span></span>
        }
}
export default ManagerMenu;
