import React from 'react'

export default class Benefit extends React.Component {
  render() {
    return (
      <div className="circle">
        <div className={this.props.icon}></div>
        <div className="text benefit__text">{this.props.title}</div>
      </div>
    )
  }
}
