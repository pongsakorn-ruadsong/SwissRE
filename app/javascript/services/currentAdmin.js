import _ from 'underscore'
import humps from 'humps'

class CurrentAdmin {
  login(password) {
    // TODO: Replace with remote password check
    if (password !== 'password') { return false; }
    localStorage.setItem('currentAdmin.loggedIn', true)
    return true;
  }

  logout() {
    localStorage.removeItem('currentAdmin.loggedIn')
  }

  loggedIn() {
    // TODO: Remote check
    return localStorage.getItem('currentAdmin.loggedIn') == 'true'
  }
}

export default CurrentAdmin
