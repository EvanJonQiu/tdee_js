import React from 'react';
import { Container, Responsive } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import BMR from "../BMRCalculator";
import TdeeCalculator from '../TDEECalculator';
import MainHeader from "../Header";
import HomePage from "../HomePage";

class MainLayout extends React.Component {
  render() {
    return (
      <Responsive>
        <MainHeader/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Container>
            <Route path="/BMR" component={BMR}/>
            <Route path="/TDEE" component={TdeeCalculator}/>
          </Container>
        </Switch>
      </Responsive>
    );
  }
}

export default MainLayout;