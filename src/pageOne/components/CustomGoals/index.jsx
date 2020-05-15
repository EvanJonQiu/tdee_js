import React from "react";
import { Tab, Segment, Form, Grid } from "semantic-ui-react";
import styles from "./index.scss";

class CustomGoals extends React.Component {
  state = {
    customProtein: 1.5,
    customFat: 20,
    protein: 0,
    fat: 0,
    carb: 0
  };

  calcFatLoss() {
    const {goalTdee, weight, eatTimes} = this.props.data;
    const {customProtein, customFat} = this.state;

    let protein = weight * customProtein / eatTimes;
    let fat = (goalTdee * customFat / 100) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * customFat / 100) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMaintenance() {
    const {goalTdee, weight, eatTimes} = this.props.data;
    const {customProtein, customFat} = this.state;

    let protein = weight * 1 / eatTimes;
    let fat = (goalTdee * customFat / 100) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * customFat / 100) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMuscleGainz() {
    const {goalTdee, weight, eatTimes} = this.props.data;
    const {customProtein, customFat} = this.state;

    let protein = weight * customProtein / eatTimes;
    let fat = (goalTdee * customFat / 100) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * customFat / 100) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  onSubmit = () => {
    const {goalTdee, execiseGoal} = this.props.data;
    let ret;

    if (goalTdee > 0) {
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

  onCustomChange = (evt, data) => {
    let {name, value} = data;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {customProtein, customFat, protein, fat, carb} = this.state;
    return (
      <Tab.Pane>
        <Segment>
          <Form onSubmit={this.onSubmit}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <Form.Group widths='equal' style={{margin: 0, width: '100%'}}>
                    <Form.Input
                      type="number"
                      fluid label='蛋白质（克/公斤）'
                      placeholder='蛋白质（克/公斤）'
                      name="customProtein"
                      value={customProtein}
                      onChange={this.onCustomChange}
                      min={1.5}
                      max={2.2}
                      step={0.1}/>
                    <Form.Input
                      type="number"
                      fluid label='脂肪摄入比例（%）'
                      placeholder='脂肪摄入比例'
                      name="customFat"
                      value={customFat}
                      onChange={this.onCustomChange}
                      min={0}
                      max={100}/>
                  </Form.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <Form.Button primary>计算每日摄入量</Form.Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </Segment>
        <Segment>
          <Form>
            <Form.Input label="蛋白质（克）" readOnly style={{textAlign: "center"}} value={protein} className={styles.resultBox}/>
            <Form.Input label="脂肪（克）" readOnly style={{textAlign: "center"}} value={fat} className={styles.resultBox}/>
            <Form.Input label="碳水化合物（克）" readOnly style={{textAlign: "center"}} value={carb} className={styles.resultBox}/>
          </Form>
        </Segment>
      </Tab.Pane>
    );
  }
}

export default CustomGoals;