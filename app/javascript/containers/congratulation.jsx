import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Timer from 'react-timer'
import AppStatus from '../services/appStatus'

import Wheel from '../assets/images/wheel.svg'

class Congratulation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      counter: 15,
      timerEnded: false
    };
  }


  componentDidMount() {
    let timer = setInterval(this.tick.bind(this), 1000);
    this.setState({ timer });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  tick() {
    var counter = this.state.counter;
    if (counter > 0) {
      this.setState({
        counter: counter - 1
      });
    } else {
      this.setState({
        timerEnded: true
      }, () => { this.props.history.push('/step'); });
    }
  }


  getStep() {
    return Number((new AppStatus).get().step) + 1;
  }

  render() {
    var congratulation_title = "You successfully completed the Section " + this.getStep() + ".";
    var button = this.state.timerEnded ?
      <Link to={`/step`}
        className='col-12 btn btn-accent btn-accent--large-text sr-congratulation__button'>Continue</Link> :
      <Link to={this.props.link}
        className='col-12 btn btn-accent btn-accent--large-text sr-congratulation__button'>Play ({this.state.counter})</Link>

    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Journey Description</h2>
                <h4> Best insurance helps you to get the best <br /> insurance it's fast and easily !</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-content container m-t--100">
          <div className='sr-question__container p-15'>
            <div className='row' style={{ maxWidth: "400px", margin: "auto" }}>
              <div className='col-12'>
                <div>
                  <div>
                    <h2 className="sr-question__accent__title">Congratulations!</h2>
                  </div>
                  <div>
                    <text>{congratulation_title}</text>
                  </div>
                  <div className="sr-congratulation__container">
                    <div className="sr-congratulation__image">
                      <img src={Wheel} className="sr-congratulation__image" />
                    </div>
                    <div className="sr-congratulation__image_text">
                      <text className="sr-congratulation__main_text">Play a mini game, Win additional points, Redeem your points by completing all missions.</text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                {button}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Congratulation
