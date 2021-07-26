import React from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "components/Auth";
import BootstrapNavbar from "./Navbar";

export const rootPath = "user";

const App = () => (
    <Router>
      <Switch>
        <Route path={"/login"} exact component={Login} />
        <Route path={"/"} exact component={BootstrapNavbar} />
      </Switch>
    </Router>
);

export default App;
