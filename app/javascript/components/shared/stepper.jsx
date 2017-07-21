import React, { PropTypes } from 'react'
import AppStatus from '../../services/appStatus'



class Stepper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0
    }
  }

  componentDidMount() {
    this.setState({ step: (new AppStatus).get().step });
  }


  render() {
    this.state.step=(new AppStatus).get().step;
    var stepperRow = [];
    for (var i = 1; i <= 4; i++) {
      stepperRow.push(<StepperRow key={i} step={this.state.step} index={i} />)
    }
    return (
      <div className="container">
        <div className='col-12'>
          <div className='row no-gutters'>
            {stepperRow}
          </div>
          <hr style={{ height: "7px", color: "#73AD21", width: "88px" }} />

        </div>
      </div>
    )
  }
}

class StepperRow extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var stepperClass = "rounded-circle sr-stepper__border sr-stepper__container small_size " + (this.props.step == this.props.index ? "selected" : "");
    var dividerRight;
    var dividerLeft;
    var iconChest;
    switch (this.props.index) {
      case 1:
        var classString;
        iconChest = "icon-chest sr-stepper__chest__1 " + (this.props.step >= 1 ? "sr-stepper__chest__1__open" : "sr-stepper__chest__1__close");
        dividerRight = <span className={this.props.step >= 2 ? "sr-stepper__divider selected" : "sr-stepper__divider"}></span>;
        break;
      case 2:
        iconChest = "icon-chest sr-stepper__chest__2 " + (this.props.step >= 2 ? "sr-stepper__chest__2__open" : "sr-stepper__chest__2__close");
        dividerRight = <span className={this.props.step >= 3 ? "sr-stepper__divider selected" : "sr-stepper__divider"} style={{ width: "75%" }}></span>;
        dividerLeft = <span className={this.props.step >= 2 ? "sr-stepper__divider selected" : "sr-stepper__divider "} style={{ width: "25%" }}></span>;
        break;
      case 3:
        iconChest = "icon-chest  sr-stepper__chest__3 " + (this.props.step >= 3 ? "sr-stepper__chest__3__open" : "sr-stepper__chest__3__close");
        dividerRight = <span className={this.props.step >= 4 ? "sr-stepper__divider selected" : "sr-stepper__divider"} style={{ width: "25%" }}></span>;
        dividerLeft = <span className={this.props.step >= 3 ? "sr-stepper__divider selected" : "sr-stepper__divider"} style={{ width: "75%" }}></span>;
        break;
      case 4:
        iconChest = "icon-chest sr-stepper__chest__4";
        dividerLeft = <span className={this.props.step >= 4 ? "sr-stepper__divider selected" : "sr-stepper__divider"}></span>;
        break;
      default:
        throw new Error('index is not valid');
    }



    return (
      <div className='no-gutters col-3 sr-stepper__divider text-center'>
        {dividerLeft}
        <span>
        <div className={iconChest}></div>
          <div className={stepperClass}>{this.props.index}</div>
        </span>
        {dividerRight}
      </div>

    )
  }
}

export default Stepper
