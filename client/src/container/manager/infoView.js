import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class InfoView extends Component {
  //What owner will see
  constructor(props) {
    super(props);

    this.state = {
      info: {},
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/info/5ff7bb696fd4d1898bffa18d")
      .then((response) => {
        this.setState({ info: response.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div className="container padding">
        <div className="row">
          <div className="col-md-12">
            <h3>Shop Info</h3>
            <p>
              This is the information that your customers will see on the store
              front when they arrive to your e-commerce website
            </p>
            <div className="card mb-3 bg-light">
              <div className="card">
                <h4 className="card-header">{this.state.info.name}</h4>
                <div className="card-body">
                  <p>
                    <u>Description:</u> <br />
                    {this.state.info.about}
                  </p>
                  <hr />
                  <p>
                    <u>Services:</u> <br />
                    {this.state.info.services}
                  </p>
                  <hr />
                  <p>
                    <u>Contact: </u>
                    <br />
                    <a href={"tel:" + this.state.info.phone}>
                      {this.state.info.phone}
                    </a>
                    <br />
                    <a href={"mailto:" + this.state.info.email}>Send Email</a>
                    <br />
                  </p>
                  <hr />
                  <p>
                    <u>Hours:</u> <br />
                    {this.state.info.hours}
                  </p>
                  <hr />
                  <p>
                    <u>Location: </u>
                    <br />
                    {this.state.info.street1}
                    <br />
                    {this.state.info.city},&nbsp;{this.state.info.state}
                    {this.state.info.zipCode}
                  </p>
                </div>
              </div>
            </div>
            <Link to={"/manager/update"}>
              <button className="btn btn-success mr-2">Update Info</button>
            </Link>
            <Link to={"/manager/dashboard"}>
              <button className="btn btn-secondary ">Back</button>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="bottomSpace"></div>
        </div>
      </div>
    );
  }
}

export default InfoView;
