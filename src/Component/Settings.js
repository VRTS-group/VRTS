import React, { Component } from "react";
import "./Settings.css";
import {connect} from 'react-redux';
import {getUserById} from '../redux/userReducer';
import {editUser} from '../redux/userReducer';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profile_pic: "",
      cover_pic: "",
      cover_pic: "",
      real_name: "",
      contact: "",
      bio: "",
    };
  }

  componentDidMount() {
    this.props.getUserById();
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props)
    return (
      <div className="Settings">
        <div className="SettingsContainer">
          <div className="SettingsTitle">Settings</div>
          <div className="SettingsCover">
            <div className="SettingsPic"></div>
          </div>
          <div className="SettingsInfo">
            <h4>Profile Pic</h4>
            <input
              type="text"
              value={this.state.profile_pic}
              onChange={e => this.setState({ profile_pic: e.target.value })}
            />
            <h4>Cover Photo</h4>
            <input
              type="text"
              value={this.state.cover_pic}
              onChange={e => this.setState({ cover_pic: e.target.value })}
            />
            <h4>Username</h4>
            <input
              type="text"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
            <h4>Real Name</h4>
            <input
              type="text"
              value={this.state.real_name}
              onChange={e => this.setState({ real_name: e.target.value })}
            />
            <h4>Bio</h4>
            <textarea
              type="text"
              value={this.state.bio}
              onChange={e => this.setState({ bio: e.target.value })}
            />
          </div>
          <div className="SettingsBtns">
            <button>Save</button>
          </div>
          {/* //end */}
        </div>
      </div>
    );
  }
}


const mapStateToProps = reduxState => {
  const {user} = reduxState.userReducer;
  return {
    user
  };
};

const mapDispatchToProps = {
  getUserById
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings)

