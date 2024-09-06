import { useState } from "react";
import "../styles/navBar.css";
import { Link } from "react-router-dom";

export const SideBar = () => {
  const [state, setState] = useState("none");

  return (
    <nav className="side-bar">
      <ul className="ul-side-bar">
        <li className="items">
          <p
            onClick={() =>
              state == "active" ? setState("none") : setState("active")
            }
            className="txtItems"
          >
            items de inventario
          </p>
          <ul className={state}>
            <li className="productos">
              <Link to={"/products"}>items de cobro</Link>
            </li>
            <li className="categorias">
              <Link to="/category">Categorias</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};
