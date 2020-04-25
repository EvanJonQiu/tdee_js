import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './components/MainLayout';
import "./main.css";
//import './semantic-ui/semantic.less';
import 'semantic-ui-less/semantic.less'

ReactDOM.render(
  <MainLayout/>,
  document.getElementById("app")
);