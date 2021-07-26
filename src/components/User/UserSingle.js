import React from "react";
import { rootPath } from "./User";
import { withRouter } from "react-router-dom";
import UserService from "services/UserService";
import BaseComponent from "components/Base";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function SelectList(props) {
  return (
    <select name={props.name} value={props.value} onChange={props.onChange}>
      <option value="">請選擇</option>
      {props.list &&
        props.list.map((item) => (
          <option value={item.value}>{item.name}</option>
        ))}
    </select>
  );
}

class UserSingle extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      row: {
        // id: null,
        name: null,
        role: null,
      }
    };
    this.read = this.read.bind(this);
    if (this.props.id > 0) {
      this.read(this.props.id);
    }
  }
  // componentDidMount() {
  //   if (this.props.id > 0) {
  //     this.read(this.props.id);
  //   }
  // }

  read(id) {
    UserService.getSingle(id).then((m) => {
      this.setState((state) => ({
        row: m.data,
      }));
    });
  }

  async save() {
    let row = this.state.row;
    row.id = parseInt(this.props.id);
    if (row.id > 0) {
      await UserService.put(row);
    } else {
      await UserService.post(row);
    }
    this.props.onBack();
  }

  render() {
    return (
      <>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{ width: '10%' }}>id</TableCell>
              <TableCell>{this.props.id > 0 && this.props.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell>
                <input
                  name="row.name"
                  type="text"
                  value={this.state.row.name}
                  onChange={this.handleInputChange}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>role</TableCell>
              <TableCell>
                <SelectList
                  name="row.role"
                  list={this.props.roles}
                  value={this.state.row.role}
                  onChange={this.handleSelectNumberChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <button onClick={() => this.save()}>save</button>
        <button onClick={() => this.props.onBack()}>back</button>
      </>
    );
  }
}

class UserSingleDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roles: [
        {
          value: 1,
          name: "admin",
        },
        {
          value: 2,
          name: "pm",
        },
        {
          value: 3,
          name: "qa",
        },
        {
          value: 4,
          name: "rd",
        },
      ]};
    this.onBack = this.onBack.bind(this);
  }

  onBack() {
    this.props.history.push("/" + rootPath);
    // this.props.history.goBack();
    //return <Redirect to={"/" + rootPath} />;
    // return <Redirect to="/user" />;
  }

  render() {
    const id = this.props.match.params.id;
    return (
      <UserSingle
        id={id}
        roles={this.state.roles}
        onBack={this.onBack}
      />
    );
  }
}

export default withRouter(UserSingleDisplay);
