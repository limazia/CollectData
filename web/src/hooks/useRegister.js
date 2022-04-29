import { useContext } from "react";
import { RegisterContext } from "~/contexts/RegisterContext";

const useRegister = () => {
  return useContext(RegisterContext);
};

export default useRegister;
