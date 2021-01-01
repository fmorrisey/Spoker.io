import React, { Component } from "react";
import axios from "axios";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      department: '',
      category: '',
      name: '',
      brand: '',
      description: '',
      msrp: 0,
      price: 0,
      images: "NA",
      brands: [], //Crucial for mapping dropdowns
      departments: [], //Crucial for mapping dropdowns
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/brands/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            brands: response.data.map(
              (brand) => brand.brand
            ),
            brand: response.data[0].brand
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
      axios
      .get("http://localhost:5000/departments/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            departments: response.data.map(
              (department) => department.department
            ),
            department: response.data[0].department
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      department: this.state.department,
      category: this.state.category,
      name: this.state.name,
      brand: this.state.brand,
      description: this.state.description,
      msrp: this.state.msrp,
      price: this.state.price,
      images: this.state.images,
    }
    console.log(product);

    axios
      .post("http://localhost:5000/products/add", product)
      .then((res) => console.log(res.data));  

    window.location = "/inventory";
  }

  render() {

    return (
      <div className="container">
        <div className="col-md-12">
          <h3>Add a new product into store inventory</h3>
          <form onSubmit={e => e.preventDefault()}>
            
            {/* Department */}
            <div className="form-group">
              <label>Department: </label>
              <select
                id="department"
                type="text"
                required
                className="form-control"
                value={this.state.department}
                onChange={this.onChange}
              >
               {this.state.departments.map(function (department) {
                  return (
                    <option key={department} value={department}>
                      {department}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* category */}
            <div className="form-group">
              <label>Category: </label>
              <input
                id="category"
                type="text"
                required
                className="form-control"
                value={this.state.category}
                onChange={this.onChange}
              />
            </div>

            {/* PRODUCT NAME */}
            <div className="form-group">
              <label>Product Name: </label>
              <input
                id="name"
                type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>

            {/* Manufacturer */}
            <div className="form-group">
              <label>Brand: </label>
              <select
                id="brand"
                ref="userInput"
                required
                className="form-control"
                value={this.state.brand}
                onChange={this.onChange}
              >
                {this.state.brands.map(function (brand) {
                  return (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  );
                })}
              </select>
            </div>            

            {/* Description */}
            <div className="form-group">
              <label>Description: </label>
              <textarea
                id="description"
                type="text"
                rows="5"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            {/* MSRP COST */}
            <div className="form-group">
              <label>MSRP: </label>
              <input
                id="msrp"
                type="number"
                required
                className="form-control"
                value={this.state.msrp}
                onChange={this.onChange}
              />
            </div>

            {/* Retail Price */}
            <div className="form-group">
              <label>Retail: </label>
              <input
                id="price"
                type="number"
                required
                className="form-control"
                value={this.state.price}
                onChange={this.onChange}
              />
            </div>

            {/* images Upload */}
            <div className="form-group">
              <label>images Upload: </label>
              <span className="form-inline">
                <input
                  id="images"
                  type="upload"
                  placeholder="Upload Image"
                  className="form-control mr-md-6"
                  aria-label="Upload Upload"
                  value={this.state.images}
                  onChange={this.onChange}
                />
                <button className="btn btn-secondary mt-sm-0" type="upload">
                  ...
                </button>
              </span>
            </div>
            {/* SUBMIT */}
            <div className="form-group">
              <button
                type="submit"
                value="Add Product"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >Add Product</button>

            </div>
          </form>
        </div>
      </div>
    )
  }
}
