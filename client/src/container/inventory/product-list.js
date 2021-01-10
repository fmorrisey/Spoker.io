import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "../../components/store/product";

import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      search: "",
      filter: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/get")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSearch(e) {
    this.setState({ search: e.target.value.substr(0, 20) });
    console.log(this.state.filteredProducts);
  }

  filterChange(e) {
    this.setState({filter: "Trek"});
  }

  render() {
    let isEmptyInventory = this.state.products.length === 0;
    let filteredProducts = [];

    filteredProducts = this.state.products.filter((product) => {
      return (
        product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      );
    });

   
    console.log(filteredProducts);

    return (
      <div className="container">
        <div>
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            defaultValue={this.state.search}
            onChange={this.updateSearch.bind(this)}
          />
        </div>
        <div className="col-md-12">
          <h3>Shop Inventory</h3>
          <button
            className="btn btn-primary"
            onClick={this.filterChange.bind(this)}
          >
            Filter
          </button>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Name</th>
                <th>Brand</th>
                <th>Dept.</th>
                <th>Category</th>
                <th>MSRP/Retail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((currentproduct) => {
                return (
                  <Product product={currentproduct} key={currentproduct._id} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
