import React, { Component } from "react"
import { Switch, Route, Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AddJournal from "./components/add-journal.component"
import Journal from "./components/journal.component"
import JournalsList from "./components/journals-list.component"

class App extends Component {
   render() {
      //navbar and also switch with several roots
      //root points to react component
      return (
         <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
               <a href="/journals" className="navbar-brand">
                  The Surf Journal
               </a>
               <div className="navbar-nav mr-auto">
                  <li className="nav-item">
                     <Link to={"/journals"} className="nav-link">
                        Log
                     </Link>
                  </li>
                  <li className="nav-item">
                     <Link to={"/add"} className="nav-link">
                        Add
                     </Link>
                  </li>
               </div>
            </nav>

            <div className="container mt-3">
               <Switch>
                  <Route exact path={["/", "/journals"]} component={JournalsList} />
                  <Route exact path="/add" component={AddJournal} />
                  <Route path="/journals/:id" component={Journal} />
               </Switch>
            </div>
         </div>
      )
   }
}

export default App
