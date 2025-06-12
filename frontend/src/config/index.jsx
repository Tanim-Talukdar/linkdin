import axios from "axios";

export const BASE_URL = "http://localhost:5001/api/v1"

export const client = axios.create({baseURL: BASE_URL})