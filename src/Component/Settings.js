import React, { Component } from "react";
import "./Settings.css";
import {connect} from 'react-redux';
import {getUserById} from '../redux/userReducer';
import {editUser} from '../redux/userReducer';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.store.userReducer.user.username,
      profile_pic: this.props.store.userReducer.user.profile_pic,
      cover_pic: this.props.store.userReducer.user.cover_pic,
      real_name: this.props.store.userReducer.user.real_name,
      contact: this.props.store.userReducer.user.contact,
      bio: this.props.store.userReducer.user.bio
    };
  }

  componentDidMount() {
    this.props.getUserById();
    // this.setState({
    //   bio: this.props.user.bio
    // })
  }

  componentDidUpdate(prevProps){
if (this.props.store.userReducer.user !== prevProps.store.userReducer.user)
{this.render()}  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    // console.log(this.props.editUser)
    // console.log(this.state.username)
    console.log(this.props.store.userReducer)
    // console.log(this.props.store.userReducer.user.user_id)
    // const bio = this.props.user.bio
    const {username} = this.state
    return (
      <div className="Settings">
        <div className="SettingsContainer">
          <div className="SettingsTitle">Settings</div>
          <div className="SettingsCover">
            <img className="SettingsCover" src={this.state.cover_pic}/>  
            
              <img className="SettingsPic" src={this.state.profile_pic}/>
            
          </div>

          
          <div className="SettingsInfo">
            <h4>Profile Pic</h4>

            <input
              className='settings-inputs-long'
              type="text"
              value={this.state.profile_pic}
              onChange={e => this.setState({ profile_pic: e.target.value })}
            />
            <h4>Cover Photo</h4>
            <input
              className='settings-inputs-long'
              type="text"
              value={this.state.cover_pic}
              onChange={e => this.setState({ cover_pic: e.target.value })}
            />
            <h4>Username</h4>
            <input
              className='settings-inputs'
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleInput(e)}
            />
            <h4>Real Name</h4>
            <input
              className='settings-inputs'
              type="text"
              value={this.state.real_name}
              onChange={e => this.setState({ real_name: e.target.value })}
            />
            <h4>Bio</h4>
            <textarea
              className='settings-inputs-long'
              type="text"
              value={this.state.bio}
              // placeholder = {this.props.user.bio}
              onChange={e => this.setState({ bio: e.target.value })}
            />
            <h4>Contact</h4>
            <textarea
              className='settings-inputs-long'
              type="text"
              value={this.state.contact}
              // placeholder = {this.props.user.bio}
              onChange={e => this.setState({ contact: e.target.value })}
            />
          <div className="SettingsBtns">
            <button className="SaveBtn" onClick={() => {
              this.props.editUser(this.props.store.userReducer.user.user_id, username, this.state.profile_pic, this.state.cover_pic,
                this.state.real_name, this.state.contact, this.state.bio)
              this.render()
            }}>Save</button>
          </div>
          </div>
          {/* //end */}
        </div>
      </div>
    );
  }
}


function mapStateToProps (state){
  return {
    store: state
  }
}

// const mapDispatchToProps = {
//   getUserById
// };
export default connect(
  mapStateToProps, {getUserById, editUser}
  
)(Settings)

