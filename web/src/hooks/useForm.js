import { useContext } from "react";
import { FormContext } from "~/contexts/FormContext";

const useForm = () => {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error("useForm precisa ser usado dentro do WrappedApp");
  }

  return context;
};

export default useForm;