import React from "react";
import { Responsive, Container, Header } from "semantic-ui-react";
import styles from "./index.css";

class HomePage extends React.Component {
  render() {
    return (
      <Responsive className={styles.homePage}>
        <div className={styles.homePageCover}/>
        <Container style={{position: "relative", top: "-500px", color: "#ffffff"}}>
          <Header as="h1" style={{color: 'white', fontSize: '4rem'}}>基础代谢率</Header>
        </Container>
      </Responsive>
    );
  }
}

export default HomePage;