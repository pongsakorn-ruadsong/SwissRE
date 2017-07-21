import React, { PropTypes } from 'react'
import { ViewPager, Frame, Track, View } from 'react-view-pager'


class Offer extends React.Component {
    constructor(props) {
        super(props);
    }




    render() {
        return (
            <View>
                <div className="sr-offer__container" style={{ border: "2px solid " + this.props.color, boxShadow: "0 0 10px" + this.props.color, background: this.props.color  }}>
                    <div  className="sr-offer__div__title">
                        <text className="sr-offer__title" >{this.props.title}</text>
                    </div>
                    <br></br>
                    <div className="sr-offer__div__content_container">
                        <div >
                            <text className="sr-offer__type">Suggested Cover</text>
                        </div>
                        <br></br>
                        <div>
                            <text className="sr-offer__payment" style={{color: this.props.color}}>{'Coverage\n of\n'+this.props.coverage}</text>
                        </div>
                        <div >
                            <img className="sr-offer__image" src={this.props.image}></img>
                        </div>
                        <br></br>
                        <div >
                            <text className="sr-offer__will_cost">How much it will cost</text>
                        </div>
                        <br></br>
                        <div >
                            <text className="sr-offer__price" style={{color: this.props.color}}>{this.props.price + " /year"}</text>
                        </div>
                        <br></br>
                        <div style={{padding: "16px 8px"}} >
                            <div style={{ background: this.props.color, color: "#FFFFFF", borderRadius: "25px", padding: "16px 8px", maxWidth: "224px", margin: "auto"}}>
                            <text className="sr-offer__button" >Buy this offer</text>

                            </div>
                        </div>
                    </div>
                </div>
            </View>
        )
    }
}

export default Offer
