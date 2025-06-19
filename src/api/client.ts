import axios from "axios";
const apiKey = process.env.REACT_APP_SOCIALNEWSFEED_KEY;
const client = axios.create({ baseURL: apiKey });
export default client;
