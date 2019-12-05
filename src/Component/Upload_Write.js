import ReactQuill, { Quill } from 'react-quill'; // ES6
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {addWrite} from '../redux/writeReducer'
import {getUser} from '../redux/userReducer'
import "./Upload_Write.css"



import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';


class Upload_Write extends Component {
  constructor(props) {
      super(props);
      this.modules = {
          toolbar: [
            [{ 'header': [false, 1, 2, 3] }],
            [{ 'align': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['link', 'image'],
            [{ 'font': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'color': [] }, { 'background': [] }],
            ['clean']
          ]
      };
      this.formats = [
          'header',
          'align',
          'bold', 'italic', 'underline', 'strike',
          'list', 'bullet',
          'indent', 'indent',
          'link', 'image',
          'font',
          'script', 'script',
          'color', 'background'
      ];
      this.state = {
          comments: '',
          title: '',
          cover_photo: '',
          description: '',
          tags: '',
          views: 0,
          saves: false

      }
      this.rteChange = this.rteChange.bind(this);
      this.potato = ''
      this.porta = "fknewkfjnerkfjnwkejfnwr"
      this.dropDropped = React.createRef(); 
  }

  handleChange = e => {
    const {name, value} = e.target
    this.setState ({
        [name]: value
    })
}
  
  rteChange = (content, delta, source, editor) => {
      this.state.comments = (editor.getHTML()); // rich text
      this.potato = (editor.getText()); // plain text
      console.log("potato", this.potato)
      console.log(editor.getLength()); // number of characters
      
  }

  toggleDropper = () => {
    let { current } = this.dropDropped;
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

  render(props) {
      // console.log("potato2",this.potato)
     
      // console.log(this.props)
      // console.log(this.props.getUser)
      
      // console.log(this.props.store.userReducer.user.user_id)

      return (
        <div className="wBack">
            <div className="uFill">filler</div>
            <button onClick={this.toggleDropper} className="linksBtn"><b>UPLOAD</b></button>
            <div className="droppers">
              <div className="dropDropped" ref={this.dropDropped}>
              <input
          className='cover_photo'
          name='cover_photo'
          value={this.state.cover_photo}
          onChange={e => this.handleChange(e)}
          
          type='text'
          placeholder="Media url"/>
          <input
          className='description'
          name='description'
          value={this.state.description}
          onChange={e => this.handleChange(e)}
          maxLength='1000'
          type='text'
          placeholder="Media url"/>
              <button className="linksBtn"
                    onClick={()=> {
                        this.props.addWrite(this.props.store.userReducer.user.user_id, this.state.comments, this.state.title, this.state.description, this.state.tags, this.state.views, this.state.saves, this.state.cover_photo  ) 
                      this.render()
                      
                    }}    
                ><b>Save</b></button>
              </div>
            </div>
         
          <input
          className='title'
          name='title'
          value={this.state.title}
          onChange={e => this.handleChange(e)}
          maxLength='75'
          type='text'
          placeholder="Title"
          className="WriteTitle"/>
          
          
        <div className ="potato">
          <ReactQuill 
              theme="snow"  
              modules={this.modules}
              formats={this.formats} 
              onChange={this.rteChange}
             
           
              value={this.state.comments || ''}
              />
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

export default connect(mapStateToProps, { addWrite, getUser })(Upload_Write)