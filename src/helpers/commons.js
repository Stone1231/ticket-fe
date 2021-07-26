import Home from "../components/Home";
import User from "../components/User/User";
import Ticket from "../components/Ticket/Ticket";
import {LoginAfter} from "../components/Auth";
import Error from "../components/Error";
import React from "react";

export function getRoleName(id) {
    let name = "";
    switch (id) {
        case 1:
            name = "Admin";
            break;
        case 2:
            name = "PM";
            break;
        case 3:
            name = "RD";
            break;
        case 4:
            name = "QA";
            break;
    }
    return name;
}

export function getTicketTypeName(id) {
    let name = "";
    switch (id) {
        case 1:
            name = "Feature";
            break;
        case 2:
            name = "Bug";
            break;
        case 3:
            name = "TestCase";
            break;
    }
    return name;
}

export function getTicketStatusName(id) {
    let name = "";
    switch (id) {
        case 0:
            name = "Doing";
            break;
        case 1:
            name = "Resolved";
            break;
    }
    return name;
}

export function getLevelName(id) {
    let name = "";
    switch (id) {
        case 1:
            name = "Critical";
            break;
        case 2:
            name = "High";
            break;
        case 3:
            name = "Medium";
            break;
        case 4:
            name = "Low";
            break;
    }
    return name;
}

export function getNormalMenus() {
    return [
        {
            name: "Ticket tracking system",
            routes: [
                {
                    path: "/ticket",
                    exact: true,
                    title: "Ticket",
                    description: "Ticket",
                    menu: true,
                    main: () => <Ticket />,
                },
            ],
        },
    ]
}

export function getAdminMenus() {
    return [
        {
            name: "Ticket tracking system",
            routes: [
                {
                    path: "/user",
                    exact: true,
                    title: "User",
                    description: "User",
                    menu: true,
                    main: () => <User />,
                },
                {
                    path: "/ticket",
                    exact: true,
                    title: "Ticket",
                    description: "Ticket",
                    menu: true,
                    main: () => <Ticket />,
                },
            ],
        },
    ]
}

export function getHtmlContent(content){
    if (!content) {
        return "";
    }
    const regLeft = /</g;
    const regRight = />/g;
    content = content.replace(regLeft, '&lt;');
    content = content.replace(regRight, '&gt;');
    content = content.replace(/\n/g, '<br/>');
    return content;
}