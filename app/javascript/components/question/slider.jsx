import React, { PropTypes } from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Translations from '../../services/translations';
import _ from 'lodash'

class Slider extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      response: Number(props.defaultValue),
      option_id: null,
      min: this.props.componentValue.choices[0].min,
      max: this.props.componentValue.choices[this.props.componentValue.choices.length - 1].max,
      minImage: this.props.componentValue.choices[0].description,
      maxImage: this.props.componentValue.choices[this.props.componentValue.choices.length - 1].description,
      selectedImage: this.props.componentValue.choices[0].image,
    }
    this.changeValue = this.changeValue.bind(this);
    this.setSelectedImage = this.setSelectedImage.bind(this);
  }

  componentDidMount() {
    this.setSelectedImage(Number(this.props.defaultValue));
  }

  changeValue(event) {
    var _this = this;
    var currentValue = event.target.value;
    this.setSelectedImage(currentValue);
  }

  setSelectedImage(currentValue) {
    var _this = this;
    _.forEach(this.props.componentValue.choices, function (choice) {
      if (choice.min <= currentValue && currentValue <= choice.max) {
        _this.setState({
          selectedImage: choice.image,
          option_id: choice.id
        })
      }
    })
    this.setState({
      response: currentValue,
      // option_id: this.props.componentValue.choices[0].id,
    },
      () => {
        this.props.response(this.state)
      }
    );
  }

  render() {
    return (
      <div>
        <div className=''>
          <text className="">{String(this.state.response)}</text>
          <div className="question-bg p-t-15 p-b-15" style={{ 'background': "url(" + this.props.question_image + ")", 'background-size': 'contain' }}>
            <img className="selected-image" src={this.state.selectedImage} alt="" />
          </div>
        </div>
        <div className='sr-slider__container'>
          <ReactBootstrapSlider
            value={this.state.response}
            change={this.changeValue}
            slideStop={this.changeValue.bind(this)}
            step={Number(this.props.componentValue.choices[0].range_interval)}
            max={Number(this.state.max)}
            min={Number(this.state.min)}
            orientation="horizontal"
            reversed={false} />
        </div>
        <div className='row'>
          <text className="col-6">{this.state.min}</text>
          <text className="col-6">{this.state.max}</text>
        </div>
      </div>
    );
  }
}

export default Slider
