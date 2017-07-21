import React from 'react'
import { ViewPager, Frame, Track, View } from 'react-view-pager'

export default class Comment extends React.Component {
  render() {
    var stars = []
    for (var i = 1; i <= this.props.rate; i++) {
      stars.push(<div className="icon-star" key={i}></div>)
    }
    return (
      <View>
        <div className="comment-box comment-box-margin">
          <div className="comment-body">
            <div className="ratings">
              {stars}
            </div>
            <div className="comment">
              {this.props.comment}
            </div>
            <div className="sub-comment">{this.props.sub_comment}</div>
          </div>

          <div className="comment-footer">
            <div className="username">{this.props.username}</div>
          </div>
        </div>
      </View>
    )
  }
}
