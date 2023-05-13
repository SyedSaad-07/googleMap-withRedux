import './App.css';
import React from 'react'
import Maps from './Maps';
import { Provider } from 'react-redux';
import locationstore from './redux/redux'

const App = () => {
  return (
    <div>
      <Provider store={locationstore}>
        <Maps/>
      </Provider>
    </div>
  );
};

export default App;