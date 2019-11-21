import React, { Component } from "react";
import './Header.css'
import {Link} from 'react-router-dom'

class Header extends Component {
  constructor(){
    super()
    this.dropdown = React.createRef()
  }

  toggleShow = () => {
    // console.log(this.dropdown.current);
    let { current } = this.dropdown;
    if (current.classList.contains("show-animation")) {
      current.classList.add("hide-animation");
      current.classList.remove("show-animation");
    } else {
      current.classList.add("show-animation");
      current.classList.remove("hide-animation");
    }
  };


  
 


  render() {
   
    return <div className="Header">
          <i
          id="hamburger-icon"
          className="fas fa-bars fa-2x"
          onClick={this.toggleShow}
        />
        <div className='dropdown' ref={this.dropdown}>
        <Link to="/profile"><button>profile</button></Link>
        <Link to="/settings"><button>settings</button></Link>
        <Link to="/myposts"><button>my Posts</button></Link>
       
        </div>


        <div className="Title">Artistry
        <img  className = "header-logo"src = "https://cdn.shopify.com/s/files/1/1017/2183/t/19/assets/live-preview-potato.png?3009"/>
        </div>
        

        <div>
          <Link to="/myposts"> <button>+
            {/* upload image link */}
          </button>
          </Link>

        <div
          onClick={this.toggleShow}
        ><img className = "header-profile-pic"src = "https://cdn.shopify.com/s/files/1/1017/2183/t/19/assets/live-preview-potato.png?3009"/>

        </div>
        </div>

        
    </div>;
  }
}

export default Header;
