import ReactQuill, { Quill } from 'react-quill'; // ES6
import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getWriteById, editWrite} from '../redux/writeReducer'
import {getUser} from '../redux/userReducer'






import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';


class Update extends Component {
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
          tags: ''
          
      }
      this.rteChange = this.rteChange.bind(this);
      this.potato = ''      
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

  render(props) {
    
      const title = this.state
      const {Text} = this.state
      // console.log(Text)
      // console.log(title)
      // console.log(this.props.store.userReducer.user.user_id)
      // console.log(this.props.match.params.id)
      

      return (
        <div>
          <div className="uFill">p</div>
                <button
                    onClick={()=> {
                        this.props.editWrite(this.props.match.params.id, this.state.title, this.state.description, this.state.tags, this.state.cover_photo, this.state.comments) 
                      this.render()
                    }}    
                >Save</button>
                <input
          className='title'
          name='title'
          value={this.state.title}
          onChange={e => this.handleChange(e)}
          maxLength='10'
          type='text'/>
          <input
          className='cover_photo'
          name='cover_photo'
          value={this.state.cover_photo}
          onChange={e => this.handleChange(e)}
          maxLength='10'
          type='text'/>
          <input
          className='description'
          name='description'
          value={this.state.description}
          onChange={e => this.handleChange(e)}
          maxLength='10'
          type='text'/>
          <input
          className='tags'
          name='tags'
          value={this.state.tags}
          onChange={e => this.handleChange(e)}
          maxLength='10'
          type='text'/>
         
          
        <div>
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

export default connect(mapStateToProps, {getWriteById, editWrite, getUser })(Update)