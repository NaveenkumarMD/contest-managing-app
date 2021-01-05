import React from 'react'
import {BrowserRouter, Link,Route,Router,withRouter} from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div style={{height:"100%"}}>
                <div id="home">
                    <h2 id="navbar-title" style={{fontSize:"30px",margin:"20px",color:"#f1f1f1"}}>cryptera</h2>
                    <div class="w3-display-middle">
                        <h1 class="w3-jumbo w3-animate-top" style={{color:"snow",margin:"10px auto"}}>JOIN SOON</h1>
                        <hr class="w3-border-grey" style={{margin:"auto",width:"40%",height:"20px"}} />
                        <p class="w3-large w3-center" style={{color:"snow"}}>5 days left</p>
                        <div style={{display:"flex",justifyContent:"space-around"}}>
                            <div><button className="btn"  style={{fontFamily: "Domine, serif"}} onClick={()=>{
                                this.props.history.push("/Login")
                            }}>LOG IN</button></div>
                            <div><button className="btn btn-success" style={{fontFamily: "Domine, serif"}} onClick={
                                ()=>{
                                    this.props.history.push("/Signup")
                                }
                            }>GET STARTED</button></div>
                        </div>
                        
                        <br/><br/><br/>
                        <div style={{display:"flex",justifyContent:"space-around" }}>
                            <button className="btn" style={{fontFamily: "Domine, serif"}} onClick={()=>{
                                this.props.history.push("/Adminlogin")
                            }}>ADMIN</button>
                        </div>
                      
                    </div>
                    <br/>
                    <div id="footer" style={{marginTop:"700px",color:"snow"}} className="container-fluid">
                        <hr  style={{color:"snow"}}/>
                        <h4 style={{color:"snow"}}>Contact us</h4>
                        <div style={{marginLeft:"30px"}}><a href="tel:+918870499146"  id="call">Call :+91 8870499146</a></div>
                        <div style={{marginLeft:"30px"}} ><a href="mailto:+918870499146" id="mail">Mail :naveen9715568487@gmail.com</a></div>
                        

                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Home)
