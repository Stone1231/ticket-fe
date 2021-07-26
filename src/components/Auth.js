import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "services/AuthService";
import "./Auth.css";

export function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    AuthService.logout();
  }, []);

  function changeUserName(e) {
    setUserName(e.target.value);
  }
  function changePassword(e) {
    setPassword(e.target.value);
  }
  async function login() {
    await AuthService.login({
      username: userName,
      pwd: password,
    }).then(() => {
      history.push("/");
    });
  }

  return (
      <div className="main">
        <p className="sign" align="center">Sign in</p>
          <input className="un " type="text" align="center" placeholder="Username" onChange={changeUserName} />
          <input className="pass" type="password" align="center" placeholder="Password" onChange={changePassword} />
          <a className="submit" align="center" onClick={login}>Sign in</a>
      </div>
  );
}

export function LoginAfter() {
  const [NameServer, setNameServer] = useState("");
  const [RoleServer, setRoleServer] = useState("");
  const [NameClient, setNameClient] = useState("");
  const [RoleClient, setRoleClient] = useState("");
  const [IdClient, setIdClient] = useState("");
  const [TokenClient, setTokenClient] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!AuthService.checkLogin()) {
      history.push("/login");
      return;
    }

    (async () => {
      let auth = await AuthService.getJWTFromServer();
      setNameServer(auth.data.username);
      setRoleServer(auth.data.role);
    })();

    let local = AuthService.getJWTFromClient();
    setNameClient(local.username);
    setRoleClient(local.role);
    setIdClient(local.id);

    let token = AuthService.getLocalToken();
    setTokenClient(token);
  });

  return (
    <table>
      <tr>
        <td>Name Server:</td>
        <td>{NameServer} </td>
      </tr>
      <tr>
        <td>Role Server:</td>
        <td>{RoleServer}</td>
      </tr>
      <tr>
        <td>Name Client:</td>
        <td>{NameClient} </td>
      </tr>
      <tr>
        <td>Role Client:</td>
        <td>{RoleClient}</td>
      </tr>
      <tr>
        <td>Id Client:</td>
        <td>{IdClient}</td>
      </tr>
      <tr>
        <td>token Client:</td>
        <td>{TokenClient}</td>
      </tr>
    </table>
  );
}
