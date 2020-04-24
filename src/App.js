import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch 
} from 'react-router-dom'; 

// import add from './recipe/addRecipe';
import list from './recipe/list';

function App() {
  return (
  
    <Fragment>
      <Router> 
           <div className="App"> 

           <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
  <a className="navbar-brand" href="#">Main Menu</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="collapsibleNavbar">
    <ul className="navbar-nav">
      <li className="nav-item">
              <Link to="/" className="nav-link"> Recipe List</Link> 
      </li>
      <li className="nav-item">
              <Link to="/about" className="nav-link">Add New</Link> 
      </li>
      <li className="nav-item">
      </li>    
    </ul>
  </div>  
</nav>
  
           </div> 
           <div className="container">
             
    <div className="col-sm-12">
           <Switch> 
    <Route exact path='/' component={list}></Route> 
    {/* <Route exact path='/about' component={add}></Route>  */}
    {/* <Route exact path='/contact' component={Contact}></Route>  */}
</Switch>
</div>
</div>
       </Router> 
       

    </Fragment>
   
   );
}

export default App;
