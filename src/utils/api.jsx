import axios from 'axios';
import {getDomain} from "./getDomain.jsx";

export const api = axios.create({
    baseURL: getDomain(),
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
});
