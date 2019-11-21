import React, { Component } from "react";
import { connect } from "react-redux";
import { getPost } from "../redux/postReducer";
import "./IndivPost.css";

class IndivPost extends Component {
  render() {
    let { media } = this.props.redux.postReducer.media;
    return (
      <section className="indiv-post">
        <section className="img-">
          <img src={media} className="post-picture" />
          <section className="button-on-top">
            <button className="img-button">Save</button>
            <button className="img-button">•••</button>
          </section>
        </section>

        <h4>Title</h4>
        <p>Description lalala</p>
        <section>
          <p>All the comments</p>
          <button>Write a comment</button>
          <textarea></textarea>
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

export default connect(mapStateToProps, getPost)(IndivPost);
