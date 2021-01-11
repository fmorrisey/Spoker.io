import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Product from "../store/product";

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
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
  render() {
    return (
      <div className="container">
        <div className="card col-md-12 padding">
        <Link to="/iventory" className="card-header"><h2 className="align-center">Inventory</h2></Link>
          <table className="col-md-12 table">
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
              {this.state.products.map((currentproduct) => {
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
