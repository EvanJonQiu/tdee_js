import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import MainLayout from "./components/MainLayout";
import { Provider } from "react-redux";
import store from "./redux/store";
import { HashRouter } from "react-router-dom";
import "./main.css";
import "semantic-ui-less/semantic.less";

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <MainLayout />
    </HashRouter>
  </Provider>,
  document.getElementById("app")
);
