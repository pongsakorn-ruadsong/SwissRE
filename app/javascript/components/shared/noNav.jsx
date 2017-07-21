import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import logo from '../../../../public/images/swissre_logo.png'
import logout from '../../../../public/images/logout.png'
import CurrentUser from '../../services/currentUser'
import CurrentLocal from '../../services/currentLocal'
import AppStatus from '../../services/appStatus'
import Connector from '../../utils/connector'

class NoNav extends React.Component {
  constructor(props) {
    super(props);
    this.toggleUserModal = this.toggleUserModal.bind(this)
    this.logout = this.logout.bind(this)
    this.state = {
      showModal: false
    }
  }

  toggleUserModal(e) {
    e.preventDefault();

    this.setState({
      showModal: !this.state.showModal
    })
  }

  logout(e) {
    var _this = this;
    e.preventDefault();
    (new Connector).delete('/api/sessions', function(json) {
      if(_.isEmpty(json.errors)) {
        (new CurrentUser).reset();
        (new CurrentLocal).reset();
        (new AppStatus).reset();
        (new CurrentUser).deleteAllCookies(document);
        window.location.href = '/'
      } else {
        // Handle errors
      }
    })
  }

  render() {
    var user = null;
    var modal = null;
    var current = (new CurrentUser).get()

    if(this.state.showModal) {
      modal = (
        <div className='logout-modal'>
          <ul>
            <li><a href='#' onClick={this.logout}>Sign Out</a></li>
          </ul>
        </div>
      )
    }

    if (current.id) {
      user = (
        <div className='col-6'>
          <div className='sr-nav__user'>
            <div className='sr-nav__user-image'>
              <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <defs />
                <g id="Page-1" stroke="none" strokeWidth='01' fill="none" fillRule="evenodd">
                  <g id='03' transform="translate(-258.000000, -122.000000)" fill="#FFFFFF">
                    <path d="M283.087057,160.55453 L283.087057,160.554147 L282.911602,160.554147 L270.6389,160.554147 C270.6389,151.579152 278.521379,151.581258 280.270573,149.234459 L280.470738,148.16411 C278.013209,146.918881 276.278382,143.916234 276.278382,140.404463 C276.278382,135.777904 279.287944,132.026702 282.999521,132.026702 C286.711098,132.026702 289.720661,135.777904 289.720661,140.404463 C289.720661,143.886353 288.016672,146.870229 285.591898,148.135378 L285.819837,149.351492 C287.738931,151.584515 295.359185,151.730088 295.359185,160.55453 L283.087057,160.55453 Z M282.999583,122 C269.192853,122 258,133.193112 258,146.99975 C258,160.806055 269.192853,172 282.999583,172 C296.806313,172 308,160.806055 308,146.99975 C308,133.192779 296.806313,122 282.999583,122 L282.999583,122 Z" id="Fill-1" />
                  </g>
                </g>
              </svg>
            </div>
            <h6 className='sr-nav__user-name'>Hi, {current.firstName} <div display="inline" onClick={this.logout}><img src={logout} alt="logo" className='logout-button' /> Log out</div></h6>&nbsp;&nbsp;&nbsp;
          </div>

        </div>
      )
    }

    return (
      <div className='sr-nav'>
        <div className="container">
          <div className='row no-gutters'>
            <div className='col-6'>
              <div className='sr-nav__container'>
                <Link to="/">
                <img src={logo} alt="logo" className='sr-nav__logo' />
                </Link>
                <div className='clearfix'></div>
              </div>
            </div>
            {user}
          </div>
        </div>
      </div>
    );
  }
}

export default NoNav
