import React from 'react'
import { ViewPager, Frame, Track, View } from 'react-view-pager'

export default class Product extends React.Component {
  constructor(props) {
    super(props)
    var getImageWidth = this.getImageWidth.bind(this);
  }

  handleOnMouseUp() {
    if (this.props.index == this.props.indice) {
      this.props.clickMethod(this.props.link)
    }
  }

  getZindex() {
    if (this.props.index == this.props.indice) {
      return "quote-box-zindex10"
    } else if (this.props.index == this.props.indice + 1 || this.props.index == this.props.indice - 1) {
      return "quote-box-zindex9"
    } else {
      return "quote-box-zindex8"
    }
  }

  getImageWidth() {
    if (this.props.index == this.props.indice) {
      return this.props.width + "px"
    } else if (this.props.index == this.props.indice + 1 || this.props.index == this.props.indice - 1) {
      return (this.props.width - 20) + "px"
    } else {
      return (this.props.width - 30) + "px"
    }
  }

  render() {
    var quoteClass = this.props.index == this.props.indice ? "quote-box-blue" : "quote-box-white"
    var titleClass = this.props.index == this.props.indice ? "sr-home__title__white" : "sr-home__title__blue"
    var zindex = this.getZindex.bind(this)

    return (
      <View>
        <div href="javascript:void(0)" onMouseUp={this.handleOnMouseUp.bind(this)}>
          <div className={"quote-box " + quoteClass + " " + zindex()} >
            <div className={"title " + titleClass}>
              {this.props.title}
            </div>
            <img className="sr-home__icon " style={{ width: this.getImageWidth() }} src={this.props.index == this.props.indice ? this.props.icon_selected : this.props.icon}></img>
          </div>
        </div>
      </View>
    )
  }
}
