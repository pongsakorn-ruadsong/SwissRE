import React, { PropTypes } from 'react'
import { Route, Redirect } from 'react-router'
import CurrentAdmin from '../services/currentAdmin'

class AdminLogout extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    (new CurrentAdmin).logout()
    window.location.href = '/'
  }

  render() {
    return null;
  }
}

export default AdminLogout
