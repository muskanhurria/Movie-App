import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

import './index.css';
import App from './components/App';
import movies from './reducers';
import rootReducer from './reducers';

const store = createStore(rootReducer);
console.log('store',store);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />       {/*passing store as props */}
  </React.StrictMode>,
  document.getElementById('root')
);

