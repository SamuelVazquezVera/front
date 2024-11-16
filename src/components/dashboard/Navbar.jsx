import React from "react";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div className="flex items-center text-white justify-between h-12 bg-cyan-400 px-5">
      <p>Bienvenido {user.nombre}</p>
      <button className="px-4 py-1 bg-cyan-600 hover:bg-cyan-800">Salir</button>
    </div>
  );
};

export default Navbar;
