import React, { Component } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';

class CommentBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments : false,
            comments : [
                { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
                { id: 2, author: "Bending Bender", body: "Excellent stuff" }
            ]
        };
    }

    render() {

        const comments = this._getComments();
        let commentNodes;
        let buttonText;

        if(this.state.showComments) {
            commentNodes = <div className="comment-list"> {comments} </div>;
            buttonText = 'Hide comments';
        } else {
            buttonText = 'Show comments';
        }

        return (
            <div className="comment-box">
                <h3>Comments</h3>
                <h4 className="comment-count">{this._getCommentsTitle(comments.length)}</h4>
                {commentNodes}
                <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
                <CommentForm addComment={this._addComment.bind(this)}></CommentForm>
            </div>
        );
    }

    _getComments() {
        let commentList = this.state.comments;

        return commentList.map( (comment) => {
            return (<Comment author={comment.author} body={comment.body} key={comment.id}/>);
        });
    }

    _getCommentsTitle(commentCount) {
        let result = "";
        if (commentCount === 0) 
            result = "No comments yet.";
         else if (commentCount === 1)
            result = "1 comment.";
        else 
            result = `${commentCount} comments.`;
        return result;
    }

    _handleClick() {
        this.setState({showComments: !this.state.showComments});
    }

    _addComment(author, body) {
        const comment = {
            id: this.state.comments.length + 1,
            author: author,
            body: body
        }
        console.log(comment);
        this.setState({comments: this.state.comments.concat([comment])});
    }

}

export default CommentBox;