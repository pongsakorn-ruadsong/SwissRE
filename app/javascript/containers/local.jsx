import React, { PropTypes } from 'react'
import Country from '../components/shared/country';
import FragUsa from '../assets/images/flag/usa';
import FragChina from '../assets/images/flag/china';
import FragTaiwan from '../assets/images/flag/taiwan';
import FragHk from '../assets/images/flag/hk';
import FragSingapore from '../assets/images/flag/singapore';
import FragMalaysia from '../assets/images/flag/malaysia';
import FragThailand from '../assets/images/flag/thailand';
import FragVietnam from '../assets/images/flag/vietnam';
import FragPhilippines from '../assets/images/flag/philippines';
import FragKorea from '../assets/images/flag/korean';
import FragJapan from '../assets/images/flag/japan';
import FragIndonesia from '../assets/images/flag/indonesia';
import FragIndia from '../assets/images/flag/india';
import Map from '../assets/images/map';
import CurrentLocal from '../services/currentLocal'

class Local extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    var local = new CurrentLocal;

    return (
      <div className='sr-local__background'>
        <div className='container'>

          <div className="text-center region-title">Region and Language</div>

          <div className="wrap-content">

            <div className='row sr-local__background_map'>
              <img src="/images/map.png"></img>
              <div className="col-xs-6 col-md-6 col-sm-12 sr-local__max">
                <Country country="China" image={FragChina} image_en={FragUsa} local={local.localEnum().CH} />
                <Country country="Taiwan" image={FragTaiwan} image_en={FragUsa} local={local.localEnum().TA} />
                <Country country="Hong Kokng" image={FragHk} image_en={FragUsa} local={local.localEnum().HK} />
                <Country country="Singapore" image={FragSingapore} image_en={FragUsa} local={local.localEnum().SNGP} />
                <Country country="Malaysia" image={FragMalaysia} image_en={FragUsa} local={local.localEnum().ML} />
                <Country country="Thailand" image={FragThailand} image_en={FragUsa} local={local.localEnum().TH} />
              </div>
              <div className="col-xs-6 col-md-6 col-sm-12 sr-local__max">
                <Country country="Vietnam" image={FragVietnam} image_en={FragUsa} local={local.localEnum().VIET} />
                <Country country="Philippines" image={FragPhilippines} image_en={FragUsa} local={local.localEnum().PH} />
                <Country country="Korea" image={FragKorea} image_en={FragUsa} local={local.localEnum().KOR} />
                <Country country="Japan" image={FragJapan} image_en={FragUsa} local={local.localEnum().JPN} />
                <Country country="Indonesia" image={FragIndonesia} image_en={FragUsa} local={local.localEnum().ID}/>
                <Country country="India" image={FragIndia} image_en={FragUsa} local={local.localEnum().IND} />
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Local
