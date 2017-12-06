import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import './index.css';

const initialState = {};
const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
);

/*

api.example.org/v1/users
app.get()

app.example.org

route:
app.example.org/about-us
HTML5 History API: Client Side Routing
We could redirect from "http://app.example.org" => "http://app.example.org/about-us"
WITHOUT RELOAINF THE HTML PAGE: SINGLE PAGE APPLICATION



*/
