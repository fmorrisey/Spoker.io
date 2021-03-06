import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class DetailsProduct extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);

    this.state = {
      _id: "",
      name: "",
      brand: "",
      department: "",
      category: "",
      description: "",
      msrp: 0,
      price: 0,
      images: "",
      status: "",
    };
  }

  deleteProduct(id) {
    axios.delete("http://localhost:5000/products/" + id).then((response) => {
      console.log(response.data);
    });

    window.location = "/inventory";
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
          status: response.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container padding">
        <h3>Product Details</h3>
        <div className="row">
          <div className="col-md-6">
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

            {/* Status */}
            <div className="form-group">
              <div>
                <u>Status:</u>
              </div>
              <div>{this.state.status}</div>
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

            {/* MSRP COST */}
            <div className="form-group">
              <div>
                <u>MSRP: </u>
              </div>
              <div>${this.state.msrp}</div>
            </div>

            {/* Retail Price */}
            <div className="form-group">
              <div>
                <u>Retails Price: </u>
              </div>
              <div>${this.state.price}</div>
            </div>
          </div>
          <div className="col-md-6">
            {/* images Upload */}
            <div className="form-group">
              <div>
                <img src={this.state.images}></img>
              </div>
            </div>
          </div>
        </div>
        {/* SUBMIT */}
        <div className="btn-toolbar">
          <Link to={"/edit/" + this.state._id} className="btn btn-success mr-2">
            Edit
          </Link>
          <Link to="/inventory" className="btn btn-primary">
            Back
          </Link>
        </div>
        <hr className="col-md-12" />
        <div className="">
          <button
            className="btn btn-danger"
            onClick={() => {
              this.deleteProduct(this.state._id);
            }}
          >
            Delete Product
          </button>
        </div>
        <div className="row">
          <div className="bottomSpace"></div>
        </div>
      </div>
    );
  }
}
