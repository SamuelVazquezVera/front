import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/authContext";


const NavBarAdmin = () => {
  const { user } = useAuth();
  const logOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };
  const Links = [
    {
      name: "Agregar Usuario",
      link: "/admin/alta",
    },
    {
      name: "Ver Usuarios",
      link: "/admin",
    },
    {
      name: "Agregar Pase E/S",
      link: "/admin/altapase",
    },
    {
      name: "Ver Pase E/S",
      link: "/admin/verpase",
    },
    {
      name: "Agregar Visita",
      link: "/admin/altavisita",
    },
    {
      name: "Ver Registros Visitas",
      link: "/admin/vervisitas",
    },
  ];
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen(!open);
  };
  return (
    <>
      <nav className="bg-blue-500 p-4">
        <div className="flex items-center justify-between">
          <div className="text-white text-2xl font-bold">
            {" "}
            Bienvenido: {user.nombre}{" "}
          </div>
          <div className="md:hidden">
            <button className="text-white cursor-pointer" onClick={toggleMenu}>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex space-x-4">
            {Links.map((link) => (
              <li
                key={link.name}
                className="md:ml-8 text-xl text-white font-bold"
              >
                <NavLink
                  to={link.link}
                  className="hover:text-gray-400 duration-300"
                >
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
          <div>
            <button
              className="px-3 py-1 bg-red-600 text-white"
              onClick={() => logOut()}
            >
              Salir
            </button>
          </div>
        </div>
        {open ? (
          <ul className="flex-col md:hidden ">
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl text-white">
                <NavLink
                  to={link.link}
                  className="hover:text-gray-400 duration-300"
                >
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </>
  );
};

export default NavBarAdmin;
