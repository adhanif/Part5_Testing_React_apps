import axios from "axios";
const baseUrl = (import.meta.env.VITE_BE_URL || "") + "/api";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((res) => res.data);
};

const create = async (newObj) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObj, config);
  return response.data;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export default { getAll, login, setToken };
