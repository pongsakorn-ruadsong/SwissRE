import React from 'react'

export default class Sms extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='grey-bg page-sms'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Contact you soon!</h2>
                <h4>
                  Best Insurance helps you get to get the best
                  insurance fast and easily!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-content p-l-15 p-r-15 container">
          <div className='sr-page-box'>
            <div className="container">
              <div className='row'>
                <div className='col-12'>
                  <div className='sr-page-box__white text-center'>
                    <h3>Check your phone</h3>

                    <p className="page-sms__content">Our offer and reedeemed prize have been sent to your phone</p>

                    <div className="icon-sms m-b-20"></div>

                    <a href="/" className="redeem-btn">OK</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
