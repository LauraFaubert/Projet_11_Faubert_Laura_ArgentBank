import logo from "../../../public/images/argentBankLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../../authentification/loginSlice";

const NavBar = () => {
  const dispatch = useDispatch();

  // Récupération du token et du profil utilisateur depuis le store Redux
  const token = useSelector((state) => state.user.userToken);
  const userProfil = useSelector((state) => state.user.userProfil);

  const handleLogout = () => {
    // Suppression du token depuis le localStorage et le store
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <nav className="main-nav" aria-label="Main navigation">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div>
        {/* Affichage conditionnel de l'username si l'utilisateur est connecté */}
        {token && userProfil ? (
          <>
            <Link className="main-nav-item" to="/user">
              <FontAwesomeIcon
                icon={faCircleUser}
                className="fa fa-user-circle"
                aria-hidden="true"
              />
              <p>{userProfil.userName}</p>{" "}
              {/* Affichage du nom d'utilisateur */}
            </Link>
            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="fa-solid fa-right-from-bracket"
                aria-hidden="true"
              />
              Sign Out
            </NavLink>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/sign-in">
            <FontAwesomeIcon
              icon={faCircleUser}
              className="fa fa-user-circle"
              aria-hidden="true"
            />
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
