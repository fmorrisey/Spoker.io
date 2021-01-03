import { STORE_FRONT, SHOP_INVENTORY, GET_ITEM } from './types';
import axios from "axios";

export const getStoreItems = () => dispatch => {
    console.log('getShopInventory');
    axios.get('http://localhost:5000/products')
        .then(res => 
            dispatch({
                type: STORE_FRONT,
                payload: res.data
            })
    )
        .catch((error) => {
        console.log(error);
        });
    
};

export const createProduct = (productInfo) => dispatch => {
    console.log('getShopInventory');
    axios.get('http://localhost:5000/products')
        .then(res => 
            dispatch({
                type: STORE_FRONT,
                payload: res.data
            })
    )
        .catch((error) => {
        console.log(error);
        });
    
};

export const getItemById = _id => dispatch => {
    axios
    .then(res => 
        dispatch({
            type: STORE_FRONT,
            payload: res.data
        })
)
    .catch((error) => {
    console.log(error);
    });

};
