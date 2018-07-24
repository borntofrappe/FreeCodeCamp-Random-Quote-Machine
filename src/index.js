import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import the provider, to wrap the parent component with the logic of the redux store
import { Provider } from 'react-redux';
// import the redux store
import store from './redux/store';

// render the single stateful component making up the application, wrapped in the provider component
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
