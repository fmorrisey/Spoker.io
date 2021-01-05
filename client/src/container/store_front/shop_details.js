import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getItemById } from "../../actions/shopActions";

export default class DetailsProduct extends Component {
  constructor(props) {
    super(props);

    this.backToTop = this.backToTop.bind(this)
    this.purchase = this.purchase.bind(this)

    this.state = {
      _id: "",
      name: "",
      brand: "",
      department: "",
      category: "",
      description: "",
      msrp: 0,
      price: 0,
      images: "NA",
    };
  }

  backToTop() {
    window.location = "/store";
  }

  purchase() {
      
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          _id: response.data._id,
          department: response.data.department,
          category: response.data.category,
          name: response.data.name,
          brand: response.data.brand,
          description: response.data.description,
          msrp: response.data.msrp,
          price: response.data.price,
          images: response.data.images,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="container">
          <div className="col-md-12">
            <h3>Product Details</h3>
            {/* Type of Product */}
            <div className="form-group">
              <div>
                <u>Department: </u>
              </div>
              <div>{this.state.department}</div>
            </div>

            {/* category */}
            <div className="form-group">
              <div>
                <u>Category:</u>
              </div>
              <div>{this.state.category}</div>
            </div>

            {/* PRODUCT NAME */}
            <div className="form-group">
              <div>
                <u>Product Name: </u>
              </div>
              <div>{this.state.name}</div>
            </div>
            {/* Brand */}
            <div className="form-group">
              <div>
                <u>Brand: </u>
              </div>
              <div>{this.state.brand}</div>
            </div>

            {/* Description */}
            <div className="form-group">
              <div>
                <u>Description: </u>
              </div>
              <div>{this.state.description}</div>
            </div>

            {/* Retail Price */}
            <div className="form-group">
              <div>
                <u>Price: </u>
              </div>
              <div>${this.state.price}</div>
            </div>

            {/* images Upload */}
            <div className="form-group">
              <label>Images: </label>
              <div><img src={this.state.images}></img></div>  

            <div className="">
                <button type="button" className="btn btn-primary" onClick={this.backToTop}>Back</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}