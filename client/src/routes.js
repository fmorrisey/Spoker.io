import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//========= REDUX =============
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/privateroute";
import CustomerRoute from "./components/routing/customerRoute"; 
import UserRoute from "./components/routing/userRoute";
//update customer router for general profile usage!

//=============Layout=============
import Navbar from "./container/layout/navbar";
import Landing from "./container/layout/landing";
import Footer from "./container/layout/footer";


//=============AUTH================
import Register from "./container/auth/register";
import Login from "./container/auth/login";
import Profile from "./container/auth/profile";

//=============STORE FRONT=============
import StoreFront from "./container/store_front/store_front";
import ShopDetails from "./container/store_front/shop_details";
import CheckOut from "./container/store_front/checkout";
import CustomerOrder from "./container/store_front/order_confirm";

//=============Inventory=============
import AddProduct from "./container/inventory/product-add";
import EditProduct from "./container/inventory/product-edit";
import DetailsProduct from "./container/inventory/product-details";
import ProductList from "./container/inventory/product-list";

//=============Manager================
import Dashboard from "./container/layout/dashboard";
import SalesManager from "./container/manager/sales";
import OrdersManager from "./container/manager/orders_list";
import OrderItem from "./container/manager/orderItem";
import InfoView from "./container/manager/infoView";
import InfoUpdate from "./container/manager/infoUpdate";

//Check for token to keep user logged in
// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class Routes extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <Landing /> */}
          <Navbar />
          
          
          <div className="App">
            {/* Store */}
            
            <Route path="/store" component={StoreFront} />
            <Route path="/shopdetails/:id" component={ShopDetails} />
            
            {/* AUTH */}
            <Route path="/home" component={Landing} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Switch>
              {/* Profile */}
              <UserRoute path="/profile" component={Profile} />
              <CustomerRoute path="/checkout/:id" component={CheckOut} />
              <CustomerRoute path="/customer/order/:id" component={CustomerOrder} />
              {/* Inventory */}
              
              <PrivateRoute path="/inventory" component={ProductList} />
              <PrivateRoute path="/add" component={AddProduct} />
              <PrivateRoute path="/details/:id" component={DetailsProduct} />
              <PrivateRoute path="/edit/:id" component={EditProduct} />
              {/* Manager */}
              <PrivateRoute path="/manager/dashboard" component={Dashboard} />
              <PrivateRoute path="/manager/sales" component={SalesManager} />
              <PrivateRoute path="/manager/orders" component={OrdersManager} />
              <PrivateRoute path="/manager/order/:id" component={OrderItem} />
              <PrivateRoute path="/manager/info" component={InfoView} />
              <PrivateRoute path="/manager/update" component={InfoUpdate} />
            </Switch>
            
          </div>
          <Footer/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Routes;
