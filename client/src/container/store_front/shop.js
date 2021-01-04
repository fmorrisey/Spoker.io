
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Item from "../../components/item";

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      search: ''};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/products/')
      .then(response => {
        this.setState({ products: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  
  updateSearch(e) {
    this.setState({search: e.target.value.substr(0,20)})
  }

  render() {
    let isEmptyInventory = this.state.products.length === 0;
    
    let filteredProducts = this.state.products.filter(
      (product) => {
        return product.name.toLowerCase().indexOf(
          this.state.search.toLowerCase()) !== -1;
      }            
      )
    
    return (
      <div className="container">
        <div>
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
          defaultValue={this.state.search}
          onChange={this.updateSearch.bind(this)} 
        />
        </div>
        <div className="col-md-12">
        <h3>Shop Inventory</h3>
        <div className="">
        <div className="container">
        { filteredProducts.map((currentproduct) => {
            return <Item product={currentproduct} key={currentproduct._id}/>
               }) }
        </div>
        </div>
        </div>
      </div>
    );
  }
}
