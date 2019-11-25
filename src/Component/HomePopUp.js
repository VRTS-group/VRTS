import React from "react";
import axios from "axios";
import { getPostById } from "../redux/postReducer";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
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
    // console.log(this.props)
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
      // console.log(res.data)
      console.log(res.data[0].user_id)
      console.log(res.data[0].post_id)
      // console.log(res.data[0].title)
      this.setState({
        posts: res.data,
        user_id: res.data[0].user_id,
        post_id: res.data[0].post_id
      });
      console.log(this.state);
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
    console.log(this.props);
    return (
      <div className="popup-big-box">
        <div className="popUp">
          {this.state.posts.map(e => {
            console.log(e)
            console.log(this.state);
            return (
              <div id="popup-little-box">
                <div id="title-box">
                  <h3>{e.title}</h3>
                  <Link to={`/profile/${e.user_id}`}><h3>username</h3></Link>
                </div>
                <Link to={`/indivpost/${e.post_id}`}><img src={e.media} alt={e.title} /></Link>
                <div id="popup-button-box">
                  <button onClick={this.onClickDescription}>description</button>
                  <button onClick={this.onClickComment}>Comment</button>
                </div>
                <div style={{ display: "none" }} id="description">
                  <p>
                    hello hello hello hello hello hello hello hello hello hello
                    hello hello hello hello hello hello hello hello hello hello
                    hello hello{" "}
                  </p>
                </div>
                <input
                  onChange={e => this.handleInput(e)}
                  value={this.state.comment}
                  name="comment"
                  placeholder="type here"
                  style={{ display: "none" }}
                  id="popup-comment"
                  type="text"
                />
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
