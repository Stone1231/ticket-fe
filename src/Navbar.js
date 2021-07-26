import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";
import HomeService from "./services/HomeService";
import AuthService from "./services/AuthService";
import Home from "./components/Home";
import User, {rootPath} from "./components/User/User";
import Ticket from "./components/Ticket/Ticket";
import { Login, LoginAfter } from "./components/Auth";
import Error from "./components/Error";
import "./Navbar.css";
import {getAdminMenus, getNormalMenus} from "./helpers/commons";

function SidebarTitle(props) {
  let style = { color: "blue" };
  if (props.style != null) {
    style = props.style;
  }
  return <div style={style}>{props.children}</div>;
}

class BootstrapNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  componentWillMount() {
    if (!AuthService.checkLogin()){
      this.props.history.push("/login");
      return;
    }

    let jwt = AuthService.getJWTFromClient();
    if(jwt.role==1){
      this.setState({
        data: getAdminMenus(),
      });
    } else{
      this.setState({
        data: getNormalMenus(),
      });
    }
  }

  logout(){
    this.props.history.push("/login");
  }

  render() {
    return (
      <Router>
        <div style={{ display: "flex" }}>
          <div
              class="menu"
            style={{
              padding: "10px",
              width: "16%",
              background: "#f0f0f0",
            }}
          >
            {this.state.data && this.state.data.map((m) => (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{textAlign:"center"}}>
                  <b>{m.name}</b>
                </li>
                {m.routes
                  .filter((m) => m.menu)
                  .map((route, index) => (
                    <li>
                      <Link color="inherit" to={route.path} style={route.style}>
                        {route.title}
                      </Link>
                    </li>
                  ))}
                <li>
                  <Link color="inherit" onClick={()=> this.logout()}>
                    Logout
                  </Link>
                </li>
              </ul>
            ))}
          </div>
          <div style={{ flex: 1, padding: "10px" }}>
            <Switch>
              {this.state.data && this.state.data.map((m) =>
                m.routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={
                      <SidebarTitle style={route.style}>
                        {route.description}
                      </SidebarTitle>
                    }
                  />
                ))
              )}
            </Switch>
            <Switch>
              {this.state.data && this.state.data.map((m) =>
                  <Route
                      exact
                      path="/"
                      render={() => {
                        return (
                            <Redirect to={m.routes[0].path} />
                        )
                      }}
                  />
              )}
              {this.state.data && this.state.data.map((m) =>
                m.routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.main}
                  />
                ))
              )}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default BootstrapNavbar;
