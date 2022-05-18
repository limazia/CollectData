import React from "react";
import Lottie from "react-lottie";

import TattoMachine from "~/assets/animations/tattoo-machine";

import { ReactComponent as LogoImage } from "~/assets/images/logo.svg";
import { ReactComponent as IconImage } from "~/assets/images/logo-icon.svg";

function Logo() {
  return <LogoImage className="logo img-fluid" />;
}

function Icon() {
  return <IconImage className="img-fluid" />;
}

function Text() {
  return <h1>{process.env.REACT_APP_NAME || "Carregando..."}</h1>;
}

function Animation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: TattoMachine,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie options={defaultOptions} height={200} width={200} speed={0.8} />
  );
}

function Loading({ type = "icon" }) {
  const allowedScopes = ["icon", "logo", "text", "animation"];

  return (
    <div className="container-fluid container-loading">
      <div className="row h-100 justify-content-center align-items-center loading">
        {allowedScopes.includes(type) ? (
          <>
            {type === "icon" && <Icon />}
            {type === "logo" && <Logo />}
            {type === "text" && <Text />}
            {type === "animation" && <Animation />}
          </>
        ) : (
          <Icon />
        )}
      </div>
    </div>
  );
}

export default Loading;
