import React from "react";
import { Segment, List, Container } from "semantic-ui-react";
import { connect } from "react-redux";
import styles from "./index.scss";

class Other extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: "OTHER_LOAD_DATA_EFFECT",
      payload: {}
    });
  }

  render() {
    const {data} = this.props.other;
    return (
      <Container>
        <Segment className={styles.otherSegment}>
          <List>
            {
              data.map(item => {
                return <List.Item key={item.name}>{item.name}</List.Item>
              })
            }
          </List>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    other: state.other
  }
}

export default connect(mapStateToProps)(Other);