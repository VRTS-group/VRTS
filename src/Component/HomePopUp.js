import React from "react";
import axios from "axios";
import { getPostById } from "../redux/postReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./homePopUp.css";

class HomePopUp extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      ProfileLink: 0,
      showPopup: false,
      user_id: 0,
      post_id: 0,
      comment: ""
    };
  }
  //gets individual post
  componentDidMount = () => {
    // console.log(this.props.match.params)
    console.log(this.props)
    this.setState({post_id: this.props.match.params.id})
    // console.log(this.state.post_id)
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
      console.log(res.data)
      console.log(res.data[0].user_id);
      console.log(res.data[0].post_id);
      // console.log(res.data[0].title)
      this.setState({
        posts: res.data,
        user_id: res.data[0].user_id,
        // post_id: res.data[0].post_id
      });
      console.log(this.props);
    });
  };

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClickDescription = () => {
    let x = document.getElementById("description");
    let y = document.getElementById("popup-comment");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
    }
  };

  onClickComment = () => {
    let y = document.getElementById("description");
    let x = document.getElementById("popup-comment");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.display = "none";
    } else {
      x.style.display = "none";
    }
  };

  render() {
    console.log(this.state.posts);
    return (
      <div className="popup-big-box">
        <div className="popUp">
          {this.state.posts.map(e => {
            console.log(e);
            console.log(this.state);
            return (
              <div id="popup-little-box">
                <div id="title-box">
                <Link to={`/profile/${e.user_id}`}>
                  <h3>{e.username}</h3>
                  </Link>
                  <h3>{e.title}</h3>
                  
                </div>
                <Link to={`/indivpost/${e.post_id}`}>
                  <div id="image-box">
                    <img src={e.media} alt={e.title} />
                  </div>
                </Link>
                <div id="popup-button-box">
                  <button onClick={this.onClickDescription}>Description</button>
                  <button onClick={this.onClickComment}>Comment</button>
                </div>
                <div style={{ display: "none" }} id="description">
                  <p>{e.description}</p>
                </div>
                <div id="popup-comment" style={{ display: "none" }}>
                <input
                  onChange={e => this.handleInput(e)}
                  value={this.state.comment}
                  name="comment"
                  placeholder="type here"
                  // style={{ display: "none" }}
                  id="popup-input"
                  type="text"
                />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    store: state
  };
}
export default connect(mapStateToProps, { getPostById })(HomePopUp);
