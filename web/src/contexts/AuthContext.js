import { createContext, useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import retry from "retry";

import api from "~/services/api";
import { createToken, getToken } from "~/services/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
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
    if (!token) {
      toast.error("Ocorreu um problema ao salvar o token");
    }

    createToken(token);
    setLoading(true);

    window.location.replace("/dashboard");
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
      console.log("sending request: ", currentAttempt, " attempt");
      try {
        const { data } = await api.get("/api/me/account");

        if (data) {
          setUser(data);
        }
      } catch (ex) {
        console.error("Não foi possivel encontrar o perfil!");
        if (operation.retry(ex)) {
          return;
        }
      }
    });
  }

  const value = {
    handleSubmit,
    email,
    password,
    user,
    authenticated: !!user,
    setEmail,
    setPassword,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
