import _ from 'underscore'
import humps from 'humps'

class CurrentUser {
  constructor() {

  }

  set(user) {
    user = humps.camelizeKeys(user);
    localStorage.setItem('currentUser.id', user.id)
    localStorage.setItem('currentUser.email', user.email)
    localStorage.setItem('currentUser.firstName', user.firstName)
    localStorage.setItem('currentUser.lastName', user.lastName)
  }

  get() {
    return {
      id: localStorage.getItem('currentUser.id'),
      email: localStorage.getItem('currentUser.email'),
      firstName: localStorage.getItem('currentUser.firstName'),
      lastName: localStorage.getItem('currentUser.lastName')
    }
  }

  reset() {
    localStorage.removeItem('currentUser.id')
    localStorage.removeItem('currentUser.email')
    localStorage.removeItem('currentUser.firstName')
    localStorage.removeItem('currentUser.lastName')
  }

  deleteAllCookies(document) {
    console.log(document)
    var cookies = document.cookie.split("; "); 
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }
}

export default CurrentUser
