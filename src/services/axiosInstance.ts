import axios from 'axios';

const baseURL = process.env.REACT_APP_GITHUB_BASE_URL;

let axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

const gitHubToken = '2112a29907940d0a6d926abb79b7dabc390e970c';
axiosInstance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json';
  // config.headers['authorization'] = gitHubToken;
  return config;
});

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response && error.response.status === 401) {
      console.log(error.response);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
