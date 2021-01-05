import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class SalesManager extends Component {
  constructor(props){
    super(props);
    this.state = { role: " "};
  }
  
  componentDidMount() {
   this.setState({role: this.props.auth.user.role.toLowerCase()});
  }
  render() {
    return (
      <div>
        <p>You are on the Sales component!</p>
        <p>{this.state.role}</p>
        
      </div>
    )
  }
}
SalesManager.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(SalesManager);