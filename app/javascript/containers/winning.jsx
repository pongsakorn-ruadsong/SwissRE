import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class Winning extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>{this.props.title}</h2>
                <h4> Best insurance helps you to get the best <br /> insurance it's fast and easily !</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-content container m-t--100">
          <div className='sr-question__container p-15'>
            <div className='row'>
              <div className='col-12'>
                <div>
                  <div>
                    <h2 className="sr-question__accent__title">{this.props.subtitle}</h2>
                  </div>
                  <div>
                    <text>{this.props.match.params.text + " points"}</text>
                  </div>
                    <div>
                      <img className="sr-winning__image" src={this.props.image} />
                    </div>
                </div>
                <div>
                  <Link to={`/step`} className='redeem-btn'>
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Winning
