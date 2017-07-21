import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'

class SickCrush extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    cr_createRuntime("c2canvas");

    var onVisibilityChanged = function() {
			if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden)
				cr_setSuspended(true);
			else
				cr_setSuspended(false);
		};

		document.addEventListener("visibilitychange", onVisibilityChanged, false);
		document.addEventListener("mozvisibilitychange", onVisibilityChanged, false);
		document.addEventListener("webkitvisibilitychange", onVisibilityChanged, false);
		document.addEventListener("msvisibilitychange", onVisibilityChanged, false);

		function OnRegisterSWError(e)
		{
			console.warn("Failed to register service worker: ", e);
		};

		// Runtime calls this global method when ready to start caching (i.e. after startup).
		// This registers the service worker which caches resources for offline support.
		window.C2_RegisterSW = function C2_RegisterSW()
		{
			if (!navigator.serviceWorker)
				return;		// no SW support, ignore call

			try {
				navigator.serviceWorker.register("sw.js", { scope: "./" })
				.then(function (reg)
				{
					console.log("Registered service worker on " + reg.scope);
				})
				.catch(OnRegisterSWError);
			}
			catch (e)
			{
				OnRegisterSWError(e);
			}
		};

    $('#c2canvasdiv').css({ 'margin-top': '0px' })
      $("html,body").animate({
      scrollTop: $('#c2canvas').offset().top
    }, "slow");
  }

    componentDidUpdate() {
      console.log($('#c2canvas').offset())
    $("html,body").animate({
      scrollTop: $('#c2canvas').offset().top
    }, "slow");
  }

  render() {

    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Play Healthy rush</h2>
                <h4>
                  Best Insurance helps you to get the best
                  insurance It’s fast and easily !
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className='wrap-content'>
          <div id="c2canvasdiv">
            <canvas id="c2canvas" width="960" height="540">
              <h1>Your browser does not appear to support HTML5.  Try upgrading your browser to the latest version.  <a href="http://www.whatbrowser.org">What is a browser?</a>
              <br/><br/><a href="http://www.microsoft.com/windows/internet-explorer/default.aspx">Microsoft Internet Explorer</a><br/>
              <a href="http://www.mozilla.com/firefox/">Mozilla Firefox</a><br/>
              <a href="http://www.google.com/chrome/">Google Chrome</a><br/>
              <a href="http://www.apple.com/safari/download/">Apple Safari</a></h1>
            </canvas>
          </div>
        </div>
      </div>
    );
  }
}

export default SickCrush
