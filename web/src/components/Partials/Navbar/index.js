import React from "react";
import { useNavigate, Link } from "react-router-dom";

import { logout } from "~/services/auth";

import useProfile from "~/hooks/useProfile";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import { ReactComponent as MenuHamburguer } from "~/assets/images/menu.svg";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useProfile();

  const href = "#";

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-main navbar-light">
          <Link className="navbar-brand" to="/dashboard">
            <Logo className="img-fluid mr-3" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#menuMobile"
            aria-controls="menuMobile"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MenuHamburguer className="img-fluid" />
          </button>
          <div className="collapse navbar-collapse" id="menuMobile">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item dropdown dropdown-menu-right">
                <Link
                  className="nav-link dropdown-toggle"
                  to={href}
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                >
                  <span className="username">{user.name}</span>
                </Link>
                <div className="dropdown-menu">
                  <Link
                    className="dropdown-item"
                    to="/settings"
                  >
                    <i className="far fa-user"></i> Conta
                  </Link>
                  <hr className="dropdown-divider" />
                  <Link
                    className="dropdown-item logout"
                    to={href}
                    onClick={handleLogout}
                  >
                    <i className="fas fa-power-off"></i> Sair
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
