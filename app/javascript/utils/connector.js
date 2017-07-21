import _ from 'underscore'

class Connector {
  constructor() {

  }

  get(url, callback) {
    fetch(url, {
      method: 'GET',
      credentials: "same-origin"
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      callback(json);
    });
  }

  post(url, body, callback) {
    fetch(url, {
      method: 'POST',
      credentials: "same-origin",
      body: JSON.stringify(body),
      headers: this.defaultHeaders(),
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      callback(json);
    });
  }

  delete(url, callback) {
    fetch(url, {
      method: 'DELETE',
      credentials: "same-origin",
      headers: this.defaultHeaders(),
    }).then(function (response) {
      return response.json();
    }).then(function (json) {
      callback(json);
    });
  }

  getCSRFToken() {
    return _.find(document.getElementsByTagName("meta"), (meta) => {
      return meta.name === "csrf-token"
    }).content
  }

  defaultHeaders() {
    return {
      'X-CSRF-Token': this.getCSRFToken(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

export default Connector
