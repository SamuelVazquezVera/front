import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUserPlus, FaUserEdit, FaUserTimes } from "react-icons/fa";
const SuperAdminSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-cyan-400 w-64 fixed h-full text-white">
      <div>
        <h1 className="text-2x ml-3 mt-4 text-white font-bold">
          Privadas Turquesa
        </h1>
      </div>

      <ul className="mt-3 ml-3 font-bold">
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <NavLink
            to="/superadmin"
            className="flex items-center space-x-4 block py-3 px4 rounded"
          >
            <FaUserPlus />
            <span>Alta</span>
          </NavLink>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <NavLink
            to="/superadmin/actualizar"
            className="flex items-center space-x-4 block py-2.5 px4 rounded"
          >
            <FaUserEdit />
            <span>Modificar</span>
          </NavLink>
        </li>
        <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-2">
          <NavLink
            to="/superadmin/eliminar"
            className="flex items-center space-x-4 block py-2.5 px4 rounded"
          >
            <FaUserTimes />
            <span>Eliminar</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SuperAdminSidebar;
