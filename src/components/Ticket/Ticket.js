import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TicketList from "./TicketList";
import TicketSingle from "./TicketSingle";

export const rootPath = "ticket";

const Root = () => (
  <Router>
    <Switch>
      <Route path={"/" + rootPath} exact component={TicketList} />
      <Route path={"/" + rootPath + "/:id"} exact component={TicketSingle} />
    </Switch>
  </Router>
);

export default Root;
