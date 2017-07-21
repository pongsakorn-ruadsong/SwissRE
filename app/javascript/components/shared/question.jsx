import React, { PropTypes } from 'react'
import SingleChoice from '../../components/question/singleChoice'
import Slider from '../../components/question/slider'
import Birthdate from '../../components/question/birthdate'
import Address from '../../components/question/address'
import SingleChoiceAndSlider from '../../components/question/singleChoiceAndSlider'
import Binary from '../../components/question/binary'
import Error from '../../components/question/error'
import Loading from './loading'
import LoadingComponent from '../../components/question/loading'
import Translations from '../../services/translations'
import StepBar from '../../components/shared/stepBar'
import CurrentLocal from '../../services/currentLocal'
import ReactCSSTransitionReplace from 'react-css-transition-replace';


class QuestionComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      response: null
    }
    this.onAnswer = this.onAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getSingle = this.getSingle.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }


  onAnswer(changeEvent) {
    this.setState({
      response: changeEvent
    });
  }

  handleSubmit(event) {
    console.log('this is:', this.state.response);

    if (this.state.response != null && this.state.response != undefined) {
        console.log('Yes');
      this.props.response(this.state.response);
    } else {
        console.log('Nooo');
      //this.props.response(this.props.defaultValue);
    }
  }

  getSingle() {
    switch (this.props.component) {
      case "SC":
        return (<SingleChoice key="SingleChoice" {...this.props} response={this.onAnswer} />);
      case "SLIDER":
        return (<Slider key="Slider"  {...this.props} response={this.onAnswer} />);
      case "BIRTHDAY":
        return (<Birthdate key="Birthdate"  {...this.props} response={this.onAnswer} />);
      case "ADDRESS":
        return (<Address key="Address"  {...this.props} response={this.onAnswer} />);
      case "SCAS":
        return (<SingleChoiceAndSlider key="SingleChoiceAndSlider"  {...this.props} response={this.onAnswer} />);
      case "ERROR":
        return (<Error key="Error"  {...this.props} response={this.onAnswer} />);
      case "BINARY":
        return (<Binary key="Binary" {...this.props} response={this.onAnswer} />);
      case "LOADING":
        return (<LoadingComponent key="Loading"  {...this.props} response={this.onAnswer} />);

    }
  }

  getButton() {
    switch (this.props.component) {
      case "LOADING":
        return <div />
      default:
        return <button className='sr-question__button' onClick={this.handleSubmit}>ok</button>
    }

  }

  renderImage() {
    if (this.props.question_image != null && !this.props.question_image.includes("no_image")) {
      // return <img className="sr-slider__image" src={this.props.question_image} />
      return this.props.question_image;
    }
  }
  render() {
    var questions = this.getSingle();
    var local = (new CurrentLocal).get()
    var okButton = this.getButton();
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            {
              questions ?
                <div className='sr-question__container'>
                  <div>
                    <div className="sr-question__text__title__box">
                      <text className="sr-question__text__title">{Translations.trans(this.props.translations[local.local], this.props.title)}</text>
                    </div>
                    <div>
                      <text className="sr-question__text__question">{Translations.trans(this.props.translations[local.local], this.props.question)}</text>
                    </div>
                  </div>

                  <div className="question-bg" style={{ background: "url1(" + this.renderImage() + ")" }}>
                    <form>
                      <ReactCSSTransitionReplace transitionName="fade-wait" transitionEnterTimeout={200} transitionLeaveTimeout={200}>
                        {questions}
                      </ReactCSSTransitionReplace>
                    </form>
                  </div>
                  <div>
                    {okButton}
                  </div>
                </div>
                :
                <Loading />
            }
          </div>
        </div>
      </div>
    );
  }

}

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null
    }
    this.onAnswer = this.onAnswer.bind(this);
  }

  onAnswer(changeEvent) {
    this.setState({ response: changeEvent }, () => { this.props.response(this.state.response); });
  }

  getQuestion() {
    switch (this.props.component) {
      // case "BINARY":
      //   return (<Binary {...this.props} response={this.onAnswer} />);
      default:
        return (<QuestionComponent {...this.props} response={this.onAnswer} />);
    }
  }

  render() {
    return (
      <div className='sr-question__box'>
        {this.getQuestion()}
      </div>
    );
  }
}

export default Question
