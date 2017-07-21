import React from 'react'
import Reward from '../components/shared/reward'
import Connector from '../utils/connector'
import Pagger from '../components/shared/pagger'
import { Link } from 'react-router-dom'


export default class RewardCatalogue extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      goods: [],
      page: 0
    }
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    var _this = this;
    (new Connector).get('/api/goods',
      function (json) {
        _this.setState(
          { goods: json }, () => { _this.forceUpdate() })
      });
  }

  onPageChange(state) {
    this.setState({ page: state.page })
  }

  render() {

    var goods = [];
    var goodsList = this.state.goods;
    console.log(goodsList)
    for (var i = 0; i < 4; i++) {
      var index = i + (4 * this.state.page);
      if (index < goodsList.length) {
        goods.push(<Reward
          key={i} image={goodsList[index].image}
          title={goodsList[index].name}
          desc={goodsList[index].description}
          point={goodsList[index].redeem.point.point_value}
          goods_id={goodsList[index].goods_id}
          description={goodsList[index].custom_param.length ? goodsList[index].custom_param[0].value : null}/>)
      }
    }

    return (

      <div className='grey-bg'>
        <div className='sr-page-intro'>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
                <h2>Reward Catalogue</h2>
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
                    <h2 className="text-center sr-reward__title">
                      Reward Catalogue
                    </h2>
                    <br></br>
                    <div className="row">
                      {goods}
                    </div>
                    <Pagger numberOfItems={this.state.goods.length} page={this.state.page} response={this.onPageChange.bind(this)} />
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
