import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import Iframe from 'react-iframe'
import $ from 'jquery/dist/jquery';
class Calories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: screen.height
    }
  }



  updateDimensions() {

    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName('body')[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({ width: width, height: height });
    // if you are using ES2015 I'm pretty sure you can do this: this.setState({width, height});
  }
  componentWillMount() {
    this.updateDimensions();
    window.scrollTo(document.getElementById("iframe"), 0);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
    $("html,body").animate({
      scrollTop: $('iframe').offset().top
    }, "slow");
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  componentDidUpdate() {
    $("html,body").animate({
      scrollTop: $('iframe').offset().top
    }, "slow");
  }

  render() {
    // var height = document.getElementById("iframe").offsetHeight; 

    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Play Calories Count</h2>
                <h4>
                  Best Insurance helps you to get the best
                  insurance It’s fast and easily !
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className='wrap-content'>

          <div id="iframe">
            <Iframe url="game/index.html"
              display="block"
              position="relative"
              styles={{ margin: "auto", width: "100%", height: this.state.height }} />
          </div>

        </div>
      </div>
    );
  }
}

export default Calories
