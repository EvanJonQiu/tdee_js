import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import gnu from "../../assets/gnu.png";
import BMR from "../BMRCalculator";
import TdeeCalculator from '../TDEECalculator';

class MainLayout extends React.Component {
  _render() {
    return (
      <Container>
        <Header as="h1">Hello from webpack4 and react</Header>
        <img src={gnu} alt="gnu.png"/>
      </Container>
    );
  }
  render() {
    return (
      <Container>
        <BMR/>
        <TdeeCalculator/>
      </Container>
    );
  }
}

export default MainLayout;