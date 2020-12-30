import React, { Component } from "react";
import axios from "axios";

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeDepartment = this.onChangeDepartment.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMSRP = this.onChangeMSRP.bind(this);
    this.onChangeRetail = this.onChangeRetail.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      department: 'Bike',
      category: '',
      productName: '',
      brand: '',
      description: '',
      msrpCost: 0,
      priceRetail: 0,
      img: "NA",
      brands: [], //Crucial for mapping dropdowns
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
  }

  onChangeBrand(e) {
    this.setState({
      brand: e.target.value
    })
  }

  onChangeProductName(e) {
    this.setState({
      productName: e.target.value
    })
  }

  onChangeDepartment(e) {
    this.setState({
      department: e.target.value,
    })
  }

  onChangeCategory(e) {
    this.setState({
      category: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeMSRP(e) {
    this.setState({
      msrpCost: e.target.value
    })
  }

  onChangeRetail(e) {
    this.setState({
      priceRetail: e.target.value
    })
  }

  onChangeImg(e) {
    this.setState({
      img: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const product = {
      department: this.state.department,
      category: this.state.category,
      productName: this.state.productName,
      brand: this.state.brand,
      description: this.state.description,
      msrpCost: this.state.msrpCost,
      priceRetail: this.state.priceRetail,
      img: this.state.img,
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
              <input
                type="text"
                required
                className="form-control"
                value={this.state.department}
                onChange={this.onChangeDepartment}
              />
            </div>

            {/* category */}
            <div className="form-group">
              <label>Category: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.category}
                onChange={this.onChangeCategory}
              />
            </div>

            {/* PRODUCT NAME */}
            <div className="form-group">
              <label>Product Name: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.productName}
                onChange={this.onChangeProductName}
              />
            </div>

            {/* Manufacturer */}
            <div className="form-group">
              <label>Brand: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.brand}
                onChange={this.onChangeBrand}
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
                type="text"
                rows="5"
                required
                className="form-control"
                value={this.state.Description}
                onChange={this.onChangeDescription}
              />
            </div>

            {/* MSRP COST */}
            <div className="form-group">
              <label>MSRP: </label>
              <input
                type="number"
                required
                className="form-control"
                value={this.state.msrpCost}
                onChange={this.onChangeMSRP}
              />
            </div>

            {/* Retail Price */}
            <div className="form-group">
              <label>Retail: </label>
              <input
                type="number"
                required
                className="form-control"
                value={this.state.priceRetail}
                onChange={this.onChangeRetail}
              />
            </div>

            {/* Img Upload */}
            <div className="form-group">
              <label>Img Upload: </label>
              <span className="form-inline">
                <input
                  type="upload"
                  placeholder="Upload Image"
                  className="form-control mr-md-6"
                  aria-label="Upload Upload"
                  value={this.state.img}
                  onChange={this.onChangeImg}
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
