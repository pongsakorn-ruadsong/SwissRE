import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import Connector from '../utils/connector'
import { Route, Redirect } from 'react-router'
import _ from 'underscore'
import CurrentUser from '../services/currentUser'
import 'whatwg-fetch'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      redirect: false
    }
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  onLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault()
    var _this = this;

    var data = {
      user: {
        email: this.state.email,
        first_name: this.state.firstName,
        last_name: this.state.lastName
      }
    }
    var connector = new Connector
    connector.post('/api/users', data, function (json) {
      // Handle result
      if (_.isEmpty(json.errors)) {
        (new CurrentUser).set(json)
        _this.setState({ redirect: true })
      } else {
        // Handle errors
      }
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={"/validateSms/" + this.props.match.params.type + "/" + this.state.email}  />;
    }

    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Journey Description</h2>
                <h4>
                  Best Insurance helps you get to get the best insurance fast and easily!
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-content container">
          <div className='sr-page-box'>
            <div className='row'>
              <div className='col-12'>
                <div className='sr-page-box__container'>
                  <h3>
                    Complete the steps<br />
                    Unlock the gift box<br />
                    Get a personalized pricing
                  </h3>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-12'>
                <div className='sr-page-box__container'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className='row'>
                      <div className='col-6'>
                        <div className="form-group">
                          <input type='text' name='firstName' value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)} className='form-control' placeholder='First Name' />
                        </div>
                      </div>
                      <div className='col-6'>
                        <div className="form-group">
                          <input type='text' name='lastName' value={this.state.lastName} onChange={this.onLastNameChange.bind(this)} className='form-control' placeholder='Last Name' />
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-12'>
                        <div className="form-group">
                          <input type='phone' name='phone' value={this.state.email} onChange={this.onEmailChange.bind(this)} className='form-control' placeholder='Mobile no' />
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-12'></div>
                    </div>

                    <div className='row'>
                      <div className='col-10 offset-1'>
                        <Link className="button-224 btn btn-dark-blue btn-lg btn-dark-blue--large-text" to={"/"}>Back</Link>
                        <button type='submit' className='button-224 btn btn-green btn-lg btn-green--large-text'>Start</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Login
