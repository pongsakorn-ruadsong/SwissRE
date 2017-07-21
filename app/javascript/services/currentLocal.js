import _ from 'underscore'

class CurrentLocal {
  constructor() {
  }

  localEnum() {
    return {
      EN: "en",
      CH: "ch",
      TA: "tw",
      HK: "hk",
      SNGP: "sg",
      ML: "my",
      TH: "th",
      VIET: "vn",
      PH: "ph",
      KOR: "kr",
      JPN: "jp",
      ID: "id",
      IND: "in"
    }
  }



  set(local) {
    localStorage.setItem('currentUser.local', local)
  }

  setCountry(local) {
    localStorage.setItem('currentUser.country', local)
  }

  get() {
    return {
      local: localStorage.getItem('currentUser.local') == null ? (new CurrentLocal).localEnum().EN : localStorage.getItem('currentUser.local'),
      country: localStorage.getItem('currentUser.country') == null ? (new CurrentLocal).localEnum().EN : localStorage.getItem('currentUser.country')
    }
  }

  reset() {
    localStorage.removeItem('currentUser.local')
    localStorage.removeItem('currentUser.country')
  }
}

export default CurrentLocal
