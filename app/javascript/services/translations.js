import _ from 'underscore'
import humps from 'humps'
import Connector from '../utils/connector'

class Translations {
  constructor() {

  }

  static trans(trans, val) {
    if(trans[val]) {
      return trans[val]
    }
    else {
      console.warn('[' + val + '] key is missing')
      return val;
    }
  }

  load(callback) {
    (new Connector).get('/api/contents', function(json) {
      var translations = { en: {} };
      json.body.response.result.forEach(function(result) {
        translations.en[result.title] = result.summary
      });

      callback(translations);
    })
  }
}

export default Translations
