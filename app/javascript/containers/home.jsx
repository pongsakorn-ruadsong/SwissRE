import React, { PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { ViewPager, Frame, Track, View } from 'react-view-pager'
import CurrentUser from '../services/currentUser'
import Product from '../components/shared/product'
import Benefit from '../components/shared/benefit'
import Comment from '../components/shared/comment'
import hand from '../../../public/images/icon-hand-selected.svg'
import handSelected from '../../../public/images/icon-hand.png'
import car from '../../../public/images/icon-car.svg'
import carSelected from '../../../public/images/icon-car-selected.svg'
import shield from '../../../public/images/icon-shield.svg'
import shieldSelected from '../../../public/images/icon-shield-selected.svg'
import shopping from '../../../public/images/icon-shopping.svg'
import shoppingSelected from '../../../public/images/icon-shopping-selected.svg'
import health from '../../../public/images/icon-health.svg'
import healthSelected from '../../../public/images/icon-health-selected.svg'
import budgetCalculator from '../../../public/images/BudgetCalculator.png'
import left from '../../../public/images/left.png'
import right from '../../../public/images/right.png'
import WindowHelper from '../services/windowHelper';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: (new CurrentUser).get(),
      indice: WindowHelper.isDesktop() ? 2 : 2,
      draging: false
    }
  }


  onViewChange(indice) {
    console.log(indice)
    if (indice.length > 1) {
      this.setState({ indice: indice[0] }, () => { this.forceUpdate() });
    } else {
      this.setState({ indice: indice[0] }, () => { this.forceUpdate() });
    }
  }


  handleOnSwipeMove() {
    this.setState({ draging: true })
  }

  handleOnSwipeEnd() {
    this.setState({ draging: false })
  }

  clickMethod(link) {
    if (!this.state.draging) {
      this.props.history.push(link);
    }
  }


  render() {
    var benefitsCol = (this.state.indice == 0 || this.state.indice == 1) ? "col-md-4 col-sm-6 " : "col-md-3 col-sm-6";
    var benefitsCancer = (this.state.indice == 0 || this.state.indice == 1) ? <div></div> : (<div className={"col-md-3  col-sm-6 "}>
      <Benefit title="Term CI Protection" icon="icon-guard" />
    </div>);

    return (
      <div>
        <div className="bg-main-blue-gradiant">
          <div className="container">
            <div className='sr-home__title'>
              <h2>Get the best Our insurance!</h2>
              <h4>
                Best Insurance helps you get to get the best
                insurance fast and easily!
              </h4>
              {/*<div className='sr-home__title-cta'>
                <Link to={this.state.currentUser.id ? `/step` : `/login`} className='btn btn-dark-blue'>
                  Try to Find
                </Link>
              </div>*/}
            </div>
          </div>
        </div>

        <div className='sr-home row' id="scroll-product">
          <div className="container">

            <div className='sr-home__products-intro row'>
              <div className="col-md-3 col-sm-12">
                <h5>The Best Choice</h5>
                <h3>Products</h3>
              </div>
              <div className="col-md-9 col-sm-12 ">
                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing Lorem ipsum dolor sit amet, consectetuer adipiscing Lorem ipsum dolor sit amet, consectetuer adipiscing Lorem ipsum</p>
              </div>
            </div>



            <div className='sr-home__products  col-sm-12'>
              <div className='sr-product'>

                <ViewPager tag="main">
                  <div className="">
                      <img className="arrow__left" src={left} onClick={() => this.track2.prev()}/>

                  <Frame className="frame sr-home__frame " >
                    <Track
                      ref={c => this.track2 = c}
                      viewsToShow={WindowHelper.homeProductToShow()}
                      align={WindowHelper.isDesktop() ? 0.5 : 0.5}
                      onViewChange={this.onViewChange.bind(this)}
                      currentView={2}
                      swipe={false}
                      className="track">
                      <Product title="Car Insurance" width={100} icon_selected={carSelected} icon={car} indice={this.state.indice} index={0} link={`/`} clickMethod={this.clickMethod.bind(this)} />
                      <Product title="CI Protection" width={100} icon_selected={handSelected} icon={hand} indice={this.state.indice} index={1} link={`/ciProtection`} clickMethod={this.clickMethod.bind(this)} />
                      <Product title="Term life Insurance" width={85} icon_selected={healthSelected} icon={health} indice={this.state.indice} index={2} link={`/termLifeInsurance`} clickMethod={this.clickMethod.bind(this)} />
                      <Product title="Accident Protection" width={65} icon_selected={shieldSelected} icon={shield} indice={this.state.indice} index={3} link={`/`} clickMethod={this.clickMethod.bind(this)} />
                      <Product title="Shopping Insurance" width={75} icon_selected={shoppingSelected} icon={shopping} indice={this.state.indice} index={4} link={`/`} clickMethod={this.clickMethod.bind(this)} />

                    </Track>
                  </Frame>
                      <img className="arrow__right" src={right} onClick={() => this.track2.next()}/>
                  </div>

                  <div className="sr-subscription__arrow-container">
                    <div className="sr-subscription__arrow-down"></div>
                  </div>
                </ViewPager>
              </div>
            </div>

            <div className="col-12 sr-home__title__reason">
                <h3>Reasons that you should purchase this insurance</h3>
              </div>

            <div className='sr-home__benefits  col-sm-12'>
              <div className='sr-benefit'>
                <div className="row">
                  <div className={benefitsCol}>
                    <Benefit title="Support your life" icon="icon-hand" />
                  </div>

                  <div className={benefitsCol}>
                    <Benefit title="Gamified Journey" icon="icon-wheel" />
                  </div>

                  {benefitsCancer}

                  <div className={benefitsCol} >
                    <Benefit title="Get Reward for subscriber" icon="icon-gift" />
                  </div>
                </div>
              </div>
            </div>


            <div className=" col-sm-12 budget-calculator__container">
              <div className="row">
                <div className="col-12">
                  <hr className="budget-calculator__separator" />
                </div>
                <div className="col-12 budget-calculator__text_container">
                  <text className="budget-calculator__text">You can find products on your budget</text>
                </div>
                <div className="col-12">
                  <img className="budget-calculator__image img-fluid" src={budgetCalculator} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-main-blue" id="scroll-contact">
          <div className="container">
            <div className='sr-home__testimonials'>
              <div className="circle-bg circle-top-left"></div>
              <div className="circle-bg circle-top-right"></div>

              <div className='sr-testimonial'>
                <div className="title">Customers Comments</div>
                <ViewPager tag="main">
                  <Frame className="frame">
                    <Track
                      ref={c => this.track = c}
                      viewsToShow={WindowHelper.commentProductToShow()}
                      infinite
                      align={0.5}
                      className="track">
                      <Comment rate="4" comment="CommentCommentCommentCommentCommentCommentCommentComment CommentCommentCommentComment" sub_comment="SHAW THEARTER10% ticket" username="Username" />
                      <Comment rate="4" comment="CommentCommentCommentCommentCommentCommentCommentComment CommentCommentCommentComment" sub_comment="SHAW THEARTER10% ticket" username="Username" />
                      <Comment rate="4" comment="CommentCommentCommentCommentCommentCommentCommentComment CommentCommentCommentComment" sub_comment="SHAW THEARTER10% ticket" username="Username" />
                      <Comment rate="4" comment="CommentCommentCommentCommentCommentCommentCommentComment CommentCommentCommentComment" sub_comment="SHAW THEARTER10% ticket" username="Username" />
                    </Track>
                  </Frame>
                </ViewPager>
              </div>

              <div className="circle-bg circle-bottom-left"></div>
              <div className="circle-bg circle-bottom-right"></div>
            </div>

            <div className='col-sm-12 sr-home__contact'>
              <div className='sr-contact '>
                <div className="row">
                  <h3 className="col-md-3 col-sm-12">Contact</h3>
                  <div className="col-md-9 col-sm-12 desc">Lorem ipsum dolor sit amet, consectetuer adipiscing</div>
                </div>
                <div className="row">
                  <div className="col-md-3 col-sm-12"></div>
                  <div className="col-md-9 col-sm-12">
                    <div className="address">
                      <p>Swiss Re Singap</p>
                      <p>Address Office, Singaporeore</p>
                      <p>Phone 012345678</p>
                      <p>Email OOO@OOOO.com</p>
                    </div>

                    <div className="bottom-button">
                      <a href="#" className="btn btn-green btn-green--large-text">Online Chat</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Home
