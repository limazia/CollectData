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

function Loading({ type = "icon" }) {
  const allowedScopes = ["icon", "logo", "text"];

  return (
    <div className="container-fluid container-loading">
      <div className="row h-100 justify-content-center align-items-center loading">
        {allowedScopes.includes(type) ? (
          <>
            {type === "icon" && <Icon />}
            {type === "logo" && <Logo />}
            {type === "text" && <Text />}
          </>
        ) : (
          <Icon />
        )}
      </div>
    </div>
  );
}

export default Loading;
