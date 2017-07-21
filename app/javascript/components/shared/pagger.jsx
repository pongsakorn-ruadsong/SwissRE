import React, { PropTypes } from 'react'
import AppStatus from '../../services/appStatus'
import next from '../../../../public/images/next_buttom.png'
import previous from '../../../../public/images/previous_buttom.png'
import dot from '../../../../public/images/dot.png'




class Pagger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page
    }
  }


  nextClick(changeEvent) {
    this.setState({
      page: this.props.page - 1
    }, () => { this.props.response(this.state); });
  }

  previousClick(changeEvent) {
    this.setState({
      page: this.props.page + 1
    }, () => { this.props.response(this.state); });
  }

  render() {
    var rows = [];
    for (var i = 0; i < this.props.numberOfItems; i += 4) {
      rows.push(<img key={i} src={dot} className="sr-pagger__dot"/>)
    }

    var previousClass = this.state.page > 0 ? "sr-pagger__button sr-pagger__previous" : "sr-pagger__button sr-pagger__previous sr-pagger__visible";
    var nextClass = this.state.page < (this.props.numberOfItems/4) && this.props.numberOfItems > 4 ? "sr-pagger__button sr-pagger__next" : "sr-pagger__button sr-pagger__next sr-pagger__visible";

    return (
      <div className='col-12'>
        <div className='center'>

          <img src={previous} className={previousClass} onClick={this.nextClick.bind(this)} />
          {rows}
          <img src={next} className={nextClass} onClick={this.previousClick.bind(this)}/>
        </div>
      </div>

    )
  }
}

export default Pagger