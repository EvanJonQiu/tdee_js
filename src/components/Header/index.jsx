import React from "react";
import PropTypes from "prop-types";
import { Menu, Container, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import gnu from "../../assets/gnu.png";

class Header extends React.Component {
  state = {
    activeItem: "home"
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "home") {
      this.props.history.push("/");
    } else {
      this.props.history.push(`/${name}`);
    }
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Menu pointing secondary size="large" style={{ marginBottom: 4 }}>
        <Container>
          <Image src={gnu} style={{ width: 32, height: 32, marginTop: 5 }} />
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="BMR"
            active={activeItem === "BMR"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="TDEE"
            active={activeItem === "TDEE"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="Other"
            active={activeItem === "Other"}
            onClick={this.handleItemClick}
          />
        </Container>
      </Menu>
    );
  }
}

Header.propTypes = {
  history: PropTypes.object
};

export default withRouter(Header);
