import React, {PropTypes} from 'react'
import Translations from '../../services/translations';
import CurrentLocal from '../../services/currentLocal';

class Address extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: "China",
      option_id: props.componentValue.choices[0].id
    }

    var onCountryChange = this.onCountryChange.bind(this);
  }

  componentDidMount() {
    // send default value to question.jsx (handleSubmit())
    this.props.response(this.state);

    var _this = this;
    var country = $("#countries").msDropdown({
      on: {
        change: function(data, ui) {
          _this.onCountryChange(data);
        }
      }
    }).data("dd");
    // $("select#countries").prop('selectedIndex', 3);
  }

  onCountryChange(event) {
    // console.log(event)
    this.setState({
      response: event.title
    }, () => {
      this.props.response(this.state);
    });
  }

  render() {
    var local = (new CurrentLocal).get()
    return (
      <div className="sr-address__container">
        <select value={local.country} name="countries" id="countries" style={{
          width: 300 + "px"
        }}>
          <option value='cn' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag cn" data-title="China">China</option>
          <option value='tw' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag tw" data-title="Taiwan">Taiwan</option>
          <option value='hk' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag hk" data-title="Hong Kong">Hong Kong</option>
          <option value='sg' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag sg" data-title="Singapore">Singapore</option>
          <option value='my' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag my" data-title="Malaysia">Malaysia</option>
          <option value='th' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag th" data-title="Thailand">Thailand</option>
          <option value='vn' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag vn" data-title="Vietnam">Vietnam</option>
          <option value='ph' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag ph" data-title="Philippines">Philippines</option>
          <option value='kr' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag kr" data-title="South Korea">South Korea</option>
          <option value='jp' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag jp" data-title="Japan">Japan</option>
          <option value='id' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag id" data-title="Indonesia">Indonesia</option>
          <option value='in' data-image="images/msdropdown/icons/blank.gif" data-imagecss="flag in" data-title="India">India</option>

        </select>

      </div>
    );
  }
}

export default Address
