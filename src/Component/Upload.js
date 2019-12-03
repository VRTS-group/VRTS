import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, getUserById } from "../redux/userReducer";
import { getPostByUser } from "../redux/postReducer";
import axios from "axios";
import "./Upload.css";

class Upload extends Component {
  constructor() {
    super();
    this.state = {
      user_id: 0,
      media: "",
      title: "",
      description: "",
      tags: "",
      views: 0,
      saves: false,
      user: [],
      username: "",
      posts: []
    };
  }
  componentDidMount = () => {
    console.log(this.props.match.params.id);
    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        user: res.data
      });
    });
    axios.get(`/auth/getPostByUser/${this.props.match.params.id}`).then(res => {
      console.log(res.data);

      this.setState({
        posts: res.data,
        user_id: res.data[0].user_id,
        post_id: res.data[0].post_id
      });
      console.log(this.state);
      console.log(res.data[0].user_id);
    });
  };

  handleInput = e => {
    this.setState({
      media: "",
      title: "",
      description: "",
      tags: ""
    });
  };

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

  toggleEditPopup = () => {
    let { current } = this.EditPopup;

    if (current.classList.contains("showEdit-animation")) {
      current.classList.add("hideEdit-animation");
      current.classList.remove("showEdit-animation");
    } else {
      current.classList.add("showEdit-animation");
      current.classList.remove("hideEdit-animation");
    }
  };

  render() {
    console.log(this.props.posts);
    console.log(this.props);
    console.log(this.props.user.user_id);
    console.log(this.state.posts);
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
            <button className="NewPostUpload">
              <div className="PlusIcon"></div>
              <div className="NewPostTitle">Upload Img</div>
            </button>
            {/* <input 
            value={this.state.media}
            name="media"
            onChange={e => this.handleInput(e)}
          /> */}

            <div className="placeholder">
              <input
                value={this.state.title}
                name="title"
                onChange={e => this.handleInput(e)}
                placeholder="Post Title"
              />
            </div>

            <div className="placeholder">
              <input
                value={this.state.description}
                name="description"
                onChange={e => this.handleInput(e)}
                placeholder="Description"
              />
            </div>

            <div className="placeholder">
              <input
                value={this.state.tags}
                name="tags"
                onChange={e => this.handleInput(e)}
                placeholder="Tags"
              />
            </div>

            <button
              className="placeholder"
              onClick={(this.handleUpload, this.toggleAddPopup)}
            >
              Upload
            </button>
          </div>
          {/* //popup end */}

          <div className="EditPostsTitle">My Posts</div>
          <div className="UploadGridContainer">
            {this.state.posts.map(e => {
              return (
                <Link to={`/popup/${e.post_id}`}>
                  {" "}
                  <img class="UploadGridItem" src={e.media} />
                </Link>
              );
            })}
            <div className="EditBtnBox">
              <button onClick={this.toggleEditPopup} className="EditBtn">
                Edit
              </button>

              {/* //Edit Pop-up */}

              <div className="EditPopup" ref={this.EditPopup}>
                <div className="XContainer">
                  <div className="XContainerOne"></div>
                  <button onClick={this.toggleEditPopup}>X</button>
                </div>
                <div className="placeholder">
                  <input
                    value={this.state.title}
                    name="title"
                    onChange={e => this.handleInput(e)}
                    placeholder="Post Title"
                  />
                </div>

                <div className="placeholder">
                  <input
                    value={this.state.description}
                    name="description"
                    onChange={e => this.handleInput(e)}
                    placeholder="Description"
                  />
                </div>

                <div className="placeholder">
                  <input
                    value={this.state.tags}
                    name="tags"
                    onChange={e => this.handleInput(e)}
                    placeholder="Tags"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //end div */}
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  console.log(reduxState);
  const { user } = reduxState.userReducer;
  console.log(user);
  console.log(reduxState.userReducer);
  return {
    user
  };
};

const mapDispatchToProps = {
  updateUser,
  getUserById,
  getPostByUser
};
export default connect(mapStateToProps, mapDispatchToProps)(Upload);
