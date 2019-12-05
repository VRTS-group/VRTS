import ReactQuill, { Quill } from 'react-quill'; // ES6
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getWriteById, editWrite} from '../redux/writeReducer'
import {getUser} from '../redux/userReducer'
import './IndivPost_WRite.css'






import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';


class Update extends Component {
  constructor(props) {
      super(props);
      this.modules = {
          toolbar: [
            // [{ 'header': [false, 1, 2, 3] }],
            // [{ 'align': [] }],
            // ['bold', 'italic', 'underline', 'strike'],
            // [{'list': 'ordered'}, {'list': 'bullet'}],
            // [{ 'indent': '-1'}, { 'indent': '+1' }],
            // ['link', 'image'],
            // [{ 'font': [] }],
            // [{ 'script': 'sub'}, { 'script': 'super' }],
            // [{ 'color': [] }, { 'background': [] }],
            // ['clean']
          ]
      };
      this.formats = [
          // 'header',
          // 'align',
          // 'bold', 'italic', 'underline', 'strike',
          // 'list', 'bullet',
          // 'indent', 'indent',
          // 'link', 'image',
          // 'font',
          // 'script', 'script',
          // 'color', 'background'
      ];
      this.state = {
          comments: '',
          title: '',
          cover_photo: '',
          description: '',
          tags: '',
          posts: [],
      
     
      views: 0,
      saves: false,
      user: [],
      username: "",
      
      user_id: 0,
      post_id: 0,
      comment_id: 0
          
      }
      // this.rteChange = this.rteChange.bind(this);
      this.potato = ''    
      this.dropDroppers = React.createRef();  
  }

  componentDidMount(){
console.log(this.props.match.params.id)
    axios.get(`/auth/getWriteById/${this.props.match.params.id}`)
    .then((response) => {
      console.log(response.data)
      
      this.setState({
        title: response.data[0].title,
        comments: response.data[0].media,
        cover_photo: response.data[0].cover_photo,
        description: response.data[0].description,
        tags: response.data[0].tags
      })
    })

    axios.get(`/api/comments/${this.props.match.params.id}`).then(res => {
      if (res.data[0]) {
        this.setState({
          // user_id: res.data[0].user_id,
          // username: res.data[0].username,
          // profile_pic: res.data[0].profile_pic,
          comments: res.data
        });
      }
      console.log(res.data);
    });
    axios.get(`/auth/getUserById/${this.props.match.params.id}`).then(res => {
      this.setState({
        user: res.data
      });
      console.log(res.data);
    });
  }


//   handleChange = e => {
//     const {name, value} = e.target
//     this.setState ({
//         [name]: value
//     })
// }

// handleText = e => {
//   this.setState({
//     [e.target.name]: e.target.value
//   });
// };

handleSave = () => {
  axios
    .post("/auth/addSave", {
      saves: !this.state.saves,
      user_id: this.props.redux.userReducer.user.user_id,
      post_id: this.state.post_id
    })
    .then(res => {
      alert("Saved!");
    })
    .catch(err => console.log(err));
  console.log(this.state.saves);
};

newComment = () => {
  axios
    .post("/api/comment", {
      user_id: this.props.redux.userReducer.user.user_id,
      post_id: this.state.post_id,
      comment: this.state.comment
    })
    .then(res => {
      alert("Comment added");
      this.setState({ comment: "" });
    })
    .catch(err => console.log(err));
};

clear = () => {
  this.setState({
    comment: ""
  });
};

componentDidUpdate(prevState) {
  if (this.state.comment !== prevState.comments) {
    this.render();
  }
}

toggleDropper = () => {
  let { current } = this.dropDroppers;
  this.setState({ toggleDropper: true });
  if (current.classList.contains("write-show-animation")) {
    current.classList.add("write-hide-animation");
    current.classList.remove("write-show-animation");
    this.setState({ toggleBurger: false });
  } else {
    current.classList.add("write-show-animation");
    current.classList.remove("write-hide-animation");
  }
};

  // rteChange = (content, delta, source, editor) => {
  //     this.state.comments = (editor.getHTML()); // rich text
  //     this.potato = (editor.getText()); // plain text
  //     console.log("potato", this.potato)
  //     console.log(editor.getLength()); // number of characters
      
  // }

  render(props) {
    
      // const title = this.state
      // const {Text} = this.state
      // console.log(Text)
      // console.log(title)
      // console.log(this.props.store.userReducer.user.user_id)
      // console.log(this.props.match.params.id)
      // console.log(this.state.title)
      

      return (
        <div className="IndivWrite">
          <div className="IndivWriteContainer">

        
                {/* <p>{this.state.title}</p> */}
             <h3 className="wover"
             >     {this.state.title} </h3> 
             <div className="po"
             onClick={this.toggleDropper}>i</div>
              <div className="droppers">
              <div className="dropDropperss" ref={this.dropDroppers}>
                <p></p>
      <img className="wImage" src={this.state.cover_photo}/>
                
         <div className = "wPopAuthor">  <p>Author:  </p>   <p>{this.state.user_id}</p> </div>  
      <p>{this.state.description}</p>
      {/* <button className="linksBtn"> save</button> */}
<p></p>
              </div>
            </div>


          
        <div className ="potato">
          <ReactQuill 
              theme="snow"  
              modules={this.modules}
              formats={this.formats} 
              // onChange={this.rteChange}
             
           
              value={this.state.comments || ''}
              />
        </div>
       
      
       
        </div>
        </div>
      );
  }
}

function mapStateToProps (state) {
  return {
    store: state
  }
}

export default connect(mapStateToProps, {getWriteById, editWrite, getUser })(Update)