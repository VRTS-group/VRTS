import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../redux/postReducer";
import { addComment, deleteComment } from "../redux/commentReducer";
import axios from "axios";
import "./IndivPost.css";
import Comments from "./Comments";

class IndivPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      media: "",
      title: "",
      description: "",
      views: 0,
      save: false,
      user: [],
      username: "",
      comment: "",
      comments: [],
      user_id: 9,
      post_id: 40,
      comment_id: 0
    };
  }

  componentDidMount = () => {
    //   console.log(this.props.match.params.id)
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
      // console.log(res.data);
      this.setState({
        posts: res.data
      });
    });
    axios.get(`/api/comments/${this.props.match.params.id}`).then(res => {
      this.setState({
        comments: res.data
      });
    });
    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.state.comment !== this.state.comments) {
      this.render();
    }
  }

  handleText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  newComment = () => {
    axios
      .post("/api/comment", {
        comment: this.state.comment,
        user_id: this.state.user_id,
        post_id: this.state.post_id
      })
      .then(res => {
        alert("Comment added");
        this.setState({ comment: "" });
      });
    console.log(this.state);
  };

  render() {
    let { comment } = this.state;
    // console.log(this.state.user.username);
    return (
      <section className="indiv-post">
        {this.state.user.map(e => {
          return (
            <div>
              <h3>Username: {e.username}</h3>
            </div>
          );
        })}
        {this.state.posts.map(e => {
          return (
            <div id="mapped">
              <div id="title-box">
                <h3>{e.title}</h3>
              </div>
              <img src={e.media} className="post-picture" />

              <div>
                <p>{e.description}</p>
              </div>
            </div>
          );
        })}

        <section>
          <button onClick={this.newComment}>Write a comment</button>
          <textarea
            name="comment"
            value={comment}
            placeholder="Add a comment here :)"
            onChange={this.handleText}
          ></textarea>

          {this.state.user_id ? (
            <div>
              Comment AREA
              {this.state.comments.map(e => {
                return <div>{e.comment}</div>;
              })}
            </div>
          ) : (
            <div>
              Comment AREA
              {this.state.comments.map(e => {
                return (
                  <div>
                    {e.comment}
                    <button
                      onClick={() => {
                        deleteComment(e.comment_id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          <button>Show more</button>
        </section>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    redux: state
  };
};

export default connect(mapStateToProps, deleteComment)(IndivPost);
