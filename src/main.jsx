import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/MainLayout';
import {Provider} from "react-redux";
import store, {runSagaMiddleware} from "./redux/store";

import "./main.css";
//import './semantic-ui/semantic.less';
import 'semantic-ui-less/semantic.less'

runSagaMiddleware();

ReactDOM.render(
  <Provider store={store}>
    <MainLayout/>
  </Provider>,
  document.getElementById("app")
);