import React, { Component } from "react";
import "./Profile.css";
import {connect} from 'react-redux';
import {getUserById} from '../redux/userReducer';
import {getWriteByUser} from '../redux/writeReducer'
import Axios from "axios";
import {Link} from 'react-router-dom';

class ProfileWrite extends Component {
  constructor(){
    super();
    this.state = {
      user: [],
      username: '',
      write: []
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
    Axios.get(`/auth/getWriteByUser/${this.props.match.params.id}`).then(res=> {
    //   console.log(res.data[0].user_id)
      if(res.data[0]){
      this.setState({
        write: res.data,
        user_id: res.data[0].user_id,
        write_id: res.data[0].write_id
     
      })}
      console.log(this.state)
    })
  }

  render() {
    console.log(this.state.write)
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
            

            <Link to = {`/Upload/${this.props.match.params.id}`}><button className="MyPostsBtn">My Posts</button></Link>
          </div>
          <div className="ProfileGenre">
            <button className="ProfileBtn">My Posts</button>
            <div className="ProfileGenreTitle">WRITE</div>
            <button className="ProfileBtn">My Saves</button>
          </div>
          {/* // */}
          <div className="ProfileGridContainer">
          
              {this.state.write.map(e=> {
                return(
                  <Link to={`/popup/${e.write_id}`}> <img class="GridItem" src = {e.media}/></Link>
                )
              })}

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
  getUserById, getWriteByUser
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileWrite)

