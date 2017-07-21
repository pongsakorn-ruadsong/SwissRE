import React, {PropTypes} from 'react';
import Translations from '../../services/translations';
import CurrentLocal from '../../services/currentLocal'

class SingleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: props,
      response: "",
      option_id: null
    }
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  componentDidMount() {
    var _this = this;
    $('input').iCheck({checkboxClass: 'icheckbox_flat-blue', radioClass: 'iradio_flat-blue'}).on('ifChecked', function(changeEvent) {
      _this.handleOptionChange(changeEvent);
    });
  }

  handleOptionChange(changeEvent) {
    var gifUrl = this.props.componentValue.choices[changeEvent.target.value].image;
    var image = document.getElementById('gif-image-' + changeEvent.target.value);
    image.src = gifUrl

    this.setState({
      response: this.props.componentValue.choices[changeEvent.target.value].value,
      option_id: this.props.componentValue.choices[changeEvent.target.value].id
    }, () => {
      this.props.response(this.state);
    });
  }

  render() {
    var local = (new CurrentLocal).get()
    var questionsImage = [];
    var questionsInput = [];
    for (var i = 0; i <= this.props.componentValue.choices.length - 1; i++) {
      var classname = "sr-question__label col-" + Math.round(Math.min((12 / this.props.componentValue.choices.length), 5))
      questionsImage.push(
        <label className={classname} key={i}>
          <img className='sr-question__radio_image' id={'gif-image-' + i} src={this.props.componentValue.choices[i].description}/>
        </label>
      )
      questionsInput.push(
        <label className={classname} key={i}>
          <input className='sr-question__radio' type="radio" name="gender" value={i} onChange={this.handleOptionChange}/>
          <div className="label">{Translations.trans(this.props.translations[local.local], this.props.componentValue.choices[i].label)}</div>
        </label>
      )
    }

    return (
      <div>
        <div className="question-bg" style={{ 'background': "url("+this.props.question_image+")", 'background-size': 'contain' }}>
          {questionsImage}
        </div>
        <div>
          {questionsInput}
        </div>
      </div>
    );
  }
}

export default SingleChoice
