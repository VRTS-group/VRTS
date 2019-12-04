import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteComment } from "../redux/commentReducer";
import axios from "axios";
import "./IndivPost.css";
import { updateUser, getUserById } from "../redux/userReducer";
import ReactPlayer from "react-player";
import "./indivMusic.css";

class IndivPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
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
    axios.get(`/auth/getMusicById/${this.props.match.params.id}`).then(res => {
      this.setState({
        posts: res.data,
        user_id: res.data[0].user_id,
        music_id: res.data[0].music_id,
        title: res.data[0].title,
        media: res.data[0].media,
        description: res.data[0].description
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
    // axios.get(`/api/comment/${this.props.match.params.id}`).then(res => {
    //   this.setState({
    //     comment: res.data
    //   });
    //   console.log(res.data);
    // });
  };

  componentDidUpdate(prevState) {
    if (this.state.comment !== prevState.comments) {
      this.render();
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
    // let { comment } = this.state;
    console.log(this.state);
    // console.log(this.state.username);
    // console.log(this.state.username);
    // console.log(this.state.posts);
    // console.log(this.state.user);
    // console.log(this.props.redux.userReducer.user.username);
    // console.log(this.props);
    return (
      <div className="IndivMusic">
        <div className="IndivMusicContainer">
          <div className="username">
          {this.state.music.map(e => {
            return <h3> {e.username}</h3>;
          })}
        </div>

              <div className="IndivMusicTitle">
                <h3>{this.state.title}</h3>
              </div>
              <div className="PostVidBox">
                <div className="PostVid">
                  <ReactPlayer url={this.state.media} />
                </div>
                {/* <img src={this.state.media} className="post-picture" /> */}
                {/* <button
                    onClick={() => this.handleSave()}
                    className="button-on-top"
                  >
                    Save
                  </button> */}
              </div>
              <div className="MusicDescription">
                <p> Description:</p>
                <p>{this.state.description}</p>
              </div>
            </div>
          </div>

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
