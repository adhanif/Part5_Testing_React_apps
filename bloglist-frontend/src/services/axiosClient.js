import axios from "axios";
const baseUrl = (import.meta.env.VITE_BE_URL || "") + "/api";

const getAll = () => {
  const request = axios.get(`${baseUrl}/blogs`);
  return request.then((res) => res.data);
};

// const getAll = () => {
//   const request = axios.get(baseUrl);
//   return request.then((response) => response.data);
// };

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials);
  return response.data;
};

export default { getAll, login };
