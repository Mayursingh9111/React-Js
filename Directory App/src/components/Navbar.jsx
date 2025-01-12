import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 bg-blue-500 text-white">
      <ul className="flex gap-4">
        <li>
          <Link to="/">Add New Person</Link>
        </li>
        <li>
          <Link to="/retrieve">Retrieve Information</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
