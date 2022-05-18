import { useContext } from "react";
import { ForgotContext } from "~/contexts/ForgotContext";

const useForgot = () => {
  const context = useContext(ForgotContext);

  if (context === undefined) {
    throw new Error("useForgot precisa ser usado dentro do WrappedApp");
  }

  return context;
};

export default useForgot;