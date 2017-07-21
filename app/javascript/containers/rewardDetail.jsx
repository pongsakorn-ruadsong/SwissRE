import React from 'react'
import Connector from '../utils/connector'

export default class RewardDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      good: {
        image: "",
        title: "",
        desc: "",
        redeem: { point: { point_value: "" } }
      }
    }
    this.getData = this.getData.bind(this);

  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    var _this = this;
    (new Connector).get('/api/goods/' + _this.props.match.params.id,
      function (json) {
        _this.setState(
          { good: json }, () => { })
      });
  }

  render() {
    return (
      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Get your Reward!</h2>
                <h4>
                  Best Insurance helps you get to get the best
                insurance fast and easily!
              </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="wrap-content p-l-15 p-r-15">
          <div className='sr-page-box'>
            <div className="container">
              <div className='row'>
                <div className='col-12'>
                  <div className='sr-page-box__white'>

                    <div className="row m-t-15 item">
                      <div className="col-md-12 col-sm-12">
                        <div className="desc" dangerouslySetInnerHTML={{ __html: this.state.good.description }} />
                        <a href="/sms" className="redeem-btn">Redeem</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
