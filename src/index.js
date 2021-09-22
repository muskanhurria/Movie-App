import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'react-dom';

import './index.css';
import App from './components/App';
import movies from './reducers';

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />       {/*passing store as props */}
  </React.StrictMode>,
  document.getElementById('root')
);

