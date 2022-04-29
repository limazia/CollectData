import React, { createContext, useLayoutEffect, useState } from "react";
//import { toast } from "react-toastify";

import api from "~/services/api";
import { getToken } from "~/services/auth";

export const ProfileContext = createContext({});

function ProfileProvider({ children }) {
  const [user, setUser] = useState([]);

  useLayoutEffect(() => {
    if (getToken()) {
      userProfile(); 
    }
  }, [getToken]);

  async function userProfile() {
    try {
      const { data } = await api.get("/api/me/account");

      setUser(data);
    } catch (ex) {
      //toast.error("Não foi possivel encontrar o perfil!");
      console.error("Não foi possivel encontrar o perfil!");
    }
  }

  return (
    <ProfileContext.Provider value={{ userProfile, user }}>
      {children}
    </ProfileContext.Provider>
  );
}

export default ProfileProvider;
