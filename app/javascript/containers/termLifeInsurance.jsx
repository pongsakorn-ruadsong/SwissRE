import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import header from '../../../public/images/header-icon-01.png'
import icon01 from '../../../public/images/Icon-01.png'
import icon02 from '../../../public/images/Icon-02.png'
import icon03 from '../../../public/images/Icon-03.png'
import icon04 from '../../../public/images/Icon-04.png'
import Reason from '../components/shared/reason'
import CurrentUser from '../services/currentUser'


export default class CiProtection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: (new CurrentUser).get(),
    }
  }


  render() {
    console.log(this.props)
    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Term life Insurance</h2>
                <h4>
                  Best Insurance helps you get to get the best
                  insurance fast and easily!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              <div>
                <div className='sr-termLifeInsurance__container'>
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 sr-termLifeInsurance__div__title">
                            <text className="sr-termLifeInsurance__title">Term Life insurance</text>
                          </div>
                          <div className="col-12 sr-termLifeInsurance__div__image">
                            <img className="sr-termLifeInsurance__image" src={header} />
                          </div>
                          <div className="col-12 sr-termLifeInsurance__div__subtitle">
                            <text className="sr-termLifeInsurance__subtitle">Some things are worth wverything. protect them.</text>
                          </div>
                          <div className="col-12 sr-termLifeInsurance__div__verticalLine">
                            <div className="sr-termLifeInsurance__verticalLine" />
                          </div>
                          <div className="col-12 sr-termLifeInsurance__div__title_blue">
                            <text className="sr-termLifeInsurance__title_blue">Reasons that you should purchase this instance</text>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div >
                          <Reason image={icon01} title="Support your life" content="Ensure your loved one's financial future is protected, in the event you become terminally ill or unexpectedly pass away." />
                          <Reason image={icon02} title="Gamified Journey" content="Ensure your loved one's financial future is protected, in the event you become terminally ill or unexpectedly pass away." />
                          <Reason image={icon03} title="Get Reward for subscriber" content="Ensure your loved one's financial future is protected, in the event you become terminally ill or unexpectedly pass away." />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12">
                            <Link className="button-224 btn btn-dark-blue btn-lg btn-dark-blue--large-text" to={"/"}>Back</Link>
                            <Link className="button-224 btn btn-green btn-lg btn-green--large-text" to={this.state.currentUser.id ? `/step/TERM` : `/login/TERM`}>Get a quote</Link>
                          </div>
                        </div>
                      </div>


                    </div>
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

