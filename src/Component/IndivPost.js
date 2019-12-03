import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../redux/commentReducer";
import axios from "axios";
import "./IndivPost.css";
import { updateUser, getUserById } from "../redux/userReducer";

class IndivPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      media: "",
      title: "",
      description: "",
      views: 0,
      saves: false,
      user: [],
      username: "",
      comment: "",
      comments: [],
      user_id: 0,
      post_id: 0,
      comment_id: 0
    };
  }

  componentDidMount = () => {
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
      this.setState({
        posts: res.data,
        user_id: res.data[0].user_id,
        post_id: res.data[0].post_id
      });
      console.log(res.data);
    });
    axios.get(`/api/comments/${this.props.match.params.id}`).then(res => {
      if (res.data[0]) {
        this.setState({
          // user_id: res.data[0].user_id,
          // username: res.data[0].username,
          // profile_pic: res.data[0].profile_pic,
          comments: res.data
        });
      }
      console.log(res.data);
    });
    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      this.setState({
        user: res.data
      });
      console.log(res.data);
    });
    this.props.getUserById();
  };

  componentDidUpdate(prevState) {
    if (prevState.comment !== this.state.comment) {
      axios.get(`/api/comments/${this.props.match.params.id}`).then(res => {
        if (res.data[0]) {
          this.setState({
            comments: res.data
          });
        }
      });
    }
  }

  handleText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSave = () => {
    axios
      .post("/auth/addSave", {
        saves: !this.state.saves,
        user_id: this.props.redux.userReducer.user.user_id,
        post_id: this.state.post_id
      })
      .then(res => {
        alert("Saved!");
      })
      .catch(err => console.log(err));
    console.log(this.state.saves);
  };

  newComment = () => {
    axios
      .post("/api/comment", {
        user_id: this.props.redux.userReducer.user.user_id,
        post_id: this.state.post_id,
        comment: this.state.comment
      })
      .then(res => {
        alert("Comment added");
        this.setState({ comment: "" });
      })
      .catch(err => console.log(err));
  };

  clear = () => {
    this.setState({
      comment: ""
    });
  };

  render() {
    let { comment } = this.state;
    // console.log(this.state.username);
    // console.log(this.state.username);
    // console.log(this.state.posts);
    // console.log(this.state.user);
    // console.log(this.props.redux.userReducer.user.username);
    // console.log(this.props);
    return (
      <section className="indiv-post">
        <div className="username">
          {this.state.posts.map(e => {
            return <h3> {e.username}</h3>;
          })}
        </div>
        <div className="post-section ">
          {this.state.posts.map(e => {
            return (
              <div id="post-info">
                <div id="title-box">
                  <h3>{e.title}</h3>
                </div>
                <div id="imagen-button">
                  <img src={e.media} className="post-picture" />
                  <button
                    onClick={() => this.handleSave()}
                    className="button-on-top"
                  >
                    Save
                  </button>
                </div>
                <div className="description">
                  <p>{e.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <section id="comment-section">
          <textarea
            className="text-box"
            name="comment"
            value={comment}
            placeholder="Add a comment here :)"
            onChange={this.handleText}
          ></textarea>
          <br />
          <button onClick={this.newComment} className="button-indiv">
            Write a comment
          </button>
          <br />
          <button onClick={this.clear} className="button-indiv">
            Clear
          </button>
          <div className="potato">
            {this.state.posts.map(e => {
              return (
                <div>
                  {e.user_id === this.props.redux.userReducer.user.user_id ? (
                    <div>
                      {this.state.comments.map(e => {
                        return (
                          <div className="comment-area">
                            <img
                              src={e.profile_pic}
                              className="profile-comment"
                            />

                            <div className="comment-area">
                              {e.comment}
                              <h5>{e.username}</h5>
                            </div>
                            <button
                              className="button-indiv"
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
                  ) : (
                    <div>
                      {this.state.comments.map(e => {
                        return (
                          <div className="comment-user">
                            <img
                              src={e.profile_pic}
                              className="profile-comment"
                            />

                            <div className="comment-area">
                              {e.comment}
                              <h5>{e.username}</h5>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* <button>Show more</button> */}
        </section>
      </section>
    );
  }
}

const mapDispatchToProps = {
  deleteComment,
  updateUser,
  getUserById
};

const mapStateToProps = state => {
  return {
    redux: state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndivPost);
