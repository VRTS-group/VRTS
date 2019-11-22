import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments } from "../redux/commentReducer";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: {
        comment: this.props.comment
      }
    };
  }

  componentDidMount(post_id) {
    this.props.getComments(post_id);
  }

  render() {
    console.log(this.props);
    return <div>{this.props.comments}</div>;
  }
}

const mapStateToProps = state => {
  return {
    redux: state
  };
};

export default connect(mapStateToProps, { getComments })(Comment);
