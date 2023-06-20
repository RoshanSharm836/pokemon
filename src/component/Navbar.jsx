import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to={`/`}>
        <img src="../pokelogo.png" alt="logo" width="150px" srcset="" />
      </NavLink>
      <div>
        <NavLink to={`/`}>
          <div>Home</div>
        </NavLink>
        <NavLink to={`/all`}>
          <div>all pokemon</div>
        </NavLink>
        <NavLink to={`/bookmark`}>
          <div>bookmark</div>
        </NavLink>
      </div>
    </nav>
  );
}
