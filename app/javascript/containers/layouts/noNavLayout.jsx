import React from 'react'

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import NoNav from '../../components/shared/noNav'
import Footer from '../../components/shared/footer'

export default class NoNavLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Route exact={this.props.exact == undefined ? true : this.props.exact} path={this.props.path} render={matchProps => (
        <div className='sr-page'>
          <div className='container-fluid np'>
            <div>
              <NoNav />
              <this.props.component {...matchProps} {...this.props} />
              <Footer />
            </div>
          </div>
        </div>
      )} />
    )
  }
}
