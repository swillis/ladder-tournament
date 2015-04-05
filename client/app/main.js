import React from 'react';
import Router from 'react-router';
import $ from 'jquery';

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var AppHandler = React.createClass({
  render: function () {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var HomeRoute = React.createClass({
  render() {
    return (
      <div>
        <Link to="think">Thinking In React</Link>
        <Link to="commentsbox">Comment Box</Link>
      </div>
    );
  }
});

var ThinkRoute = React.createClass({
  render() {
    return (
      <div>
        Think Route
      </div>
    );
  }
});

var CommentsBoxRoute = React.createClass({
  render() {
    return (
      <CommentBox url="/comments.json" pollInterval={2000} />
    );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',  
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState() {
    return {data: []};
  },
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data}/>
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

var CommentList = React.createClass({
  render() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
    return;
  },
  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="text" />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var routes = (
  <Router.Route path="/" handler={AppHandler}>
    <Router.DefaultRoute name="home" handler={HomeRoute}/>
    <Router.Route name="think" path="/think" handler={ThinkRoute}/>
    <Router.Route name="commentsbox" path="/commentsbox" handler={CommentsBoxRoute}/>
  </Router.Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.body);
});