import React, { Component } from 'react';
import axios from "axios";

export class Info extends Component {
    //THIS IS WHAT THE CUSTOMER WILL SEE
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
                <div className="">
                    <div className="body">
                        <h2 className="shopHeader padding">{this.state.info.name}</h2>
                        <hr />
                        <p>{this.state.info.about}</p>
                        <hr />
                        <p><strong>Services: </strong><br />
                            {this.state.info.services}</p>
                            <hr />
                        <p><strong>Contact:</strong> <br />
                        <a href ={"tel:" + this.state.info.phone}>{this.state.info.phone}</a><br />
                            <a href ={"mailto:" + this.state.info.email}>Send Email</a><br />
                            </p>
                            <hr />
                        <p><strong>Hours:</strong> <br />
                            {this.state.info.hours}</p>
                            <hr />
                        <p><strong>Location: </strong><br />
                        {this.state.info.street1}
                        {this.state.info.city}, {this.state.info.state}
                        {this.state.info.zipCode}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Info
