import React, { PropTypes } from 'react'
import CurrentLocal from '../../services/currentLocal'
import ImageButton from '../../components/shared/imageButton'

class Country extends React.Component {
  constructor(props) {
    super(props);

  }

  onEvent(event) {
    (new CurrentLocal).set(event);
    (new CurrentLocal).setCountry(this.props.local);
    window.location.reload();
  }


  render() {

    return (
      <div className="sr-country__container">
        <div className="sr-country__background">
          <div className="sr-country__block sr-country__left">
            <text>{this.props.country}</text>
          </div>
          <div className="sr-country__right">
            <div className="sr-country__block" onClick={() => this.onEvent(this.props.local)}>
              <ImageButton image={this.props.image} />
            </div>
            <div className="sr-country__block" onClick={() => this.onEvent((new CurrentLocal).localEnum().EN)}>
              <ImageButton image={this.props.image_en} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Country
