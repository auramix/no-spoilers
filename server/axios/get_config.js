import key from "./api_key.js";
export default {baseURL: 'https://api-football-v1.p.rapidapi.com/v2/', method: 'get', headers: {'X-RapidAPI-Key': key}, timeout: 10000, responseType: 'json'};
