import React, { Component } from "react";
import "./Profile.css";
import {connect} from 'react-redux';
import {getUserById} from '../redux/userReducer';
import {getPostByUser} from '../redux/postReducer'
import Axios from "axios";

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      user: [],
      username: '',
      posts: []
    }
  }


  componentDidMount = () => {
    console.log(this.props.match.params.id)
    Axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      console.log(res.data)
      this.setState({
        user: res.data
      })
    })
    Axios.get(`/auth/getPostByUser/${this.props.match.params.id}`).then(res=> {
      this.setState({
        posts: res.data
      })
    })
  }

  render() {
    console.log(this.state.posts)
    return (
      <div className="Profile">
       
        <div className="ProfileContainer">
        <div className="profile_filler">p</div>
      
          <div className="ProfileCover">
          {this.state.user.map(e => {
                console.log(e)
                return(
                  <div>
                    <img className = "profile_cover_image"src = {e.cover_pic}></img>
                    </div>
                )
              })}
            <div className="ProfilePic">
            {this.state.user.map(e => {
                console.log(e)
                return(
                  <div>
                    <img className = "profile_pic_profile_page" src = {e.profile_pic}></img>
                    </div>
                )
              })}
              {/* <img src = {this} */}
            </div>
          </div>
          <div className="ProfileInfo">
            <div className="ProfileUser">
            {this.state.user.map(e => {
                console.log(e)
                return(
                  <div>
                    <p>{e.username}</p>
                    <p>{e.real_name}</p>
                    <p>{e.bio}</p>
                    <p>{e.contact}</p>
                    </div>
                )
              })}
             
             
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

function mapStateToProps (state){
return{
  store: state
}
}

const mapDispatchToProps = {
  getUserById, getPostByUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)

