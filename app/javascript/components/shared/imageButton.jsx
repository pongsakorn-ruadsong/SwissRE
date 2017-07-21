import React, { PropTypes } from 'react'

class ImageButton extends React.Component {
  constructor(props) {
    super(props);

  }



  render() {

    return (
      <div className="ribtn-container">
        <img src={this.props.image}  className="ribtn-image" />
        <div className="ribtn-middle"/>
      </div>
    );
  }
}

export default ImageButton