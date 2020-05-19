import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "./index.scss";
import {
  Segment,
  Header,
  Container,
  Form,
  Input,
  Label
} from "semantic-ui-react";
import { TDEE_CALCULATE } from "../../redux/actionTypes";

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
    tdee: 0,
    goalTdee: 0,
    execiseGoal: "FatLoss",
    fat: 0,
    protein: 0,
    carb: 0
  };

  onSubmit = () => {
    const { dispatch } = this.props;
    const { bmr } = this.props.bmr;
    if (bmr > 0) {
      let tdee = bmr * this.state.exerciseRate;
      this.setState({
        tdee: tdee
      });

      dispatch({
        type: TDEE_CALCULATE,
        payload: { ...this.state, tdee: tdee }
      });
    }
  };

  onChange = (event, data) => {
    const { value } = data;
    this.setState({
      exerciseRate: value
    });
  };

  onTargetChange = (event, { value }) => {
    const { tdee } = this.state;
    let ret;

    if (tdee > 0) {
      if (value === "FatLoss") {
        ret = this.calcFatLoss();
      } else if (value === "MuscleGainz") {
        ret = this.calcMuscleGainz();
      } else {
        ret = this.calcMaintenance();
      }
    }
    this.setState({
      execiseGoal: value,
      ...ret
    });
  };

  calcFatLoss() {
    const { tdee } = this.state;
    const { weight } = this.props.bmr;
    let goalTdee = tdee - tdee * 0.1;
    let protein = weight * 2;
    let fat = (tdee * 0.25) / 9;
    let carb = (tdee - protein - fat) / 4;

    return {
      goalTdee: goalTdee,
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMaintenance() {
    const { tdee } = this.state;
    const { weight } = this.props.bmr;
    let goalTdee = tdee;
    let protein = weight * 1;
    let fat = (tdee * 0.2) / 9;
    let carb = (tdee - protein - fat) / 4;

    return {
      goalTdee: goalTdee,
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMuscleGainz() {
    const { tdee } = this.state;
    const { weight } = this.props.bmr;
    let goalTdee = tdee + tdee * 0.1;
    let protein = weight * 1.5;
    let fat = (tdee * 0.2) / 9;
    let carb = (tdee - protein - fat) / 4;

    return {
      goalTdee: goalTdee,
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  render() {
    const {
      exerciseRate,
      tdee,
      execiseGoal,
      goalTdee,
      protein,
      fat,
      carb
    } = this.state;

    return (
      <Container>
        <Segment className={styles.tdeeCal}>
          <Header as="h2" dividing className={styles.tdeeCalHeader}>
            每日消耗热量(Total Daily Energy Expenditure, TDEE)
          </Header>
          <Container className={styles.tdeeCalForm}>
            <Form onSubmit={this.onSubmit}>
              <Form.Group>
                <Form.Select
                  fluid
                  label="运动频率"
                  style={{ width: 400 }}
                  options={ExerciseRate}
                  value={exerciseRate}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Button primary>计算 TDEE</Form.Button>
            </Form>
            {tdee ? <Segment>您的TDEE为：{tdee} 千卡(kCal)</Segment> : <></>}
          </Container>
        </Segment>
        <Segment>
          <Container className={styles.tdeeCalForm}>
            <Form>
              <label style={{ float: "left" }}>目标</label>
              <Form.Group>
                <Form.Radio
                  label="减脂"
                  value="FatLoss"
                  checked={execiseGoal === "FatLoss"}
                  onChange={this.onTargetChange}
                />
                <Form.Radio
                  label="维持"
                  value="Maintenance"
                  checked={execiseGoal === "Maintenance"}
                  onChange={this.onTargetChange}
                />
                <Form.Radio
                  label="增肌"
                  value="MuscleGainz"
                  checked={execiseGoal === "MuscleGainz"}
                  onChange={this.onTargetChange}
                />
              </Form.Group>
            </Form>
            <Segment>您的目标TDEE为: {goalTdee} 千卡(kCal)</Segment>
            <Segment>
              <Input
                labelPosition="right"
                type="text"
                style={{ marginBottom: 5 }}
              >
                <Label basic style={{ width: 100 }}>
                  蛋白质
                </Label>
                <input disabled value={protein} />
                <Label>克</Label>
              </Input>
              <Input
                labelPosition="right"
                type="text"
                style={{ marginBottom: 5 }}
              >
                <Label basic style={{ width: 100 }}>
                  脂肪
                </Label>
                <input disabled value={fat} />
                <Label>克</Label>
              </Input>
              <Input
                labelPosition="right"
                type="text"
                style={{ marginBottom: 5 }}
              >
                <Label basic style={{ width: 100 }}>
                  碳水化合物
                </Label>
                <input disabled value={carb} />
                <Label>克</Label>
              </Input>
            </Segment>
          </Container>
        </Segment>
      </Container>
    );
  }
}

TdeeCalculator.propTypes = {
  dispatch: PropTypes.func,
  bmr: PropTypes.shape({
    weight: PropTypes.number,
    bmr: PropTypes.number
  })
};

const mapStateToProps = (state) => {
  return {
    bmr: state.bmr,
    tdee: state.tdee
  };
};

export default connect(mapStateToProps)(TdeeCalculator);
