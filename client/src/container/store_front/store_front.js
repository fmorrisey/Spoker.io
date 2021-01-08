import React, { Component } from 'react';
import ShopList from './shop';
import Info from './info';

export class StoreFront extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <br/>
                </div>
               <div className="row">
               <div className="col-md-2">
                   <Info />
               </div>
               <div className="col-md-10">
                    <ShopList />
               </div>
               </div>
            </div>
        )
    }
}

export default StoreFront
