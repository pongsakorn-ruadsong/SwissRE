import React, { PropTypes } from 'react'
import Connector from '../utils/connector'
import { Route, Redirect } from 'react-router'
import _ from 'underscore'
import CurrentUser from '../services/currentUser'
import Nav from '../components/shared/nav'
import GreenFooter from '../components/shared/greenFooter'
import CurrentAdmin from '../services/currentAdmin'
import 'whatwg-fetch'

class PasswordProtection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      error: null
    }
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()

    if ((new CurrentAdmin).login(this.state.password)) {
      window.location.href = '/'
    } else {
      this.setState({ error: 'Invalid Password' })
    }
  }

  render() {
    var error = null;
    if (this.state.error) {
      error = (
        <div className='row'>
          <div className='col-12'>
            <div className='sr-password__error'>{this.state.error}</div>
          </div>
        </div>
      )
    }

    return (
      <div className='sr-page'>
        <div className='container-fluid np'>
          <div>
            <Nav />
            <div className='grey-bg'>
              <div className='sr-password'>
                <div className='row'>
                  <div className='col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-7'>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                      <div className='row'>
                        <div className='col-12'>
                          <div className="form-group">
                            <input type='password' name='password' value={this.state.password} onChange={this.onPasswordChange.bind(this)}
                                   className='form-control sr-password__input' placeholder='Password'/>
                          </div>
                        </div>
                      </div>
                      {error}
                      <div className='row'>
                        <div className='col-12'>
                          <button type='submit' className='sr-page-box__btn btn btn-dark-blue btn-lg btn-green--large-text fw'>Log In</button>
                        </div>
                      </div>
                  </form>
                  </div>
                </div>
              </div>
            </div>
            <GreenFooter />
          </div>
        </div>
      </div>
    );
  }
}

export default PasswordProtection
