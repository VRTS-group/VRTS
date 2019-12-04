import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, getUserById } from "../redux/userReducer";
import { getMusicByUser } from "../redux/musicReducer";
import EditPage from '../Component/EditPage';
import axios from "axios";
import "./Upload.css";
import noPhoto from '../photos/nophoto.jpg'
import EditMusic from "./EditMusic"

class Upload_Music extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 0,
      media: "",
      title: "",
      description: "",
      cover_photo: "",
      tags: "",
      views: 0,
      saves: false,
      user: [],
      username: "",
      music_id: "",
      edit: false,
      music: [],
      currentEdit: "",

      
    };
    this.AddPopup = React.createRef();
    this.EditPopup = React.createRef();
  }
  componentDidMount = () => {
    // console.log(this.props.match.params.id);
    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
    //   console.log(res.data);
      this.setState({
        user: res.data
      });
    });
    axios.get(`/auth/getMusicByUser/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      if(res.data[0]){ 
      this.setState({
        music: res.data,
        user_id: res.data[0].user_id,
        music_id: res.data[0].music_id
      })};
    //   console.log(this.state);
      
    });
  };

  componentDidUpdate = () => {
    axios.get(`/auth/getMusicByUser/${this.props.match.params.id}`).then(res => {
     
        if(res.data[0]){ 
      this.setState({
        music: res.data,
        user_id: res.data[0].user_id,
        music_id: res.data[0].music_id
      })};

    });
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpload = () => {
    axios
      .post("/auth/addMusic", {
        user_id: this.state.user_id,
        media: this.state.media,
        title: this.state.title,
        description: this.state.description,
        tags: this.state.tags,
        cover_photo: this.state.cover_photo
      })
      .then(res => {
        alert("Post added");
        this.setState({
          user_id: this.state.user_id,
          media: "",
          title: "",
          description: "",
          tags: "",
          cover_photo: ''
        });
        this.toggleAddPopup()
      })
      .catch(err => {
        alert("Problem adding Post to server");
        console.log("Problem adding product to server", err);
      });
    // console.log(this.state);
  };

  // handleEdit = posts => {
  //   console.log(this.state);
  //   let {
  //     media,
  //     title,
  //     description,
  //     tags,
  //   } = posts;
  //   this.setState({
  //     media: media,
  //     title: title,
  //     description: description,
  //     tags: tags,
  //     edit: true
  //   })
  // }

  toggleAddPopup = () => {
    let { current } = this.AddPopup;

    if (current.classList.contains("showPopup-animation")) {
      current.classList.add("hidePopup-animation");
      current.classList.remove("showPopup-animation");
    } else {
      current.classList.add("showPopup-animation");
      current.classList.remove("hidePopup-animation");
    }
  };

  toggleEditPopup = (id) => {
    let { current } = this.EditPopup;
// console.log(id)
this.setState({
  currentEdit: id
})
    if (current.classList.contains("showEdit-animation")) {
     
      current.classList.add("hideEdit-animation");
      current.classList.remove("showEdit-animation");
     
    } else {
      current.classList.add("showEdit-animation");
      current.classList.remove("hideEdit-animation");
    }
  };

  render() {
//   console.log(this.state.user_id)
     

    // console.log(this.props.posts);
    // // console.log(this.props);
    // // console.log(this.props.user.user_id);
    // console.log(this.state.posts);

    this.state.user_id = this.props.user.user_id;
    return (
      <div className="Upload">
        {/* put all this inside of a dropdown that says upload  or make it like a plus
        that when clicked will pull up the upload options*/}

        <div className="UploadContainer">
          <div className="NewPostBox">
            <button onClick={this.toggleAddPopup} className="NewPostAdd">
              <div className="PlusIcon"></div>
              <div className="NewPostTitle">New Post</div>
            </button>
          </div>

          {/* //Popup */}
          <div className="AddPopup" ref={this.AddPopup}>
            <div className="XContainer">
              <div className="XContainerOne"></div>
              <button onClick={this.toggleAddPopup}>X</button>
            </div>
<div className="UploadGridItem">
<img className="EditPostMedia" src={this.state.cover_photo} alt=""/>
</div>
            {/* <input 
            value={this.state.media}
            name="media"
            onChange={e => this.handleInput(e)}
          /> */}
            <div className="placeholder">
              <input 
              type="text"
              value={this.state.media}
              name="media"
              onChange={e => this.handleInput(e)}
              placeholder="Video url"
              />
            </div>
            <div className="placeholder">
              <input 
              type="text"
              value={this.state.cover_photo}
              name="cover_photo"
              onChange={e => this.handleInput(e)}
              placeholder="Photo url"
              />
            </div>
            
            <div className="placeholder">
              <input
                type="text"
                value={this.state.title}
                name="title"
                onChange={e => this.handleInput(e)}
                placeholder="Post Title"
              />
            </div>

            <div className="placeholder">
              <input
                type="text"
                value={this.state.description}
                name="description"
                onChange={e => this.handleInput(e)}
                placeholder="Description"
              />
            </div>

            <div className="placeholder">
              <input
                type="text"
                value={this.state.tags}
                name="tags"
                onChange={e => this.handleInput(e)}
                placeholder="Tags"
              />
            </div>

            <button className="placeholder" onClick={this.handleUpload}>
              Upload
              {/* , this.toggleAddPopup */}
            </button>
          </div>
          {/* //popup end */}
          <div className="EditButtons">
          <Link to={`/upload/${this.state.user_id}`}><button className="ProfileBtn">Art</button></Link>
          <div className="EditPostsTitle">My Posts</div>
          <Link to={`/EditWrite/${this.state.user_id}`}><button className="ProfileBtn"> Writting</button></Link>
          </div>

          <div className="UploadGridContainer" >
            {this.state.music.map(e => {
            
              
              return (
                // <Link to={`/popup/${e.post_id}`}>
                  // {" "}
                  <div>
                  <img class="UploadGridItem" src={e.cover_photo} />

            <div className="EditBtnBox">
              <button onClick={() => this.toggleEditPopup(e.music_id)} className="EditBtn">
                Edit
              </button>
            </div>
                  </div>
                // </Link>
                
              );
              
            })}
            {/* //Edit Pop-up */}


            <div className="EditPopup" ref={this.EditPopup}>
              <div className="XContainer">
                <div className="XContainerOne"></div>
                <button onClick={this.toggleEditPopup}>X</button>
              </div>
              
              <EditMusic id={this.state.currentEdit}  toggleEditPopup={this.toggleEditPopup}  music_id={this.state.currentEdit}/>
              
              {/* <div className="UploadGridItem"></div> */}

              {/* <div className="placeholder">
                <div className="EditInputTitles">Media url</div>
                <input
                  value={this.state.media}
                  name="media"
                  onChange={e => this.handleInput(e)}
              
                />
              </div>
              <div className="placeholder">
              <div className="EditInputTitles">Title</div>
                <input
                  value={this.state.title}
                  name="title"
                  onChange={e => this.handleInput(e)}
                  
                />
              </div>
              <div className="placeholder">
              <div className="EditInputTitles">Description</div>
                <input
                  value={this.state.description}
                  name="description"
                  onChange={e => this.handleInput(e)}
                  
                />
              </div>
              <div className="placeholder">
              <div className="EditInputTitles">Tags</div>
                <input
                  value={this.state.tags}
                  name="tags"
                  onChange={e => this.handleInput(e)}
                  
                />
              </div> */}
            </div>
          </div>
        </div>
        {/* //end div */}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
//   console.log(reduxState);
  const { user } = reduxState.userReducer;
//   console.log(user);
//   console.log(reduxState.userReducer);
  return {
    user
  };
};

const mapDispatchToProps = {
  updateUser,
  getUserById,
  getMusicByUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Upload_Music);
