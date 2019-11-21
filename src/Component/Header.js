import React, { Component } from "react";
import './Header.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer'
import axios from "axios";

class Header extends Component {
  constructor(){
    super()
    this.state = {
      email: "",
      password: ""
    }
    this.dropdown = React.createRef()
  }

  toggleShow = () => {
    // console.log(this.dropdown.current);
    let { current } = this.dropdown;
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };

handleInput = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

handleLogin = () => {
  axios.post('auth/login', {email: this.state.email, password: this.state.password}).then(res=>{
    this.setState({
      username: '',
      password: ''
    })
    console.log(this.props)
    this.props.updateUser(res.data)
  })
  .catch(err => console.log(this.props))
}

handleLogout = () => {
  axios.post('/auth/logout').then(res => {
    this.props.history.push('/')
  })
  .catch(err => console.log(this.props))
}
  
 


  render() {
   
    return <div className="Header">
          <i
          id="hamburger-icon"
          className="fas fa-bars fa-2x"
          onClick={this.toggleShow}
        />
        <div className='dropdown' ref={this.dropdown}>
        <Link to="/profile"><button>profile</button></Link>
        <Link to="/settings"><button>settings</button></Link>
        <Link to="/myposts"><button>my Posts</button></Link>
       
        </div>


        <div className="Title">Artistry
        <img  className = "header-logo"src = "https://cdn.shopify.com/s/files/1/1017/2183/t/19/assets/live-preview-potato.png?3009"/>
        </div>
        
      {this.props.user.email ? (
        <div>
          <button onClick={this.handleLogout} >Log out</button>
          <p>{this.props.user.username}</p>
          {/* <p>pppppppp</p> */}

        </div>
      ): (
        <div> 
          <input
          value = {this.state.email}
          name = "email"
          onChange = {(e) => this.handleInput(e)}
          className = "ret"/>
           <input
          value = {this.state.password}
          name = "password"
          onChange = {(e) => this.handleInput(e)}
          className = "ret"/>

          <button className="loginButton" onClick={this.handleLogin}>login</button>
        </div>
      )
    
    }



        <div>
          <Link to="/myposts"> <button>+
            {/* upload image link */}
          </button>
          </Link>

        <div
          onClick={this.toggleShow}
        ><img className = "header-profile-pic"src = "https://cdn.shopify.com/s/files/1/1017/2183/t/19/assets/live-preview-potato.png?3009"/>

        </div>
        </div>

        
    </div>;
  }
}

const mapStateToProps = reduxState => {
  // console.log(reduxState)
  const {user} = reduxState.userReducer;
  // console.log(user)
  // console.log(reduxState.userReducer)
  return{
    user
  }
}

const mapDispatchToProps = {
  updateUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
