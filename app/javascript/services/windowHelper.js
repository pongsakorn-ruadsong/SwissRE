import _ from 'underscore'
import humps from 'humps'
import Connector from '../utils/connector'

class WindowHelper {
  constructor() {

  }

  static isDesktop() {
    return window.innerWidth > 768;
  }


  static homeProductToShow() {
    if (window.innerWidth > 1199) {
      return 5;
    } else if (window.innerWidth > 991) {
      return 3;
    } else if (window.innerWidth > 768) {
      return 3;
    } else if (window.innerWidth > 767) {
      return 1.5;
    } else {
      return 1.5;
    }
  }

    static homeProductSelected() {
    if (window.innerWidth > 1199) {
      return 2;
    } else if (window.innerWidth > 991) {
      return 2;
    } else if (window.innerWidth > 768) {
      return 2;
    } else if (window.innerWidth > 767) {
      return 2;
    } else {
      return 2;
    }
  }

  static commentProductToShow() {
    if (window.innerWidth > 1199) {
      return 3;
    } else if (window.innerWidth > 991) {
      return 3;
    } else if (window.innerWidth > 768) {
      return 2;
    } else if (window.innerWidth > 767) {
      return 2;
    } else {
      return 1;
    }
  }
}

export default WindowHelper