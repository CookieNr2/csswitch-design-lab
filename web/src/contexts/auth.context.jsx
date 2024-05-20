import { createContext, useContext, useEffect, useState } from "react";
import { getProfile, login } from "../services/api.services";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  async function fetchProfile() {
    try {
      const response = await getProfile();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchProfile();
    else setUser(null);
  }, []);

  async function doLogin(data) {
    await login(data);
    fetchProfile();
  }

  function isLoggedIn() {
    return user;
  }

  function doLogout() {
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  const value = {
    user,
    doLogin,
    isLoggedIn,
    doLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
