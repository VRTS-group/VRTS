import React, { Component } from "react";
import "./Home.css";
import save from "../photos/save.svg";
import downArrow from "../photos/downArrow.svg";
import { connect } from "react-redux";
import { getWrite } from "../redux/writeReducer";
import axios from "axios";
import { Link } from "react-router-dom";
import artistry from "../photos/artistry.png";
import {addComment} from '../redux/commentReducer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftFilter: "All",
      rightFilter: "All",
      filter1: "filter1",
      write: [],
      showPopup: false,
      comment: '',
      write_id: 0,
      user_id: 0
    };
    this.Popup = React.createRef();
    this.dropDropper = React.createRef();
  }

  //gets all posts
  componentDidMount = () => {
    axios.get("/auth/getWrite").then(res => {
      console.log(this.props);
      this.setState({
        write: res.data
      });
      console.log(this.state.write);
    });
  };

   newComment = () => {
  //   axios.post("/api/comment", {
  //       comment: this.state.comment,
  //       user_id: this.state.user_id,
  //       post_id: this.state.post_id
  //     })
      // .then(res => {
        alert("Comment added");
        this.setState({ comment: "" });
      // });
  };


  handlePopupClose = () => {
    this.setState({showPopup: false})
  }

  handlePopup = () => {
    // let x = document.getElementById('post-hover');
    this.setState({showPopup: !this.state.showPopup})
  }


  togglePopUp = () => {
    let x = document.getElementById('post-hover')
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  toggleDropper = () => {
    let { current } = this.dropDropper;
    this.setState({toggleDropper: true});
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
      this.setState({toggleBurger: false})
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };



  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };


  // trying to have it so when you select an item in
  // the drop down it will change the value of the filter
  //to the div or h4 that you select, having trouble
  onFilterClick = () => {
    this.setState({
      rightFilter: this.state.filter1
    });
  };

  render() {
    console.log(this.state.posts)
    return (
      <div className="home">
        <div className="home-container">
          <div className="home-pic">
            <img className="artistry" src={artistry} alt="LogoPic" />
          </div>
          <div className="sub-header">
            <div className="filter-dropdown">
              <img src={downArrow} alt="" />
            </div>
            <div className="filter-dropdown">
              <span>{this.state.rightFilter}</span>
              <img className="drop-btn" src={downArrow} alt="" />
              <div className="dropdown-content">
                <h4></h4>
                <h4></h4>
                <h4></h4>
              </div>
            </div>
          </div>
          <div id='genre-big-box'>
    <div id="ProfileGenreTitle"
    onClick={this.toggleDropper}
    >Writting</div>
          </div>
          <div className="dropper">
          <div className="dropDropper" ref={this.dropDropper}>

<Link to='/'>   <p className="header-s">Art</p></Link>
<Link to='/homeM'>   <p className="header-s">Music</p></Link>

               
                </div>
                </div>


        </div>
        <div className="dashboard">
          {this.state.write.map(e => {
            {
              console.log(e);
              // console.log(this.state.showPopup);
            }
           
            return (
              <div className="home-posts">
                <img
                  onClick={this.handlePopup}
                  className="media"
                  src={e.cover_photo}
                  alt={e.title}
                />
                {this.state.showPopup &&<div id='post-hover'>
                  <div id='x-btn' onClick={this.handlePopupClose} >X</div>
                  <div id='home-popup-content'>
                    <div id='popup-pic'>
                      <Link to={`/indivWrite/${e.write_id}`}>{e.title}<p>{e.description}</p> </Link>
                    </div>
                    <div id='popup-content-info'>
                      <h3>{e.username}</h3>
                      <h3>{e.title}</h3>
                      {/* <h3>{e.post_id}</h3> */}
                    </div>

                <div id="popup-button-box">
                  {/* <button onClick={this.onClickDescription}>Description</button>
                  <button onClick={this.onClickComment}>Comment</button> */}
                </div>
                {/* <div id="description">
                  <p>{e.description}</p> */}
                {/* </div> */}
                <div id="popup-comment" >
                  {/* <input
                  onChange={e => this.handleInput(e)}
                  value={this.state.comment}
                  name="comment"
                  placeholder="type here :)"
                  // style={{ display: "none" }}
                  id="popup-input"
                  type="text-area"
                  /> */}
                  
                {/* <button id='send-btn' onClick={()=>{this.props.addComment(e.user_id, e.write_id, this.state.comment); alert('comment added!'); this.setState({comment: ''})
                this.render(); }}>Send</button> */}
                </div>  

                  </div>
                </div>}
              </div>
            );
          })}
        </div>
      </div> // closing tag for home
    );
  }
}

const mapStateToProps = state => {
  return {
    redux: state,
    write: state.write
  };
};
// const mapDispatchToProps = {
//   getPost,
//   addComment
// };

export default connect(mapStateToProps, {addComment})(Home);