import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

class GreenFooter extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className='sr-green-footer'>
          <div className='row'>
            <div className='col-9 col-lg-6 np'>
              <div className='sr-green-footer__main'>
                <div className='sr-green-footer__terms'>
                  <a href='#' className='btn btn-dark-blue sr-green-footer__language'>Language</a>
                  <br/>
                  Terms of business<br/>
                  Copyright 2017 SwissRe all rights reserved.
                </div>
              </div>
            </div>
            <div className='col-3 col-lg-6 np'>
              <div className='sr-green-footer__social-icon-container'>
                <div className='social-icon sr-green-footer__social-icon'><a href='#'><i className='fa fa-twitter'></i></a></div>
                <div className='social-icon sr-green-footer__social-icon'><a href='#'><i className='fa fa-linkedin'></i></a></div>
                <div className='social-icon sr-green-footer__social-icon sr-green-footer__social-icon--last'><a href='#'><i className='fa fa-youtube-play'></i></a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GreenFooter
