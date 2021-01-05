import React from 'react'
import {BrowserRouter, Link,Route,Router,withRouter} from 'react-router-dom'
import { toast,ToastContainer } from 'react-toastify'
import { MoonLoader} from "react-spinners"

class Allcontests extends React.Component {
    constructor(props){
        super(props)
        this.state={
            presentation:false,
            hackathon:false,
            cleanindia:false,
            data:[],
            contest_name:"",
            college_name:"",
            mobile_number:"",
            member_count:""


        }
    }
    componentDidMount(){
        fetch("/getcontests",{
            headers:{
                "Content-Type":"application/json"
            }

        }).then(res=>res.json()).then(data=>{
            this.setState({data:data})
            console.log(this.state.data)
        })
    }
    pptapp=()=>{
        this.setState({presentation:!this.state.presentation})
    }
    postingdata=()=>{
        var usertoken=localStorage.getItem("usertoken")
        usertoken="Bearer "+usertoken
        console.log(usertoken)
        if(!usertoken){
            this.props.history.push("/Login")
        }
        fetch('/details',{
            method:"POST",
            headers:{
                "content-Type":"application/json",
                "Authorization":usertoken
            },
            body:JSON.stringify({
                number:this.state.mobile_number,
                college:this.state.college_name,
                contestname:this.state.contest_name,
                membercount:this.state.member_count,
            })
        }).then(res=>res.json()).then(data=>{
            
            if(data.err){
                toast.error(data.err)
            }
            else{
                toast.success("success")
            }
        })
    }
    logout=()=>{
        localStorage.clear()
        this.props.history.push("/")
    }
  
    render() {
        const options=this.state.data.map(data=>{
            return(
                <option value={data.contestname}>{data.contestname}</option>
            )
        })
        var a=0
        const datum=this.state.data.map((data)=>{
            a+=1
            return(
                <>
                <div id="contestlist" style={{marginTop:"30px"}}>
                    <div><h4>{a}.</h4></div>
                    
                    <div><h4>{data.contestname}</h4></div><br/>
                    
                                  
                </div>
        
                <div style={{textAlign:"left",marginLeft:"20px"}}>{data.description}</div>
                 </>
            )
        })
      
        
        
        
        return(
            <div >
                <ToastContainer hideProgressBar />
                <nav className="navbar fixed-top navbar-dark bg-dark"> 
                    <Link className="navbar-brand" id="navbar-title" to="/">Cryptera</Link>
                    <div className="nav-right">
                            
                            <Link to="Contests" id="text1">My contests</Link>
                            <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                            
                    </div>
                </nav>
                <div id="home">
                <div id="card1" className="card without-border" >
                    <h1>All Contests</h1>
                    {datum}

                    <br/>
                    
                </div>
                <div className="card" style={{maxWidth:"400px"}}>
                    <h1 id="box-heading">Application</h1>
                    <input type="text" placeholder="College" id="input" name="college" onChange={(e)=>{
                        this.setState({college_name:e.target.value})
                    }}/>
                    <input type="text" placeholder="Mobile number" name="number" id="input" onChange={(e)=>{
                        this.setState({mobile_number:e.target.value})
                    }}/>
                    <input type="number" placeholder="Member count" name="number" id="input" onChange={(e)=>{
                        this.setState({member_count:e.target.value})
                    }}/>
                    <select id="input" onChange={(e)=>{
                        this.setState({contest_name:e.target.value})
                    }}>
                        <option value="" disabled selected>Select</option>
                        {options}
                    </select>
                    <button type="button" className="btn btn-primary" id="loginbutton" onClick={this.postingdata} >Proceed</button>
                    

            </div>
            </div>
            </div>
           
        )
        
    }
}

export default withRouter(Allcontests)
