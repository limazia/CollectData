import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Form } from "@rocketseat/unform";

import api from "~/services/api";
import useForgot from "~/hooks/useForgot";

import { Head, Spinner, PasswordCheckList } from "~/components";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import ForgotBackground from "~/assets/images/bg-forgot.jpg";

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const {
    handleResetPassword,
    password,
    confirmPassword,
    setPassword,
    setConfirmPassword,
    loading,
  } = useForgot();

  useEffect(() => {
    checkToken();
  }, [token]);

  async function checkToken() {
    const { error } = await api.get(
      `/api/auth/resetcheck/${token ? token : null}`
    );

    if (token) {
      if (error) {
        toast.error(error);
      }
    } else {
      navigate("../");
    }
  }

  /*
  async function handleSubmit() {
    if (!token || !password || !confirmPassword) {
      toast.error("Digite a senha e confirme para continuar!");
    } else {
      try {
        setLoading(true);
        const response = await api.post("/api/auth/reset", {
          token,
          password,
          confirmpassword: confirmPassword,
        });
        const { error, message } = response.data;
        if (error) {
          toast.error(error);
        } else {
          toast.success(message);
          navigate("../");
        }
      } catch (ex) {
        toast.error("Houve um problema ao alterar sua senha.");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  }
  */

  // booleans for password validations
  const [containsUL, setContainsUL] = useState(false); // uppercase letter
  const [containsLL, setContainsLL] = useState(false); // lowercase letter
  const [containsN, setContainsN] = useState(false); // number
  const [containsSC, setContainsSC] = useState(false); // special character
  const [contains8C, setContains8C] = useState(false); // min 8 characters
  const [passwordMatch, setPasswordMatch] = useState(false); // passwords match

  // checks all validations are true
  const [allValid, setAllValid] = useState(false);

  // labels and state boolean corresponding to each validation
  const mustContainData = [
    ["Uma letra maiúscula (a-z)", containsUL],
    ["Uma letra minúscula (A-Z)", containsLL],
    ["Um número (0-9)", containsN],
    ["Um caractere especial (!@#$)", containsSC],
    ["Pelo menos 8 caracteres", contains8C],
    ["As senhas correspondem", passwordMatch],
  ];

  const validatePassword = () => {
    // has uppercase letter
    if (password.toLowerCase() != password) setContainsUL(true);
    else setContainsUL(false);

    // has lowercase letter
    if (password.toUpperCase() != password) setContainsLL(true);
    else setContainsLL(false);

    // has number
    if (/\d/.test(password)) setContainsN(true);
    else setContainsN(false);

    // has special character
    if (/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(password))
      setContainsSC(true);
    else setContainsSC(false);

    // has 8 characters
    if (password.length >= 8) setContains8C(true);
    else setContains8C(false);

    // passwords match
    if (password !== "" && password === confirmPassword) setPasswordMatch(true);
    else setPasswordMatch(false);

    // all validations passed
    if (
      containsUL &&
      containsLL &&
      containsN &&
      containsSC &&
      contains8C &&
      passwordMatch
    )
      setAllValid(true);
    else setAllValid(false);
  };

  return (
    <>
      <Head title="Nova senha" />
      <div className="container-fluid forgot-form">
        <div className="row no-gutter">
          <div
            className="col-md-6 d-none d-md-flex bg-image"
            style={{ backgroundImage: `url(${ForgotBackground})` }}
          ></div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 col-xl-7 mx-auto">
                    <div className="display-4 box-logo">
                      <Logo className="img-fluid mr-2" />
                    </div>
                    <p className="text-muted mt-3 mb-4 text-center">
                      Digite sua nova senha para continuar.
                    </p>
                    <Form onSubmit={handleResetPassword}>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-envelope left"></i>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Nova senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onKeyUp={validatePassword}
                        />
                      </div>
                      <div className="form-group mb-3 wicon">
                        <i className="fas fa-envelope left"></i>
                        <input
                          type="password"
                          name="confirmPassword"
                          className="form-control"
                          placeholder="Confirm a nova senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          onKeyUp={validatePassword}
                        />
                      </div>
                      <div className="mb-2">
                        {mustContainData.map((data) => (
                          <PasswordCheckList data={data} />
                        ))}
                      </div>
                      <button
                        type="submit"
                        disabled={!allValid ? true : false}
                        className="btn btn-send-recovery btn-block"
                      >
                        {loading ? <Spinner type="grow" /> : "Alterar senha"}
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
