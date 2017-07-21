import React, { PropTypes } from 'react'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import SingleChoice from '../../components/question/singleChoice';
import Slider from '../../components/question/slider';
import Translations from '../../services/translations';



class SingleChoiceSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {
                radio: "",
                slider: 0
            }
        }
    }

    singleChoiceChangeValue(event) {
        var response = this.state.response;
        response.radio = event;
        this.setState({ response: response }, () => { this.props.response(this.state.response) });
    }

    sliderChangeValue(event) {
        var response = this.state.response;
        response.slider = event;
        this.setState({ response: response }, () => { this.props.response(this.state.response) });
    }

    render() {
        return (
            <div>
                <SingleChoice {...this.props} translations={this.state.translations} response={this.singleChoiceChangeValue.bind(this)} />
                <Slider {...this.props} translations={this.state.translations} response={this.sliderChangeValue.bind(this)} />
            </div>

        );
    }
}

export default SingleChoiceSlider