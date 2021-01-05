import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { MoonLoader} from "react-spinners"
import Navbar from '../Navbar'

class Login extends React.Component {
    constructor(props){
        super(props)
        this.textinput=React.createRef()
        this.emailinput=React.createRef()
        this.state={

            mail:"",
            password:"",
            loading:false
        }
    }
    componentDidMount(){
        this.emailinput.current.focus()
    }
    updatingstate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    postinglogindata=()=>{
               
        fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                mail:this.state.mail,
                password:this.state.password
            })
        }).then(res=>res.json()).then(data=>{
            this.setState({loading:false})
            console.log("running")
            toast.error(data)
            if(data.err){
                toast.error("Enter all the fields")
            }
            if(data.mail_error){
                toast.error("Enter correct credentials")
            }
            if(data.pass_error){
                toast.warning("Password is incorrect")
            }
            if(data.token){
                
                localStorage.setItem("usertoken",data.token)
                toast.success("Login success")
                setTimeout(()=>{
                    this.props.history.push("/Contests")
                },2000)
                
                
            }
        })
      
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
                        <input type="email" onKeyPress={(e)=>{
                            
                            if(e.key=="Enter"){
                                console.log("working")
                                this.textinput.current.focus()
                            }
                        }} placeholder="E-mail" ref={this.emailinput} id="input"  name="mail" onChange={this.updatingstate}/>
                        <input type="password" ref={this.textinput} onKeyPress={(e)=>{
                            if(e.key=="Enter"){
                                
                                this.postinglogindata()
                            }
                        }} placeholder="Password" name="password" id="input" onChange={this.updatingstate}/>
                        <button type="button"  className="btn btn-primary" id="loginbutton" onClick={this.postinglogindata} > Log in</button>
                        <Link to="/Signup" >new to cryptera?</Link>

                    </div>
                </div>
            </div>
        )
        
    }
    render() {
        if(this.state.loading){
            return this.loadingsign()
        }
        else{
            return this.content()
        }
        
    }
}

export default withRouter(Login)
