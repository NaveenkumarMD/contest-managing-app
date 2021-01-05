import React from 'react'
import {BrowserRouter, Link,Route,Router,withRouter} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { MoonLoader} from "react-spinners"

class Contests extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            name:"",
            contests:[]
        }
    }
    componentDidMount=()=>{
        console.log("done")
        var token=localStorage.getItem("usertoken")
        if(!token){
            return this.props.history.push("/Login")
        }
        token="Bearer "+token
        fetch("/mycontests",{
            headers:{
                "Content-Type":"application/json",
                "Authorization":token 
            }
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            console.log(typeof(data))
            this.setState({data:data.data})
            this.setState({name:data.name})
            
           var array=[]
            for(var i=0;i<this.state.data.length;i++){
                array[i]=this.state.data.contestname
            }
            this.setState({contestname:array})
        })
    }
    logout=()=>{
        localStorage.clear()
        this.props.history.push("/")
    }
    resultpage=(contestname)=>{
        alert(contestname)
    }
    render() {
        
        var a=0
        const datum=this.state.data.map((data)=>{
            a=a+1
            
            return(
                <div key={data._id} id="contestlist">
                    
                    <div>{a}.</div>
                    <div>{data.contestname}</div>
                    <div style= {{marginLeft:"auto"}} onClick={()=>this.resultpage(data.contestname)}><button className="btn btn-success">Result</button></div>
                    
                </div>
            )
        })
        return(
            <div>
                <ToastContainer hideProgressBar/>
                <nav className="navbar fixed-top navbar-dark bg-dark"> 
                    <Link className="navbar-brand" id="navbar-title" to="/">Cryptera</Link>
                    <div className="nav-right">
                            
                            <Link to="Allcontests" id="text1">All contests</Link>
                        <Link  id="text1">Hi! {this.state.name}</Link>
                        <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                    </div>
                </nav>
                <div id="home" >
                <div className="card  " id="card1" >
                <h1 style={{marginBottom:"50px"}}>My contests</h1>
                {datum}
                </div>
                </div>
                

            </div>
           
        )
        
    }
}

export default withRouter(Contests)
