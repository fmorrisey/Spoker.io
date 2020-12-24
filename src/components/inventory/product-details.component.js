import React, { Component } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";

export default class DetailsProduct extends Component {
  constructor(props) {
    super(props);
   
    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {
      
      _id: '',
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

  deleteProduct(id) {
    axios.delete('http://localhost:5000/products/'+id)
      .then(response => { console.log(response.data)});

      window.location = "/inventory";
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/products/"+this.props.match.params.id)
      .then((response) => {
        this.setState({
          _id: response.data._id,
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
  }

  render() {
    return (
      <div className="container">
        <div className="container">
        <div className="col-md-12">
          <h3>Product Details</h3>
          <form onSubmit={e => e.preventDefault()}>
            {/* PRODUCT NAME */}
            <div className="form-group">
              <div><u>Product Name: </u></div>
              <div>{this.state.productName}</div>
            </div>
            {/* Manufacturer */}
            <div className="form-group">
              <div><u>Manufacturer: </u></div>
              <div>{this.state.manuName}</div>
            </div>

            {/* Type of Product */}
            <div className="form-group">
              <div><u>Type of Product: </u></div>
              <div>{this.state.productType}</div>
            </div>

            {/* Style */}
            <div className="form-group">
              <div><u>Style: Change to category</u></div>
              <div>{this.state.style}</div>
            </div>

            {/* Description */}
            <div className="form-group">
              <div><u>Description: </u></div>
              <div>{this.state.description}</div>
            </div>

            {/* MSRP COST */}
            <div className="form-group">
              <div><u>MSRP: </u></div>
              <div>{this.state.msrpCost}</div>
            </div>

            {/* Retail Price */}
            <div className="form-group">
              <div><u>Retails Price: </u></div>
              <div>{this.state.priceRetail}</div>
            </div>

            {/* Img Upload */}
            <div className="form-group">
              <label>Img: </label>
             
            </div>
            {/* SUBMIT */}
            <div className="form-group">
              <Link to={"/edit/"+this.state._id}>
                <button className="btn btn-secondary">Update Product</button>
              </Link>
              <button className="btn btn-danger"
                onClick={() => { this.deleteProduct(this.state._id) }}
              >
                Delete Product
              </button>
            </div>
          </form>
        </div>
      </div>
      </div>
    )
  }
}
