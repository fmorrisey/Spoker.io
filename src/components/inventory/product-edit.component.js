import React, { Component } from "react";
import axios from "axios";

export default class EditProduct extends Component {
  constructor(props) {
    super(props);

    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeManufacturer = this.onChangeManufacturer.bind(this);
    this.onChangeProductType = this.onChangeProductType.bind(this);
    this.onChangeStyle = this.onChangeStyle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeMSRP = this.onChangeMSRP.bind(this);
    this.onChangeRetail = this.onChangeRetail.bind(this);
    this.onChangeImg = this.onChangeImg.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      productName: '',
      manuName: '',
      productType: '',
      style: '',
      description: '',
      msrpCost: 0,
      priceRetail: 0,
      img: "NA",
      manufacturers: [], //Crucial for mapping dropdowns
    }
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/"+this.props.match.params.id)
      .then((response) => {
        this.setState({
          productName: response.data.productName,
          manuName: response.data.manuName,
          productType: response.data.productType,
          style: response.data.style,
          description: response.data.description,
          msrpCost: response.data.msrpCost,
          priceRetail: response.data.priceRetail,
          img: response.data.img,
        })
      })
      .catch((error) => {
        console.log(error);
      })
    
    axios
      .get("http://localhost:5000/manufacturers/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            manufacturers: response.data.map(
              (manufacturer) => manufacturer.manuName
            ),
            manuName: response.data[0].manuName
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeManufacturer(e) {
    this.setState({
      manuName: e.target.value
    })
  }

  onChangeProductName(e) {
    this.setState({
      productName: e.target.value
    })
  }

  onChangeProductType(e) {
    this.setState({
      productType: e.target.value,
    })
  }

  onChangeStyle(e) {
    this.setState({
      style: e.target.value
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
      productName: this.state.productName,
      manuName: this.state.manuName,
      productType: this.state.productType,
      style: this.state.style,
      description: this.state.description,
      msrpCost: this.state.msrpCost,
      priceRetail: this.state.priceRetail,
      img: this.state.img,
    };

    console.log(product);

    axios
      .post("http://localhost:5000/products/update/"+this.props.match.params.id, product)
      .then((res) => console.log(res.data));
  
    window.location = "/inventory";
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12">
          <h3>Update a preexisting product</h3>
          <form onSubmit={e => e.preventDefault()}>
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
              <label>Manufacturer: </label>
              <select
                ref="userInput"
                required
                className="form-control"
                value={this.state.manuName}
                onChange={this.onChangeManufacturer}
              >
                {this.state.manufacturers.map(function (manufacturer) {
                  return (
                    <option key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Type of Product */}
            <div className="form-group">
              <label>Type of Product: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.productType}
                onChange={this.onChangeProductType}
              />
            </div>

            {/* Style */}
            <div className="form-group">
              <label>Style: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.style}
                onChange={this.onChangeStyle}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.description}
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
              >Update Product</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
