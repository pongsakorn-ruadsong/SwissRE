import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import logo from '../../../../public/images/swissre_logo.png'

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="bg-main-blue sr-footer">
        <div className="container">
          <div className=''>
            <div className='row'>
              <div className='col-9'>
                <div className='row mb-10'>
                  <div className='col-12'>
                    <img src={logo} alt="logo" className='sr-footer__logo-footer' />
                    <div className='clearfix'></div>
                  </div>
                </div>
                <div className='row mb-10'>
                  <div className='col-12'>
                    {/*<Link to={`/local`} className='btn btn-dark-blue btn-sm lang'>
                      Language
                    </Link>*/}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <p className='sr-footer__terms'>Terms of business<br />Copyright@2017 SwissRe all rights reserved.</p>
                  </div>
                </div>
              </div>
              <div className='col-3'>
                <div className='sr-footer__social-icon-container'>
                  <div className='social-icon sr-footer__social-icon'><i className='fa fa-twitter'></i></div>
                  <div className='social-icon sr-footer__social-icon'><i className='fa fa-facebook'></i></div>
                  <div className='social-icon sr-footer__social-icon'><i className='fa fa-youtube'></i></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer
