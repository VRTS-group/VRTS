import React, { Component } from "react";
import './Home.css';
import save from '../photos/save.svg';
import downArrow from '../photos/downArrow.svg';

class Home extends Component {
  constructor(){
    super();

    this.state={
      leftFilter: 'All',
      rightFilter: 'All',
      filter1: 'filter1'
    }

  }

  // trying to have it so when you select an item in 
  // the drop down it will change the value of the filter
  //to the div or h4 that you select, having trouble
  onFilterClick=()=>{
    this.setState({
      rightFilter: this.state.filter1
    })
  }

  render() {
    return(
      <div className="home">
        <div className="home-pic"></div>
        <div className="sub-header">

          <div className="filter-dropdown">
          <img src={downArrow} alt=""/>
          </div>
          <div className="filter-dropdown">
              <span>{this.state.rightFilter}</span>
              <img className='drop-btn' src={downArrow} alt=""/> 
            <div className="dropdown-content">
                <div  onClick={this.onFilterClick}>{this.state.filter1}</div>
                <h4></h4>
                <h4></h4>
            </div>

          </div>


        </div>
        <div className="dashboard">
          <div className="home-posts">
              <img className='drop-btn' src={save} alt="save"/>
          </div>
          <div className="home-posts">
              <img className='drop-btn' src={save} alt="save"/>
          </div>
          
        </div>


      </div> // closing tag for home
    )
  }
}

export default Home;
