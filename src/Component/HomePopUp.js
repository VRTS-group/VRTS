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
      console.log(this.props.match.params.id)
    axios.get(`/auth/getPostById/${this.props.match.params.id}`).then(res => {
        console.log(res.data)
      this.setState({
        posts: res.data
      });
    });
  };

  

  render() {
      console.log(this.state.media.title)
      console.log(this.props)
    return (
      <div className="popUp">
          {this.state.posts.map(e => {
              console.log(e)
              return(
                <div>
                    <h3>{e.title}</h3>
                    <h3>{e.post_id}</h3>
                    <img src={e.media} alt="" />
                    <button></button>
                    <button></button>
                    <div className="description"></div>
                    {/* <input type="text" /> */}
                </div>
              )
          })}
       
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
