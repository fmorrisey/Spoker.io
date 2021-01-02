import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStoreItems } from '../../actions/shopActions';


class Shop extends Component {  

    componentDidMount() {
        this.props.getStoreItems(); //Retrieve data
    }

    render() {
        const shopItems = this.props.products.map(product => (
            <div className="row">
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>${product.price}.00</p>
                </div>
            </div>
        ));

        return (
            <div className="container">
                {shopItems}
            </div>
        )
    }
}

Shop.propTypes = {
    getStoreItems: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    products: state.shopItems.items
});

export default connect( mapStateToProps, { getStoreItems })(Shop);
