import React, { Component } from "react";
import { connect } from "react-redux";
import { getComments } from "../redux/commentReducer";
import Axios from "axios";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    Axios.get(`/auth/comments`).then(res => {
      this.setState({
        comments: res.data
      });
    });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.comments.map(e => {
          return (
            <div>
              <p>{e.comments}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    redux: state
  };
};

export default connect(mapStateToProps, { getComments })(Comment);
