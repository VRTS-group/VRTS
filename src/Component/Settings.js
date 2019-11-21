import React, { Component } from "react";
import "./Settings.css";
import {connect} from 'react-redux';
import {getUserById} from '../redux/userReducer';
import {editUser} from '../redux/userReducer';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user.username,
      profile_pic: this.props.user.profile_pic,
      cover_pic: this.props.user.cover_pic,
      real_name: this.props.user.real_name,
      contact: this.props.user.contact,
      bio: this.props.user.bio
    };
  }

  componentDidMount() {
    this.props.getUserById();
    // this.setState({
    //   bio: this.props.user.bio
    // })
  }

  componentDidUpdate(prevProps){
if (this.props.user !== prevProps.user)
{this.render()}  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    console.log(this.props)
    console.log(this.state.username)
    console.log(this.props.user.username)
    // const bio = this.props.user.bio
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
              // placeholder = {this.props.user.bio}
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

