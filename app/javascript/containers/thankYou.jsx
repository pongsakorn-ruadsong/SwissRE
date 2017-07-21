import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import smile from '../assets/images/smile.svg'
import CurrentUser from '../services/currentUser'



class ThankYou extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var current = (new CurrentUser).get()

    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Contact<br />you soon!</h2>
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
                    <h2 className="sr-question__accent__title">Thank you!</h2>
                  </div>

                  <div>
                    <text>Dear {current.firstName},<br />
                      An agent will contact you very soon<br />
                      to discuss further.<br />
                      Thank you for your patience.
                    </text>
                  </div>
                  <div>
                    <img src={smile} className="sr-thankyou__image" />
                  </div>
                </div>
                <div>
                  <Link to={`/`} className='col-12 btn btn-green btn-green--large-text'>
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

export default ThankYou
