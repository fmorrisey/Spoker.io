import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//=============Layout=============
import Navbar from "./container/layout/navbar";
import Landing from "./container/layout/landing";

//=============AUTH================
import Register from "./container/auth/register";
import Login from "./container/auth/login";

//=============Inventory=============
import AddProduct from "./container/inventory/product-add";
import EditProduct from "./container/inventory/product-edit";
import DetailsProduct from "./container/inventory/product-details";
import ProductList from "./container/inventory/product-list";

//=============Manager================
import SalesManager from "./container/manager/sales";
import OrdersManager from "./container/manager/orders";

function Routes() {
    return (
    <div>
    <Navbar />
    {/* <Landing /> */}
      <Switch>
        {/* AUTH */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* Invnetory */}
        <Route path="/home" component={Landing} />
        <Route path="/inventory" component={ProductList} />
        <Route path="/add" component={AddProduct} />
        <Route path="/details/:id" component={DetailsProduct} />
        <Route path="/edit/:id" component={EditProduct} />
        {/* Manager */}
        <Route path="/sales" component={SalesManager} />
        <Route path="/orders" component={OrdersManager} />
      </Switch>
    </div>
  );
}

export default Routes;
