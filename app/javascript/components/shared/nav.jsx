import React from 'react'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'
import logo from '../../../../public/images/swissre_logo.png'
import CurrentUser from '../../services/currentUser'
import $ from 'jquery/dist/jquery';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollToTop(scrollDuration) {
    var scrollStep = scrollDuration / (300 / 15),
      scrollInterval = setInterval(function(){
      if ( window.scrollY != 0 ) {
        window.scrollBy( 0, scrollStep );
      }
      else clearInterval(scrollInterval);
    },15);
  }

  scrollTo(e) {
    e.preventDefault();
    var data = e.target.dataset
    var el = document.getElementById(data['scrollTo']);
    var position = el.offsetTop;
    $('html,body').animate({
      scrollTop: position
    }, 1000);
  }

  render() {
    var user = null;
    var current = (new CurrentUser).get()

    return (
      <div className='sr-nav'>
        <div className="container">
          <div className='row no-gutters'>
            <div className='col-sm-12 col-md-6 auto-margin'>
              <div className='sr-nav__container'>
                <Link to="/">
                  <img src={logo} alt="logo" className='sr-nav__logo' />
                </Link>
                <div className='clearfix'></div>
              </div>
            </div>

            {user}

            <div className='col-sm-12 col-md-6 sr-nav__auto-margin text-md-right'>
              <div className="sr-nav__phone inline-block">
                 <div className="inline-block">
                  <svg className='mr-10' width="27px" height="27px" viewBox="0 0 27 27" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <defs></defs>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="01" transform="translate(-22.000000, -134.000000)" fill="#FFFFFF">
                        <g id="Tel-No" transform="translate(22.000000, 133.000000)">
                          <path d="M0.56173955,14.5004756 C0.562405145,21.742504 6.42962379,27.5768876 13.6603135,27.6111879 C15.0806929,27.6125199 16.2265145,27.1739421 17.0172412,26.4536355 C17.8089662,25.735993 18.231619,24.7502753 18.2306206,23.752569 C18.231619,23.2843531 18.1327781,22.8151381 17.9480756,22.368568 C18.259574,22.1914052 18.4672395,22.029894 18.5264775,21.9876014 C18.739135,21.8360806 19.345492,21.0265266 18.9201768,20.359502 C18.4931977,19.6928105 16.9733119,18.1736063 16.5583135,17.9161874 C16.1443135,17.6594346 15.4527605,17.9098602 15.1196302,18.3990559 C14.7858344,18.8882517 14.5222588,18.7417261 14.5222588,18.7417261 C14.5222588,18.7417261 13.5747846,17.9757967 12.2638955,15.3296773 C10.9533392,12.6822259 10.9197267,11.4653973 10.9197267,11.4653973 C10.9197267,11.4653973 10.9623248,11.1660188 11.5537058,11.1959899 C12.1440884,11.2276262 12.7617605,10.8286769 12.8086849,10.3428113 C12.8562749,9.85794468 12.5680723,7.72599699 12.2968424,6.98304553 C12.0246141,6.23976105 11.0142412,6.23276778 10.7649759,6.31035976 C10.5147122,6.3872857 7.94851125,7.01268366 7.74483923,9.70109567 C7.5418328,12.3901737 8.23405145,14.8318232 9.22612058,16.835894 C10.2181897,18.8392988 11.7404051,20.8696776 14.0010981,22.3362658 C14.9169566,22.9303605 15.7955418,23.0072865 16.5343521,22.8830727 C16.6614807,23.1664666 16.7247122,23.4611829 16.7260434,23.7529021 C16.7247122,24.3310122 16.4894244,24.8974669 16.0062026,25.3387088 C15.5213167,25.7772866 14.7741865,26.1029731 13.6925949,26.1053042 C7.25595981,26.0726689 2.06598392,20.906642 2.06631672,14.5004756 C2.06698232,11.2935627 3.3632283,8.39635168 5.46318006,6.29404213 C7.56413023,4.19306463 10.4588023,2.89564692 13.6639743,2.89531391 C16.8688135,2.89564692 19.7638183,4.19306463 21.8647685,6.29404213 C23.9650531,8.39668469 25.2609662,11.2928967 25.2616318,14.5004756 C25.261299,16.4809024 24.7670949,18.3397797 23.8954984,19.9692111 C23.4076174,20.8826651 22.8002621,21.7221902 22.0950643,22.4691379 C21.8098569,22.7715135 21.8238344,23.2477217 22.1253489,23.5331136 C22.4271961,23.8188386 22.9037621,23.8055181 23.1889695,23.5031425 C23.9843553,22.6602872 24.6702508,21.7118669 25.2216961,20.6791943 C26.2071093,18.8389658 26.766209,16.7326601 26.766209,14.5004756 C26.7652106,7.25911311 20.9006543,1.39009624 13.6639743,1.38976323 C6.42729421,1.39009624 0.562405145,7.25911311 0.56173955,14.5004756 Z" id="Fill-46"></path>
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span>0123456789</span>
                </div>
              </div>

              <div className='sr-nav__chat inline-block'>
                <a href='' className='btn btn-green btn-green--large-text'>Online Chat</a>
              </div>
            </div>

            <div className='col-12 col-md-6 offset-md-6 text-md-left'>
              <ul className='sr-nav__menu'>
                <li className='sr-nav__item sr-nav__item--first'><Link to="/" onClick={this.scrollTo.bind(this)} data-scroll-to="scroll-home">Home</Link></li>
                <li className='sr-nav__item'><Link to="/" onClick={this.scrollTo.bind(this)} data-scroll-to="scroll-product">Products</Link></li>
                <li className='sr-nav__item sr-nav__item--last'><Link to="/" onClick={this.scrollTo.bind(this)} data-scroll-to="scroll-contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav
