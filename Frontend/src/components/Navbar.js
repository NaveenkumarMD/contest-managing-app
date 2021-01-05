import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {

    content=()=>{
        return (
            <div>
                <nav className="navbar fixed-top navbar-dark bg-dark"> 
                    <Link className="navbar-brand" id="navbar-title" to="/">Cryptera</Link>
                    <div className="nav-right">
                        <Link id="text1" to="/Login">Log in</Link>
                        <Link id="text1" to="/Signup">Sign up</Link>
                        <Link id="text1" to="/Adminlogin">Admin</Link>
                    </div>
                </nav>  
            </div>
        )
    }
    render() {
        return this.content()
    }
}

export default Navbar
