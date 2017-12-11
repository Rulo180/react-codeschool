import React from "react";

class Comment extends React.Component {
  render() {
    return (

      <div className="comment">
        <p className="comment-header">{this.props.comment.name}</p>
        <p className="comment-body">{this._getBodyMessage(this.props.comment)}</p>
        <div className="comment-footer">
          <a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>
            Delete Comment
          </a>
        </div>
      </div>
    );
  }

  _handleDelete(event) {
    event.preventDefault();
    if(window.confirm('Are you sure?')) {
      this.props.onDelete(this.props.comment);
    }
  }

  _getBodyMessage(comment) {
    let gender = (comment.gender === 'n/a')? undefined : `a ${comment.gender}`;
    let msg = `My height is ${comment.height} and I am ${gender}`;
    return msg;
  }
}

export default Comment;
