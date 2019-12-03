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
      // post_id: this.props.match.params.id,
      // media: this.props.store.postReducer.posts.media,
      // title: this.props.store.postReducer.posts.title,
      // description: this.props.store.postReducer.posts.description,
      // tags: this.props.store.postReducer.posts.tags
    };
  }

  componentDidMount() {
    console.log("hitttt");
    console.log(this.props.id)
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

  render() {
      console.log(this.props)
    // console.log(this.state);
    // console.log(this.state.posts);

    return (
      <div className="EditContainer">

        {this.state.posts.map(e => {
          return (
              <div className="EditInfo">
                  <div className="EditInputs">
                <input
                  name="media"
                  type="text"
                  value={this.state.media}
                  onChange={e => this.handleChange(e)}
                />
                <input
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={e => this.handleChange(e)}
                />
                <input
                  name="description"
                  type="text"
                  value={this.state.description}
                  onChange={e => this.handleChange(e)}
                />
                <input
                  name="tags"
                  type="text"
                  value={this.state.tags}
                  onChange={e => this.handleChange(e)}
                />
                </div>
              </div>
            
          );
        })}
        titleTEst
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
