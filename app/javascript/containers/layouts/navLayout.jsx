import React from 'react'

import {
  BrowserRouter,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import Nav from '../../components/shared/nav'
import Footer from '../../components/shared/footer'
import CurrentAdmin from '../../services/currentAdmin'

export default class NavLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  renderComponent(matchProps) {
    if ((new CurrentAdmin).loggedIn()) {
      return (
        <div className='sr-page'>
          <div className='container-fluid np'>
            <div>
              <Nav />
              <this.props.component {...matchProps} {...this.props} />
              <Footer />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Redirect to={{
          pathname: '/password',
          state: { from: this.props.location }
        }}/>
      )
    }

  }

  render() {
    return(
      <Route exact={this.props.exact == undefined ? true : this.props.exact}
             path={this.props.path}
             render={matchProps => (this.renderComponent(matchProps))} />
    )
  }
}
