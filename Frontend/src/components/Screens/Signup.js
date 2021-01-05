import React, { createRef } from 'react'
import {Link,withRouter} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MoonLoader} from "react-spinners"




class Signup extends React.Component {
    constructor(props){
        super(props)
        this.nameinput=createRef()
        this.mailinput=createRef()
        this.passinput=createRef()
        this.state={
            name:"",
            mail:"",
            password:"",
            loading:false,
            
        }
    }
    componentDidMount(){
        this.nameinput.current.focus()
    }
    postingsignupdata=()=>{
        
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                const passkey= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
        if(this.state.mail.match(mailformat)  && this.state.password.match(passkey)){
            this.setState({loading:true})
            fetch('/signup',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    name:this.state.name,
                    mail:this.state.mail,
                    password:this.state.password
                })
                
            }).then(res=>res.json()).then(data=>{
                this.setState({loading:false})
                
                if(data.message){
                    
                    toast.success("Signup success")
                    this.props.history.push("/Login")
                    
                }
                if(data.err){
                    toast.success("Already present")
                    
                }
            })
        }
        if(!this.state.mail.match(mailformat)){
            toast.warning("Invalid mail")
        }

        if(!this.state.password.match(passkey)){
            toast.warning("Invalid password")
            toast.info("Password should contain a special character")
            toast.info("Password should contain numbers")
            toast.info("Password must contains more than 6 characters")
        }
        
        
    }
    updatingstate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    loadingsign=()=>{
        return(
            <div className="loader">

                <MoonLoader loading  />
            </div>
        )
    }
    content=()=>{
        return (
            <div id="home">
                
                <ToastContainer hideProgressBar/>
                <div className="logincontainer">
                     <div className="card">
                        <h1 id="box-heading">Cryptera</h1>
                        <input type="text" ref={this.nameinput} onKeyPress={(e)=>{
                            if(e.key=="Enter"){
                                this.mailinput.current.focus()
                            }
                        }} placeholder="Name" id="input" name="name"onChange={this.updatingstate}/>
                        <input type="email" onKeyPress={(e)=>{
                            if(e.key=="Enter"){
                                this.passinput.current.focus()
                            }
                        }} ref={this.mailinput} placeholder="E-mail" id="input" name="mail" onChange={this.updatingstate}/>
                        <input type="password" onKeyPress={(e)=>{
                            if(e.key=="Enter"){
                                this.postingsignupdata()
                            }
                        }} ref={this.passinput} placeholder="Password" name="password" id="input" onChange={this.updatingstate}/>
                        <button type="button" className="btn btn-primary" id="loginbutton" onClick={this.postingsignupdata}> Sign up</button>
                        <Link to="/Login">Already a member?</Link>
                    </div>
                </div>
                
            </div>
        )
    }

    render() {
        if(!this.state.loading){
            return this.content()
        }
        else{
            return this.loadingsign()
        }
    }
}

export default withRouter(Signup)
