
import React from 'react';
import Routes from '../routes';

//========= REDUX =============
import { Provider } from 'react-redux';
import store from './store';


function App() {
  return (
    <Provider store={store}>
    <div>
      <Routes />
    </div>
    </Provider>
  );
}

export default App;
