import React, { PropTypes } from 'react'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Translations from '../../services/translations';




class Birthdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(),
            response: 0,
            option_id: props.componentValue.choices[0].id
        }

        this.handleChange = this.handleChange.bind(this);
        this.toggleCalendar = this.toggleCalendar.bind(this);
    }

    handleChange(date) {
        this.toggleCalendar()
        this.setState({ startDate: date });
        this.setState({ response: date._d }, () => { this.props.response(this.state); });
    }

    toggleCalendar(e) {
        e && e.preventDefault()
        this.setState({ isOpen: !this.state.isOpen })
    }

    render() {
        return (
            <div className="sr-birthdate__container">
                <div className="sr-birthdate__input">
                    <div className="sr-birthdate__container__table">
                    <div className="sr-birthdate__container__table_row">
                    <text className="sr-birthdate__input__date">Date</text>
                    <text className="example-custom-input" onClick={this.toggleCalendar}>
                        {this.state.startDate.format("DD MMMM YYYY")}
                    </text>{this.state.isOpen && (
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            withPortal
                            peekNextMonth
                            showMonthDropdown
                            showYearDropdown
                            inline />)}
                    <hr className="sr-birthdate__container__separator" />
                    </div>
                    </div>
                </div>
                <div className="sr-birthdate__summary">
                    <div>
                        <text className="sr-birthdate__summary__year">{moment.duration(moment() - this.state.startDate).years()}</text>
                        <text>Years old</text>
                    </div>
                    <text>
                        {this.state.startDate.format("MMMM DD YYYY")}
                    </text>
                </div>
            </div>
        );
    }
}

export default Birthdate