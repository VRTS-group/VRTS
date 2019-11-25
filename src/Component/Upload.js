import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux"
import {updateUser, getUserById} from "../redux/userReducer"
import {getPostByUser} from '../redux/postReducer'
import axios from "axios"
import "./Upload.css";

class Upload extends Component {
    constructor() {
        super();
        this.state = {
            user_id: 7,
            media: "",
            title: "",
            description: "",
            tags: "",
            views: 0,
            saves: false,
            user: [],
      username: '',
      posts: []
        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
          console.log(res.data)
          this.setState({
            user: res.data
          })
        })
        axios.get(`/auth/getPostByUser/${this.props.match.params.id}`).then(res=> {
          console.log(res.data[0].user_id)
          this.setState({
            posts: res.data,
            user_id: res.data[0].user_id,
            post_id: res.data[0].post_id
         
          })
          console.log(this.state)
        })
      }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
handleUpload = () => {
    axios.post ('/auth/addPosts', {user_id: this.state.user_id, media: this.state.media, title: this.state.title,
    description: this.state.description, tags: this.state.tags, views: this.state.views, saves: this.state.saves})
    .then (res => {
        this.setState({
            media: '',
            title: '',
            description: '',
            tags: ''
        })
    })
}

render(){
    console.log(this.props.posts)
    console.log(this.props)
    console.log(this.props.user.user_id)
    console.log(this.state.posts)
    this.state.user_id = this.props.user.user_id
    return(
    <div className = "upload_page">
        {/* put all this inside of a dropdown that says upload  or make it like a plus
        that when clicked will pull up the upload options*/}
        <div className="upload_filler">p</div>
<div> 
    <p>media here</p>
    <input
    value = {this.state.media}
    name = "media"
    onChange = {(e) => this.handleInput(e)}/>
</div>

<div> 
    <p>title here</p>
    <input
    value = {this.state.title}
    name = "title"
    onChange = {(e) => this.handleInput(e)}/>
</div>

<div> 
    <p>description here</p>
    <input
    value = {this.state.description}
    name = "description"
    onChange = {(e) => this.handleInput(e)}/>
</div>

<div> 
    <p>tags here</p>
    <input
    value = {this.state.tags}
    name = "tags"
    onChange = {(e) => this.handleInput(e)}/>
</div>


<button onClick={this.handleUpload}>Upload</button>

<h1>Your posts!</h1>
<div className="ProfileGridContainer">
          <div class="ProfileGrid">
          <div>
              {this.state.posts.map(e=> {
                return(
                  <Link to={`/popup/${e.post_id}`}> <img class="GridItem" src = {e.media}/></Link>
                )
              })}
            </div>
            {/* <div class="GridItem"></div> */}
           
          </div>
          </div>


    </div>
    )
}


}
const mapStateToProps = reduxState => {
    console.log(reduxState)
    const {user} = reduxState.userReducer
    console.log(user)
    console.log(reduxState.userReducer)
    return{
        user
    }
}

const mapDispatchToProps = {
    updateUser, getUserById, getPostByUser
}
export default connect(mapStateToProps, mapDispatchToProps)(Upload)