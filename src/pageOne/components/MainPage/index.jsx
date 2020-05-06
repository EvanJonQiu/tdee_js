import React from "react";
import { Container, Segment, Header, Form, Grid, Tab } from "semantic-ui-react";
import styles from "./index.scss";
import NormalGoals from "../NormalGoals";
import CustomGoals from "../CustomGoals";

const ExerciseRate = [
  { text: "久坐/无运动习惯 - (Little/no exercise)", value: 1.2 },
  { text: "每周运动1-3天 - (Light exercise)", value: 1.375 },
  { text: "每周运动3-5天 - (Moderate exercise)", value: 1.55 },
  { text: "每周运动6-7天 - (Very active)", value: 1.725 },
  { text: "激烈运动者/体力活工作 - (Extra active)", value: 1.9 }
];

const EatTimes = [
  { text: "每日3次", value: 3 },
  { text: "每日4次", value: 4 },
  { text: "每日5次", value: 5 },
  { text: "每日6次", value: 6 }
];

class MainPage extends React.Component {

  state = {
    age: 0,
    height: 0,
    weight: 0,
    gender: "男",
    bmr: 0,
    exerciseRate: 1.2,
    tdee: 0,
    goalTdee: 0,
    execiseGoal: 'FatLoss',
    eatTimes: 3
  };

  calculateBMR() {
    const {age, height, weight, gender} = this.state;
    if (age <= 0 || height <= 0 || weight <= 0) return 0;

    let bmr = 0;
    if (gender === "男") {
      bmr = (88.4 + 13.4 * weight) + (4.8 * height) - (5.68 * age);
    } else {
      bmr = (447.6 + 9.25 * weight) + (3.10 * height) - (4.33 * age);
    }
    return Number(bmr.toFixed(2));
  }

  onChange = (evt, data) => {
    let {name, value} = data;
    this.setState({
      [name]: value
    });
  }

  onSubmit = () => {
    let bmr = this.calculateBMR({...this.state})
    this.setState({
      bmr: bmr
    });
  };

  onTdeeSubmit = () => {
    const {bmr, execiseGoal} = this.state;
    if (bmr > 0) {
      let tdee = bmr * this.state.exerciseRate;
      let ret;
      if (execiseGoal === "FatLoss") {
        ret = tdee - (tdee * 0.1);
      } else if (execiseGoal === "MuscleGainz") {
        ret = tdee + (tdee * 0.1);
      } else {
        ret = tdee;
      }

      this.setState({
        tdee: tdee,
        goalTdee: ret
      });
    }
  };

  onExerciseChange = (evt, data) => {
    const {value} = data;
    this.setState({
      exerciseRate: value
    });
  };
  
  onTargetChange = (event, {value}) => {
    const {tdee} = this.state;
    let ret;

    if (tdee > 0) {
      if (value === "FatLoss") {
        ret = tdee - (tdee * 0.1);
      } else if (value === "MuscleGainz") {
        ret = tdee + (tdee * 0.1);
      } else {
        ret = tdee;
      }
    }
    this.setState({
      execiseGoal: value,
      goalTdee: ret.toFixed(2)
    });
  };

  onEatTimesChange = (evt, data) => {
    const {value} = data;
    this.setState({
      eatTimes: value
    });
  };

  renderPanels = () => {
    const panels = [
      { menuItem: '普通目标', render: () => <NormalGoals data={this.state}/> },
      { menuItem: '自定义目标', render: () => <CustomGoals data={this.state}/> }
    ];
    return panels;
  };

  render() {
    const {age, height, weight, gender, bmr, exerciseRate, tdee, execiseGoal, goalTdee, eatTimes} = this.state;

    return (
      <Container>
        <Segment className={styles.BMRCal}>
          <Header as="h2" dividing>基础代谢率(Basal Metabolic Rate，BMR)</Header>
          <Container className={styles.MBRCalForm}>
            <Form onSubmit={this.onSubmit}>
              <Grid style={{margin: 0, width: '100%', height: '100%'}}>
                <Grid.Row style={{padding: 0}}>
                  <Grid.Column>
                    <Form.Group style={{margin: 0, width: '100%'}}>
                      <label>性别</label>
                      <Form.Radio name="gender" label="男" checked={gender === "男"} value="男" onChange={this.onChange}/>
                      <Form.Radio name="gender" label="女" checked={gender === "女"} value="女" onChange={this.onChange}/>
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Group widths='equal' style={{margin: 0, width: '100%'}}>
                      <Form.Input
                        type="number"
                        fluid label='年龄'
                        placeholder='年龄'
                        name="age"
                        value={age}
                        onChange={this.onChange}
                        min={0}
                        max={200}/>
                      <Form.Input
                        type="number"
                        fluid label='身高(cm)'
                        placeholder='身高'
                        name="height"
                        value={height}
                        onChange={this.onChange}
                        min={0}
                        max={200}/>
                      <Form.Input
                        type="number"
                        fluid label='体重(kg)'
                        placeholder='体重'
                        name="weight"
                        value={weight}
                        onChange={this.onChange}
                        min={0}
                        max={200}/>
                    </Form.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Button primary>计算 BMR</Form.Button>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column>
                    {
                      bmr > 0 ? <Segment>您的BMR为：{bmr} 千卡(kCal)</Segment> : <></>
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
        </Segment>
        <Segment className={styles.BMRCal}>
          <Header as="h2" dividing>每日消耗热量(Total Daily Energy Expenditure, TDEE)</Header>
          <Container className={styles.MBRCalForm}>
            <Form onSubmit={this.onTdeeSubmit}>
              <Form.Group>
                <Form.Select fluid label="运动频率" style={{width: 400}} options={ExerciseRate} value={exerciseRate} onChange={this.onExerciseChange}/>
              </Form.Group>
              <Form.Button primary>计算 TDEE</Form.Button>
            </Form>
            {
              tdee ? <Segment>您的TDEE为：{tdee} 千卡(kCal)</Segment> : <></>
            }
          </Container>
        </Segment>
        <Segment>
          <Container className={styles.MBRCalForm}>
            <Form>
              <label style={{float: "left"}}>目标</label>
              <Form.Group>
                <Form.Radio
                  label="减脂"
                  value="FatLoss"
                  checked={execiseGoal === "FatLoss"}
                  onChange={this.onTargetChange}/>
                <Form.Radio
                  label="维持"
                  value="Maintenance"
                  checked={execiseGoal === "Maintenance"}
                  onChange={this.onTargetChange}/>
                <Form.Radio
                  label="增肌"
                  value="MuscleGainz"
                  checked={execiseGoal === "MuscleGainz"}
                  onChange={this.onTargetChange}/>
              </Form.Group>
              <Form.Group>
                <Form.Select fluid label="每日摄入次数" style={{width: 400}} options={EatTimes} value={eatTimes} onChange={this.onEatTimesChange}/>
              </Form.Group>
            </Form>
            <Segment>
              您的目标TDEE为: {goalTdee} 千卡(kCal)
            </Segment>
          </Container>
          <Container className={styles.MBRCalForm} style={{paddingTop: 10}}>
            <Tab panes={this.renderPanels()} />
          </Container>
        </Segment>
      </Container>
    )
  }
}

export default MainPage;