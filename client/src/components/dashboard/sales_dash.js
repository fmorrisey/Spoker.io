import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Link } from 'react-router-dom';
class SalesManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: " ",
      revenue: {},
      inventory: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/orders/getSales")
      .then((response) => {
        this.setState({ revenue: response.data });
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
    console.log("REV", this.state.revenue);

    if (this.state.revenue.percentage === null) {
      var revenueData = {
        labels: ["Costs", "Margins"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#00B1FB", "#FFCE56"],
          },
        ],
      };
    } else {
      var revenueData = {
        labels: ["Costs", "Margins"],
        datasets: [
          {
            data: [
              100 - this.state.revenue.percentage,
              this.state.revenue.percentage,
            ],
            backgroundColor: ["#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#00B1FB", "#FFCE56"],
          },
        ],
      };
    }

    var inventoryData = {
      labels: ["Costs", "Margins"],
      datasets: [
        {
          data: [
            100 - this.state.inventory.percentage,
            this.state.inventory.percentage,
          ],
          backgroundColor: ["#DD2512", "#FFCE56"],
          hoverBackgroundColor: ["#F12A16", "#FFCE56"],
        },
      ],
    };

    var revOpt = {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      title: {
        display: true,
        text: "Revenue",
        fontSize: 15,
      },
    };

    var invOpt = {
      rotation: 1 * Math.PI,
      circumference: 1 * Math.PI,
      title: {
        display: true,
        text: "Inventory",
        fontSize: 15,
      },
    };

    return (
      <div className="container">
        <div className="card paddingDash">
        <Link to="/manager/sales" className="nav-link"><h2 className="align-center card-header">Revenue</h2></Link>
        <div className="row">
          <div className="">
            <div className="row">
              <div className="">
                <Doughnut data={revenueData} options={revOpt} />
                <p className="rev-marg">%{this.state.revenue.percentage}</p>
              </div>
              <div>
              <h3 className="">Sales:</h3>
              <p>Retail: ${this.state.revenue.retailSales}</p>
              <p>Cost: ${this.state.revenue.msrpCost}</p>
              <p>Profits: ${this.state.revenue.profit}</p>
            </div>
            </div>
            <div className="row">
              <div className="">
                <Doughnut data={inventoryData} options={invOpt} />
                <p className="rev-marg">%{this.state.inventory.percentage}</p>
              </div>
              <div>
              <h3 className="">Inventory:</h3>
              <p>Value: ${this.state.inventory.retailSales}</p>
              <p>Cost: ${this.state.inventory.msrpCost}</p>
              <p>Potential: ${this.state.inventory.profit}</p>
            </div>
            </div>
          </div>
          <hr />
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
