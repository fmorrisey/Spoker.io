
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Product from "../../components/store/product";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";

export default class OrdersManager extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      search: ''};
  }

  componentDidMount() {
    axios.get("http://localhost:5000/orders/", {
      headers: {
        'x-auth-token': localStorage.jwtToken
      }
    })
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  updateSearch(e) {
    this.setState({search: e.target.value.substr(0,20)})
  }

  render() {
    let isEmptyInventory = this.state.orders.length === 0;
  
    let filteredOrders = this.state.orders.filter(
      (order) => {
        return order.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }            
      )
    
    return (
      <div className="container">
        <div>
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          defaultValue={this.state.search}
          onChange={this.updateSearch.bind(this)} 
        />
        </div>
        <div className="col-md-12">
        <h3>Shop Inventory</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Dept.</th>
              <th>Category</th>
              <th>MSRP/Retail</th>
            </tr>
          </thead>
          <tbody>
            { filteredOrders.map((currentOrder) => {
            return <Product product={currentOrder} key={currentOrder._id}/>
               }) }
          </tbody>
        </table>
        </div>
      </div>
    );
  }
}
