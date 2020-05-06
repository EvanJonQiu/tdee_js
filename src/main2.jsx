import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import "./main.css";
import 'semantic-ui-less/semantic.less'
import MainPage from "./pageOne/components/MainPage";

ReactDOM.render(
  <HashRouter>
    <MainPage/>
  </HashRouter>,
  document.getElementById("app")
);