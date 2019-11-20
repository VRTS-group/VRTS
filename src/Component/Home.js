import React, { Component } from "react";
import './Home.css';

class Home extends Component {
  render() {
    return(
      <div className="home">
        <div className="home-pic"></div>
        <div className="sub-header">
          <div className="filter-dropdown"></div>
          <div className="filter-dropdown"></div>
        </div>


      </div> // closing tag for home
    )
  }
}

export default Home;
