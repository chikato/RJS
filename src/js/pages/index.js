/*------------------------------------*/
let CommentList = React.createClass({
    render: function () {
        let comment = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>{comment.text}</Comment>
            );
        });

        return (
            <div className="commentList">
                {comment}
            </div>
        );
    }
});

let CommentForm = React.createClass({
    getInitialState: function () {
        return {author: "", text: ""};
    },

    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },

    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },

    handleSubmit: function (e) {
        e.preventDefault();

        let author = this.props.author.trim();
        let text = this.props.text.trim();

        if (!author || !text) return;
        this.props.onCommentSubmit({author: author, text: text});
        this.setState({author: "", text: ""});
    },

    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text"
                       placeholder="Your name"
                       value={this.props.author}
                       onChange={this.handleAuthorChange}
                />
                <br/>
                <textarea placeholder="Say something..."
                          value={this.props.text}
                          onChange={this.handleTextChange}
                />
                <input type="submit" value="Post"/>
            </form>
        );
    }
});

let CommentBox = React.createClass({
    getInitialState: function () {
        return {data: []};
    },

    getComments: function () {
        $.ajax({
            url: this.props.url,
            dataType: "json",
            cache: false,

            success: function (data) {
                this.setState({data: data});
            }.bind(this),

            error: function (xhr, status, err) {
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    postComment: function () {

    },

    componentDidMount: function () {
        this.callAPI();
        setInterval(this.getComments, this.props.pollInterval);
    },

    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm onCommentSubmit={this.postComment}/>
            </div>
        );
    }
});

let Comment = React.createClass({
    rawMarkup: function () {
        let md = new Remarkable();
        return {__html: md.render(this.props.children.toString())};
    },

    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <div dangerouslySetInnerHTML={this.rawMarkup()}/>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="/api/comments" pollInterval={2000}/>,
    document.getElementById("content")
);