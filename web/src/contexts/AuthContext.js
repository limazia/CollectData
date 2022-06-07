import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import retry from "retry";

import api from "~/services/api";
import WebRepository from "~/services/WebRepository";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { "collect.token": token } = parseCookies();

    if (token) {
      userProfile();
    }
  }, []);

  const operation = retry.operation({
    retries: 5,
    factor: 3,
    minTimeout: 1 * 1000,
    maxTimeout: 60 * 1000,
    randomize: true,
  });

  async function handleSubmit() {
    if (email && password) {
      setLoading(true);

      try {
        const { data } = await api.post("/api/auth/login", { email, password });
        const { token, refreshToken, error, message } = data;

        if (token) {
          setEmail("");
          setPassword("");
          setLoading(false);

          setCookie(undefined, "collect.token", token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
          });

          setCookie(undefined, "collect.refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 14, // 14 days
            path: "/",
          });
 
          api.defaults.headers["Authorization"] = `Bearer ${token}`;
          
          //navigate("/");
          window.location.replace("/");
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

  const userProfile = async () => {
    operation.attempt(async (currentAttempt) => {
      console.log(`sending request: ${currentAttempt} attempt`);
      try {
        const data = await WebRepository.getProfile();

        setUser(data);
      } catch (ex) {
        console.error("Não foi possivel encontrar o perfil!");
        if (operation.retry(ex)) {
          return;
        }
      }
    });
  };

  function logout() {
    destroyCookie(undefined, "collect.token");
    setUser(null);

    navigate("/login");
    //window.location.replace("/login");
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
