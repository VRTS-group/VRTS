import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <div className="Profile">
        <div className="ProfileContainer">
          <div className="ProfileCover">
            <div className="ProfilePic"></div>
          </div>
          <div className="ProfileInfo">
            <div className="ProfileUser">
              Username
              <br />
              Real Name
              <br />
              Bio
            </div>

            <button className="MyPostsBtn">My Posts</button>
          </div>
          <div className="ProfileGenre">
            <button className="ProfileBtn">My Posts</button>
            <div className="ProfileGenreTitle">ART</div>
            <button className="ProfileBtn">My Saves</button>
          </div>
          <div className="ProfileGridContainer">
          <div class="ProfileGrid">
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
            <div class="GridItem"></div>
          </div>
          </div>
          {/* //container end */}
        </div>
      </div>
    );
  }
}

export default Profile;
