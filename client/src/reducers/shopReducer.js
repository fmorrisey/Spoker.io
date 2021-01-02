import { STORE_FRONT } from '../actions/types';

const initialState = {
    items: [],
    item: {}
}

export  default function(state = initialState, action) {
    switch (action.type) {  //object.hasType
        case STORE_FRONT:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
        
    }
}
