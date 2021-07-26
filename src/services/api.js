import axios from "axios";

export const URL = "http://localhost:8000";
export const BASE_URL = `${URL}/api`;

const homeRequest = axios.create({
  baseURL: `${BASE_URL}/index`,
});
const userRequest = axios.create({
  baseURL: `${BASE_URL}/user`,
});
const ticketRequest = axios.create({
  baseURL: `${BASE_URL}/ticket`,
});
const authRequest = axios.create({
  baseURL: `${BASE_URL}/auth`,
});
const errRequest = axios.create({
  baseURL: `${BASE_URL}/error`,
});

export const apiHome = () => homeRequest.get("");
export const apiUserAll = () => userRequest.get("", {
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiUserSingle = (id) => userRequest.get(`/${id}`, {
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiUserDelete = (id) => userRequest.delete(`/${id}`, {
    headers: {
        "Content-Type": "application/json",
    },
});
export const apiUserQuery = (data) =>
  userRequest.post("/query", JSON.stringify(data), {
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  });
export const apiUserPut = (data) => userRequest.put(`/${data.id}`, data, {
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiUserPost = (data) => userRequest.post("", data, {
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});

export const apiTicketAll = () => ticketRequest.get("",{
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiTicketSingle = (id) => ticketRequest.get(`/${id}`,{
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiTicketDelete = (id) => ticketRequest.delete(`/${id}`,{
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiTicketPut = (data) => ticketRequest.put(`/${data.id}`, data,{
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});
export const apiTicketPost = (data) => ticketRequest.post("", data, {
    headers: {
        "Content-Type":  "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
});

export const apiAuthLogin = (data) => authRequest.put(`/login`, data);
export const apiAuthGet = (token) =>
  authRequest.get("", {
    headers: {
      "Content-Type":  "application/json",
      Authorization: "Bearer " + token,
    },
  });

export const apiErr = () => errRequest.get("");
