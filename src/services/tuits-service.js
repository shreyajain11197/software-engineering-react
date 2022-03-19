import axios from "axios";

const BASE_URL = "https://a3-software-engineering-node.herokuapp.com";
//const BASE_URL = "http://localhost:4000";

const USERS_API = `${BASE_URL}/users`;
const TUITS_API = `${BASE_URL}/tuits`;


export const findAllTuits = () =>
    axios.get(TUITS_API)
        .then(response => response.data);

export const findTuitById = (tid) =>
    axios.get(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const findTuitByUser = (uid) =>
    axios.get(`${USERS_API}/${uid}/tuits`)
        .then(response => response.data);

export const createTuit = (tuit) =>
    axios.post(`${USERS_API}/tuits`, tuit)
        .then(response => response.data);

export const updateTuit = (tid, tuit) =>
    axios.post(`${TUITS_API}/${tid}`, tuit)
        .then(response => response.data);

export const deleteTuit = (tid) =>
    axios.delete(`${TUITS_API}/${tid}`)
        .then(response => response.data);

export const deleteTuitsByUsername = (postedby) =>
    axios.delete(`${TUITS_API}/postedby/${postedby}/delete`)
        .then(response => response.data);
