import React from "react";
import { Responsive } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import BMR from "../BMRCalculator";
import TdeeCalculator from "../TDEECalculator";
import MainHeader from "../Header";
import HomePage from "../HomePage";
import Other from "../Others";

class MainLayout extends React.Component {
  render() {
    return (
      <Responsive>
        <MainHeader />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/BMR" component={BMR} />
          <Route path="/TDEE" component={TdeeCalculator} />
          <Route path="/Other" component={Other} />
        </Switch>
      </Responsive>
    );
  }
}

export default MainLayout;
