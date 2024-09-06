import "../styles/navBar.css";
import { useUserContext } from "../providers/UserContext";
import { useNavigate } from "react-router-dom";
import Diacs from "../assets/DiacsLogo.jpeg";
import DiacsTxt from "../assets/Diacs.svg";

export const NavBar = () => {
  const [userActions] = useUserContext();
  const navigate = useNavigate();

  const logout = () => {
    userActions.userClear();
    navigate("/");
  };

  return (
    <nav className="nav-container">
      <div className="nav-bar">
        <img src={Diacs} alt="diacs logo" className="diacs-log" />
        <img src={DiacsTxt} alt="diacs logo" className="diacs" />
        <button onClick={logout}>logout</button>
      </div>
    </nav>
  );
};
