import _ from 'underscore'

class AppStatus {
  constructor() {

  }

  set(appStatus) {
    console.log(appStatus);
    localStorage.setItem('currentUser.step', appStatus.step)
    localStorage.setItem('currentUser.type', appStatus.type)
  }

  get() {
    return {
      step: localStorage.getItem('currentUser.step'),
      type: localStorage.getItem('currentUser.type')

    }
  }

    reset() {
    localStorage.removeItem('currentUser.step')
    localStorage.removeItem('currentUser.type')
  }



}

export default AppStatus
