import React, { Component } from "react";
import "./Profile.css";
import { connect } from "react-redux";
import { getUserById } from "../redux/userReducer";
import { getMusicByUser } from "../redux/musicReducer";
import Axios from "axios";
import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      username: "",
      music: []
    };
    this.dropDroppers = React.createRef();
  }

  componentDidMount = () => {
    // console.log(this.props.match.params.id);
    Axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      // console.log(res.data);
      this.setState({
        user: res.data
      });
    });
    Axios.get(`/auth/getMusicByUser/${this.props.match.params.id}`).then(
      res => {
        //   console.log(res.data[0].user_id)
        if (res.data[0]) {
          this.setState({
            music: res.data,
            user_id: res.data[0].user_id,
            music_id: res.data[0].music_id
          });
        }
        // console.log(this.state);
      }
    );
  };

  toggleDropper = () => {
    let { current } = this.dropDroppers;
    this.setState({ toggleDropper: true });
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
      this.setState({ toggleBurger: false });
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };

  render() {
    // console.log(this.state.music);
    return (
      <div className="Profile">
        <div className="ProfileContainer">
          <div className="profile_filler">p</div>

          <div className="ProfileCover">
            {this.state.user.map(e => {
              // console.log(e);
              return (
                <div>
                  <img className="profile_cover_image" src={e.cover_pic}></img>
                </div>
              );
            })}
            <div className="ProfilePic">
              {this.state.user.map(e => {
                // console.log(e);
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
          <div className="ProfileInfo">
            <div className="ProfileUser">
              {this.state.user.map(e => {
                // console.log(e);
                return (
                  <div>
                    <p>{e.username}</p>
                    <p>{e.real_name}</p>
                    <p>{e.bio}</p>
                    <p>{e.contact}</p>
                  </div>
                );
              })}
            </div>

            {/* <Link to = {`/Upload/${this.props.match.params.id}`}><button className="MyPostsBtn">My Posts</button></Link> */}
          </div>
          <div className="ProfileGenre">
            <button className="ProfileBtn">My Posts</button>
            <div className="ProfileGenreTitle" onClick={this.toggleDropper}>
              MUSIC
            </div>
            <div className="dropper">
              <div className="dropDroppers" ref={this.dropDroppers}>
                <Link to={`/profileW/${this.props.match.params.id}`}>
                  {" "}
                  <p className="header-s">Writing</p>
                </Link>
                <Link to={`/profile/${this.props.match.params.id}`}>
                  {" "}
                  <p className="header-s">Art</p>
                </Link>
              </div>
            </div>
            <button className="ProfileBtn">My Saves</button>
          </div>
          {/* // */}
          <div className="ProfileGridContainer">
            {this.state.music.map(e => {
              return (
                <Link to={`/popup/${e.music_id}`}>
                  {" "}
                  <img class="GridItem" src={e.media} />
                </Link>
              );
            })}
          </div>
          {/* //container end */}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state
  };
}

const mapDispatchToProps = {
  getUserById,
  getMusicByUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
