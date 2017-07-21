import React, {PropTypes} from 'react'
import Translations from '../../services/translations';
import CurrentLocal from '../../services/currentLocal'
import Connector from '../../utils/connector'
import { Route, Redirect } from 'react-router'

class Binary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      option_id: null,
      quizz: {
        name: "",
        description: ""
      },
      redirect: '',
    }
    this.renderImage = this.renderImage.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    var _this = this;
    $('input').iCheck({
      checkboxClass: 'icheckbox_flat-blue',
      radioClass: 'iradio_flat-blue'
    }).on('ifChecked', function (changeEvent) {
      _this.handleChange(changeEvent);
    });
  }

  handleChange(event) {
    console.log(event)
    var local = (new CurrentLocal).get()
    var gifUrl = this.props.componentValue.choices[event.target.value].image;
    var image = document.getElementById('gif-image-' + event.target.value);
    image.src = gifUrl


    var choiceId = event.target.dataset.choiceId;
    var val =   Translations.trans((this.props.translations ? this.props.translations[local.local] : ''), this.props.componentValue.choices[event.target.value].label).toLowerCase(); 
    var redirect = '';
    if(val.indexOf('yes') >= 0) {
      redirect = '/thankyou'
    }

    this.setState({
      redirect: redirect,
      response: this.props.componentValue.choices[choiceId].value,
      option_id: this.props.componentValue.choices[choiceId].id
    }, () => {
      this.props.response(this.state);
    });
  }

  getData() {
    var _this = this;
    (new Connector).get('/api/quizzes/' + _this.props.quizzId + '/details' + '?player_id=' + localStorage.getItem('currentUser.id'), function(json) {
      _this.setState({quizz: json});
    });
  }

  renderImage() {
    if (this.props.question_image != null && !this.props.question_image.includes("no_image")) {
      // return <img className="sr-slider__image" src={this.props.question_image;}/>
      return this.props.question_image;
    }
  }
  render() {
    var local = (new CurrentLocal).get()
    var questionsImage = [];
    var questionsInput = [];
    for (var i = 0; i <= this.props.componentValue.choices.length - 1; i++) {
      questionsImage.push(
        <label key={i} className="col-6">
          <img className='sr-question__radio_image' id={'gif-image-' + i} src={this.props.componentValue.choices[i].description} />
        </label>
      )
      questionsInput.push(
        <label key={i} className="col-6">
          <input className='sr-question__radio' type="radio" name="gender" data-choice-id={i} value={i} />
          <div className="label">{Translations.trans((this.props.translations ? this.props.translations[local.local] : ''), this.props.componentValue.choices[i].label)}</div>
        </label>
      )
    }

    return (
      <div className='sr-question__container'>

        <div>
          <div>
            <div style={{ "padding-bottom": "30px" }}>
              <div className="question-bg" style={{ 'background': "url("+this.renderImage()+")", 'background-size': 'contain' }}>
                {questionsImage}
              </div>
              <div>
                {questionsInput}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Binary
