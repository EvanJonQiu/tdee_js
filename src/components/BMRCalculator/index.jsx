import React from "react";
import { connect } from "react-redux";
import styles from "./index.scss";
import { Segment, Header, Container, Form, Grid } from "semantic-ui-react";
import { bmr_calculate } from "../../redux/actions";

class BMR extends React.Component {
  state = {
    age: 0,
    height: 0,
    weight: 0,
    gender: "男",
    bmr: 0
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

    this.props.bmr_calculate({...this.state, bmr: bmr});
  }

  render() {
    const {age, height, weight, gender, bmr} = this.state;
    return (
      <Container>
        <Segment className={styles.BMRCal}>
          <Header as="h2" dividing className={styles.BMRCalHeader}>基础代谢率(Basal Metabolic Rate，BMR)</Header>
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
                      bmr > 0 ? <Segment>您的BMR为：{bmr} 卡路里(calories)</Segment> : <></>
                    }
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form>
          </Container>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    bmr: state.bmr
  }
}

const mapDispatchToProps = dispatch => {
  return {
    bmr_calculate: params => dispatch(bmr_calculate(params))
  };
}

export default connect(mapStateToProps, {bmr_calculate})(BMR);