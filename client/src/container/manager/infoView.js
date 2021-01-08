import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

export class InfoView extends Component {
    //What owner will see
    constructor(props) {
        super(props);

        this.state = {
            info: {}
        };
    };

    componentDidMount() {
        axios
        .get('http://localhost:5000/info/5ff7bb696fd4d1898bffa18d')
        .then((response) => {
            this.setState({info: response.data});
        })
        .catch((error) => {
            console.error(error);
        })
    }

    render() {
        return (
            <div className="container">
                <h3>Shop Info</h3>
                <div className="card-info">
                    <div className="body">
                        <h4>{this.state.info.name}</h4>
                        <p>{this.state.info.about}</p>
                        <p>Services: <br />
                            {this.state.info.services}</p>
                        <p>Contact: <br />
                        <a href ={"tel:" + this.state.info.phone}>{this.state.info.phone}</a><br />
                            <a href ={"mailto:" + this.state.info.email}>Send Email</a><br />
                            </p>
                        <p>Hours: <br />
                            {this.state.info.hours}</p>
                        <p>Location: <br />
                        {this.state.info.street1}<br />
                        {this.state.info.city},&nbsp;{this.state.info.state}
                        {this.state.info.zipCode}</p>
                    </div>
                </div>
                <Link to={"/manager/update"}>
                <button className="btn btn-secondary">Update Info</button>
              </Link>
            </div>
        )
    }
}

export default InfoView
