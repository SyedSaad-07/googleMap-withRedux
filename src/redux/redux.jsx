import { legacy_createStore } from 'redux';

const UPDATE_LOCATION = 'UPDATE_LOCATION';

// Define your initial state
const initialState = {
  location: ''
};

const userLocation = () => {
  return {
      type: UPDATE_LOCATION
  }
}

// Define your reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};

// Create the Redux store
const store = legacy_createStore(reducer);


export default store;