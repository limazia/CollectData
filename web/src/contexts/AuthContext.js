import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "~/services/api";
import { createToken } from "~/services/auth";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function setUserToken(token) {
    if (!token) {
      toast.error("Ocorreu um problema ao salvar o token");
    }

    createToken(token);

    setEmail("");
    setPassword("");
    setLoading(false);

    navigate("/dashboard");
  }

  async function setEmail(email) {
    setUserEmail(email);
  }

  async function setPassword(password) {
    setUserPassword(password);
  }

  async function handleSubmit() {
    if (userEmail && userPassword) {
      try {
        setLoading(true);

        const email = userEmail;
        const password = userPassword;

        const { data } = await api.post("/api/auth/login", { email, password });
        const { token, error, message } = data;

        if (token) {
          setUserToken(token);
        } else {
          if (message) {
            toast.success(message);
          } else {
            toast.error(error);
            setPassword("");
          }
        }
      } catch (err) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Preencha email e senha para continuar!");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        handleSubmit,
        setEmail,
        setPassword,
        userEmail,
        userPassword,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
