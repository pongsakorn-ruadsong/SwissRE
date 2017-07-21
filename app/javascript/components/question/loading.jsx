import React, { PropTypes } from 'react'
import ReactLoading from 'react-loading';

class Loading extends React.Component {
  render() {
    return (
      <div className="row sr-question__loading_container">
        <div className="col-12">
          <div className="sr-question__loading">
            <ReactLoading type={"spin"} color={"#FC3DBF"} height='124' width='124' />
          </div>
        </div>
      </div>
    )
  }
}

export default Loading