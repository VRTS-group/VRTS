import React, { Component } from "react";
import { connect } from "react-redux";
import { getMusicById } from "../redux/musicReducer";
import "./EditPage.css";
import Axios from "axios";
import { withRouter } from "react-router-dom";

class EditPage extends Component {
  constructor() {
    super();
    this.state = {
      music: [],
      media: "",
      title: "",
      description: "",
      tags: "",
      cover_photo: ""
    };
  }

  componentDidMount() {
    // console.log("hitttt");
    // console.log(this.props.id)
    Axios.get(`/auth/getMusicById/${this.props.id}`).then(res => {
    //   console.log(res.data);
    //   console.log(res)
    if(res.data[0]){ 
      this.setState({
        music: res.data,
        media: res.data[0].media,
        title: res.data[0].title,
        description: res.data[0].description,
        tags: res.data[0].tags,
        cover_photo: res.data[0].cover_photo
      })};
    });
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.id !== prevProps.id
    ) {
        Axios.get(`/auth/getMusicById/${this.props.id}`).then(res => {
            //   console.log(res.data);
            //   console.log(res)
            
              this.setState({
                  
                music: res.data,
                media: res.data[0].media,
                title: res.data[0].title,
                description: res.data[0].description,
                tags: res.data[0].tags,
                cover_photo: res.data[0].cover_photo
              });
            });
    }
    if (
        this.props.store.musicReducer.music !== prevProps.store.musicReducer.music
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
    this.props.toggleEditPopup(this.props.music_id)
    Axios.put(`/auth/editMusic/${this.props.id}`, {
      media: this.state.media,
      title: this.state.title,
      description: this.state.description,
      tags: this.state.tags,
      cover_photo: this.state.cover_photo
    }).then (res => {
      alert("Music Updated");
    })
  }

  editDelete = () => {
    Axios.delete(`/auth/deleteMusic/${this.props.music_id}`).then(res => {
      alert("Music Deleted");
      this.setState({
        music: [res.data[0]]
      })
    })
  }

  render() {
    //   console.log(this.props)
    // console.log(this.state);
    // console.log(this.state.posts);
console.log(this.state)
    return (
      <div className="EditContainer">

        {this.state.music.map(e => {
          return (
              <div className="EditInfo">
                  <div className="UploadGridItemTwo">
                    <img className="EditPostMedia" src={this.state.cover_photo}/>
                  </div>
                  <div className="EditInputs">
                  <div className="EditInputTitles">Media url</div>
                <input
                  name="media"
                  type="text"
                  value={this.state.media}
                  onChange={e => this.handleChange(e)}
                />
                <div className="EditInputTitles">cover_photo url</div>
                <input
                  name="cover_photo"
                  type="text"
                  value={this.state.cover_photo}
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
              <button onClick={this.editDelete}>Delete</button>
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

export default connect(mapStateToProps, { getMusicById })(withRouter(EditPage));