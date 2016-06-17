/*------------------------------------*/
let CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                <Comment author="Duy">1 Comment</Comment>
                <Comment author="Tan">2 Comment</Comment>
            </div>
        );
    }
});

let CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                Comment Form
            </div>
        );
    }
});

let CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList/>
                <CommentForm/>
            </div>
        );
    }
});

let Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <p>{this.props.children}</p>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox/>,
    document.getElementById("content")
);