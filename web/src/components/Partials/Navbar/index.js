import { Link } from "react-router-dom";

import useAuth from "~/hooks/useAuth";

import { ReactComponent as Logo } from "~/assets/images/logo.svg";
import { ReactComponent as MenuHamburguer } from "~/assets/images/menu.svg";

function Navbar() {
  const { user, logout } = useAuth();
 
  const href = "#";

  const handleLogout = () => {
    logout();
  }
 
  return (
    <header>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-main navbar-light">
          <Link className="navbar-brand" to="/">
            <Logo className="img-fluid ml-3" />
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
                  <span className="username">{user?.name} {user?.surname}</span>
                </Link>
                <div className="dropdown-menu">
                  <Link className="dropdown-item" to={"/settings"}>
                    <i className="far fa-user"></i> Conta
                  </Link>
                  <hr className="dropdown-divider" />
                  <button
                    className="dropdown-item logout"              
                    onClick={handleLogout}
                  >
                    <i className="fas fa-power-off"></i> Sair
                  </button>
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
