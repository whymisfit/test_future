import React, { useState } from "react";
import ChoiceData from "./components/ChoiceData/ChoiceData";
import DataTable from "./components/DataTable/DataTable";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [url, setUrl] = useState("");

  return (
    <Router className="App container">

      <Switch>
        <Route exact path="/">
          <ChoiceData setUrl={setUrl} />
        </Route>
        <Route path="/data">
          <DataTable url={url} setUrl={setUrl}/>
        </Route>
      </Switch>

    </Router>
  );
}

export default App;
