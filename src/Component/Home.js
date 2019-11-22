import React, { Component } from "react";
import './Home.css';
import save from '../photos/save.svg';
import downArrow from '../photos/downArrow.svg';
import {connect} from 'react-redux';
import {getPost} from '../redux/postReducer';
import Axios from "axios";
import HomePopup from './HomePopUp';
import {Link} from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);

    this.state={
      leftFilter: 'All',
      rightFilter: 'All',
      filter1: 'filter1',
      posts: [],
      showPopup: false
    }

  }
  
  //gets all posts
  componentDidMount = () => {
    Axios.get('/auth/getPosts').then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  // togglePopup = () =>{
  //   this.setState({
  //       showPopup: !this.state.showPopup
  //   })
  // }

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
                <h4></h4>
                <h4></h4>
                <h4></h4>
            </div>

          </div>
        </div>
        <div className="dashboard">
          {this.state.posts.map(e => {
            {console.log(e)}
            return(
              <div className="home-posts">
                <Link to={`/popup/${e.post_id}`}><img onClick={this.togglePopup} className='media' src={e.media} alt=""/></Link>
                  
              <img id='save' className='drop-btn' src={save} alt="save"/>

              
            </div>              
            )
          })}
            
          
          
          
        </div>
      </div> // closing tag for home
    )
  }
}

const mapStateToProps = state => {
  return{
    redux: state,
    posts: state.posts
  }
}
const mapDispatchToProps = {
  getPost
} 

export default connect(mapStateToProps, mapDispatchToProps)(Home);
