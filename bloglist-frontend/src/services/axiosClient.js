import axios from "axios";
const baseUrl = (import.meta.env.VITE_BE_URL || "") + "/api";

let token = null;
const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((res) => res.data);
};

const create = (newObj) => {
  const config = {
    headers: { authorization: token },
  };

  const request = axios.post(`${baseUrl}/blogs`, newObj, config);
  return request.then((response) => response.data);
};

const update = (id, newObj) => {
  const config = {
    headers: { authorization: token },
  };
  const request = axios.put(`${baseUrl}/blogs/${id}`, newObj, config);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const config = {
    headers: { authorization: token },
  };
  const request = axios.delete(`${baseUrl}/blogs/${id}`, config);
  return request.then(() => getAll());
};

export default { getAll, login, setToken, create, update, remove };
