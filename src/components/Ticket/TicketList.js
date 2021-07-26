import React from "react";
import { Link, withRouter } from "react-router-dom";
import { rootPath } from "./Ticket";
import TicketService from "services/TicketService";
import BaseComponent from "components/Base";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {getAdminMenus, getNormalMenus, getTicketTypeName} from "../../helpers/commons";
import {getTicketStatusName} from "../../helpers/commons";

import RoleService from "../../services/RoleService";
import AuthService from "../../services/AuthService";

class TicketList extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {list: [], role: null};
    this.getList = this.getList.bind(this);
    // this.delete = this.delete.bind(this);
    // this.getList();
  }

  componentWillMount() {
    if (!AuthService.checkLogin()) {
      this.props.history.push("/login");
      return;
    }

    const jwt = AuthService.getJWTFromClient();
    this.setState({
      role: jwt.role,
    });
  }

  componentDidMount() {
    (async () => {
      await this.getList();
    })();
  }

  async getList() {
    let res = await TicketService.get();
    this.setState((state) => ({
      list: res.data,
    }));
  }

  async delete(id) {
    let res = await TicketService.delete(id);
    await this.getList();
  }

  create() {
    this.props.history.push(`/${rootPath}/0`);
  }

  render() {
    return (
        <>
          {RoleService.IsQAorPM(this.state.role) && (<button onClick={() => this.create()}>create</button>)}
          <Table className="table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell>summary</TableCell>
                <TableCell>type</TableCell>
                <TableCell>status</TableCell>
                <TableCell>time</TableCell>
                <TableCell>edit</TableCell>
                <TableCell>del</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.list.map((item) => (
                  <TableRow>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.summary}</TableCell>
                    <TableCell>{getTicketTypeName(item.type)}</TableCell>
                    <TableCell>{getTicketStatusName(item.status)}</TableCell>
                    <TableCell>{item.update}</TableCell>
                    <TableCell>
                      <Link to={`/${rootPath}/${item.id}`}>read</Link>
                    </TableCell>
                    <TableCell>
                      {item.type == 1 && RoleService.IsPM(this.state.role) && (<button onClick={() => this.delete(item.id)}>del</button>)}
                      {item.type == 2 && RoleService.IsQA(this.state.role) && (<button onClick={() => this.delete(item.id)}>del</button>)}
                      {item.type == 3 && RoleService.IsQA(this.state.role) && (<button onClick={() => this.delete(item.id)}>del</button>)}
                    </TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
    );
  }
}

export default withRouter(TicketList);
