import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import creditCard from '../assets/images/credit_cards.svg'

class Total extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sr-payment__total__container">
        <div className='row sr-payment__total__product'>
          <div className='col-6'>
            <div className="align-left">
              <text>Insurance Product</text>
            </div>
          </div>
          <div className='col-6'>
            <div className="align-right">
              <text>$20,000</text>
            </div>
          </div>
        </div>
        <div className="sr-payment__total__separator" />
        <div className='row sr-payment__total__total'>
          <div className='col-6'>
            <div className="align-left">
              <text>Total</text>
            </div>
          </div>
          <div className='col-6'>
            <div className="align-right">
              <text>$20,000</text>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class CreditCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      expirationMonth: '',
      expirationYear: '',
      ccv: '',
      name: ''
    }
  }

  onNumberChange(e) {
    this.setState({ number: e.target.value });
  }


  onExpirationMonthChange(e) {
    this.setState({ expirationMonth: e.target.value });
  }

  onExpirationYearChange(e) {
    this.setState({ expirationYear: e.target.value });
  }


  onCCVChange(e) {
    this.setState({ ccv: e.target.value });
  }


  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  render() {
    return (
      <form>
        <div className='row'>
          <div className='col-12'>
            <div className="form-group">
              <input type='text' name='cardNumber'
                value={this.state.number}
                onChange={this.onNumberChange.bind(this)}
                className='form-control sr-payment__credit-card__input' placeholder='Card Number' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12 '>
            <div className="form-group">
              <div className="sr-payment__credit-card__input">
                <div className="row ">
                  <text className="col-6 col-sm-6 sr-payment__credit-card__hint">Expiration</text>

                  <input type='number' name='expiration'
                    value={this.state.expirationMonth}
                    onChange={this.onExpirationMonthChange.bind(this)}
                    className='col-3 col-sm-3 sr-payment__credit-card__picker' placeholder='MM' />
                  <input type='number' name='expiration'
                    value={this.state.expirationYear}
                    onChange={this.onExpirationYearChange.bind(this)}
                    className='col-3 col-sm-3 sr-payment__credit-card__picker' placeholder='YYYY' />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <div className="form-group">
              <input type='text' name='credit-card'
                value={this.state.ccv}
                onChange={this.onCCVChange.bind(this)}
                className='form-control sr-payment__credit-card__input' placeholder='CCV' />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-12'>
            <div className="form-group">
              <input type='text' name='name'
                value={this.state.name}
                onChange={this.onNameChange.bind(this)}
                className='form-control sr-payment__credit-card__input' placeholder='Name on card' />
            </div>
          </div>
        </div>
      </form>
    );
  }
}

class Payment extends React.Component {
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
                <h2>Check<br />your payment</h2>
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
                    <h2 className="sr-question__accent__title">Payment</h2>
                  </div>
                  <div>
                    <img src={creditCard} className="sr-payment__image" />
                  </div>
                  <div>
                    <Total />
                  </div>
                  <div>
                    <CreditCard />
                  </div>
                </div>

                <div>
                  <Link
                    to={`/reward`}
                    className='sr-page-box__btn btn btn-green btn-lg btn-green--large-text fw'>
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

export default Payment
