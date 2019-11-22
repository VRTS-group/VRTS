import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../redux/postReducer";
import { addComment } from "../redux/commentReducer";
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
      username: ""
    };
  }

  componentDidMount = () => {
    //   console.log(this.props.match.params.id)
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        posts: res.data
      });
    });
  };

  getUsername = id => {
    axios.get(`/auth/getUserById/${id}`).then(res => {
      this.setState({
        user: res.data
      });
    });
  };

  handleText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleComment = (user_id, post_id, comment) => {
    this.props.addComment(user_id, post_id, comment);
    this.setState({ comment: "" });
  };

  render() {
    let { comment } = this.state;
    console.log(this.state.user.username);
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
          <button onClick={this.handleComment}>Write a comment</button>
          <textarea
            name="comment"
            value={comment}
            placeholder="Add a comment here :)"
            onChange={this.handleText}
          ></textarea>

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

export default connect(mapStateToProps, { addComment })(IndivPost);
