import React, { Component } from "react";
import ShopList from "./shop";
import Info from "./info";

export class StoreFront extends Component {
  render() {
    return (
      <div className="parallax">
        <div className="container">
          <div className="row shopHeadSpace">
            <div className="siteHeader">SPOKER</div>
          </div>
          <div className="">
            <div className="row shopCard">
              <div className="col-md-5">
                <Info />
              </div>
              <div className="col-md-7">
                <ShopList />
              </div>
            </div>
            <div className="row">
              <p className="shopBottomSpace">
                <br />
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="bottomSpace"></div>
        </div>
      </div>
    );
  }
}

export default StoreFront;
