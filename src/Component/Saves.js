import React, { Component } from "react";
import axios from "axios";
import "./Saves.css";

class Saves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saves: [],
      posts: []
    };
  }
  componentDidMount() {
    axios.get(`/auth/getSavedPosts/${this.props.match.params.id}`).then(res => {
      this.setState({
        saves: res.data
      });
    });
  }

  componentDidUpdate(pervState) {
    if (pervState.saves !== this.state.saves) {
      axios
        .get(`/auth/getSavedPosts/${this.props.match.params.id}`)
        .then(res => {
          this.setState({
            saves: res.data
          });
        });
    }
  }
  // delete
  deleteSave(id) {
    axios
      .delete(`/auth/deleteSave/${id}`)
      .then(res => {
        this.setState({
          saves: res.data
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="saves-page">
        {this.state.saves.map(e => {
          return (
            <div>
              <img src={e.media} className="pics-saved" />
              <button onClick={() => this.deleteSave(e.saves_id)}>X</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Saves;
