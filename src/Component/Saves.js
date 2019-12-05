import React, { Component } from "react";
import axios from "axios";
import "./Saves.css";
import { getUserById } from "../redux/userReducer";
import { getPostByUser } from "../redux/postReducer";
import { Link } from "react-router-dom";


class Saves extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saves: [],
      posts: [],
      user: []
    };
  }
  componentDidMount() {
    axios.get(`/auth/getSavedPosts/${this.props.match.params.id}`).then(res => {
      this.setState({
        saves: res.data
      });
    });

    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        user: res.data
      })
    })
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
      <div className="Saves">
      <div className="SavesContainer">
      <div className="ProfileCover">
            {this.state.user.map(e => {
              console.log(e);
              return (
                <div>
                  <img className="profile_cover_image" src={e.cover_pic}></img>
                </div>
              );
            })}
            <div className="ProfilePic">
              {this.state.user.map(e => {
                console.log(e);
                return (
                  <div>
                    <img
                      className="profile_pic_profile_page"
                      src={e.profile_pic}
                    ></img>
                  </div>
                );
              })}
              {/* <img src = {this} */}
            </div>
          </div>
          <div className="ProfileGenre">
            <Link to={`/profile/${this.props.match.params.id}`}>
            <button className="linksBtn">My Posts</button>
            </Link>
            <div className="ProfileGenreTitle">My Saves</div>
              <button className="linksBtn">My Saves</button>
          </div>
          <div className="ProfileGridContainer">
        {this.state.saves.map(e => {
          return (
            <div>
              <img src={e.media} className="SaveGridItem" />
              <div className="DeleteSaveBox">
              <button onClick={() => this.deleteSave(e.saves_id)}>X</button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      </div>
    );
  }
}

export default Saves;
