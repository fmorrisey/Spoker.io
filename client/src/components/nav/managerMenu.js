import React, { Component } from 'react'
import {Link} from 'react-router-dom';
let OwnerCode = process.env.OWNER_CODE;

const ManagerMenu = props => {
    let {userRole} = props;
        if (userRole === 'owner' || 'Owner') {
            return (
                
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
                
            )
        } else {
            return <span></span>
        }
}
export default ManagerMenu;
