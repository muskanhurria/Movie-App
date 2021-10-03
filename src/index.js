import React, { createContext } from 'react';
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

export const StoreContext = createContext();

class Provider extends React.Component {
  render() {
    const { store } = this.props;
    return <StoreContext.Provider value={store}> 
      {this.props.children}
    </StoreContext.Provider>
  }
}

export function connect(callback) {
  return function (Component) {
    class connectedComponent extends React.Component {
      constructor (props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const {store} = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);
        return ( 
          <Component 
            {...dataToBePassedAsProps} 
            dispatch={store.dispatch}
          />
        );
      }
    }

    class connectedComponentWrapper extends React.Component {
      render() {
        return (
          <StoreContext.Consumer>
            {(store) => <connectedComponent store={store} />}
          </StoreContext.Consumer>
        );
      }
    }
    return connectedComponentWrapper;
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

