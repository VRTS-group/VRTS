import React, { Component } from "react";
import "./Home.css";
import save from "../photos/save.svg";
import downArrow from "../photos/downArrow.svg";
import { connect } from "react-redux";
import { getWrite } from "../redux/writeReducer";
import Axios from "axios";
import HomePopup from "./HomePopUp";
import { Link } from "react-router-dom";
import artistry from "../photos/artistry.png";

class Home_Write extends Component {
  constructor(props) {
    super(props);

    this.state = {
      leftFilter: "All",
      rightFilter: "All",
      filter1: "filter1",
      write: [],
      showPopup: false
    };
  }

  //gets all posts
  componentDidMount = () => {
    Axios.get("/auth/getWrite").then(res => {
      console.log(this.props);
      this.setState({
        write: res.data
      });
      console.log(this.state.write);
    });
  };

  //trying to conditionally render the popup component
  //but the popup wont show, see lines 90 - 100
  // togglePopUp = () => {
  //   if(this.state.showPopup === false){
  //     this.setState({showPopup: true})
  //   }

  // let x = document.getElementById('popup-div');
  // if(x.style.display === 'none'){
  //   x.style.display = 'block';
  // } else {
  //   x.style.display = 'none'
  // }
  // }

  // trying to have it so when you select an item in
  // the drop down it will change the value of the filter
  //to the div or h4 that you select, having trouble
  onFilterClick = () => {
    this.setState({
      rightFilter: this.state.filter1
    });
  };

  render() {
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
        </div>
        <div className="dashboard">
          {this.state.write.map(e => {
            {
              console.log(e);
              console.log(this.state.showPopup);
            }
            return (
              <div className="home-posts">
                <Link to={`/popup/${e.write_id}`}>
                <img
                  onClick={this.togglePopUp}
                  className="media"
                  src={e.media}
                  alt={e.title}
                />
                </Link>

                <img id="save" className="drop-btn" src={save} alt="save" />
                <div id='popup-div'>{this.state.showPopup && <HomePopup {...this.props} key={this.props.location.params}/>}</div>
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
const mapDispatchToProps = {
  getWrite
};

export default connect(mapStateToProps, mapDispatchToProps)(Home_Write);