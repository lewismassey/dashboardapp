import React, { Fragment } from "react";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import LinksDash from "./components/Dashboard/LinksDash";
import TodoDash from "./components/Dashboard/TodoDash";
import NotesDash from "./components/Dashboard/NotesDash";
import NewsDash from "./components/Dashboard/NewsDash";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

// components
import CenteredGrid from "./components/CenteredGrid";

function App() {
  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Dashboard}/>
            <Route path="/linkspage" component={LinksDash}/>
            <Route path="/todopage" component={TodoDash}/>
            <Route path="/notespage" component={NotesDash}/>
            <Route path="/news" component={NewsDash}/>
          </Switch>
        </div>
      </Router> 
    </Fragment>
  );
}

export default App;
