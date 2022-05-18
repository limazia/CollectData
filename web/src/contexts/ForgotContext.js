import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

import api from "~/services/api";

export const ForgotContext = createContext({});

function ForgotProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSendEmail() {
    if (email) {
      try {
        setLoading(true);

        toast.success("Instruções enviadas para o seu email");
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

  const value = {
    handleSendEmail,
    email,
    password,
    confirmPassword,
    setEmail,
    setPassword,
    setConfirmPassword,
    loading,
  };

  return <ForgotContext.Provider value={value}>{children}</ForgotContext.Provider>;
}

export default ForgotProvider;
