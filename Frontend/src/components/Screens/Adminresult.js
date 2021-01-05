import React, { createRef } from 'react'
import {BrowserRouter, Link,Route,Router,withRouter} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'

class Adminresult extends React.Component {
    constructor(props){
        super(props)

        this.description_input=React.createRef()
        this.state={
            contest_name:"",
            contest_description:"",
            add:false,
            data:[],
            array:[],
            neededone:"",
            sepdetails:new Array(2)

        }
    }
    addcontests=()=>{
       
        if(!this.state.contest_name || !this.state.contest_description){
            return toast.error("Enter all the fields")
        }
        fetch('getcontests',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                contest_name:this.state.contest_name,
                contest_description:this.state.contest_description
            })
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.err){
                toast.error("Already present")
            }
            else{
                toast.success("success")
                this.setState({add:!this.state.add})
                setTimeout(() => {
                    window.location.reload()
                }, 1000)
            }
            
        })
        
    }
    logout=()=>{
        localStorage.clear()
        this.props.history.push("/Adminlogin")
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
        setTimeout(() => {
            fetch("/contestresults").then(res=>res.json()).then(array=>{
                this.setState({array:array})
                console.log(array)
            })
        }, 200);
        setTimeout(() => {
            var length=this.state.array.length
            console.log("length is"+this.state.array.length)
            for(var j=0;j<this.state.data.length;j++){
                console.log(this.state.data[j])
                var x=0
                for(var i=0;i<length;i++){
                    console.log(this.state.array[i])
                    if(this.state.array[i].contestname==this.state.data[j].contestname){
                        console.log("mass")
                        this.state.sepdetails[j+1]=this.state.array[i]
                        x+=1
                    }
    
             
            }
   }
        },2000);
        setTimeout(() => {
            console.log(this.state.sepdetails)
        },1000);
        
       
    }
    render(){
        var a=0
        const selectgroup=this.state.data.map(data=>{
            
            return(
            <option value={data.contestname}>{data.contestname}</option>
            )
        })
        const datum=this.state.array.map(data=>{
       
            console.log(data)
            
            if(data.contestname==this.state.neededone){
                a+=1
                return (
                
                    <tr>
                        <td>{a}</td>
                        <td>{data.postedby.name}</td>
                        <td>{data.number}</td>
                        <td>{data.postedby.mail}</td>
                        <td>{data.college}</td>
                    </tr>
             
            )
            }
            else{
                return (
                    true                )
            }

        })
        var add=""
        if(this.state.add){
            add=(<div>
                
                    <input  id="input" placeholder="Contestname" onChange={(e)=>{
                        this.setState({contest_name:e.target.value})
                    }} onKeyPress={(e)=>{
                        if(e.key=="Enter"){
                            this.description_input.current.focus()
                        }
                    }} />
                    <input  id="input" placeholder="Description" ref={this.description_input} onChange={(e)=>{
                        this.setState({contest_description:e.target.value})
                    }} onKeyPress={(e)=>{
                        
                        if(e.key=="Enter"){
                            this.addcontests()
                        }
                    }}/><br/>
                    
                    <button className="btn btn-success" onClick={this.addcontests}>Add</button>
              
            </div>)
        }
        
        return(
        <div>
            <ToastContainer />
            <nav className="navbar fixed-top navbar-dark bg-dark"> 
                <Link className="navbar-brand" id="navbar-title" to="/">Cryptera</Link>
                <div className="nav-right">
                            
                   
                    <Link  id="text1">Hi! Admin </Link>
                    <button className="btn btn-danger" onClick={this.logout}>Logout</button>
                </div>
            </nav>
            <div id="home">
            <div className="card" id="card1"  style={{maxWidth:"900px"}} >
        <h1 style={{marginBottom:"50px"}}>Contest details</h1>

        <select className="btn btn-info" placeholder="Select contest" onChange={(e)=>{

            this.setState({neededone:e.target.value})
        }} id="select">
            <option value="" disabled selected>Select contest</option>
            {selectgroup}
        </select>
        
      
        <br/><br/>
        <table id="table-to-xls"> 
            <tr>
                <th>S/No</th>
                <th>Name</th>
                <th>Number</th>
                <th>Mail</th>
                <th>College</th>
            </tr>
            {datum}
            </table>
            <br/><br/>
            <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="btn btn-success"
                    id="download-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> 


        <br/><br/>
        <button  className="btn btn-info" onClick={()=>{
                this.setState({add:!this.state.add})
                
            }} style={{maxWidth:"600px", alignSelf:"center"}}>Add </button>{add}
            </div>
            </div>
            </div>
       
            )
    }
}
export default withRouter(Adminresult) 
