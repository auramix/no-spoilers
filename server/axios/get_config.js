import key from "./api_key.js";
export default {baseURL: 'http://api.football-data.org/v2/competitions/', method: 'get', headers: {'X-Auth-Token': key}, timeout: 5000, responseType: 'json'};
