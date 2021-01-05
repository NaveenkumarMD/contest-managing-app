import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { MoonLoader} from "react-spinners"
class Adminlogin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            mail:"",
            password:"",
            loading:false
        }
    }
    updatingstate=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    postingadmindata=()=>{
        console.log("fetching adminlogin...")
        this.setState({loading:true})
        fetch("/adminlogin",{
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
            
            if(data.err){
                toast.error(data.err)
            }
            if(data.mail_err){
                toast.error(data.mail_err)
            }

            if(data.admintoken){
                toast.success("Log in successfull")
                localStorage.setItem("admintoken",data.admintoken)
                setTimeout(()=>{
                    this.props.history.push("/Adminresult")
                },2000)
            }
        })
    }
    content=()=>{
        return (
            <div id="home">
                <ToastContainer hideProgressBar/>
                <div className="logincontainer">
                    <div className="card">
                        <h1 id="box-heading">Cryptera</h1>
                        <input type="email" placeholder="E-mail" id="input" name="mail" onChange={this.updatingstate}/>
                        <input type="password" placeholder="Password" name="password" id="input" onChange={this.updatingstate}/>
                        <button type="button" className="btn btn-primary" id="loginbutton" onClick={this.postingadmindata}> Log in</button>
                        <Link to="#">Only for Admins</Link>
                    </div>
                </div>
            </div>
        )

    }
    loadingsign=()=>{
        return(
            <div className="loader">
                <MoonLoader loading  />
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

export default withRouter(Adminlogin)
