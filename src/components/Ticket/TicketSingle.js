import React from "react";
import {rootPath} from "./Ticket";
import {withRouter} from "react-router-dom";
import TicketService from "services/TicketService";
import BaseComponent, {SelectList} from "components/Base";

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {getTicketTypeName, getTicketStatusName, getHtmlContent, getLevelName} from "../../helpers/commons";
import AuthService from "../../services/AuthService";
import RoleService from "../../services/RoleService";


class TicketSingle extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            role: null,
            row: {
                // id: null,
                summary: null,
                description: null,
                type: 0,
                status: 0,
                user_id: 0,
                user: {
                    name: null
                }
            }
        };
        this.read = this.read.bind(this);
        if (this.props.id > 0) {
            this.read(this.props.id);
        }
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

    read(id) {
        TicketService.getSingle(id).then((m) => {
            this.setState((state) => ({
                row: m.data,
            }));
        });
    }

    async pmSave() {
        let row = this.state.row;
        row.type = 1;
        await this.save(row, true);
    }

    async qaSave() {
        let row = this.state.row;
        row.type = 2;
        await this.save(row, true);
    }

    async qaTestSave() {
        let row = this.state.row;
        row.type = 3;
        await this.save(row, true);
    }

    async resolve() {
        let row = this.state.row;
        row.status = 1;
        await this.save(row, false);
        this.read(this.props.id);
    }

    async reopen() {
        let row = this.state.row;
        row.status = 0;
        await this.save(row, false);
        this.read(this.props.id);
    }

    async save(row, isBack) {
        // let row = this.state.row;
        row.id = parseInt(this.props.id);
        if (row.id > 0) {
            await TicketService.put(row);
        } else {
            await TicketService.post(row);
        }
        if (isBack) {
            this.props.onBack();
        }
    }

    render() {
        return (
            <>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{width: '10%'}}>id</TableCell>
                            <TableCell>{this.props.id > 0 && this.props.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>summary</TableCell>
                            <TableCell>
                                {((parseInt(this.props.id) == 0 || this.state.row.type == 1) && this.state.row.status == 0 && RoleService.IsPM(this.state.role)) ||
                                (parseInt(this.props.id) == 0 || this.state.row.type == 2 || this.state.row.type == 3) && this.state.row.status == 0 && RoleService.IsQA(this.state.role)
                                    ?
                                    <input
                                        name="row.summary"
                                        type="text"
                                        value={this.state.row.summary}
                                        onChange={this.handleInputChange}
                                    />
                                    :
                                    <>{this.state.row.summary}</>
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>description</TableCell>
                            <TableCell>
                                {((parseInt(this.props.id) == 0 || this.state.row.type == 1) && this.state.row.status == 0 && RoleService.IsPM(this.state.role)) ||
                                (parseInt(this.props.id) == 0 || this.state.row.type == 2 || this.state.row.type == 3) && this.state.row.status == 0 && RoleService.IsQA(this.state.role)
                                    ?
                                    <textarea name="row.description" value={this.state.row.description}
                                              onChange={this.handleInputChange}/>
                                    :
                                    <p dangerouslySetInnerHTML={{
                                        __html: getHtmlContent(this.state.row.description)
                                    }}/>
                                }
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>level</TableCell>
                            <TableCell>
                                {((parseInt(this.props.id) == 0 || this.state.row.type == 1) && this.state.row.status == 0 && RoleService.IsPM(this.state.role)) ||
                                (parseInt(this.props.id) == 0 || this.state.row.type == 2 || this.state.row.type == 3) && this.state.row.status == 0 && RoleService.IsQA(this.state.role)
                                    ?
                                    <SelectList
                                        name="row.level"
                                        list={this.props.levels}
                                        value={this.state.row.level}
                                        onChange={this.handleSelectNumberChange}
                                    />
                                    :
                                    <>{getLevelName(this.state.row.level)}</>
                                }

                            </TableCell>
                        </TableRow>
                        {parseInt(this.props.id) > 0 && (
                            <>
                                <TableRow>
                                    <TableCell>type</TableCell>
                                    <TableCell>
                                        {getTicketTypeName(this.state.row.type)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>status</TableCell>
                                    <TableCell>
                                        {getTicketStatusName(this.state.row.status)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>create user</TableCell>
                                    <TableCell>
                                        {this.state.row.user.name}
                                    </TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                </Table>
                {(parseInt(this.props.id) == 0 || this.state.row.type == 1) && this.state.row.status == 0 && RoleService.IsPM(this.state.role) && (
                    <button onClick={() => this.pmSave()}>Save Feature</button>)}
                {(parseInt(this.props.id) == 0 || this.state.row.type == 2) && this.state.row.status == 0 && RoleService.IsQA(this.state.role) && (
                    <button onClick={() => this.qaSave()}>Save Bug</button>)}
                {(parseInt(this.props.id) == 0 || this.state.row.type == 3) && this.state.row.status == 0 && RoleService.IsQA(this.state.role) && (
                    <button onClick={() => this.qaTestSave()}>Save TestCase</button>)}

                {(parseInt(this.props.id) > 0 && this.state.row.status == 0) && [1,2].includes(this.state.row.type) && RoleService.IsRD(this.state.role) && (
                    <button onClick={() => this.resolve()}>Resolve</button>)}
                {(parseInt(this.props.id) > 0 && this.state.row.status == 0) && this.state.row.type==3 && RoleService.IsQA(this.state.role) && (
                    <button onClick={() => this.resolve()}>Resolve</button>)}

                {this.state.row.status == 1 && this.state.row.type == 1 && RoleService.IsPM(this.state.role) && (
                    <button onClick={() => this.reopen()}>Reopen</button>)}
                {this.state.row.status == 1 && [2,3].includes(this.state.row.type) && RoleService.IsQA(this.state.role) && (
                    <button onClick={() => this.reopen()}>Reopen</button>)}

                <button onClick={() => this.props.onBack()}>back</button>
            </>
        );
    }

}

class TicketSingleDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levels: [
                {
                    value: 1,
                    name: "Critical",
                },
                {
                    value: 2,
                    name: "High",
                },
                {
                    value: 3,
                    name: "Medium",
                },
                {
                    value: 4,
                    name: "Low",
                },
            ]
        };
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
            <TicketSingle
                id={id}
                levels={this.state.levels}
                onBack={this.onBack}
            />
        );
    }
}

export default withRouter(TicketSingleDisplay);
