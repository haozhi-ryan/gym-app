/** This file is the interceptor. It will intercept any requests we send 
 * in the front end. It will then automatically add the correct headers so
 * we don't need to manually write it ourselves everytime.
 * In this case, it will intercept the request, check if we have an access token,
 * if we do, it will automatically add it to the request before it's sent to the 
 * backend.
*/
import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// Default API URL used if no environment variable is provided
const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

// Create an Axios instance for making API requests
const api = axios.create({
  // Set the base URL: use the environment variable if it exists, otherwise use the default apiUrl
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    // Get the access token stored in the browser
    const token = localStorage.getItem(ACCESS_TOKEN);

    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Return the updated request config so the request can continue
    return config;
  },
  (error) => {
    // If something went wrong before sending the request, reject the promise
    return Promise.reject(error);
  }
);

export default api;