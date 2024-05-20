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
      error.response?.status === 401 &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }

    return Promise.reject(error);
  }
);

export function getParts() {
  return http.get("/switch-parts");
}

export function createUser(data) {
  return http.post("/users", data);
}

export function getProfile() {
  return http.get("/my-account");
}

export function updateUser(data) {
  return http.patch(`/my-account`, data);
}

export function deleteUser(data) {
  return http.delete(`/my-account`, data);
}

export function createConfig(data) {
  return http.post("/switch-config", data);
}

export function updateConfig(id) {
  return http.patch(`/switch-config/${id}`);
}

export function deleteConfig(id) {
  return http.delete(`/switch-config/${id}`);
}

export function getConfigs(data) {
  return http.get("/switch-config", data);
}

export function getPopularConfigs(data) {
  return http.get("/popular-configs", data);
}

export function getAllPopularConfigs(data) {
  return http.get("/all-popular-configs", data);
}

export function createOrder(data) {
  return http.post("/orders", data);
}

export async function login(data) {
  const response = await http.post("/login", data);
  localStorage.setItem("token", response.data.accessToken);
  return response;
}
