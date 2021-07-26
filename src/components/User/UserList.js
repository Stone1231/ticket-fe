import React from "react";
import { Link, withRouter } from "react-router-dom";
import { rootPath } from "./User";
import UserService from "services/UserService";
import {getRoleName} from "../../helpers/commons";
import BaseComponent from "components/Base";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class UserList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { list: [], keyWord: "" };
    this.getList = this.getList.bind(this);
    this.queryList = this.queryList.bind(this);
    // this.delete = this.delete.bind(this);
    // this.handleInputChange = this.handleInputChange.bind(this);
    // this.getList();
  }

  componentDidMount() {
    (async () => {
      await this.getList();
    })();
  }

  async getList() {
    let res = await UserService.get();
    this.setState((state) => ({
      list: res.data,
    }));
  }

  async queryList() {
    let res = await UserService.getQuery(this.state.keyWord);
    this.setState((state) => ({
      list: res.data,
    }));
  }

  async delete(id) {
    let res = await UserService.delete(id);

    if (this.state.keyWord != "") {
      await this.queryList();
    } else {
      await this.getList();
    }
  }

  create() {
    this.props.history.push(`/${rootPath}/0`);
  }

  render() {
    return (
      <>
        <input
          name="keyWord"
          type="text"
          value={this.state.keyWord}
          onChange={this.handleInputChange}
        />
        <button onClick={this.queryList}>query</button>
        <br />
        <button onClick={() => this.create()}>create</button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>role</TableCell>
              <TableCell>edit</TableCell>
              <TableCell>del</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.list.map((item) => (
              <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{getRoleName(item.role)}</TableCell>
                <TableCell>
                  <Link to={`/${rootPath}/${item.id}`}>read</Link>
                </TableCell>
                <TableCell>
                  <button onClick={() => this.delete(item.id)}>del</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default withRouter(UserList);
