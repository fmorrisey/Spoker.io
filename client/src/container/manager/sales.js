import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import ScriptTag from 'react-script-tag';
class SalesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: " ",
      sales: [],
      inventory: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/orders/getSales")
      .then((response) => {
        this.setState({ sales: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/orders/margins")
      .then((response) => {
        this.setState({ inventory: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.sales);
    const Demo = props => (
      <ScriptTag type="text/javascript" src="/path/to/resource.js" />
      )

    return (
      <div className="container">
        <h2 className="">Revenue</h2>
        <div className="row">
          <div className="col-md-6">
            <div>
              <h3>Sales Data:</h3>
              <p>Retail ${this.state.sales.retailSales}</p>
              <p>Cost ${this.state.sales.msrpCost}</p>
              <p>Profits ${this.state.sales.profit}</p>
              <p>Margin %{this.state.sales.percentage}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h3>Inventory:</h3>
              <p>Retail projection ${this.state.inventory.retailSales}</p>
              <p>Inventory value at cost ${this.state.inventory.msrpCost}</p>
              <p>Profit potential ${this.state.inventory.profit}</p>
              <p>Margin %{this.state.inventory.percentage}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="">
              <div class="ct-chart ct-perfect-fourth">{Demo()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
SalesManager.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SalesManager);
