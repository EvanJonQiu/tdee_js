import React from "react";
import { Tab, Segment, Input, Label, Button } from "semantic-ui-react";

class NormalGoals extends React.Component {

  state = {
    protein: 0,
    fat: 0,
    carb: 0
  };

  calcFatLoss() {
    const {goalTdee, weight, eatTimes} = this.props.data;
    let protein = weight * 2 / eatTimes;
    let fat = (goalTdee * 0.25) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * 0.2) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMaintenance() {
    const {goalTdee, weight, eatTimes} = this.props.data;
    let protein = weight * 1 / eatTimes;
    let fat = (goalTdee * 0.2) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * 0.2) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  calcMuscleGainz() {
    const {goalTdee, weight, eatTimes} = this.props.data;
    let protein = weight * 1.5 / eatTimes;
    let fat = (goalTdee * 0.20) / 9 / eatTimes;
    let carb = (goalTdee - protein * 4 - goalTdee * 0.2) / 4 / eatTimes;

    return {
      protein: protein.toFixed(2),
      fat: fat.toFixed(2),
      carb: carb.toFixed(2)
    };
  }

  onClick = () => {
    const {tdee, execiseGoal} = this.props.data;
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
    const {protein, fat, carb} = this.state;

    return (
      <Tab.Pane>
        <Segment>
          <Button primary onClick={this.onClick} style={{marginBottom: 5}}>计算每日摄取量</Button>
          <Input labelPosition='right' type='text' style={{marginBottom: 5}}>
            <Label basic style={{width: 100}}>蛋白质</Label>
            <input disabled value={protein}/>
            <Label>克</Label>
          </Input>
          <Input labelPosition='right' type='text' style={{marginBottom: 5}}>
            <Label basic style={{width: 100}}>脂肪</Label>
            <input disabled value={fat}/>
            <Label>克</Label>
          </Input>
          <Input labelPosition='right' type='text' style={{marginBottom: 5}}>
            <Label basic style={{width: 100}}>碳水化合物</Label>
            <input disabled value={carb}/>
            <Label>克</Label>
          </Input>
        </Segment>
      </Tab.Pane>
    );
  }
}

export default NormalGoals;