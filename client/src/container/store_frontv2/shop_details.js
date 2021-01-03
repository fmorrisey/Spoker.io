import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStoreItems, getItemById} from '../../actions/shopActions';
import { Link } from 'react-router-dom';


class DetailsProduct extends Component {

    componentDidMount() {
        this.props.getItemById()
    }

    render() {
        const shopItems = this.props.products.map(product => (
            <div className="row">
                <div key={product.id}>
                    <h3><Link to={`/shopdetails/${product._id}`}>{product.name}</Link></h3>
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

DetailsProduct.propTypes = {
    getItemById: PropTypes.func.isRequired,
    products: PropTypes.array.isRequired
};

const mapStateToProps = (state, props) =>  {

    const product = state.shopItems.products.find(product => product.id === props.match.params.id);

    return {
        product
    }
};


export default connect( mapStateToProps, { getItemById })(DetailsProduct);
