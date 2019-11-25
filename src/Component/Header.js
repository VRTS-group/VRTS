import React, { Component } from "react";
import "./Header.css";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, logout } from "../redux/userReducer";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      user: [],
      toggleProfile: false,
      toggleLog: false,
    };
    this.dropProfile = React.createRef();
    this.dropLog = React.createRef();
  }  

  toggleProfile = () => {
    let { current } = this.dropProfile;
    this.setState({toggleProfile: true});
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
      this.setState({toggleProfile: false})
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };

  toggleLog = () => {
    let { current } = this.dropLog;
    this.setState({toggleLog: true})
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
      this.setState({toggleLog: false})
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };

  closeToggleProfile = () => {
    if(this.state.toggleProfile === true){
      this.toggleProfile();
      this.setState({toggleProfile: false})
    }
    if(this.state.toggleLog === true){
      this.toggleLog();
      this.setState({toggleLog: false})
    }
  };
  
  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleLogin = () => {
    axios
      .post("/auth/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        this.setState({
          username: "",
          password: ""
        });
        // console.log(this.props);
        this.props.updateUser(res.data);
        axios.get('/auth/user').then(res => {
          this.setState({
            user: res.data
          });
        })
      })
      .catch(err => console.log(this.props));
  };

  handleLogout = () => {
    if(this.state.toggleProfile === true){
      this.toggleProfile();
      this.setState({toggleProfile: false})
    };
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="Header">
        <i
          id="hamburger-icon"
          className="fas fa-bars fa-2x"
          // onClick={this.toggleProfile}
        />
        <Link to='/'>
        <div className="headerTitle">Artistry</div>
        </Link>
        <div className="dropProfile" ref={this.dropProfile}>
          <Link to={`/profile/${this.state.user.user_id}`}> 
            <button onClick={this.closeToggleProfile} className="linksBtn">profile</button>
          </Link>
          <Link to="/settings">
            <button onClick={this.closeToggleProfile} className="linksBtn">settings</button>
          </Link>
          <Link to="/myposts">
            <button onClick={this.closeToggleProfile} className="linksBtn">my Posts</button>
          </Link>
        </div>

        {this.props.user.email ? (
          <div className="loggedInShiz">
            <Link to="/myposts">
              <div className="headerNewPost">
                New Post{" "}
                <button className="headerPlusBtn">
                  +{/* upload image link */}
                </button>
              </div>
            </Link>
            {/* <p>User: {this.props.user.username}</p> */}
            <div className="loggedInPicBox" onClick={this.toggleProfile}>
              {" "}
              <img className="loggedInPic" src={this.props.user.profile_pic} />
              
              
            </div>
            <button className="logoutBtn" onClick={this.handleLogout}>
              Log out
            </button>
          </div>
        ) : (
          <>
            <div onClick={this.toggleLog}>
              <img
                className="headerProfilePic"
                src="https://www.buyorsellnamibia.com.na/wp-content/uploads/2017/03/Default-User.png"
              />
            </div>
            <div className="dropLog" ref={this.dropLog}>
              <div className="loginInputs">
                <input
                  value={this.state.email}
                  name="email"
                  onChange={e => this.handleInput(e)}
                  className="inputBox"
                  placeholder="email"
                />
                <input
                  value={this.state.password}
                  name="password"
                  onChange={e => this.handleInput(e)}
                  className="inputBox"
                  placeholder="password"
                />
              </div>

              <button className="linksBtn" onClick={this.handleLogin}>
                login
              </button>
              <Link to="/register">
                <button className="registerBtn">sign-up</button>
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState)
  const { user } = reduxState.userReducer;
  // console.log(user)
  // console.log(reduxState.userReducer)
  return {
    user
  };
};

const mapDispatchToProps = {
  updateUser,
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
