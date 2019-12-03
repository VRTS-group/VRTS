import React, { Component } from "react";
import axios from "axios";
import "./Saves.css";

class Saves extends Component {
  constructor() {
    super();
    this.state = {
      saves: [],
      posts: []
    };
  }
  componentDidMount() {
    // axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
    //   this.setState({
    //     posts: res.data,
    //     user_id: res.data[0].user_id,
    //     post_id: res.data[0].post_id
    //   });
    //   console.log(res.data);
    // });
    axios.get(`/auth/getSavedPosts/${this.props.match.params.id}`).then(res => {
      this.setState({
        saves: res.data
        // post_id: res.data[0].post_id,
        // user_id: res.data[0].user_id
      });
      console.log(res.data);
    });
  }

  // deleteSave() {}

  render() {
    return (
      <div className="saves-page">
        {this.state.saves.map(e => {
          return (
            <div>
              <img src={e.media} className="pics-saved" />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Saves;
