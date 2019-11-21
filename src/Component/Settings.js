import React, { Component } from "react";
import './Settings.css';

class Settings extends Component {
  render() {
    return <div className="Settings">
      <div className="SettingsContainer">
        <div className="SettingsTitle">Settings</div>
        <div className="SettingsCover">
          <div className="SettingsPic"></div>
        </div>
        <div className="SettingsInfo">
          <h4>Profile Pic</h4>
          <input
          placeholder="Your Profile Pic"/>
          <h4>Cover Photo</h4>
          <input
          placeholder="Your Cover Photo"/>
          <h4>Username</h4>
          <input
          placeholder="Your Username"/>
          <h4>Real Name</h4>
          <input
          placeholder="Your Real Name"/>
          <h4>Bio</h4>
          <textarea
          placeholder="Your Bio"/>
        </div>
        <div className="SettingsBtns">
        <button>Save</button>
        </div>
        {/* //end */}
      </div>
    </div>;
  }
}

export default Settings;
