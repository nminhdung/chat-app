import axios from "axios";
import { HOST } from "@/utils/constants";

const instance = axios.create({
  baseURL: `http://localhost:7000/api`,
});

instance.defaults.withCredentials = true;

// instance.interceptors.response.use(
//   // Do something with response data
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   function (response) {
//     return response.data;
//   }
// );
export default instance;