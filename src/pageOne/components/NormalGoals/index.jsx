import React from "react";
import PropTypes from "prop-types";
import styles from "./index.scss";
import { Tab, Segment, Button, Form } from "semantic-ui-react";

class NormalGoals extends React.Component {
  state = {
    protein: 0,
    fat: 0,
    carb: 0
  };

  calcFatLoss() {
    const { goalTdee, weight, eatTimes } = this.props.data;
    let protein = (weight * 2) / eatTimes;
    let fat = (goalTdee * 0.25) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * 0.2) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMaintenance() {
    const { goalTdee, weight, eatTimes } = this.props.data;
    let protein = (weight * 1) / eatTimes;
    let fat = (goalTdee * 0.2) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * 0.2) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMuscleGainz() {
    const { goalTdee, weight, eatTimes } = this.props.data;
    let protein = (weight * 1.5) / eatTimes;
    let fat = (goalTdee * 0.2) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * 0.2) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  onClick = () => {
    const { tdee, execiseGoal } = this.props.data;
    let ret;

    if (tdee > 0) {
      if (execiseGoal === "FatLoss") {
        ret = this.calcFatLoss();
      } else if (execiseGoal === "MuscleGainz") {
        ret = this.calcMuscleGainz();
      } else {
        ret = this.calcMaintenance();
      }
    }

    this.setState({
      ...ret
    });
  };

  render() {
    const { protein, fat, carb } = this.state;

    return (
      <Tab.Pane>
        <Segment>
          <Form>
            <Button primary onClick={this.onClick} style={{ marginBottom: 5 }}>
              计算每日摄取量
            </Button>
            <Form.Input
              label="蛋白质（克）"
              readOnly
              style={{ textAlign: "center" }}
              value={protein}
              className={styles.resultBox}
            />
            <Form.Input
              label="脂肪（克）"
              readOnly
              style={{ textAlign: "center" }}
              value={fat}
              className={styles.resultBox}
            />
            <Form.Input
              label="碳水化合物（克）"
              readOnly
              style={{ textAlign: "center" }}
              value={carb}
              className={styles.resultBox}
            />
          </Form>
        </Segment>
      </Tab.Pane>
    );
  }
}

NormalGoals.propTypes = {
  data: PropTypes.shape({
    goalTdee: PropTypes.number,
    weight: PropTypes.number,
    eatTimes: PropTypes.number,
    tdee: PropTypes.number,
    execiseGoal: PropTypes.number
  })
};

export default NormalGoals;
