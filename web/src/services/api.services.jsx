import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000/api/v1",
});

http.interceptors.request.use(function (config) {
  if (localStorage.getItem("token"))
    config.headers.authorization = `BEARER ${localStorage.getItem("token")}`;
  return config;
});

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 401 &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function createUser(data) {
  return http.post("/users", data);
}

export function getProfile() {
  return http.get("/my-account");
}

export function updateUser(data) {
  return http.patch(`/my-account`, data);
}

export function createConfig(data) {
  return http.post("/switch-config", data);
}

export function getConfigs(data) {
  return http.get("/switch-config", data);
}

export async function login(data) {
  const response = await http.post("/login", data);
  localStorage.setItem("token", response.data.accessToken);
  return response;
}

export function logout() {
  localStorage.removeItem("token");
}