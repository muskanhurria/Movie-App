import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

//curried function of logger(obj, next, action)

// const logger = function ({ dispatch, getState }) {
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE= ', action.type);
//       next(action);
//     }
//   }
// }

//another way to write middleware
const logger = ({ dispatch, getState }) => (next) => (action) => {
  if (typeof action !== 'function'){
    console.log('ACTION_TYPE= ', action.type);
  }
  next(action);
}

//----either instal the redux-thunk package or use like this----
// const thunk = ({ dispatch, getState }) => (next) => (action) => {
//   if(typeof action === 'function') {
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('store',store);

ReactDOM.render(
  <React.StrictMode>
    <App store={store} />       {/*passing store as props */}
  </React.StrictMode>,
  document.getElementById('root')
);

