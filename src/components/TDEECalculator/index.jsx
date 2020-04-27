import React from "react";
import { connect } from "react-redux";
import styles from "./index.scss";
import { Segment, Header, Container, Form } from 'semantic-ui-react';
import { tdee_calculate } from "../../redux/actions";
import {TDEE_CALCULATE} from "../../redux/actionTypes";

const ExerciseRate = [
  { text: "久坐/无运动习惯 - (Little/no exercise)", value: 1.2 },
  { text: "每周运动1-3天 - (Light exercise)", value: 1.375 },
  { text: "每周运动3-5天 - (Moderate exercise)", value: 1.55 },
  { text: "每周运动6-7天 - (Very active)", value: 1.725 },
  { text: "激烈运动者/体力活工作 - (Extra active)", value: 1.9 }
];

class TdeeCalculator extends React.Component {
  state = {
    exerciseRate: 1.2,
    tdee: 0
  };

  onSubmit = () => {
    const {dispatch} = this.props;
    const {bmr} = this.props.bmr;
    if (bmr > 0) {
      let tdee = bmr * this.state.exerciseRate;
      this.setState({
        tdee: tdee
      });

      dispatch({
        type: TDEE_CALCULATE,
        payload: {...this.state, tdee: tdee}
      });
    }
  }

  onChange = (event, data) => {
    const {value} = data;
    this.setState({
      exerciseRate: value
    });
  }

  render() {
    const {exerciseRate, tdee} = this.state;

    return (
      <Container>
        <Segment className={styles.tdeeCal}>
          <Header as="h2" dividing className={styles.tdeeCalHeader}>每日消耗热量(Total Daily Energy Expenditure, TDEE)</Header>
          <Container className={styles.tdeeCalForm}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Select fluid label="运动频率" style={{width: 400}} options={ExerciseRate} value={exerciseRate} onChange={this.onChange}/>
              </Form.Group>
              <Form.Button primary>计算 TDEE</Form.Button>
            </Form>
            {
              tdee ? <Segment>您的TDEE为：{tdee} 卡路里(calories)</Segment> : <></>
            }
          </Container>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    bmr: state.bmr,
    tdee: state.tdee
  };
}

export default connect(mapStateToProps)(TdeeCalculator);