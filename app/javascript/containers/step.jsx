import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Stepper from '../components/shared/stepper'
import Loading from '../components/shared/loading'
import logo from '../assets/images/logo.png'
import lock from '../assets/images/lock.png'
import Connector from '../utils/connector'
import Translations from '../services/translations'
import StepBar from '../components/shared/stepBar'
import CurrentLocal from '../services/currentLocal'
import StepController from '../services/step'
import ReactLoading from 'react-loading';
import Lodash from 'lodash'
import AppStatus from '../services/appStatus'


class LastRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link to={'/welldone/'} className='sr-step__link'>
        <StepRow name='Check out offers' description='Section final' selected={this.props.step > this.props.quizzes.length} displaySeparator={false} />
      </Link>
    )
  }
}

class StepRow extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var boxClass = this.props.selected ? "sr-step__box__container selected" : "sr-step__box__container";
    var dividerClass = this.props.selected ? "sr-step__box__container selected" : "sr-step__box__container";
    var divider = this.props.displaySeparator ? <div className={this.props.selected ? "sr-step__vertical-line selected" : "sr-step__vertical-line"} /> : <div />;
    var roundedIcon = this.props.selected ? "sr-step-image__rounded-circle green" : "sr-step-image__rounded-circle bleu";
    var icon = this.props.selected ? "sr-step-image__icon icon_gift" : "sr-step-image__icon icon_lock";

    return (
      <div className=''>
        <div className='sr-step__box__overlay'>
          <div className={boxClass}>
            <div className='media'>
              <div className='d-flex align-self-center mr-3'>
                <div className={roundedIcon}>
                  <div className={icon}></div>
                </div>
              </div>
              <div className='media-body sr-step__table'>
                <div className='sr-step__table_cell'>
                  <h4>{this.props.description}</h4>
                  <h2>{this.props.name}</h2>
                </div>
              </div>
            </div>
          </div>
          {divider}
        </div>
      </div>
    )
  }
}

class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      step: 0,
      loading: true
    }
    this.getLastQuizz.bind(this)
    this.getType.bind(this)
  }

  getLastQuizz() {
    var _this = this;
    (new Connector).get('/api/quizzes/player/' + localStorage.getItem('currentUser.id') + '/recent',
      function (json) {
        _this.setState(
          {
            step: (new StepController).getQuizzCompletedIndex(_this.state.quizzes, Lodash.isEmpty(json) ? null : json),
            loading: false
          }, () => { _this.forceUpdate() })
      });
  }

  componentDidMount() {
    var _this = this;
    _this.setState({ loading: true });
    (new Connector).get('/api/quizzes?tags='+ this.getType(), function (json) {
      _this.setState({ quizzes: json }, () => { _this.getLastQuizz(); })
    });

  }

  getType(){
    if(this.props.match.params.type != null){
        var appStatus = (new AppStatus).get();
        appStatus.type = this.props.match.params.type;
        (new AppStatus).set(appStatus);
        return this.props.match.params.type;
    }else{
      return (new AppStatus).get().type;
    }
  }

  render() {
    var body = null;
    var local = (new CurrentLocal).get()

    let lastRow = null;
    if (this.state.step == this.state.quizzes.length) {
      lastRow = <LastRow {... this.state} />
    } else {
      lastRow = <StepRow name='Check out offers' description='Section final' selected={this.state.step > this.state.quizzes.length} displaySeparator={false} />
    }

    if (this.props.translations && this.state.loading) {
      body = (<div className='sr-step__container'>
        <div style={{display: 'table', margin: '44px auto'}}>
        <ReactLoading type={"spin"} color={"#FC3DBF"} height='124' width='124'/>
        </div>
      </div>)
    } else if (this.props.translations && !this.state.loading) {
      body = (
        <div className='sr-step__container'>
          {
            Lodash.orderBy(this.state.quizzes, ['weight'], ['asc']).map((quiz, i) => {
              if (this.state.step == i) {
                return (
                  <Link key={i} to={'/questions/' + quiz.quiz_id} className='sr-step__link'>
                    <StepRow name={Translations.trans(this.props.translations[local.local], quiz.name)} description={Translations.trans(this.props.translations[local.local], quiz.description)} selected={this.state.step > i} displaySeparator={true}
                      translations={this.props.translations} />
                  </Link>
                )
              } else {
                return (
                  <StepRow name={Translations.trans(this.props.translations[local.local], quiz.name)} description={Translations.trans(this.props.translations[local.local], quiz.description)} key={i} selected={this.state.step > i} displaySeparator={true}
                    translations={this.props.translations} />
                )
              }
            })
          }
          {lastRow}
        </div>
      )
    } else {
      body = (<Loading />)
    }

    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Insurance Journey</h2>
                <h4>
                  Best Insurance helps you get to get the best
                  insurance fast and easily!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <Stepper {... this.state}/>

        <div className="wrap-content p-l-15 p-r-15">
          {body}
        </div>
      </div>
    );
  }
}

export default Step
