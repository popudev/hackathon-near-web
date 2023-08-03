import axios from "axios";
import { getToken } from "./app/actions/auth";

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL_SERVER}`,
});

instance.interceptors.request.use(async (request) => {
  const accessToken = await getToken();
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
