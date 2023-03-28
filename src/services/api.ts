import axios from "axios";

export const API = axios.create({
    baseURL: "https://gateway.marvel.com"
});