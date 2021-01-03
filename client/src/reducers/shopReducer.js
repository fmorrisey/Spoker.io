import { STORE_FRONT, GET_ITEM } from '../actions/types';

const initialState = {
    items: [],
    prodId: {},
    count: 0
}

export  default function(state = initialState, action) {
    switch (action.type) {  //object.hasType
        case STORE_FRONT:
            return {
                ...state,
                items: action.payload
            };
        case GET_ITEM: 
            return {
                ...state,
                prodId: action.payload
            }
        default:
            return state;
        
    }
}