import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { createToken } from "~/services/auth";
import api from "~/services/api";

export const RegisterContext = createContext({});

function RegisterProvider({ children }) {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
 
  async function autoLogin(email, password) {
    const { data } = await api.post("/api/auth/login", { email, password });
    const { token } = data;

    if (!token) {
      toast.error("Ocorreu um problema ao salvar o token");
    }

    createToken(token);

    setName("");
    setEmail("");
    setPassword("");
    setCPassword("");
    setLoading(false);
 
    navigate("/dashboard");
  }

  async function setName(name) {
    setUserName(name);
  }

  async function setEmail(email) {
    setUserEmail(email);
  }

  async function setPassword(password) {
    setUserPassword(password);
  }

  async function setCPassword(password) {
    setUserConfirmPassword(password);
  }

  async function handleSubmit() {
    if (userName && userEmail && userPassword && userConfirmPassword) {
      try {
        setLoading(true);

        const name = userName;
        const email = userEmail;
        const password = userPassword;
        const confirmPassword = userConfirmPassword;

        const { data } = await api.post("/api/auth/register", {
          name,
          email,
          password,
          confirmPassword,
        });
        const { error, message } = data;

        if (message) {
          toast.success(message);
          autoLogin(email, password);
        } else {
          toast.error(error);
          setPassword("");
          setCPassword("");
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Preencha todos os campos para continuar!");
    }
  }

  return (
    <RegisterContext.Provider
      value={{
        handleSubmit,
        setName,
        setEmail,
        setPassword,
        setCPassword,
        userName,
        userEmail,
        userPassword,
        userConfirmPassword,
        loading,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export default RegisterProvider;