import React from 'react';

export default class Reason extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-1 col-md-2">
        </div>
        <div className="col-10 col-md-8">
          <div className='sr-reasons__container'>
            <img className="sr-reasons__image" src={this.props.image} />
            <div className="sr-reasons__textbox card-text">
              <text className="sr-reasons__title">{this.props.title}</text>
              <text className="sr-reasons__content">{this.props.content}</text>
            </div>
          </div>

        </div>
        <div className="col-1 col-md-10">
        </div>
      </div>

    )
  }
}