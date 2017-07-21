import React, { PropTypes } from 'react'
import InfoBox from '../components/shared/infoBox'
import Offer from '../components/subscription/offer'
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { ViewPager, Frame, Track, View } from 'react-view-pager'
import logo from '../assets/images/cancer.svg'
import { Link } from 'react-router-dom'
import info1 from '../../../public/images/info.png'
import info2 from '../../../public/images/info2.png'
import icon1 from '../../../public/images/Icon-05.png'
import icon2 from '../../../public/images/Icon-06.png'
import icon3 from '../../../public/images/Icon-07.png'
import icon4 from '../../../public/images/Icon-08.png'
import icon5 from '../../../public/images/Icon-09.png'


class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: 50,
    }
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(event, value, id) {
    this.setState({ response: event.target.value }, () => { this.props.response(this.state); });
  }

  render() {
    return (
      <div>
        <div className='row'>
          <text className="col-12">Adjust the cover amount</text>
        </div>
        <div className='sr-subscription__slider'>
          <ReactBootstrapSlider
            value={this.state.response}
            change={this.changeValue}
            slideStop={this.changeValue}
            step={Number("10000")}
            min={Number("10000")}
            max={Number("1000000")}
            orientation="horizontal"
            reversed={false} />
        </div>
        <div className='row'>
          <text className="col-4">$10,000</text>
          <text className="col-4">$500,000</text>
          <text className="col-4">$1,000,000</text>
        </div>
      </div>

    )
  }
}

class Subscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 0
    }
  }

  sliderChangeValue(event) {
    console.log(this)
    console.log(event);
    if (event.response < 50000) {
      this.setState({currentView: 0});
    } else if (event.response >= 50000 && event.response < 200000) {
      this.setState({currentView: 1});
    } else if (event.response >= 200000 && event.response < 500000) {
      this.setState({currentView: 2});
    } else {
      this.setState({currentView: 3});
    }
  }

  render() {
    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Check our<br />offers!</h2>
                <h4> Best insurance helps you to get the best <br /> insurance it's fast and easily !</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-content container">
          <div className='sr-question__container p-t-15 p-b-15'>
            <div className='row'>
              <div className='col-12'>
                <h2 className="sr-question__accent__title">Montly Subscription</h2>

                <ViewPager tag="main">
                  <Frame className="frame">
                    <Track
                      ref={c => this.track = c}
                      viewsToShow={1.5}
                      currentView={this.state.currentView}
                      swipe={false}
                      align={0.5}
                      className="track">
                      <Offer {...{ title: "Option 1", coverage: "$6500", type: "Standar", price: "$10", image: icon1 } } color="#4C1BFF" />
                      <Offer {...{ title: "Option 2", coverage: "$12500", type: "Deluxe", price: "$15", image: icon2 } } color="#FFA100" />
                      <Offer {...{ title: "Option 3", coverage: "$25000", type: "Prenium", price: "$25", image: icon3 } } color="#A62AF9" />
                    </Track>
                  </Frame>

                  <div className="sr-subscription__arrow-container">
                    <div className="sr-subscription__arrow-down">
                    </div>
                  </div>
                </ViewPager>

                <Slider response={this.sliderChangeValue.bind(this)} />

                <ViewPager tag="main_info">
                  <Frame className="frame_info">
                    <Track
                      ref={c => this.track = c}
                      viewsToShow={1.5}
                      swipe={false}
                      currentView={this.state.currentView}
                      align={0.5}
                      className="track">
                      <InfoBox text="To top up your cover by 100,000 USD, You only need to pay 10% more of Deluxe" color="#FFA100" badge={icon4} icon={info1}/>
                      <InfoBox text="Pay 20 more monthly premium and you will instantly get an accident cover" color="#A62AF9" badge={icon5} icon={info2} />
                      <InfoBox text="" color="#00000000" icon={""} />
                    </Track>
                  </Frame>
                </ViewPager>

                <Link to={`/payment`} className='col-12 btn-auto btn btn-green btn-green--large-text'>
                  Continue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Subscription
