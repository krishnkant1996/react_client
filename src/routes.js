import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import {createBrowserHistory } from "history";
import signIn from "./component/SignIn";
import Home from "./component/Home";
export const history = createBrowserHistory();

// Instead of BrowserRouter, we use the regular router,
// but we pass in a customer history to it.
const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <Route exact path="/signIn" component={signIn} />

              <Route path="/react_client" component={Home} />
        
      </Switch>
    </div>
  </Router>
);

export default AppRouter;