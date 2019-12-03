import React, { Component } from "react";
import { connect } from "react-redux";
import { getWriteById } from "../redux/writeReducer";
import { addComment, deleteComment } from "../redux/commentReducer";
import axios from "axios";
import "./IndivPost.css";
import Comments from "./Comments";
import {updateUser} from '../redux/userReducer'

class IndivWrite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      write: [],
      media: "",
      title: "",
      description: "",
      views: 0,
      saves: false,
      user: [],
      username: "",
    //   comment: "",
    //   comments: [],
      user_id: 0,
      write_id: 0,
    //   comment_id: 0
    };
  }

  componentDidMount = () => {
    //   console.log(this.props.match.params.id)
    axios.get(`/auth/getWriteById/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        write: res.data,
        user_id: res.data[0].user_id,
        write_id: res.data[0].write_id
      });
    });
    axios.get(`/api/comments/${this.props.match.params.id}`).then(res => {
      this.setState({
        comments: res.data
      });
    });
    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({
        user: res.data
      });
    });
  };

  componentDidUpdate(prevProps) {
    if (this.state.comment !== this.state.comments) {
      this.render();
    }
  }

  handleText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSave = () => {
    this.setState({
      saves: !this.state.saves
    });
    console.log(this.state.saves);
  };

  newComment = () => {
    axios
      .post("/api/comment", {
        comment: this.state.comment,
        user_id: this.state.user_id,
        post_id: this.state.post_id
      })
      .then(res => {
        alert("Comment added");
        this.setState({ comment: "" });
      });
  };

  render() {
    let { comment } = this.state;
    // console.log(this.state.username);
    console.log(this.state)
    console.log(this.state.posts)
    console.log(this.props.redux.userReducer.user.user_id)
    console.log(this.props)
    return (
      <section className="indiv-post">
        <div className="username">
          {this.state.user.map(e => {
            return <h3>Username: {e.username}</h3>;
          })}
        </div>
        <div className="post-section ">
          {this.state.write.map(e => {
            return (
              <div id="post-info">
                <div id="title-box">
                  <h3>{e.title}</h3>
                </div>
                <div id="imagen-button">
                <img src={e.cover_photo} className="post-picture" />
                <button onClick={this.handleSave} className="button-on-top">
                  Save
                </button>
                </div>
                <div className="description">
                  <p>{e.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* <section id="comment-section">
          <textarea
            className="text-box"
            name="comment"
            value={comment}
            placeholder="Add a comment here :)"
            onChange={this.handleText}
          ></textarea>
          <br />
          <button onClick={this.newComment}>Write a comment</button>
          <br />



<div className = "potato">
  {this.state.posts.map(e=> {
    return <div>
  {e.user_id === this.props.redux.userReducer.user.user_id ?(
         
         <div>
         {this.state.comments.map(e => {
           return (
             <div className="comment-area">
               {e.comment}
               <button
                 onClick={() => {
                   deleteComment(e.comment_id);
                 }}
               >
                 Delete
               </button>
             </div>
           );
         })}
       </div>
            
          ) : (
           <div>
              {this.state.comments.map(e => {
                return <div className="comment-area">{e.comment}</div>;
              })}
              
            </div> 





          )}
</div>
        })}
</div>



      
        </section> */}
      </section>
    );




    



  }








}

const mapDispatchToProps = {
  deleteComment, updateUser
}

const mapStateToProps = state => {
  return {
    redux: state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IndivWrite);