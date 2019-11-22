import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../redux/postReducer";
import { addComment } from "../redux/commentReducer";

import "./IndivPost.css";
import Comments from "./Comments";

class IndivPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        post_id: 0,
        user_id: 0,
        media: "",
        title: "",
        description: "",
        views: 0,
        comment: ""
      }
    };
  }

  // componentDidMount(id) {
  //   this.props.getPostById(id);
  // }

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
    let {
      media,
      title,
      description,
      views
    } = this.props.redux.postReducer.posts;
    console.log(this.props);

    let { comment } = this.state;
    return (
      <section className="indiv-post">
        <h4>Title: {title}</h4>
        <section className="img-n-button">
          <img src={media} className="post-picture" />
          <section className="button-on-top">
            <button className="img-button">Save</button>
            <p>views:{views}</p>
            <button className="img-button">•••</button>
          </section>
        </section>
        <p>Description: {description}</p>
        <section>
          {/* <a>
            {" "}
            {this.state.post.map(e => {
              return <Comments />;
            })}
          </a> */}

          <button onClick={this.handleComment}>Write a comment</button>
          <textarea
            name="comment"
            value={comment}
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

export default connect(mapStateToProps, { getPostById, addComment })(IndivPost);
