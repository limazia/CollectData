import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

//import api from "~/services/api";

export const ForgotContext = createContext({});

function ForgotProvider({ children }) {
  let navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
 
  async function autoLogin(email, password) {
    setEmail("");
    setLoading(false);
 
    navigate("/dashboard");
  }

  async function setEmail(email) {
    setUserEmail(email);
  }

  async function handleSubmit() {
    if (userEmail) {
      try {
        setLoading(true);

        //const email = userEmail;

        toast.success("Instruções enviadas para o seu email");
      } catch (err) {
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
    <ForgotContext.Provider
      value={{
        handleSubmit,
        setEmail,
        userEmail,
        loading,
      }}
    >
      {children}
    </ForgotContext.Provider>
  );
}

export default ForgotProvider;