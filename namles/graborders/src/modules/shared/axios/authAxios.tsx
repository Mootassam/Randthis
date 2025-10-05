import axios from "axios";
import authToken from "src/modules/auth/authToken";

const authAxios = axios.create({
  baseURL: 'http://localhost:8080/api/',
  // baseURL: 'http://159.198.77.158:8080/api/',
});

authAxios.interceptors.request.use(async function (options) {
  const token = authToken.get();
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  return options;
});

export default authAxios;
