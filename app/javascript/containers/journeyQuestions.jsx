import React, { PropTypes } from 'react'
import Question from '../components/shared/question'
import moment from 'moment';
import Connector from '../utils/connector'
import CurrentUser from '../services/currentUser'
import Translations from '../services/translations'
import { Route, Redirect } from 'react-router'
import StepBar from '../components/shared/stepBar'
import Stepper from '../components/shared/stepper'
import 'whatwg-fetch'


const QUIZZ_1 = '58fdd6cad81e46ce778b456e';
const QUIZZ_2A = '58ff26a23b6fd2cb358b45e0';
const QUIZZ_2B = '59434c013b6fd24f2b8b456d';
const QUIZZ_3 = '58ff20e03b6fd2cb358b45df';


class JourneyQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { redirect: '' }
    this.renderQuestion = this.renderQuestion.bind(this);
    this.getData = this.getData.bind(this);



  }

  onAnswer(answer) {
    var _this = this;
    _this.setState({ question: { component: "LOADING" }, redirect: answer.redirect });
    (new Connector).post('/api/questions/' + _this.props.match.params.quizid + '/answer',
      {
        player_id: (new CurrentUser).get().id,
        question_id: _this.state.question.question_id,
        option_id: answer.option_id,
        answer: answer.response
      },
      function (json) {
        if (answer.redirect) {
          _this.props.history.push(answer.redirect);
        }
        else {
          _this.getData();
        }
      }
    );
  }



  componentDidMount() {
    this.getData();
  }

  getData() {
    var _this = this;
    (new Connector).get(
      '/api/quizzes/' + _this.props.match.params.quizid + '/question' +
      '?player_id=' + localStorage.getItem('currentUser.id'),
      function (json) {
        if (json.error) {
          if (_this.props.match.params.quizid == QUIZZ_1) {
            _this.props.history.push('/congratulation1');
          } else if (_this.props.match.params.quizid == QUIZZ_2A) {
            _this.props.history.push('/congratulation2');
          } else if (_this.props.match.params.quizid == QUIZZ_2B) {
            _this.props.history.push('/congratulation2');
          } else {
            _this.props.history.push('/congratulation2');
          }
        } else {
          _this.setState({ question: json });
        }
      });
  }

  renderQuestion() {
    return <Question {...this.state.question } quizzId={this.props.match.params.quizid} translations={this.props.translations} response={this.onAnswer.bind(this)} />;
  }

  render() {
    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Journey Description</h2>
                <h4>
                  Best Insurance helps you get to get the best
                  insurance fast and easily!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <Stepper />

        <div className="wrap-content">
          {this.renderQuestion()}
        </div>
      </div>
    );
  }
}

export default JourneyQuestions
