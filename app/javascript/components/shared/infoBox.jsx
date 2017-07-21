import React, { PropTypes } from 'react'
import { ViewPager, Frame, Track, View } from 'react-view-pager'

class InfoBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <div className="sr-infoBox__corner col-10" style={{border: "2px solid  " + this.props.color}}>
          <div>
            <img src={this.props.icon} className="sr-infoBox__img" />
          </div>
          <div className="sr-infoBox__text">

            { (this.props.badge) ?
              (
                <div className="row">
                  <div className="col-md-5"><img className="sr-infoBox__badge" src={this.props.badge} /></div>
                  <div className="col-md-7"><text>{this.props.text}</text></div>
                </div>
              )
              :
              (
                <text>{this.props.text}</text>
              )
            }

          </div>
        </div>
      </View>
    );
  }
}

export default InfoBox
