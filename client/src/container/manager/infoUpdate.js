import React, { Component } from "react";
import axios from "axios";

export default class InfoUpdate extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      about: "",
      services: "",
      hours: "",
      phone: "",
      email: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/info/5ff7bb696fd4d1898bffa18d")
      .then((response) => {
        this.setState({ 
          name: response.data.name,
          about: response.data.about,
          services: response.data.services,
          hours: response.data.hours,
          phone: response.data.phone,
          email: response.data.email,
        });
      })
      .catch((error) => {
        console.error(error);
      });
      
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const info = {
      name: this.state.name,
      about: this.state.about,
      services: this.state.services,
      hours: this.state.hours,
      phone: this.state.phone,
      email: this.state.email,
    };

    console.log(info);

    axios
      .post(
        "http://localhost:5000/info/update/5ff7bb696fd4d1898bffa18d", info, {
          headers: {
            "x-auth-token": localStorage.jwtToken,
          },
        })
      .then((res) => console.log(res.data));

    window.location = "/manager/info";
  }

  render() {
    
    
    return (
      <div className="container">
        <div className="col-md-12">
          <h3>Update Product</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            {/* PRODUCT NAME */}
            <div className="form-group">
              <label>Shop Name: </label>
              <input
                id="name"
                type="text"
                required
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            {/* about */}
            <div className="form-group">
              <label>About Us: </label>
              <textarea
                id="about"
                required
                className="form-control"
                value={this.state.about}
                onChange={this.onChange}
              ></textarea>
            </div>
            {/* services */}
            <div className="form-group">
              <label>Services: </label>
              <textarea
                id="services"
                type="text"
                rows="5"
                required
                className="form-control"
                value={this.state.services}
                onChange={this.onChange}
              >
              </textarea>
            </div>
            {/* hours */}
            <div className="form-group">
              <label>hours: </label>
              <input
                id="hours"
                type="text"
                required
                className="form-control"
                value={this.state.hours}
                onChange={this.onChange}
              />
            </div>
            {/* phone */}
            <div className="form-group">
              <label>Shop Phone: </label>
              <input
                id="phone"
                type="phone"
                required
                className="form-control"
                value={this.state.phone}
                onChange={this.onChange}
              />
            </div>
            {/* eMail */}
            <div className="form-group">
              <label>Shop Email: </label>
              <input
                id="email"
                type="email"
                required
                className="form-control"
                value={this.state.email}
                onChange={this.onChange}
              />
            </div>
            {/* SUBMIT */}
            <div className="form-group">
              <button
                type="submit"
                value="Update Info"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Update Info
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
