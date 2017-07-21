import React from 'react';

export default class Reward extends React.Component {
  constructor(props) {
  super(props)
  }


  render() {
    console.log(this.props)
    return (
      <div className="col-12 col-md-6">
        <div className="item">
          <div className="item-detail">
            <div className="desc">
              <div className="row">
                <div className="col-md-12 col-xs-12 col-sm-12 col-lg-6">
                  <img className="item-cover" src={this.props.image}></img>
                </div>
                 <div className="col-md-12 col-xs-12 col-sm-12 col-lg-6 item-desc">
                  <h4>{this.props.title}</h4>
                  <div>{this.props.description}</div>
                  <div className="item-bottom">
                    <h3 className="text-right">
                      {this.props.point} pts
                    </h3>
                    <a href={"/reward/" + this.props.goods_id} className="redeem-btn">Redeem</a>
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

// <hr></hr>
//               <p><strong><img alt="" src="https://images.pbapp.net/data/983f0ece60743bab0e2f379ade6583c8.png"></img></strong>&nbsp; &nbsp;<img alt="" src="https://images.pbapp.net/data/cab332d328cfba01fea3d75585117fbd.png"></img></p>
//               <p><img alt="" src="https://images.pbapp.net/data/8ec355c7563b6cbf51a6085f4c57846f.png"></img>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<big><strong>300 points</strong></big></p>
//               <p><strong><big>Cinnabon® ClassNameic Roll</big></strong></p>
//               <p><big>Warm dough, legendary Makara® Cinnamon, topped with rich cream cheese frosting. </big></p>
