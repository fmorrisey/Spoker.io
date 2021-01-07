import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getItemById } from "../../actions/shopActions";

export default class DetailsProduct extends Component {
  constructor(props) {
    super(props);

    this.backToTop = this.backToTop.bind(this);
    this.purchase = this.purchase.bind(this);

    this.state = {
      product: {},
    };
  }

  backToTop() {
    window.location = "/store";
  }

  purchase() {}

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12">
          <h3>Product Details</h3>
          <div className="container">
            <div className="row">
              <div className="col-6">
                {/* Type of Product */}
                <div className="form-group">
                  <div>
                    <u>Department: </u>
                  </div>
                  <div>{this.state.product.department}</div>
                  <div>{this.state.product.category}</div>
                </div>

                {/* PRODUCT NAME */}
                <div className="form-group">
                  <div>
                    <u>Product Name: </u>
                  </div>
                  <div>{this.state.product.name}</div>
                  <div>{this.state.product.brand}</div>
                </div>

                {/* Description */}
                <div className="form-group">
                  <div>
                    <u>Description: </u>
                  </div>
                  <div>{this.state.product.description}</div>
                </div>

                {/* Retail Price */}
                <div className="form-group">
                  <div>
                    <u>Retails Price: </u>
                  </div>
                  <div>${this.state.product.price}</div>
                </div>
              </div>
              <div className="col-6">
                {/* images Upload */}
                <div className="form-group">
                  <div>
                    <img src={this.state.product.images}></img>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.backToTop}
              >
                Back
              </button>
              <Link to={"/checkout/" + this.state.product._id}>
                <button className="btn btn-primary">Purchase!</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
