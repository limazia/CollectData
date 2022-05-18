import { useContext } from "react";
import { RegisterContext } from "~/contexts/RegisterContext";

const useRegister = () => {
  const context = useContext(RegisterContext);

  if (context === undefined) {
    throw new Error("useRegister precisa ser usado dentro do WrappedApp");
  }

  return context;
};

export default useRegister;
