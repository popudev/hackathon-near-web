import axios from "axios";

console.log(`base url: ${process.env.NEXT_PUBLIC_BASEURL_SERVER}`);
const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASEURL_SERVER}`,
});
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// instance.interceptors.request.use((config) => {
//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   if (isServer() && context?.req?.cookies) {
//     config.headers.Cookie = `gid=${context.req.cookies.gid};`;
//   }
//   return config;
// });

export default instance;
