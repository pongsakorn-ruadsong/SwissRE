import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import _ from 'underscore'
import header from '../../../public/images/SMS-icon.png'
import Reason from '../components/shared/reason'
import CurrentUser from '../services/currentUser'
import CurrentLocal from '../services/currentLocal'
import AppStatus from '../services/appStatus'
import Connector from '../utils/connector'


export default class ValidateSms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: (new CurrentUser).get(),
      code: '',
      redirect: false,
      onback: false,
    }
  }


  onCodeChange(e) {
    this.setState({ code: e.target.value });
  }


  handleSubmit(e) {
    e.preventDefault()
    var _this = this;

    var data = {
      user: {
        code: this.state.code
      }
    }
    _this.setState({ redirect: true })

  }


  onBack(e) {
    var _this = this;
    e.preventDefault();
    (new Connector).delete('/api/sessions', function (json) {
      if (_.isEmpty(json.errors)) {
        (new CurrentUser).reset();
        (new CurrentLocal).reset();
        (new AppStatus).reset();
        (new CurrentUser).deleteAllCookies(document);
        window.location.href = '/'
        _this.setState({ onback: true });
      } else {
        // Handle errors
      }
    })
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/step/" + this.props.match.params.type} />;
    }
    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Journey Description</h2>
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
                <div className='sr-validatesms__container'>
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="row">
                          <div className="col-12 sr-validatesms__div__title">
                            <text className="sr-validatesms__title">Enter Verification Code</text>
                          </div>
                          <div className="col-12 sr-validatesms__div__subtitle">
                            <text className="sr-validatesms__subtitle">{"We sent a code to " + this.props.match.params.phone + "."}</text>
                          </div>
                          <div className="col-12 sr-validatesms__div__subtitle">
                            <text className="sr-validatesms__subtitle">Enter it below to verify your number.</text>
                          </div>
                        </div>
                        <div className="col-12 sr-validatesms__div__title_blue">
                          <text className="sr-validatesms__title_blue">Request a new one.</text>
                        </div>
                      </div>
                      <div className="col-12 sr-validatesms__div__image">
                        <img className="sr-validatesms__image" src={header} />
                      </div>


                      <div className='col-12'>
                        <div className='sr-validatesms'>
                          <form >



                            <div className='row'>
                              <div className='col-12'>
                                <div className="form-group sr-validatesms__div__input">
                                  <input type='phone' name='phone' value={this.state.code} onChange={this.onCodeChange.bind(this)} className='form-control' placeholder='Verification code' />
                                </div>
                              </div>
                            </div>

                            <div className='row'>
                              <div className='col-12'></div>
                            </div>


                            <div className='row'>
                              <div className='col-10 offset-1'>
                                <button className="button-224 btn btn-dark-blue btn-lg btn-dark-blue--large-text" onClick={this.onBack.bind(this)}>Back</button>
                                <button className='button-224 btn btn-green btn-lg btn-green--large-text' onClick={this.handleSubmit.bind(this)}>Verify</button>
                              </div>
                            </div>

                          </form>

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

