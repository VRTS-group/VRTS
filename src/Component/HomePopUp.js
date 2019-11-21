import React from "react";
import axios from "axios";

class HomePopUp extends React.Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      showPopup: false
    };
  }

  componentDidMount = () => {
    axios.get("/auth/getPosts").then(res => {
      this.setState({
        posts: res.data
      });
    });
  };

  

  render() {
    return (
      <div className="popUp">
          {this.state.posts.map(e => {
              return(
                <div>
                    <h3>hey</h3>
                    <h3></h3>
                    <img src="" alt="" />
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
export default HomePopUp;
