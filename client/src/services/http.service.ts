import Axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/api/" : "//localhost:3000/api/";

const axios = Axios.create({ withCredentials: true });

export const httpService = {
  get(endpoint:string, data:any) {
    console.log(endpoint)
    console.log(data)
    return ajax(endpoint, "GET", data);
  },
  post(endpoint:string, data:any) {
    console.log(endpoint)
    return ajax(endpoint, "POST", data);
  },
  put(endpoint:string, data:any) {
    console.log(endpoint)
    return ajax(endpoint, "PUT", data);
  },
  delete(endpoint:string, data:any) {
    console.log(endpoint)
    return ajax(endpoint, "DELETE", data);
  },
};

async function ajax(endpoint:string, method = "GET", data = null) {
  const url = `${BASE_URL}${endpoint}`;
  const params = method === "GET" ? data : null;

  const options = { url, method, data, params };
  console.log(url)
  try {
    console.log('iki')
    const res = await axios(options);
    console.log(res)
    return res.data;
  } catch (err: any) {
    console.dir(err);
    console.log('sfsdfsdf')
    console.log(err)
    throw err
    }
}
