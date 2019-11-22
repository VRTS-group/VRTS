import React from "react";
import axios from "axios";
import {getPostById} from '../redux/postReducer'
import {connect} from 'react-redux';
import './homePopUp.css'

class HomePopUp extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      description: '',
      media: '',
      showPopup: false
    };
  }
  //gets individual post (kinda)
  componentDidMount = () => {
    //   console.log(this.props.match.params.id)
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
        console.log(res.data)
      this.setState({
        posts: res.data
      });
    });
  };

  onClickDescription = () => {
    let x = document.getElementById('description');
    let y = document.getElementById('popup-comment');
    if (x.style.display === 'none'){
      x.style.display = 'block';
      y.style.display = 'none';
    } else {
      x.style.display = 'none'
    }
  };

  onClickComment = () => {
    let y = document.getElementById('description');
    let x = document.getElementById('popup-comment');
    if (x.style.display === 'none'){
      x.style.display = 'block';
      y.style.display = 'none'
    } else {
      x.style.display = 'none'
    }
  };

  

  render() {
      console.log(this.state.media.title)
      console.log(this.props)
    return (
      <div className='popup-big-box'>
      <div className="popUp">
          {this.state.posts.map(e => {
              console.log(e)
              return(
                <div id='popup-little-box'>
                    <div id='title-box'>
                      <h3>{e.title}</h3>
                      <h3>username</h3>
                    </div>
                    <img src={e.media} alt="" />
                    <div id='popup-button-box'>
                      <button onClick={this.onClickDescription}>description</button>
                      <button onClick={this.onClickComment}>Comment</button>
                    </div>
                    <div style={{display: 'none'}} id="description">
                      <p>hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello </p>
                    </div>
                    <input placeholder='type here' style={{display: 'none' }} id='popup-comment' type="text"/>
                </div>
              )
          })}
       
      </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
    return{
        store: state
    }
}
export default connect(mapStateToProps, {getPostById})(HomePopUp);
