import Axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "production"
    ? "/api/"
    : "http://localhost:3000/api/";

const axios = Axios.create({ withCredentials: true });

// http req handler
export const httpService = {
  get(endpoint: string, data: any) {
    return ajax(endpoint, "GET", data);
  },
  post(endpoint: string, data: any) {
    return ajax(endpoint, "POST", data);
  },
  put(endpoint: string, data: any) {
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint: string, data: any) {
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint: string, method = "GET", data = null) {
  const url = `${BASE_URL}${endpoint}`;
  const params = method === "GET" ? data : null;

  const options = { url, method, data, params };
  try {
    const res = await axios(options);
    return res.data;
  } catch (err: any) {
    console.dir(err);
    throw err;
  }
}
