import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import retry from "retry";

import api from "~/services/api";
import WebRepository from "~/services/WebRepository";
import { createToken, getToken, removeToken } from "~/services/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) {
      userProfile();
    }
  }, [getToken]);

  const operation = retry.operation({
    retries: 5,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
    randomize: true,
  });

  async function setUserToken(token) {
    if (!token) toast.error("Ocorreu um problema ao salvar o token");

    setEmail("");
    setPassword("");
    setLoading(false);
    createToken(token);

    window.location.replace("/");
  }

  async function handleSubmit() {
    if (email && password) {
      try {
        setLoading(true);

        const { data } = await api.post("/api/auth/login", { email, password });
        const { token, error, message } = data;
 
        if (token) {
          setUserToken(token);
        } else {
          if (message) {
            toast.success(message);
          } else {
            toast.error(error);
            setLoading(false);
            setPassword("");
          }
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      }
    } else {
      toast.error("Preencha email e senha para continuar!");
    }
  }

  async function userProfile() {
    operation.attempt(async (currentAttempt) => {
      console.log(`sending request: ${currentAttempt} attempt`);
      try {
        const data = await WebRepository.getProfile();

        if (data) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (ex) {
        console.error("Não foi possivel encontrar o perfil!");
        if (operation.retry(ex)) {
          return;
        }
      }
    });
  }

  function logout() {
    removeToken();
    setUser(null);

    window.location.replace("/login");
  }

  const value = {
    handleSubmit,
    email,
    password,
    user,
    authenticated: !!user,
    setEmail,
    setPassword,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
