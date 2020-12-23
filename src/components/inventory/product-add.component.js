
import React, { Component } from 'react';

export default class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productName: '',
      manufacturer: '',
      productType: '',
      style: '',
      description: '',
      msrpCost: '',
      priceRetail: '',
      img: '',
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     manufacturers: ['Test Manufacturer'],
  //     manufacturer: 'manufacturer'
  //   });
  // }

  onChangeProductName(e) {
    this.setState({
      productName: e.target.value
    });
  }

  onChangeManufacturer(e) {
    this.setState({
      manufacturer: e.target.value
    });
  }

  onChangeProductType(e) {
    this.setState({
      productType: e.target.value
    });
  }

  onChangeStyle(e) {
    this.setState({
      style: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeMSRP(e) {
    this.setState({
      msrpCost: e.target.value
    });
  }

  onChangeRetail(e) {
    this.setState({
      priceRetail: e.target.value
    });
  }

  onChangeImg(e) {
    this.setState({
      img: e.target.value
    });
  }


  render() {
    return (
      <div>
        <p>You are on the Add Product List component!</p>
      </div>
    )
  }
}