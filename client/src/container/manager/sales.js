import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
class SalesManager extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      role: " ",
      sales: [],
     };

  }
  
  componentDidMount() {
    this.setState({ role: this.props.auth.user.role.toLowerCase() });
    axios
      .get('http://localhost:5000/orders/getsold')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            sales: response.data.map(
              (sale) => sale.sale
            ),
            sale: response.data[0].sale
          })
        }
      })

      var x;
      for (let i = 0; i < this.state.sales.length; i++) {
        x += this.state.sales[i].price;
        console.log(x)
      }
      console.log(x);
  }
  render() {
   

    return (
      <div>
        <p>You are on the Sales component!</p>
        <p>{this.state.role}</p>
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
