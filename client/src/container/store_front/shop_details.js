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
      <div className="container padding">
        <div className="col-md-12">
          <div className="container md productHead">
            <h2>{this.state.product.name}</h2>
            <h3>
              <i className="brand-reg">{this.state.product.brand}</i>
            </h3>
          </div>

          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <div>
                    <img src={this.state.product.images}></img>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                {/* Type of Product */}
                <div className="form-group">
                  <div className="price">${this.state.product.price}.00</div>
                  <div>
                    {this.state.product.department} /{" "}
                    {this.state.product.category}
                  </div>
                  <Link to={"/checkout/" + this.state.product._id}>
                    <button className="btn btn-primary mt-2">Purchase!</button>
                  </Link>
                </div>
                {/* Description */}
                <div className="form-group">
                  <div>
                    <u>Description: </u>
                  </div>
                  <div>{this.state.product.description}</div>
                </div>

                {/* Retail Price */}
                <div className="">
                  <button
                    type="button"
                    className="btn btn-secondary mr-2"
                    onClick={this.backToTop}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="bottomSpace"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
