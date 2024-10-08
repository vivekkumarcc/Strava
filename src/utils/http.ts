import axios from "axios";

//would get it form envs
const url = "https://www.strava.com";

const http = axios.create({
  baseURL: url,
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (config.headers)
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;

export const httpWithoutToken = axios.create({
  baseURL: url,
});

export const retirieveAuthToken = (str: string) => {
  return str.split("&")[1].slice(5);
};

export const isAllPermissionAvailable = (str: string) => {
  let permission = false;
  const [_, firstPermission, secondPermission] = str.split(",");
  if (
    firstPermission === "activity:write" &&
    secondPermission === "activity:read_all"
  ) {
    permission = true;
  }
  return permission;
};
