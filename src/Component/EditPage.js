import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostById } from "../redux/postReducer";
import "./EditPage.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class EditPage extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      media: "",
      title: "",
      description: "",
      tags: ""
    };
  }

  componentDidMount() {
    // console.log("hitttt");
    // console.log(this.props.id)
    Axios.get(`/auth/getPostById/${this.props.id}`).then(res => {
    //   console.log(res.data);
    //   console.log(res)
      this.setState({
        posts: res.data,
        media: res.data[0].media,
        title: res.data[0].title,
        description: res.data[0].description,
        tags: res.data[0].tags
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.id !== prevProps.id
    ) {
        Axios.get(`/auth/getPostById/${this.props.id}`).then(res => {
            //   console.log(res.data);
            //   console.log(res)
              this.setState({
                posts: res.data,
                media: res.data[0].media,
                title: res.data[0].title,
                description: res.data[0].description,
                tags: res.data[0].tags
              });
            });
    }
    if (
        this.props.store.postReducer.posts !== prevProps.store.postReducer.posts
      ) {
        this.render();
      }
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  saveEdit = () => {
    this.props.toggleEditPopup(this.props.post_id)
    Axios.put(`/auth/editPosts/${this.props.id}`, {
      media: this.state.media,
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags
    }).then (res => {
      alert("Post Updated");
    })
  }

  editDelete = () => {
    this.props.toggleEditPopup(this.props.post_id)
    Axios.delete(`/auth/deletePosts/${this.props.post_id}`).then(res => {
      alert("Post Deleted");
      this.setState({
        posts: [res.data[0]]
      })
    })
  }

  render() {
      // console.log(this.props)
    // console.log(this.state);
    // console.log(this.state.posts);

    return (
      <div className="EditContainer">

        {this.state.posts.map(e => {
          return (
              <div className="EditInfo">
                  <div className="UploadGridItemTwo">
                    <img className="EditPostMedia" src={this.state.media}/>
                  </div>
                  <div className="EditInputs">
                  <div className="EditInputTitles">Media url</div>
                <input
                  name="media"
                  type="text"
                  value={this.state.media}
                  onChange={e => this.handleChange(e)}
                />
                <div className="EditInputTitles">Title</div>
                <input
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.handleChange(e)}
                />
                <div className="EditInputTitles">Description</div>
                <input
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={e => this.handleChange(e)}
                />
                <div className="EditInputTitles">Tags</div>
                <input
                  name="tags"
                  type="text"
                  value={this.state.tags}
                  onChange={e => this.handleChange(e)}
                />
                
                </div>
            <div className="SaveEdit">
              <button className="SaveEditBtn" onClick={this.saveEdit}
              >Save</button>
              <button onClick={this.editDelete} className="SaveEditBtn">Delete</button>
              </div>
            </div>
          );
        })}
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state
  };
}

export default connect(mapStateToProps, { getPostById })(withRouter(EditPage));
