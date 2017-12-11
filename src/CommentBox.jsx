import React from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import jQuery from 'jquery';


class CommentBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showComments : false,
            comments : []
            // comments : [
            //     { id: 1, author: "Morgan McCircuit", body: "Great picture!" },
            //     { id: 2, author: "Bending Bender", body: "Excellent stuff" }
            // ]
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

    componentWillMount() {
        console.log("Entro a willMount()");
        this._fetchComments();
    }

    componentDidMount() {
        this._timer = setInterval(
            () => this._fetchComments(), 
            120000);
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    _getComments() {
        let commentList = this.state.comments;

        return commentList.map( (comment) => {
            return (<Comment key={comment.url} comment={comment} onDelete={this._deleteComments.bind(this)}/>);
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

    _fetchComments() {
        jQuery.ajax({
            method: 'GET',
            url: 'https://swapi.co/api/people/',    //API que devuelve informacion sobre Star Wars, particularmente ahora le estoy pidiendo personajes
            success: (people) => {
                console.log("people: " + people.count);     //Logeo la cuenta de personajes
                this.setState({ comments: people.results });  //Asigno al arreglo de comments el arreglo llamado results que contiene los docs con la info de los personajes
            }
        });
    }

    _deleteComments(comment) {
        const comments = [...this.state.comments];  //con el operador spread clonamos el arreglo de comments existente
        const commentIndex = comments.indexOf(comment);
        comments.splice(commentIndex, 1);   //Corto del clon de comments, el comentario a borrar

        this.setState({ comments });    //Piso el arreglo de comments con la nueva version
    }

}

export default CommentBox;