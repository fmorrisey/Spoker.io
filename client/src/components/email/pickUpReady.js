import React, { Component } from 'react'

export class pickUpReady extends Component {
    render() {
        return (
            <div>
                `
      <div>
        <h3>CONFIRMATION!</h3>
        <img src={this.state.product.images} style="width:10%;"></img>
        <p>Thank you ${this.props.auth.user.first_name} for your purchase of:</p>
      </div>
      <div className="form-group">
        <div>${this.state.order.prodName}</div>
        <div>${this.state.order.price}.00</div>
      </div>
      <div>
      <p>Order ID: ${this.state.order._id}</p>
      <p>Product ID: ${this.state.order.prodId}</p>
      <p>Tracking Number: ${this.state.order.trackingNumber}</p>
    </div>
    <div>
      <p>
        <u>ADDRESSS</u>
        <br />
        ${this.props.auth.user.first_name} ${this.props.auth.user.last_name}
        <br />
        ${this.state.address.street1}
        <br />
        ${this.state.address.street2}
        <br />
        ${this.state.address.city}
        <br />
        ${this.state.address.state}
        <br />
        ${this.state.address.country}
        <br />
        ${this.state.address.zipCode}
      </p>
    </div>`
            </div>
        )
    }
}

export default pickUpReady
