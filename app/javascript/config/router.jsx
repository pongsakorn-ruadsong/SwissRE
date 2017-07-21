import React from 'react'
import { render } from 'react-dom'

import {
  BrowserRouter,
  Route,
  Link
} from 'react-router-dom'

import Nav from '../components/shared/nav'
import Footer from '../components/shared/footer'

import PasswordProtection from '../containers/passwordProtection'
import Home from '../containers/home'
import Login from '../containers/login'
import Journey from '../containers/journey'
import Step from '../containers/step'
import Subscription from '../containers/subscription'
import JourneyQuestions from '../containers/journeyQuestions'
import Calories from '../games/calories/main'
import SickCrush from '../games/sickcrush/main'
import ThankYou from '../containers/thankYou'
import Payment from '../containers/payment'
import Congratulation from '../containers/congratulation'
import Winning from '../containers/winning'
import Welldone from '../containers/welldone'
import CiProtection from '../containers/ciProtection'
import TermLifeInsurance from '../containers/termLifeInsurance'
import ValidateSms from '../containers/validatesms'
import RewardCatalogue from '../containers/rewardCatalogue'
import RewardDetail from '../containers/rewardDetail'
import Local from '../containers/local'
import Sms from '../containers/sms'
import AdminLogout from '../containers/adminLogout'
import Translations from '../services/translations'

import NavLayout from '../containers/layouts/navLayout'
import NoNavLayout from '../containers/layouts/noNavLayout'

import Gift from '../assets/images/gift.svg'
import Chest from '../assets/images/chest.svg'

class Router extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      translations: null
    }
  }

  componentDidMount() {
    (new Translations).load(function(translations) {
      this.setState({
        translations: translations
      })
    }.bind(this))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/password" component={PasswordProtection} />
          <Route exact path="/password/logout" component={AdminLogout} />

          <NavLayout exact path="/" component={Home} />
          <NavLayout path="/login/:type" component={Login} />
          <NavLayout path="/local" component={Local} translations={this.state.translations} />
          <NoNavLayout path="/step/:type" component={Step} translations={this.state.translations} />
          <NoNavLayout path="/step" component={Step} translations={this.state.translations} />
          <NoNavLayout path="/questions/:quizid" component={JourneyQuestions} translations={this.state.translations} />
          <NoNavLayout path="/healthrush" component={SickCrush} translations={this.state.translations} />
          <NoNavLayout path="/calories" component={Calories} translations={this.state.translations} />
          <NoNavLayout path="/subscription" component={Subscription}/>
          <NoNavLayout path="/thankyou" component={ThankYou}/>
          <NoNavLayout path="/payment" component={Payment}/>
          <NoNavLayout path="/congratulation1" component={Congratulation} link={"/healthrush"}/>
          <NoNavLayout path="/congratulation2" component={Congratulation} link={"/calories"}/>
          <NoNavLayout path="/winningpoint/:text" component={Winning} title="Congratulation!" subtitle="You Win!" image={Gift} />
          <NoNavLayout path="/winningpoint" component={Winning} title="Congratulation!" subtitle="You Win!" image={Gift} />
          <NoNavLayout path="/welldone" component={Welldone} title="Congratulation!" subtitle="Well Done!" text="You unlock the treasure chest!" image={Chest} />
          <NoNavLayout path="/reward" component={RewardCatalogue} translations={this.state.translations} />
          <NoNavLayout path="/reward/:id" component={RewardDetail} translations={this.state.translations} />
          <NoNavLayout path="/sms" component={Sms} translations={this.state.translations} />
          <NoNavLayout path="/ciProtection" component={CiProtection} translations={this.state.translations} />
          <NoNavLayout path="/termLifeInsurance" component={TermLifeInsurance} translations={this.state.translations} />
          <NoNavLayout path="/validateSms/:type/:phone" component={ValidateSms} translations={this.state.translations} />
        </div>
      </BrowserRouter>
    )
  }
}

export default Router
