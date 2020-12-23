
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";

import Landing from "./components/landing.component";

import AddProduct from "./components/inventory/product-add.component";
import EditProduct from "./components/inventory/product-edit.component";
import ProductList from "./components/inventory/product-list.component";

import SalesManager from "./components/manager/sales.component";
import OrdersManager from "./components/manager/orders.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Route path="/home" component={Landing} />
      <Route path="/inventory" component={ProductList} />
      <Route path="/add" component={AddProduct} />
      <Route path="/edit/:id" component={EditProduct} />
      <Route path="/sales" component={SalesManager} />
      <Route path="/orders" component={OrdersManager} />
    </Router>
  );
}

export default App;
