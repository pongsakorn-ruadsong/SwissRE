import React from 'react'
import AppStatus from '../../services/appStatus'



export default class StepBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: {
        active1: "",
        active2: "",
        active3: "",
        active4: ""
      }
    }
  }

  componentDidMount() {
    var step = (new AppStatus).get().step;
    var steps = {};
    for (var i = 1; i <= step; i++) {
      var key = "active"+i;
      steps[key] = "active"
    }
    this.setState({ step: steps })
  }

  render() {
    return (
      <div className="step-bar">
        <ul className="step-list">
          <li className={"step " + this.state.step.active1}>
            <div className="circle">1</div>
          </li>

          <li className={"step " + this.state.step.active2}>
            <div className="circle">2</div>
          </li>

          <li className={"step " + this.state.step.active3}>
            <div className="circle">3</div>
          </li>

          <li className={"step " + this.state.step.active4}>
            <div className="circle">4</div>
          </li>
        </ul>
      </div>
    )
  }
}
