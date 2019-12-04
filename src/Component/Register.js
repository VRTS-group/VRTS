import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../redux/userReducer'
import "./Register.css";
class register extends Component{
    constructor(){
        super()
        this.state ={
            email: "",
            password: "",
            username: "",
            bio: "Enter Bio here!",
            contact: "Enter contact info here!",
            profile_pic: "https://cdn.shopify.com/s/files/1/1017/2183/t/19/assets/live-preview-potato.png?3009",
            cover_pic: "https://cdn.shopify.com/s/files/1/1017/2183/t/19/assets/live-preview-potato.png?3009",
            real_name: "Enter your name here! Or don't thats cool too..."
        }
    }
    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = () => {
        axios.post ('/auth/register', {email: this.state.email, password: this.state.password, username: this.state.username, bio: this.state.bio, 
        contact: this.state.contact, profile_pic: this.state.profile_pic, cover_pic: this.state.cover_pic, real_name: this.state.real_name })
        .then (res => {
            this.setState({
                email: '',
                password: ''
            })
            this.props.updateUser(res.data)
            this.props.history.push('/')
        })
    }

    render(){
        return(
            <div className = "register_page">

                <div id='register-container'>
                    <div className='input-fields'>
                        <h3 className='input-captions'> email here!</h3>
                        <input
                        placeholder='email'
                        className='register-inputs'
                        value = {this.state.email}
                        name = "email"
                        onChange = {(e) => this.handleInput(e)}/>
                    </div>
                    <div className='input-fields'>
                        <h3 className='input-captions'> username here!</h3>
                        <input
                        placeholder='username'
                        className='register-inputs'
                        value = {this.state.username}
                        name = "username"
                        onChange = {(e) => this.handleInput(e)}/>
                    </div>
                    <div className='input-fields'>
                        <h3 className='input-captions'> password here!</h3>
                        <input
                        placeholder='password'
                        className='register-inputs'
                        value = {this.state.password}
                        name = "password"
                        onChange = {(e) => this.handleInput(e)}/>
                    </div>

                    <button id='register-btn'>Register</button>

                </div>
            </div>
        )
    }
    
}
{/* onClick={this.handleRegister} */}

const mapDispatchToProps = {
    updateUser
}
export default connect(null, mapDispatchToProps)(register)