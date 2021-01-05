import './App.css';
import React from'react'

import Navbar from './components/Navbar'
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './components/Screens/Login';
import Adminlogin from './components/Screens/Adminlogin';
import Signup from './components/Screens/Signup';
import Home from './components/Screens/Home';
import Contests from './components/Screens/Contests';
import Allcontests from './components/Screens/Allcontests';
import Adminresult from './components/Screens/Adminresult';

class App extends React.Component{
  constructor(props){
    super()
    
  }

  render(){
    return(
      <div>
        <BrowserRouter>
          <Route exact path="/">
            <Home />
          </Route>         
          <Route exact path="/Login" >
            <Navbar/>
            <Login/>
          </Route>
          
          <Route exact path="/Signup" >
            <Navbar />
            <Signup/>
          </Route>
        
          <Route exact path="/Adminlogin" >
            <Navbar />
            <Adminlogin/>
          </Route>
          <Route exact path="/Contests">
            <Contests/>
          </Route>
          <Route exact path="/Allcontests">
            <Allcontests/>
          </Route>
      
            <Route exact path="/Adminresult">
            <Adminresult />
            </Route>
       
         
            
          
        </BrowserRouter>
          
      </div>
    )
  }
}


export default App;
