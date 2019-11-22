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
      password: ""
    };
    this.dropdown = React.createRef();
    this.dropProfile = React.createRef();
  }

  toggleShow = () => {
    let { current } = this.dropdown;
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };

  toggleProfile = () => {
    let { current } = this.dropProfile;
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
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
        console.log(this.props);
        this.props.updateUser(res.data);
      })
      .catch(err => console.log(this.props));
  };

  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="Header">
        <i
          id="hamburger-icon"
          className="fas fa-bars fa-2x"
          onClick={this.toggleShow}
        />
        <div className="dropdown" ref={this.dropdown}>
          <Link to="/profile">
            <button className="linksBtn">profile</button>
          </Link>
          <Link to="/settings">
            <button className="linksBtn">settings</button>
          </Link>
          <Link to="/myposts">
            <button className="linksBtn">my Posts</button>
          </Link>
        </div>

        <div className="Title">Artistry</div>

        {this.props.user.email ? (
          <div>
            <button onClick={this.handleLogout}>Log out</button>
            <p>{this.props.user.username}</p>
          </div>
        ) : (
          <div onClick={this.toggleProfile}>
            <img
              className="headerProfilePic"
              src="https://www.buyorsellnamibia.com.na/wp-content/uploads/2017/03/Default-User.png"
            />
            <div className="dropProfile" ref={this.dropProfile}>
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
              <Link to='/register'>
              <button className="registerBtn">sign-up</button>
              </Link>
            </div>
          </div>
        )}

        <div>
          <Link to="/myposts">
            {" "}
            <button>+{/* upload image link */}</button>
          </Link>
        </div>
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
