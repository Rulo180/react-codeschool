import React from 'react';

class CommentForm extends React.Component {
    render () {
        return (
            <form className="comment form">
                <label>Join the discussion</label>
                <div className="comment-form-field">
                    <input type="text" placeholder="Name:" ref={(input) => this._author = input}/>
                    <br/>
                    <textarea placeholder="Comment:" cols="40" rows="5" ref={(textarea) => this._body = textarea}></textarea>
                </div>
                <div className="coment-form-actions">
                    <button type="submit" onClick={this._handleSubmit.bind(this)}>
                        Post Comment
                    </button>
                </div>
            </form>
        );
    }

    _handleSubmit(event) {
        event.preventDefault();
        
        let author = this._author;
        let body = this._body;
        
        this.props.addComment(author.value, body.value);
    }
}

export default CommentForm;